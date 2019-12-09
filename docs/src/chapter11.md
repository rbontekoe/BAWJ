

Setup container-container connection (test_shd -> test_sshd2)

- sudo apt-get install openssh-client
- ssh-keygen -t rsa -b 4096 -C "rbontekoe@appligate.nl"
- ssh rob@192.168.xxx.xxx -p 32769 # got connected
- Ctrl-D
- Ctrl-D


## Test
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

Install RbO in both containers, [RbO](https://www.appligate.nl/RbO.jl/module_a/#Example-of-adding-the-module-1)

The code to run:

```
julia> using Distributed

julia> addprocs([("rob@172.17.0.3", 1)]) # connect to test_sshd2 # process id is 2
1-element Array{Int64,1}:
 2

julia> workers()
1-element Array{Int64,1}:
 2

julia> d = Dict([]) # Dictionary for our containers
Dict{Any,Any} with 0 entries

julia> d["test_sshd2"] = workers()[1]
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
