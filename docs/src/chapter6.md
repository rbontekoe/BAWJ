# Testing the application

## Communication flow

```
+--------------+
| 1. Master    |
+--------------+
    Order/
 BankStatement¹
       ¦
       ↓
     ⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼⁼ rx¹
          ↑⁴                ↓
          ¦    Order or     ◊²
          ¦  BankStatement ↙ ↘ JournalEntry
          ¦         tx³ ⁼⁼⁼   ⁼⁼⁼
    JournalEntry         ↓     ↓
          +--------------+     +--------------------+
          | 2. Invoicing |     | 3. General Ledger  |  Workers
          +--------------+     +--------------------+

```
¹ rx, the channel that receives the output from the modules, created by the Master. The Master also generate the test data for the channel: Array{Order, 1} and Array{BankStatement, 1}.

² Dispatcher, a job running in the Master, takes an object from rx and pushes it to the relevant tx channel.

³ tx is a task bounded channel. The task takes the entity from his channel and processes it.

⁴ The task pushes the output, Array{JournalEntry, 1} in this diagram, to the rx channel.

See: [test_remote_channels.jl](https://github.com/rbontekoe/AppliMaster.jl/blob/master/src/test_remote_channels.jl)

##### Output:

```md
[ Info: running test_remote_channel.jl
[ Info: number of processes is 4
[ Info: task_1 will wait for data
[ Info: task_2 will wait for data
[ Info: task_3 will wait for data
[ Info: Dispatcher started

[ Info: Master will ask for 3 test orders from the AppliSales module
[ Info: Master received 3 orders
[ Info: Master will put 3 orders on rx channel
[ Info: Dispatcher received Array{AppliSales.Order,1}
[ Info: task_1 received Array{AppliSales.Order,1}
[ Info: task_1 will process 3 orders remote \#1
[ Info: task_1 will put 3 journal entries on rx channel
[ Info: task_1 will wait for data
[ Info: Dispatcher received Array{AppliGeneralLedger.JournalEntry,1}
[ Info: task_2 received Array{AppliGeneralLedger.JournalEntry,1}
[ Info: task_2 will process 3 journal entries remote \#1
[ Info: task_2 saved 3 journal entries
[ Info: task_2 will wait for data
[ Info: Master will read file with 2 bank statements
[ Info: Master got 2 bank statements
[ Info: Master will put 2 bank statements on rx channel
[ Info: Dispatcher received Array{AppliInvoicing.BankStatement,1}
[ Info: task_3 received Array{AppliInvoicing.BankStatement,1}
[ Info: task_3 will match unpaid invoices with bank statements
[ Info: task_3 will put 2 journal entries on rx channel
[ Info: task_3 will wait for data
[ Info: Dispatcher received Array{AppliGeneralLedger.JournalEntry,1}
[ Info: task_2 received Array{AppliGeneralLedger.JournalEntry,1}
[ Info: task_2 will process 2 journal entries remote \#1
[ Info: task_2 saved 2 journal entries
[ Info: task_2 will wait for data
[ Info: Dispatcher received String
┌ Warning: No task found for type String
└ @ Main ~/julia-pro#1jects/tc/AppliMaster/src/api/myfunctions.jl:103

[ Info: running check_dbs.jl
[ Info: Balance of accounts receivable is 1210.0. Should be 1210
[ Info: Sales is 4000.0. Should be 4000.
```
\#1 remote means: running a task on another process (core).
