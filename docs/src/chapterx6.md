# 6. Testing the application

UNDER DEVELOPMENT!

### What you will learn

```@contents
Pages = ["chapter6.md"]
```

You learn to use Julia Channel's to transfer data between the tasks. When started, a task receives a general channel where we put for the result. The dispatcher reads data from the channel and pushes it to the relevant private channel of the task. We let the methods run remotely, which means on another core or machine. Next, we start a function to retrieve data. The job pushes the returned data to the general channel, and the dispatcher decides again.

*Application set-up*

```
                         +-------------+
                         |    Master   |
                         +-------------+
                          BankStatement¹
                                ¦
                                ↓
    ----------------------------------------------------- rx¹
                   ↑⁴                    ↑⁴            ↓
                   ¦                     ¦             ◊ Dispatcher²
          ↙        ¦            ↙        ¦            ↙
      --- tx³      ¦        --- tx³      ¦        --- tx³
       ¦           ¦       Order,        ¦         ¦
    "START"        ¦   BankStatement     ¦    JournalEntry
       ¦           ¦         ¦           ¦         ¦
       ↓         Order       ↓      JournalEntry   ↓
      +--------------+      +--------------+      +--------------+
      |    Sales     |      |  Invoicing   |      | GeneralLedger|    Workers
      +--------------+      +--------------+      +--------------+
↘
```
¹ rx, the channel that receives the output from the modules. The Master creates rx. The Master also generate the test data for the channel: Array{BankStatement, 1}.

² Dispatcher, a job running in the Master, takes an object from rx and pushes it to the relevant tx channel.

³ tx is a task bounded channel. The task takes the entity from his channel and processes it remotely.

⁴ The task pushes the output, Array{Order, 1} or Array{JournalEntry, 1} in this diagram, to the rx channel.

