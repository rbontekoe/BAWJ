

Setup container-container connection (test_shd -> test_sshd2)

- sudo apt-get install openssh-client
- ssh-keygen -t rsa -b 4096 -C "rbontekoe@appligate.nl"
- ssh rob@192.168.xxx.xxx -p 32769 # got connected
- Ctrl-D
- Ctrl-D


## Test with Julia 1.3.0 containers
- Start containers.
- inspect internal ip-address

```
$ docker start test_sshd
$ docker start test_sshd2
$ docker inspect -f "{{ .NetworkSettings.IPAddress }}" test_sshd
172.17.0.2
$ docker inspect -f "{{ .NetworkSettings.IPAddress }}" test_sshd2
172.17.0.3
$ ssh rob@172.17.0.2

# or

$ docker ps
$ ssh 192.168.xxx.xxx -p 32768
```

Install RbO in both containers, [Example of adding the module](https://www.appligate.nl/RbO.jl/module_a/#Example-of-adding-the-module-1)

## Example 1

The code to run:

```
julia> using Distributed

julia> t = @async addprocs([("rob@172.17.0.3", 1)]) # connect to test_sshd2 # process id is 2
1-element Array{Int64,1}:
 2

julia> N = nworkers()

julia> workers()
1-element Array{Int64,1}:
 2

julia> d = Dict([]) # Dictionary for our containers
Dict{Any,Any} with 0 entries

julia> d["test_sshd2"] = last(workers())
2

julia> @everywhere using RbO

julia> function test(v)
          rx = RemoteChannel( () -> Channel(32) )
          @spawnat d["test_sshd2"] begin # get process id from dictionary
              result = updateSubscriber(v, titlecase(strip(v.name)) * " from process " * string(myid()), v.email, v.subscribertype)
              put!(rx, result)
          end
         rx
       end
test (generic function with 1 method)

julia> donald = createSubscriber(" donald duck")
Subscriber("1223446592574910648", " donald duck", "", MEAN_CALCULATOR)

julia> r =  test(donald)
RemoteChannel{Channel{Any}}(1, 1, 7)

julia> while isready(r)
          println(take!(r)) # or @show take!(r)
       end
take!(r) = Subscriber("1223446592574910648", "Donald Duck from process 2", "", MEAN_CALCULATOR)
```
Learned today (12/9/2019) container-container communication:
- Internal Docker ip-address works. You don't have to use the port number.
- Call the container test_sshd2 with @spawnat within the function test(v).
- RemoteChannel is defined within the function.


```
julia> try
           global r = test(daisy)
       catch e
           addprocs([("rob@172.17.0.3", 1)])
           @everywhere using RbO
           d["test_sshd2"] = last(workers())
       end
RemoteChannel{Channel{Any}}(1, 1, 23)
```

## Example 2

New approach. Process continuously running on test_sshd2. Even better? What if... container crashes? Then the in first example gives an error on r = test(donald) which we can test. E.g.

```
julia> using Distributed

julia> d = Dict([]) # Dictionary for our containers
Dict{Any,Any} with 0 entries

julia> addprocs(["rob@172.17.0.3"]) # connect to test_sshd2 # process id is 2
1-element Array{Int64,1}:
 2

julia> d["test_sshd2"] = workers()[1]
2

julia> @everywhere using RbO

julia> function test()
          tx = RemoteChannel( () -> Channel(32) )
          rx = RemoteChannel( () -> Channel(32) )
          @async @spawnat d["test_sshd2"] begin # get process id from dictionary
               while true
                  if isready(tx)
                      v = take!(tx)
                      # @show v
                      result = updateSubscriber(v, titlecase(strip(v.name)) * " from process " * string(myid()), v.email, v.subscribertype)
                      put!(rx, result)
                   end
               end
          end
         tx, rx
       end
test (generic function with 1 method)

julia> tx_test_sshd2, rx_test_sshd2 = test()
(RemoteChannel{Channel{Any}}(1, 1, 7), RemoteChannel{Channel{Any}}(1, 1, 8))

julia> donald = createSubscriber(" donald duck")
Subscriber("14258536779090193685", " donald duck", "", MEAN_CALCULATOR)

julia> put!(tx_test_sshd2, donald)
RemoteChannel{Channel{Any}}(1, 1, 7)

julia> isready(rx_test_sshd2)
true

julia> take!(rx_test_sshd2)
Subscriber("14258536779090193685", "Donald Duck from process 2", "", MEAN_CALCULATOR)
```

Test id:

```
julia> d
Dict{Any,Any} with 1 entry:
  "test_sshd2" => 7

julia> d["test_sshd2"]
7

julia> function check_container(pid)
           try
               procs(pid)
           catch e
               -1
           end
       end
check_container (generic function with 1 method)

julia> p = check_container(d["test_sshd2"])
-1
```


## Example 3

I prefer example 1, and testing whether container is still running.

```
julia> using Distributed

julia> addprocs([("rob@172.17.0.3", 1)])
1-element Array{Int64,1}:
 2

julia> d = Dict([])
Dict{Any,Any} with 0 entries

julia> d["test_sshd2"] = last(workers())
2

julia> @everywhere using RbO

julia> function test(v::Subscriber)
           rx = RemoteChannel( () -> Channel(32) )
           @spawnat d["test_sshd2"] begin # get process id from dictionary
               result = updateSubscriber(v, titlecase(strip(v.name)) * " from process " * string(myid()), v.email, v.subscribertype)
               put!(rx, result)
           end
           rx
       end
test (generic function with 1 method)

julia> function is_container_running(pid)
           try
               procs(pid)
               true
           catch e
               false
           end
       end
is_container_running (generic function with 1 method)

julia> function test(v)
           rx = RemoteChannel( () -> Channel(32) )
           @spawnat d["test_sshd2"] begin # get process id from dictionary
               result = updateSubscriber(v, titlecase(strip(v.name)) * " from process " * string(myid()), v.email, v.subscribertype)
               put!(rx, result)
           end
           rx
       end
test (generic function with 2 methods)

julia> p = is_container_running(d["test_sshd2"])
false

julia> if p
           donald = createSubscriber(" donald duck")
           rx = test(donald)
           sleep(1)
           result =  isready(rx) ? take!(rx) : ""
           println("Test: $result")
       else
           addprocs([("rob@172.17.0.3", 1)])
           d["test_sshd2"] = last(workers())
           @everywhere using RbO
           println("Not connected, please restart.")
       end
Not connected, please restart.
```
