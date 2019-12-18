# 11. Running functions remote

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

###### 1. Start the container test\_sshd and test\_sshd2

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ docker start test_sshd | Start the first container. |
| 2 | $ docker inspect -f "{{ .NetworkSettings.IPAddress }}" test_sshd | Displays docker address, eg, 172.17.0.2. |
| 3 | Take a note of the ip-address of test_sshd| |
| 4 | $ docker start test_sshd2 | Start the second container. |
| 5 | Take a note of the ip-address of test_sshd2 | |
| 6 | $ ssh rob@172.17.0.2 | Use the ip-address step 2. |
| 7 | $ julia | Start Julia, and continue at step 8 of [Activity 2: Test the code](#Test-the-code-1) |

---

## Example test code

```julia
julia> using Distributed

julia> d = Dict([]) # empty directory for pids, used by the calling container
Dict{Any,Any} with 0 entries

julia> addprocs([("rob@172.17.0.3", 1)])

julia> d["test_sshd2"] = last(workers())

julia> @everywhere using RbO

julia> @everywhere f1(x) = createSubscriber(x)

julia> s1 = remotecall_fetch(f1, d["test_sshd2"], "Daisy")

```

---

## Activity 2b: Test the code

Prerequisites:
- Actitvity 1

---

| Step | Action | Comment |
| :--- | :--- | :--- |
| 8 | Copy all the [Test code example](#Test-code-example-1) code to the clipboard, including the julia prompt and the response | |
| 9 | Return to the container | |
| 10 | Ctrl-Shfi-V | Paste the text on the clipboard in the Julia REPL. |

The result should look like the next example:

```julia
julia> s1 = remotecall_fetch(f1, d["test_sshd2"], "Daisy")
Subscriber("884704875723870469", "Daisy", "", MEAN_CALCULATOR)
```

---

## Activity 3: Run a function in the remote container

Create and save a subscriber in the container test_sshd2. Then display all saved subscribers from a table.

Prerequisites:
- Activity 1
- Activity 2
- The package SQLite.jl is installed in both containers.


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

using Distributed

d = Dict([])

addprocs([("rob@172.17.0.3", 1)])

d["test_sshd2"] = last(workers())

@everywhere using RbO

# define a new function to create a new subscriber and save it in a database
@everywhere f2(x) = begin
  	s = createSubscriber(x) # create a subscriber
	db = connect("./rbo.sqlite") # connect to database
	create(db, "subscribers", [s]) # save subscriber in database
end

remotecall_fetch(f2, 2, "Mickey")

# define a new function for displaying all subscribers
@everywhere f3(x) = begin
   db = connect("./rbo.sqlite") # connect to database
   gather(db, x) # list all items in table x
end

# Get list of subscrobers
remotecall_fetch(f3, 2, "subscribers")

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
