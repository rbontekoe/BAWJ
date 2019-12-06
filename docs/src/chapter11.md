

Setup container-container conectie (test_shd -> test_sshd2)

! email address

In test_sshd as rob
- docker exec -it test_sshd bash
- su rob

Maybe better to use ssh rob@... instead og docker exec?

- sudo apt-get install openssh-client
- ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"
- ssh rob@192.168.xxx.xxx -p 32769 # got connected
- julia # to test, start julia remote.
- Ctrl-D
- Ctrl-D

```
$ docker inspect -f "{{ .NetworkSettings.IPAddress }}" test_sshd2
172.17.0.3

julia> addprocs([("rob@172.17.0.3", 2)])
2-element Array{Int64,1}:
 2
 3
```

- Start containers.
- inspect internal ip-address

```
$ docker start test_sshd
$ docker start test_sshd2
$ docker inspect -f "{{ .NetworkSettings.IPAddress }}" test_sshd
$ ssh rob@172.17.0.2

# or

$ docker ps
$ ssh 192.168.xxx.xxx -p 32768
```

How do I know that it has run on process id 3?

```
julia> using Distributed

julia> addprocs([("rob@172.17.0.3", 2)])
2-element Array{Int64,1}:
 2
 3

julia> @everywhere using RbO

julia> @everywhere const c1 = RemoteChannel(()->Channel(32), workers()[2])

julia> @everywhere const c2 = RemoteChannel(()->Channel(32), workers()[2])

julia> @everywhere function foo2()
           while true
               data = take!(c1)
               r = updateSubscriber(data, titlecase(strip(data.name)), data.email, data.subscribertype)
               put!(c2, r)
           end
       end

julia> @everywhere @async foo2()

julia> donald = createSubscriber(" jan van leeuwen ")
Subscriber("14285289645484553788", " jan van leeuwen ", "", MEAN_CALCULATOR)

julia> put!(c1, donald)
RemoteChannel{Channel{Any}}(3, 1, 16)

julia> isready(c2) ? take!(c2) : ""
Subscriber("14285289645484553788", "Jan Van Leeuwen", "", MEAN_CALCULATOR)
```

Learned today (12/7/2019) container-container communication:
- Internal Docker ip-address works. You don't have to use the port number.
- Functions that will run remote have to start with @everwhere @async,
- Easier to define RemoteChannels as global (but it is advised not to do). Have to look at this again!
- process 3 in => RemoteChannel{Channel{Any}}(3, 1, 16)
- Overall it works perfect.
