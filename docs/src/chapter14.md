# 14. Run the Application in a Notebook

!!! warning "UNDER DEVELOPMENT"

Assuming you created the containers test_sshd and test_sshd2 in chapter 13 you are going to set up the application with a Jupyter notebook. For this you use the package `IJulia.jl` with which you can use Julia code in your notebook.

You will implementing the example code [Example from the course BAWJ](https://www.appligate.nl/AppliAR.jl/stable/chapter4/#Example-from-the-course-BAWJ).

### Contents

```@contents
Pages = ["chapter14.md"]
```

## test\_with\_actors.jl

```
using Pkg
Pkg.activate(".")
Pkg.precompile()

using Rocket

@info("Start docker containers")
cmd = `docker start test_sshd`
run(cmd)

cmd = `docker start test_sshd2`
run(cmd)

cmd = `docker ps`
run(cmd)

sleep(5)

@info("Enable distrbuted computing")
using Distributed

@info("Connect to containers")
addprocs([("rob@172.17.0.2", 1)]; exeflags=`--project=$(Base.active_project())`, tunnel=true, dir="/home/rob")
addprocs([("rob@172.17.0.3", 1)]; exeflags=`--project=$(Base.active_project())`, tunnel=true, dir="/home/rob")

@info("Assign process ids to the containers")
gl_pid = procs()[2] # general ledger
ar_pid = procs()[3] # accounts receivable (orders/bankstatements)

@info("Activate the packages")
@everywhere begin
    using AppliSales
    using AppliGeneralLedger
    using AppliAR
    using Query
end;

@info("Load actors")
include("./actors.jl")

@info("Activate actors")
sales_actor = SalesActor()
ar_actor = ARActor(ar_pid)
gl_actor = GLActor(gl_pid)
stm_actor = StmActor()

@info("Start the application")
subscribe!(from(["START"]), sales_actor)

@info("Process payments")
subscribe!(from(["READ_STMS"]), stm_actor)

@info("Display the result")
using DataFrames

# print aging report
r1 = @fetchfrom ar_pid report()
result = DataFrame(r1)
println("\nUnpaid invoices\n===============")
@show(result)

# print general ledger accounts 1300, 8000, 1150, and 4000
r2 = @fetchfrom gl_pid AppliGeneralLedger.read_from_file("./test_ledger.txt")
df = DataFrame(r2)
#println("\nGeneral Ledger mutations\n========================")
#@show(df)

df2 = r2 |> @filter(_.accountid == 1300) |> DataFrame
balance_1300 = sum(df2.debit - df2.credit)

df2 = df |> @filter(_.accountid == 8000) |> DataFrame
balance_8000 = sum(df2.credit - df2.debit)

df2 = df |> @filter(_.accountid == 1150) |> DataFrame
balance_1150 = sum(df2.debit - df2.credit)

df2 = df |> @filter(_.accountid == 4000) |> DataFrame
balance_4000 = sum(df2.credit - df2.debit)

println("")
println("Balance Accounts Receivable is $balance_1300. $(balance_1300 == 1210 ? "Is correct." : "Should be 1210.")")
println("Sales is $balance_8000. $(balance_8000 == 4000 ? "Is correct." : "Should be 4000.")")
println("Balance bank is $balance_1150. $(balance_1150 == 3630 ? "Is correct." : "Should be 3630.0.")")
println("Balance VAT is $balance_4000. $(balance_4000 == 840 ? "Is correct." : "Should be 840.0.")")
```

## actors.jl

```
# actors.jl

using Rocket

struct StmActor <: Actor{String} end
Rocket.on_next!(actor::StmActor, data::String) = begin
    if data == "READ_STMS"
        stms = AppliAR.read_bank_statements("./bank.csv")
        @show(stms)
        subscribe!(from(stms), ar_actor)
    end
end
Rocket.on_complete!(actor::StmActor) = @info("StmActor completed!")
Rocket.on_error!(actor::StmActor, err) = @info(error(err))

struct SalesActor <: Actor{String} end
Rocket.on_next!(actor::SalesActor, data::String) = begin
    if data == "START"
        #ar_actor = ARActor()
        orders = @fetch AppliSales.process()
        subscribe!(from(orders), ar_actor)
    end
end
Rocket.on_complete!(actor::SalesActor) = @info("SalesActor completed!")
Rocket.on_error!(actor::SalesActor, err) = @info(error(err))

struct ARActor <: Actor{Any}
    ar_pid::Int64
    ARActor(ar_pid) = new(ar_pid)
end
Rocket.on_next!(actor::ARActor, data::AppliSales.Order) = begin
        d = @fetchfrom actor.ar_pid AppliAR.process([data])
        subscribe!(from(d), gl_actor)
end
Rocket.on_next!(actor::ARActor, data::AppliAR.BankStatement) = begin
        unpaid_inv = @fetchfrom actor.ar_pid retrieve_unpaid_invoices()
        entries = @fetchfrom actor.ar_pid AppliAR.process(unpaid_inv, [data])
        subscribe!(from(entries), gl_actor)
end
Rocket.on_complete!(actor::ARActor) = begin
    @info("ARActor Completed!")
end
Rocket.on_error!(actor::ARActor, err) = @info(error(err))

struct GLActor <: Actor{Any}
    gl_pid::Int64
    GLActor(gl_pid) = new(gl_pid)
end
Rocket.on_next!(actor::GLActor, data::Any) = begin
    if data isa AppliGeneralLedger.JournalEntry
        result = @fetchfrom actor.gl_pid AppliGeneralLedger.process([data])
    end
end
Rocket.on_complete!(actor::GLActor) = @info("GLActor completed!")
Rocket.on_error!(actor::GLActor, err) = @info(error(err))
```

## bank.csv

```
Date,Descr,IBan,Amount
"2020-01-15", "Duck City Chronicals Invoice A1002", "NL93INGB", 2420
"2020-01-15", "Donalds Hardware Store Bill A1003", "NL39INGB", 1210
```

## Activity 14.1:

We start with adding all the necessary packages.

##### Prerequisites
- Ubuntu 20.04.
- Julia 1.5+ installed.
- VSCode 1.50+ installed.

In this activity you will:
1. Create a Folder and Add all the Packages.
2. Create the Files Actors.jl, main.jl, and bank.csv.
3. Test the application

##### Step 1: Create a folder for the application

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ mkdir example | Create the folder example. |
| 2 | $ cd example | Enter the folder |
| 3 | $ julia | Start Julia. |
| 4 | julia> ] | Activate the pakage manager. |
| 5 | pkg> activate . | Create a local environment. |
| 6 | pkg> add IJulia | Add the package IJUlia. |
| 7 | pkg> add AppliSales AppliGeneralLedger DataFrames Query Rocket | Add the supporting packages. |
| 8 | pkg> add https://github.com/rbontekoe/AppliAR.jl | Add the package AppliAR. Later on you can use your own package. |
| 9 | pkg> <BackSpace> | Back to Julia. | 
| 10 | julia> Ctrl-D | Exit julia. |
||

