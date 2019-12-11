

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


## The Example

New approach. Process continuously running on test_sshd2.

### main.jl

```
using Distributed

# body remote application. funct except only one argument.

function remote_body(pid::Int, funct)
    tx = RemoteChannel(() -> Channel(32)) # transmit channel
    rx = RemoteChannel(() -> Channel(32)) # receive channel
    @async @spawnat pid begin
        while true
            if isready(tx)
                value = take!(tx)
                result = funct(value) # function is passed as argument
                #@show result
                put!(rx, result)
            else
                sleep(0.1)
            end
        end
    end
    tx, rx # return  transmit and receive channel
end # defined remote_body

d = Dict([]) # empty directory for container -> pids
```


### CODE EXAMPLE

```
julia> include("main.jl")
Dict{Any,Any} with 0 entries

julia> addprocs([("rob@172.17.0.3", 1)])
1-element Array{Int64,1}:
 2

julia> d["test_sshd2"] = last(workers())
2

julia> @everywhere using RbO

julia> tx1, rx1 = remote_body(d["test_sshd2"], createSubscriber)
(RemoteChannel{Channel{Any}}(1, 1, 7), RemoteChannel{Channel{Any}}(1, 1, 8))

julia> tx2, rx2 = remote_body(d["test_sshd2"], createPublisher)
(RemoteChannel{Channel{Any}}(1, 1, 10), RemoteChannel{Channel{Any}}(1, 1, 11))

julia> put!(tx1, "Donald Duck") # transmit value "Donald Duck" to container
RemoteChannel{Channel{Any}}(1, 1, 7)

julia> put!(tx2, "The New York Times")
RemoteChannel{Channel{Any}}(1, 1, 10)

julia> isready(rx1) ? take!(rx1) : "" # receive result
Subscriber("1687381951631187484", "Donald Duck", "", MEAN_CALCULATOR)

julia> isready(rx2) ? take!(rx2) : ""
Publisher("18206665133840381206", "The New York Times", NEWSPAPER, Subscriber[])

```


### Test the connection (temporally)

```
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

## Example the old idea

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
