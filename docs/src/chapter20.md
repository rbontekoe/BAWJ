# 20. Old Stuff

# 11. Using Remote Channels

### What you will learn

```@contents
Pages = ["chapter11.md"]
```

In lesson 9, Creating SSH enabled Containers, we created two containers: `test_sshd` and `test_sshd2`. In this chapter, we learn how to run a function in a remote container `test_sshd2`. Before we use the model we created in earlier lessons, you will test the containers with the package `RbO.jl`.

##### Activity 1:

You start the two Docker containers, `test_sshd,` and `test_sshd2`. We need to know their Docker IP-addresses. With the command `ssh rob@<ip-address>`, we enter the `test_sshd` container. Within this container, we generate a process id bound to the IP-address of `test_ssh2`.


We create the file `main.jl`, which contains the base code for container-container communication.

##### Activities 2a and 2b:

Next, we use the example code to create a subscriber based on a name. We prefer to do the test with AppliGate's module `RbO.jl`. In chapter 12, you will use your modules.

##### Activity 3:

You learn to write a function that can run remotely, and that saves a subscriber in an SQLite database on the container `test_sshd2`.

---

## Activity 1: Start the Julia 1.3.0 containers

Prerequisites:
- Docker is installed on your computer.
- You have the two containers `test_sshd` and `test_sshd2` created in chapter 9, [Create the Container](/chapter9/index.html#.-Creating-SSH-enabled-Containers-1).
- Both containers are SSH enabled.
- You have a Internet connection to download the RbO.jl module.

Steps:
1. Start both containers and check their Docker internal IP-address.
2. Use SSH to connect from test_sshd to test_sshd2 and install RbO.jl in both containers.

---

###### Step 1 \- Start both containers and check their Docker internal IP-address

| Step | Action | Comment |
| :--- | :--- | :---
| 1 | $ docker start test\_sshd |
| 2 | $ docker start test\_sshd2 |
| 3 | $ docker inspect \-f "{{ .NetworkSettings.IPAddress }}" test_sshd | e.g. 172.17.0.2 |
| 3 | $ docker inspect \-f "{{ .NetworkSettings.IPAddress }}" test_sshd2 | e.g. 172.17.0.3 |

---

###### Step 2 \- Use SSH to connect from test\_sshd to test\_sshd2 and install RbO.jl

Install RbO in both containers, [Example of adding the module](https://www.appligate.nl/RbO.jl/module_a/#Example-of-adding-the-module-1)

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ ssh rob@172.17.0.2 | Enter the container test_sshd. |
| 2 | $ ssh rob@172.17.0.3 | Enter the container test_sshd3. |
| 3 | $ julia | Start Julia. |
| 4 | julia> ] | Go to the package manager. |
| 5 | pkg> add https://github.com/rbontekoe/RbO.jl | Install RbO.jl. |
| 6 | Ctrl-C | Return to REPL prompt. |
| 7 | Ctrl-D | Leave Julia. |
| 8 | Ctrl-D | Leave the container test_sshd2. |

!!! note
    If your container is running on a remote machine, you have to use the ip-address of the remote machine and the exported port of the container to connect to.

    $ docker start test\_sshd # start the container test\_sshd

    $ docker port test\_sshd # display the port, e.g. 22/tcp -> 0.0.0.0:32768

    $ ssh 192.168.xxx.xxx -p 32768 # connect to the container on remote machine

---

## main.jl

We use a function to run code in another container. The function will be called in a while loop. Because we use this construction more often, we pass the function as argument to a function called remote\_body. Through the channel you transport the data for the function. We store he code of the remote\_body function in the file main.jl.

!!! note
    Maybe all the stuff can much more easier be accomplished by using:
    - `remotecall_fetch(f1, 2, createSubscriber("Daisy"))`
    - `remotecall_fetch(f2, 2, "subscribers")`
    - `remotecall_fetch(f3, 4, ["Gekke Jan"], "subscribers")`

    ```
    @everywhere f3(x, y) = begin
        s = createSubscriber(x)
        db = connect("./rbo.sqlite")
        create(db, y, [s])
        true
    end
    ```

```julia
using Distributed

#=
The container that wants to run code on another container initiate this function.It has two arguments:
- pid, the process id created wi th the addprocs function.
- funct, to run on the container, or remote machine. funct is in this example a function that accepts only one argument.
=#
function remote_body(pid::Int, funct)
    tx = RemoteChannel(() -> Channel(32)) # local transmit channel
    rx = RemoteChannel(() -> Channel(32)) # local receive channel

    # run the code on the process id that has been passed
    @async @spawnat pid begin
        while true
	    try
                if isready(tx) # channel has data

                    # get the data from the tx-channel
                    value = take!(tx)

                    # execute the code of the function that was passed as argument
                    result = funct(value)

                    # for test purposes
                    #@show result

                    # put the result of the function on the rx-channel
                    put!(rx, result)
                else

                    # for test purposes
                    #which_funct = string(funct) * " on process " * string(myid()) * " is waiting for data."
                    #@show which_funct

                    # the code wait until there is data on the tx-channel
                    wait(tx)
                end
	    catch e
	       put!(rx, e)
	    end
        end
    end

    # return transmit and receive channel, so the calling container can communicate with the called container.
    tx, rx

end # defined remote_body

d = Dict([]) # empty directory for pids, used by the calling container
```

---

## Activity 2a: Start the two containers and create main.jl

Prerequisites:
- Docker is installed on your computer.
- You have the two containers test_sshd and test_sshd2 created in `Chapter 9, Create the Container`.
- Both containers are SSH-enabled.
- Julia is installed in the directory `julia` on the containers.
- The RbO.jl package is installed in both containers.

Steps
1. Start the container `test_sshd` and create main.jl with nano.

---

###### 1. Start the container test\_sshd and create main.jl with nano.

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

---

## Example test code

```julia
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

---

## Activity 2b: Test the code

Prerequisites:
- Actitvity 2a

---

| Step | Action | Comment |
| :--- | :--- | :--- |
| 13 | Copy all the [Test code example](#Test-code-example-1) code to the clipboard, including the julia prompt and the response | |
| 14 | Return to the container | |
| 15 | Ctrl-Shfi-V | Paste the text on the clipboard in the Julia REPL. |

The result should look like the next example:

```julia
julia> take!(rx1) = Subscriber("15498821131237366424", "Donald Duck", "", MEAN_CALCULATOR)
take!(rx2) = Publisher("8593928998820612462", "The New York Times", NEWSPAPER, Subscriber[])
take!(rx1) = Subscriber("17785241625571045887", "Daisy Duck", "", MEAN_CALCULATOR)
```

---

## Activity 3: Run a function in the remote container

Create and save a subscriber in the container test_sshd2. Then display all saved subscribers From a table. See also  [RbO.jl](https://www.appligate.nl/RbO.jl/).

Prerequisites:
- Activity 1
- Activity 2a & 2b
- The package SQLite.jl is installed.


Steps:

1. Install SQLite.jl
2. Try the example code
3. Use the RbO.jl documentation

---

###### 1. Install SQLite.jl

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Enter test_sshd and start Julia |  |
| 2 | Go to the package manager |  |
| 3 | pkg > add SQLite | |

---

###### 2. Try the example code

Try the code below.

```julia
include("main.jl")

addprocs([("rob@172.17.0.3", 1)])

d["test_sshd2"] = last(workers())

@everywhere using RbO

# define a new function
@everywhere f1(x) = begin
  s = createSubscriber(x) # create a subscriber
	db = connect("./rbo.sqlite") # connect to database
  create(db, "subscribers", [s]) # save subscriber in database
end

# activate remote_body for the new function
tx1, rx1 = remote_body(d["test_sshd2"], f1)

# create and save the subscriber Donald Duck
put!(tx1, "Donald Ducky")

# the display routine
@async while true
	if isready(rx1)
  	@show take!(rx1)
  else
    wait(rx1)
  end
end

# define a new function for displaying all subscribers
@everywhere f2(x) = begin
	db = connect("./rbo.sqlite") # connect to database
	gather(db, x) # list all items in table x
end

# activate remote_body for the new function
tx2, rx2 = remote_body(d["test_sshd2"], f2)

# All subscribers in the table subscribers
put!(tx2, "subscribers")

# the display routine
@async while true
	if isready(rx2)
  	@show take!(rx2)
  else
    wait(rx2)
  end
end

# Remove process
rmprocs(d["test_sshd2"])

# Remove key from dictionary
delete!(d, "test_sshd2")

```

---

###### 3. Use the RbO.jl documentation

Use the documentation to do the next steps.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Use the command `connect` to create a link to the on-disk database rbo.sqlite | |
| 2 | Use the command 'gather' to retieve data from the SQL table `subscribers` | |