##### Step 2: Create the files actors.jl, test_with_actors.jl, and bank.csv

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Create the files [test\_with\_actors.jl](), [actors.jl](), and [bank.csv]() | See code above. |
||

##### Step 3: Test the application
| 4 | $ julia | Start Julia. |
| 5 | julia> include("test\_with\_actors") | Run the code: |
||

```
julia> include("test_with_actors.jl")
[ Info: Load Rocket
[ Info: Enable distrbuted computing
[ Info: Connect to containers
[ Info: Assign process ids to the containers
[ Info: Activate the packages
[ Info: Load the actors
[ Info: Activate the actors
[ Info: Start the application
[ Info: GLActor completed!
[ Info: GLActor completed!
[ Info: GLActor completed!
[ Info: ARActor Completed!
[ Info: SalesActor completed!
[ Info: Process payments
stms = BankStatement[BankStatement(Dates.Date("2020-01-15"), "Duck City Chronicals Invoice A1002", "NL93INGB", 2420.0), BankStatement(Dates.Date("2020-01-15"), "Donalds Hardware Store Bill A1003", "NL39INGB", 1210.0)]
[ Info: GLActor completed!
[ Info: GLActor completed!
[ Info: ARActor Completed!
[ Info: StmActor completed!
[ Info: Display the result

Unpaid invoices
===============
result = 1×5 DataFrame
│ Row │ id_inv │ csm                     │ inv_date           │ amount  │ days   │
│     │ String │ String                  │ Dates.Date         │ Float64 │ Dates… │
├─────┼────────┼─────────────────────────┼────────────────────┼─────────┼────────┤
│ 1   │ A1001  │ Scrooge Investment Bank │ Date("2020-12-18") │ 1210.0  │ Day(0) │

Balance Accounts Receivable is 1210.0. Is correct.
Sales is 4000.0. Is correct.
Balance bank is 3630.0. Is correct.
Balance VAT is 840.0. Is correct.
```

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Run the following code to delete the files: |
||

```
julia> # open shell in container
julia> cmd = `ssh rob@172.17.0.2`
julia> @info("after run(cmd) is activated: goto console, press Enter, and rm test* files. Leave the container with Ctrl-D")
julia> run(cmd)

julia> # open shell in container
julia> cmd = `ssh rob@172.17.0.3`
julia> @info("after run(cmd) is activated: goto console, press Enter, and rm test* invoicenbr.txt. Leave the container with Ctrl-D")
julia> run(cmd)
julia> @info("Ctrl-L to clean the consule. Close julia with Ctrl-D.")
```

## Activity 14.2: Run the code from a notebook

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | ] | Activate the package manager. |
| 2 | pkg> add IJulia | Follow the next instructions if you haven't added [IJulia](../appendix/index.html#Install-IJulia). | |
| 3 | pkg> <Backspace> | Back to Julia. |
| 4 | julia> using IJulia | Load IJulia. |
| 5 | julia> notebook(dir=".", detached=true) | Start the browser and the current directory as notebook folder. |
| 6 | Create a new Julia Notebook |  |
| 7 | Fill and execute the cells according the next [example](https://github.com/rbontekoe/AppliAR.jl/blob/master/ar.ipynb) |  |
||