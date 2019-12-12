# 11. Container-container communication

### What you will learn

```@contents
Pages = ["chapter11.md"]
```
Activity 1:  You start the two Docker containers, test_sshd, and test_sshd2. We need to know their Docker IP-address for communicating with the remote container test_sshd2. With the command ssh rob@<ip-address>, we enter the test_sshd. We create the file `main.jl,` which contains the base code for container-container communication.

Activity 2: Next, we use the example code to create a subscriber based on a name. We prefer first to do the test with the AppliGate's module RbO.jl. In chapter 12, you will use your modules.

Activity 2: You learn to write a function that can run remotely, and that saves a subscriber in an SQLite database on the container test_sshd2.

Setup container-container connection (test_shd -> test_sshd2). Maybe I need this somewhere else.
- sudo apt-get install openssh-client
- ssh-keygen -t rsa -b 4096 -C "rbontekoe@appligate.nl"
- ssh rob@192.168.xxx.xxx -p 32769 # got connected

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


## main.jl

```
# body remote application. funct accept only one argument.
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
		#@show "waiting"
                wait(tx)
            end
        end
    end
    tx, rx # return  transmit and receive channel
end # defined remote_body

d = Dict([]) # empty directory for pids
```

## Activity 1: Start the two containers

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ docker start test_sshd | Start the first container. |
| 2 | $ docker inspect -f "{{ .NetworkSettings.IPAddress }}" test_sshd | Displays docker address, eg, 172.17.0.2. |
| 3 | Take a note of the ip-address of test_sshd| |
| 4 | $ docker start test_sshd2 | Start the second container. |
| 5 | Take a note of the ip-address of test_sshd2 | |
| 6 | $ ssh rob@172.17.0.2 | Use the ip-address step 2. |
| 7 | Copy the [main.jl](#main.jl-1) code to the clipboard. | |
| 8 | $ nano main.jl | Open a new file. |
| 9 | Ctrl-Shift-V | Paste the code form the clipboard. |
| 10 | Ctrl-O | Save the file. |
| 11 | Ctrl-X | Exit the editor. |
| 12 | $ julia | Start Julia, and continue at step 13 of [Activity 2: Test the code](#Test-the-code-1) |


## Test code example

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

julia> @async while true
           if isready(rx1)
               @show take!(rx1)
           else
               wait(rx1)
           end
       end
Task (runnable) @0x00007fbf925c5ae0

julia> @async while true
           if isready(rx2)
               @show take!(rx2)
           else
               wait(rx2)
           end
       end
Task (runnable) @0x00007fbf92f59ae0

julia> put!(tx1, "Daisy Duck")
RemoteChannel{Channel{Any}}(1, 1, 7)

```

## Activity 2: Test the code

| Step | Action | Comment |
| :--- | :--- | :--- |
| 13 | Copy all the [Test code example](#Test-code-example-1) code to the clipboard, including the julia prompt and the response | |
| 14 | Return to the container | |
| 15 | Ctrl-Shfi-V | Paste the text on the clipboard in the Julia REPL. |

The result should look like the next example:

```
julia> take!(rx1) = Subscriber("15498821131237366424", "Donald Duck", "", MEAN_CALCULATOR)
take!(rx2) = Publisher("8593928998820612462", "The New York Times", NEWSPAPER, Subscriber[])
take!(rx1) = Subscriber("17785241625571045887", "Daisy Duck", "", MEAN_CALCULATOR)
```

## Play around with subscribers

Create and save a subscriber in the container test_sshd2. Then display all saved subscribers From a table. See also  [RbO.jl](https://www.appligate.nl/RbO.jl/).

```
# activate remote_body for the new function
tx1, rx1 = remote_body(d["test_sshd2"], f)

# define a new function
@everywhere f(x) = begin
  s = createSubscriber(x) # create a subscriber
	db = connect("./rbo.sqlite") # connect to database
  create(db, "subscribers", [s]) # save subscriber in database
end

# create and save the subscriber Donald Duck
put!(tx1, "Donald Duck")

# the display routine
@async while true
	if isready(rx1)
  	@show take!(rx1)
  else
    wait(rx1)
  end
end

# define a new function for displaying all subscribers
@everywhere f(x) = begin
	db = connect("./rbo.sqlite") # connect to database
	gather(db, x) # list all items in table x
end

# activate remote_body for the new function
tx1, rx1 = remote_body(d["test_sshd2"], f)

# All subscribers in the table subscribers
put!(tx1, "subscribers")

```