See: [test\_local\_channels.jl](https://github.com/rbontekoe/AppliMaster.jl/blob/master/src/test_local_channels.jl)

## Using Channels

Julia has local and remote channels. In the `test\_local\_channel.jl` page, we use local channels. The dispatcher creates the general channel rx and instantiates the tasks. Each task returns its channel.

```
function dispatcher()
    rx = Channel(32) # local channel

    tx0 = task_0(rx) # get the orders
    tx1 = task_1(rx) # process the orders
    tx2 = task_2(rx) # process the journal entries
    tx3 = task_3(rx) # process the unpaid invoices
```

## The tasks

Each task creates its private channel tx. Then it starts an asynchronous endless loop. Within the while loop, it tests whether the channel is ready. If it is not ready, which means it doesn't have any data, it enters a wait state. As soon as there is data on the channel, it leaves the wait state.

If the data has the right data type or value, it runs a function remotely. The task puts the return value of the function on the general channel rx and returns to its wait state until there is more data.

Because the while loop runs asynchronous, the function can return it local channel to the dispatcher.

For more information and examples of parallel computing, please see Carsten Bauer's [Parallel Computing](https://github.com/crstnbr/JuliaWorkshop19/blob/master/3_Three/1_parallel_computing.ipynb) notebook.

```
# =================================
# task_1 - processing orders
# =================================
function task_1(rx)
    tx = Channel(32)
    @async while true
        if isready(tx)
            orders = take!(tx)
            @info("task 1 (create invoices): $(typeof(orders))")
            if typeof(orders) == Array{AppliSales.Order, 1}
                @info("task_1 (create invoices) will process $(length(orders)) orders remotely")
                result = @fetch AppliInvoicing.process(PATH_DB, orders)
                @info("task_1 (create invoices) will put $(length(result)) journal entries on rx channel")
                put!(rx, result)
            end
        else
            @info("task_1 (create invoices) is waiting for data")
            wait(tx)
        end
    end
    return tx
end # task_1
```
\#1 - When the endless loop is in the `wait(tx)` state, then the state is released and is the if clause executed. It takes the value, and tests whether it is of the type `Array{AppliSales.Order, 1}`.

\#2 - The function `AppliInvoicing.process(PATH_DB, orders)` is executed remotely, on another core or machine

## Running code on other cores

Julia uses the master-worker concept. It means that you can let run your code on other cores or even cores on different machines.

The code of the page `test\_remote\_channels.jl` can partially run on other processor cores.

To enable parallel and distributed computing use the statement `using Distributed`.

See: [test_remote_channels.jl](https://github.com/rbontekoe/AppliMaster.jl/blob/master/src/test_remote_channels.jl)

In this example, it is Julia that decides on which core the code will run.

```
np = addprocs(4) #1
@info("number of processes is $(length(np))")
```
\#1 My laptop, a Legion Y520, has a processor with 4 cores.

## The dispatcher

After initialization the dispather starts an asynchronous endless loop. It takes an entity from the general channel rx. Depending on the data type or value, it starts the relevant task.

```
function dispatcher()
    rx = Channel(32)

    tx0 = task_0(rx) # get the orders
    tx1 = task_1(rx) # process the orders
    tx2 = task_2(rx) # process the journal entries
    tx3 = task_3(rx) # process the unpaid invoices

    @async while true
        if isready(rx)
            value = take!(rx)
            @info("Dispatcher received $(typeof(value))")
            if typeof(value) == String && value =="START"
                put!(tx0, "START")
            elseif typeof(value) == Array{AppliSales.Order, 1}
                put!(tx1, value)
            elseif typeof(value) == Array{AppliGeneralLedger.JournalEntry,1}
                put!(tx2, value)
            elseif typeof(value) == Array{AppliInvoicing.BankStatement,1}
                put!(tx3, value)
            else
                @warn("No task found for type $(typeof(value))")
            end
        else
            wait(rx)
        end
    end
    return rx
end # dispatcher
```

## Output

The code on page `test\_remote\_channel.jl` generates the following output:

```
[ Info: Enabled distributed computing
[ Info: number of processes is 4
[ Info: Loaded ./api/myfunctions.jl
[ Info: running test_remote_channel.jl
[ Info: task_0 is waiting for data
[ Info: task_1 is waiting for data
[ Info: task_2 is waiting for data
[ Info: task_3 is waiting for data

[ Info: Dispatcher started
[ Info: The Master will start the process and asks for test orders from the AppliSales module
[ Info: Dispatcher received String
[ Info: task_0 received String
[ Info: task_0 will start the process remotely #1
[ Info: task_0 will put 3 the orders on rx channel
[ Info: task_0 is waiting for data

[ Info: Dispatcher received Array{AppliSales.Order,1}
[ Info: task_1 received Array{AppliSales.Order,1}
[ Info: task_1 will process 3 orders remotely
[ Info: task_1 will put 3 journal entries on rx channel
[ Info: task_1 is waiting for data

[ Info: Dispatcher received Array{AppliGeneralLedger.JournalEntry,1}
[ Info: task_2 received Array{AppliGeneralLedger.JournalEntry,1}
[ Info: task_2 will process 3 journal entries remotely
[ Info: task_2 saved 3 journal entries
[ Info: task_2 is waiting for data

[ Info: Master got 2 bank statements
[ Info: Master will put 2 bank statements on rx channel
[ Info: Dispatcher received Array{AppliInvoicing.BankStatement,1}
[ Info: task_3 received Array{AppliInvoicing.BankStatement,1}
[ Info: task_3 will match unpaid invoices with bank statements
[ Info: task_3 will put 2 journal entries on rx channel
[ Info: task_3 is waiting for data

[ Info: Dispatcher received Array{AppliGeneralLedger.JournalEntry,1}
[ Info: task_2 received Array{AppliGeneralLedger.JournalEntry,1}
[ Info: task_2 will process 2 journal entries remotely
[ Info: task_2 saved 2 journal entries
[ Info: task_2 is waiting for data

[ Info: Dispatcher received String
┌ Warning: No task found for type String
└ @ Main ~/julia-projects/tc/AppliMaster/src/api/myfunctions.jl:130
```
\#1 remotely means: running a task on another process (core).
