# 13. Running the containers

Under development!

### What you will learn

```@contents
Pages = ["chapter13.md"]
```

In chapter 13, we combine what we have learned in chapter 6, `Testing the application` and chapter 12 `Creating SSH enabled Containers.` We use the the packages `AppliSales, AppliInvoicing, and AppliGeneralLedger`. In the container `test_sshd` we use `AppliSales, and AppliInvoicing,` and in `test_sshd2` we use `AppliGeneralLedger.` We will discover that the general ledger data will be stored in a file on `test_sshd2.`

##### Activity 1:

We start with cloning the code from `AppliMaster` on GitHub.

##### Activity 2:

Create the application.

## Activity 1: Cloning the code

Prerequisites:
- Docker is installed on your computer.
- You have the two containers `test_sshd` and `test_sshd2` created in chapter 9, [Create the Container](../chapter10/index.html#Activity-2-Create-the-Container-1).
- Both containers are SSH enabled.
- You have a Internet connection to download the all the modules we need.

Steps:
1. Start both containers and check their Docker internal IP-address.
2. Use SSH to connect from test_sshd to test_sshd2 and install our modules in both containers.
3. Create the program.

###### Step 1.1 \- Start both containers

| Step | Action | Comment |
| :--- | :--- | :---
| 1 | $ docker start test\_sshd |
| 2 | $ docker start test\_sshd2 |
| 3 | $ docker inspect \-f "{{ .NetworkSettings.IPAddress }}" test_sshd | e.g. 172.17.0.2 |
| 4 | $ docker inspect \-f "{{ .NetworkSettings.IPAddress }}" test_sshd2 | e.g. 172.17.0.3 |

###### Step 1.2 \- Use SSH to connect from test\_sshd to test\_sshd2 and install the out modules

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ ssh rob@172.17.0.2 | Enter the container test_sshd. |
| 2| $ julia | Start Julia. |
| 3 | julia> ] | Go to the package manager. |
| 4 | pkg> add https://github.com/rbontekoe/AppliSales.jl | Install AppliSales.jl. |
| 5 | pkg> add https://github.com/rbontekoe/AppliInvoicing.jl | Install AppliInvoicing.jl. |
| 6 | pkg> add https://github.com/rbontekoe/AppliGeneralLedger.jl | Install AppliGeneralLedger.jl. |
| 7 | Ctrl-C | Return to REPL prompt. |
| 8 | Ctrl-D | Leave Julia. |
| 9 | $ ssh rob@172.17.0.3 | Enter the container test_sshd2. |
| 10 | Repeat step 5, 6, and 7 | All our packages are available in test_sshd2. |
| 11 | Leave the container test_sshd2. | |

###### Step 1.3 - Clone AppliMaster

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ git clone https://github.com/rbontekoe/Master.jl.git | A folder AppliMaster.jl will be created. |
| 2 | $ ls | |
| 3 | Ctrl-D | Leave the container. |

## Activity 2: Create the application

Prerequisites:
- Docker is installed on your computer.
- You have the two containers test_sshd and test_sshd2 created in `Chapter 9, Create the Container`.
- Both containers are SSH-enabled.
- Julia is installed in the directory `julia` on the containers.
- The AppliSales, AppliInvoicing, and AppliGeneralLedger packages are installed in both containers.

Steps
1. Start the container `test_sshd` and create main.jl with nano.
2. Run the application.


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

## Example test code

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Create a file app_functions.jl | In test_sshd. |
| 2 | Put the code from [AppliMaster.jl](https://github.com/rbontekoe/AppliMaster.jl) in the file | |
| 3 | Start julia |  |
| 4 | Run the next (initialization) code first| |

```
julia> using Distributed

julia> p = addprocs([("rob@172.17.0.3", 1)]; exeflags=`--project=$(Base.active_project())`)
1-element Array{Int64,1}:
 2

julia> p = p[1] #container used for invoicing

julia> q = p[1] # container used for general ledger

julia> @everywhere using AppliSales

julia> @everywhere using AppliInvoicing

julia> @everywhere using AppliGeneralLedger

julia> include("./app_functions.jl");

julia> rx = dispatcher()
[ Info: task_0 is waiting for data
[ Info: task_1 is waiting for data
[ Info: task_2 is waiting for data
[ Info: task_3 is waiting for data
Channel{Any}(sz_max:32,sz_curr:0)
```

| Step | Action | Comment |
| :--- | :--- | :--- |
| 5 | Run the next codel |  |

```
julia> put!(rx, "START"); # start the application


julia> stms = AppliInvoicing.read_bank_statements(PATH_CSV); # retrieve data

julia> put!(rx, stms); # processing the uppaid invoices
```

When run the code again, you will experience that it is very fast. Best is to delete first the data stores:

| Step | Action | Comment |
| :--- | :--- | :--- |
| 6 | ;ssh rob@172.17.0.3 | Go to test_ssh2. |
| 7 | ;rm invoicing.sqlite journal.txt ledger.txt | Delete the stores. |
| 8 | Ctrl-D | Leave the container. | |
| 9 | Run the previous code again |  |

###### The result (statementrs removed)

```
[ Info: Dispatcher received String
[ Info: task_0 received String
[ Info: task_0 will start the process remotely

[ Info: task_0 will put 3 the orders on rx channel
[ Info: task_0 is waiting for data

[ Info: Dispatcher received Array{AppliSales.Order,1}
[ Info: Task 1 will put 3 orders on rx channel
[ Info: task_1 is waiting for data

[ Info: Dispatcher received Array{AppliGeneralLedger.JournalEntry,1}
[ Info: task_2: Processing journal entries
[ Info: task_2 is waiting for data

[ Info: Dispatcher received Array{AppliInvoicing.BankStatement,1}
[ Info: Task_3: Processing unpaid invoices
[ Info: Retrieved 3 unpaid invoices
[ Info: task_3 is waiting for data

[ Info: Dispatcher received Array{AppliGeneralLedger.JournalEntry,1}
[ Info: task_2: Processing journal entries
[ Info: task_2 is waiting for data
```

###### Unkown data will not be routed!

| Step | Action | Comment |
| :--- | :--- | :--- |
| 10 | Run the code in step 5 again |  |

```
test = "Test unkown type";

put!(rx, test); # unkown type error
```
###### Result

```
[ Info: Dispatcher received String

┌ Warning: No task found for type String
└ @ Main ~
```
