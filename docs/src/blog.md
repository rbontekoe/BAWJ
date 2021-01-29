# Blog

## 2021

### 01/29/2021 - Completed the course until chapter 15

I'm done with the course now that I've also finished Chapter 15. Will go through all the activities and exercises one more time.

I also decided to use notebooks. The convenience is that the student can also experiment. In chapter 14, there are two, `ar.ipynb` to create the data files, and in `website.ipynb`, the student will learn how to use Bukdu as a web framework. Clone [`TestAppliAR`](http://www.appligate.nl/BAWJ/stable/chapter14/) and get started right away. The prerequisite is that the two Docker containers test_sshd and test_sshd2 have already been created.

In Chapter 15, the student will create a new container `gateway` in which one sets up the website.

## 2020

### 12/09/2020

In section 1, I added chapter 7 about creating documentation for the module [Accounts.jl](https://www.appligate.nl/Accounts.jl/stable/).

Lately, I have been busy with [Genie.jl](https://github.com/GenieFramework/Genie.jl). Genie is a web framework that I want to use as a user interface for the AppliAR.jl, the accounts receivable module.

The next article I read this day, [pupils learn more effectively through stories than activities](https://www.bathecho.co.uk/news/education/research-pupils-learn-stories-activities-92789/), got me thinking.

The BAWJ course is strongly based on activities. I chose to do this to be able to look back on how I did something. But how do I apply storytelling with abstract (in contrast to human-based) examples for this course? That is what I am going to look into.

### 10/19/2020 - Add Currying and Piping Example to Accounts.jl

I was wondering how I could realize `piping` in Julia. It turns out that you have to use `currying` to do that.  On the page [Implementing Currying](https://riptutorial.com/julia-lang/example/20261/implementing-currying), I found an example. You can find my implementation on [Example 2: Currying and Piping](https://www.appligate.nl/Accounts.jl/stable/example/#Example-2:-Currying-and-Piping.).

Yesterday, I discovered that VSCode runs on a Chromebook with an ARM processor (I have an Acer R13). Atom does not support ARM. However, I am not impressed by the performance, but it works.  Especially the `languageserver.jl` has problems getting started.

### 10/13/2020 - VSCode for Julia

The Juno team joined the `VSCode for Julia` team. Juno.jl will be now in maintenance mode only. More: [VSCode for Julia](https://www.youtube.com/watch?v=rQ7D1lXt3GM&t=50s).

One feature I particularly loved was the debugger. I have decided to adapt the course to VSCode for Julia.

### 09/09/2020 - Solved the Triple Back Ticks Problem

If you want to display [triple back ticks](https://meta.stackexchange.com/questions/82718/how-do-i-escape-a-backtick-within-in-line-code-in-markdown) in a text block enclose it between four back ticks. I updated chapter 4.

I decided to extend section 1 with a chapter about Documenter.jl the reason I searched again for a solution of the back ticks.

### 08/20/2020 - Finished Section 1

Finished section 1 `Experimenting with Modules`. Reviewed chapters one till six. I did the activities and exercises. Looks good.

The next step is section 2 `The Accounts Receivable Module`.

### 08/11/2020 - Added an Easier Example

Today, I 'finished' the Accounts.jl module. I am happy that I switched to an easier example of the activities and exercise.

### 08/03/2020 - Installed Samsung Portable SSD T5

Received my Samsung Portable SSD T5 and installed Ubuntu 20.04 on it. It is very fast.

I also rewrote the appendix with up-to-date installation instructions. I changed the name Appendix into Installation instructions. [See](https://www.appligate.nl/BAWJ/dev/).

### 07/15/2020 - Rewrite the course

Added documentation to [AppliAR](https://www.appligate.nl/AppliAR.jl/). In [4. Example](https://www.appligate.nl/AppliAR.jl/chapter4/) the code that uses Docker containers and actors. Now ready to rewrite the course and incorporate the actors.

### 07/10/2020 - Rocket.jl

I played last week with Rocket.jl, a package where you can work with actors. During the time I worked with Akka and Scala, I became familiar with the idea of actors.

Actors send messages to other actors, which are stored in their mailbox and then processed one by one. The advantage is that the actors are completely separated from each other and can manage their data.

The results were positive, so I consider to set up the application the way I did with Akka.

### 06/25/2020 - Domain, API, and Infrastructure as sub-modules

A sub-module is a defined unit where you define what the input is and what someone else can use. Would it have an advantage to define the Domain, API and Infrastructure shell as a sub module as well?  I implemented it in AppliAR.

### 05/11/2020 - Registered the packages AppliSales and AppliGeneralLedger

Last Friday, I have registered my first packages at [JuliaRegistries/General](https://github.com/JuliaRegistries/General):
- AppliSales
- AppliGeneralLedger

To register the packages you use [https://juliahub.com/ui/Packages](https://juliahub.com/ui/Home), using the `Registering Packages` page. You have to wait for three days before you can add the packages to a project.

I had to do this because AppliSales and AppliGeneralLedgers are dependencies in AppliAR.jl and I wanted to make use of Travis CI. Travis CI requires that it can add the tests (in `runtests.jl`) from the official Julia registry.

Now I am considering to partially rewrite the course to incorporate my newly acquired knowledge.

### 05/07/2020 - PkgTemplates.jl

After watching the video [Developing Julia Packages](https://www.youtube.com/watch?reload=9&v=QVmU29rCjaA) I decided to use `PkgTemplates.jl` as the starting point for package development.

I created the package AppliAR.jl (AR = Account Receivable) with the code from AppliInvoicing.jl, a name I will replace.

Also, I recreated the supporting packages AppliSales.jl and AppliGeneral.jl.

Overall, I believe that what I learned from using PkgTemplates makes the application more professional. Unfortunately, I have to rewrite parts of the course.

In [AppliMaster.jl](https://github.com/rbontekoe/AppliMaster.jl) you find the files `test_local_channels_2.jl` and `client.jl` to test the application.

```
# test_local_channels2.jl

using Pkg
Pkg.activate(".")

# remove old stuff
cmd = `rm test_invoicing.sqlite test_ledger.txt test_journal.txt`
run(cmd)

# enable distrbuted computing
using Distributed
@info("Enable distributed computing")

# this should be the next step
np = addprocs(4; exeflags=`--project=$(Base.active_project())`)
#np = addprocs([("rob@192.168.2.77:2222", :auto)]; exeflags=`--project=$(Base.active_project())`)
@info("number of processes is $(length(np))")

# activate the packages (before the processes are created)
@everywhere begin
    using AppliSales
    using AppliGeneralLedger
    using AppliAR
end;

@info("Distributed computing enabled")

# get the tasks and dispatcher
include("./api/api.jl")

# start the dispatcher
rx = dispatcher()
@info("Dispatcher started")

# start application remote
include("client.jl")

# display aging report
using DataFrames

sleep(10)
r = DataFrame(report())
println("\nUnpaid invoices\n============")
println(r)

```

### 04/17/2010 - Using socket for remote communication

I have defined Task_4 in `myfunctions2.jl` of AppliMaster. The task listens on port 8000. When data is detected, it is deserialized. The string START will initiate the process. Sending a `BankStatement` will create the paid invoices.

First start `test_local_channels_2.jl`. Then run the next code in a separate Julia session.
```
using Sockets
using Serialization
using AppliGeneralLedger, AppliInvoicing

io = connect("<ip target laptop>", 8000)

# start application
serialize(io, "START")

# send bankstatements
stms = AppliInvoicing.read_bank_statements("./bank.csv")
serialize(io, stms)
```

### 03/27/2020 - Extending Julia LOAD_PATH

II wanted to add a new feature to AppliInvoicing: reporting e.g., an aging report. It should live in a submodule of AppliInvoicing. First, I created a branch `dev`:

```
$ git branch dev

$ git checkout dev

$ atom .
```

Next, I created the file `Reporting.jl` and created a dummy module `Reporting`:

```
module Reporting

const PATH_DB = "./invoicing.sqlite"

using Dates

using AppliInvoicing

aging() = begin
    unpaid_invoices = AppliInvoicing.retrieve_unpaid_invoices(PATH_DB)
    list = []
    for invoice in unpaid_invoices
        date = invoice.meta.date
        println(date, " - ", Dates.today())
    end
end # aging

end # module
```

After that, I added the function `report()` to `api.jl` and modified the file `AppliInvoicing.jl`:

```
module AppliInvoicing

greet() = print("Hello World!")

export create, process, retrieve_unpaid_invoices, read_bank_statements, report

# first, link to the current model
include("./infrastructure/infrastructure.jl")

# next, submodule Reporting
include("Reporting.jl")
using .Reporting: aging

end # module
```

To test the module, I used `AppliMaster`. I didn't want all the time to upload `AppliInvoicing` to GitHub, so I extended the Julia `LOAD_PATH`. After removing the `AppliInvoicing` package, I added the next line to `test_local_channels.jl`:

```
# define the local path for AppliInvoicing
@everywhere push!(LOAD_PATH, "/home/rob/julia-projects/tc/AppliInvoicing")
```



### 03/25/2020 - Holy traits pattern implemented in dispatcher

The `Holy traits pattern` is described in the book Design Patterns and Best Practices with Julia. It can replace if-else constructs. Old situation [dispatcher logic](https://www.appligate.nl/BAWJ/chapter6/#The-dispatcher-1). With the new situation, we avoid troubles in the future when we use more Appli-packages. See current infrastructure, [6. Testing the application](https://www.appligate.nl/BAWJ/chapter6/). The Holy traits pattern makes it more clear:

```
# Holy traits pattern definition => can be moved to the domain layer
abstract type Dispatcher end
struct T0 <: Dispatcher end # AppliMaster
struct T1 <: Dispatcher end # AppliInvoicing
struct T2 <: Dispatcher end # AppliGeneralLedger
struct T3 <: Dispatcher end # AppliInvoicing

# the data types on rx-channel
Dispatcher(::Type{<: String}) = T0()
Dispatcher(::Type{<: Array{AppliSales.Order, 1}}) = T1()
Dispatcher(::Type{<: Array{AppliGeneralLedger.JournalEntry,1}}) = T2()
Dispatcher(::Type{<: Array{AppliInvoicing.BankStatement,1}}) = T3()
# end Trait definition

function dispatcher()
    rx = Channel(32)

    # instantiate tasks
    tx0 = task_0(rx) # get orders from Sales
    tx1 = task_1(rx) # process the orders
    tx2 = task_2(rx) # process the journal entries
    tx3 = task_3(rx) # process the unpaid invoices

    # implementate Holy traits pattern
    dispatch(x::T) where {T} = dispatch(Dispatcher(T), x)

    dispatch(::T0, x) = put!(tx0, x)
    dispatch(::T1, x) = put!(tx1, x)
    dispatch(::T2, x) = put!(tx2, x)
    dispatch(::T3, x) = put!(tx3, x)

    @async while true
        if isready(rx)
            value = take!(rx)
            @info("Dispatcher received $(typeof(value))")
            dispatch(value)
        else
            wait(rx)
        end
    end

    return rx
end # dispatcher

```

### 03/20/2020 - Design Patterns and Best Practices with Julia

Recently I bought the book [Design Patterns and Best Practices with Julia](https://www.amazon.com/Hands-Design-Patterns-Julia-comprehensive/dp/183864881X). I can recommend the book. After reading the chapter `Modules, Packages, and Data Type Concepts`, I decided to set up an abstract data tree, because it can give you a quick overview of your application. The branches are the abstract data types and the leaves the concrete data types. I chose `Domain` as an abstract root type.

Using the function `subtypetree(Domain),` I get an excellent overview of the data structure:

```
julia> subtypes(Invoice)
2-element Array{Any,1}:
 PaidInvoice  
 UnpaidInvoice

julia> subtypetree(Domain)
Domain
    Invoice
        PaidInvoice
        UnpaidInvoice
    Payment
        BankStatement
    Structure
        BodyItem
            OpentrainingItem
        Header
        MetaInvoice

julia> fieldnames(PaidInvoice)
(:id, :meta, :header, :body, :stm)

julia> fieldnames(UnpaidInvoice)
(:id, :meta, :header, :body)
```

See the [Invoicing module](https://www.appligate.nl/AppliInvoicing.jl/) documentation for more details.

### 03/12/2020 - Relative mark down links

Chapter 11 was not updated. I also got a message `Page build failure`.

The solution was to use relative links to switch between pages, e.g. `../chapter10/#.-Create-a-Dockerfile-in-the-folder-test_ssh-1`.

### 03/11/2020 - Pages.jl and HTTP.jl

I did some tests with Pages.jl and HHTP.jl, The result is promising. The solution is to send a file name over an Http connection and use `scp` to retrieve the file from the Raspberry Pi for further processing.

##### The test

Julia 1.3.1 running on my laptop in a Ubuntu docker container as server. The variable `result` will contain the file name:

```
julia> using Pages

julia> using JSON

julia> @async Pages.start()
Task (runnable) @0x00007fb2c0ee3340

julia> result = ""
""

julia> Endpoint("/test", POST) do request::HTTP.Request
           data = String(request.body)
           global result = data
           response = JSON.json(Dict(:data => data))
       end
Endpoint(Dict{Symbol,HTTP.Handlers.RequestHandlerFunction}(:POST => HTTP.Handlers.RequestHandlerFunction{var"#11#12"}(var"#11#12"())), "/test")
```

Julia 1.3.1 running on my Raspberry Pi in a Ubuntu docker container as client:

```
julia> using HTTP

julia> r = HTTP.request("POST", "http://xxx.xxx.xxx.xxxxxxx:8000/test", [], "12345.jpg")
HTTP.Messages.Response:
"""
HTTP/1.1 200 OK
Transfer-Encoding: chunked

{"data":"12345.jpg"}"""
```

### 03/10/2020 - SQLite problem Raspberry Pi

There is a problem with making a connection from a docker container on my Ubuntu laptop to a container on a Raspberry Pi 3+. I posted a question on  `discourse.`

See [Addprocs gives connection refused to a docker container on raspberry pi](https://discourse.julialang.org/t/addprocs-gives-connection-refused-to-a-docker-container-on-raspberry-pi/35640)

Now I consider using HTTP.jl (or Pages.jl) to inform the application to retrieve an image from my Raspi with scp.

### 03/04/2020 - Documentation AppliInvoicing module

I have completed the documentation for [ApplInvoicing.jl](https://www.appligate.nl/AppliInvoicing.jl/)

### 03/03/2020

Created documentation for the module [AppliGeneralLedger](https://www.appligate.nl/AppliGeneralLedger.jl/).

Master code runs successfully in a Docker container.

### 02/27/2020 - dispatcher is working

SQLite gave problems with AppliGeneralLedger. I suspected it had something to do with multi-user issues. So I decided to experiment with Jula's open/read/write file functions.  The result was very positive, so I changed the code in AppliGeneralLedger.

The test with remote channels went well. AppliMaster contains the code.

### 02/20/2020 - addproc(4)

In the past, I used Julia v1.1.0 and SQLite v0.8.x. I use a local channel with a dispatcher. It routes the data to the right task, which runs a Julia function remote. The application ran smoothly. The problem started when I switched to SQLite.jl v1.0.1. First, I thought that SQLite was causing the problem. However, the sample code uses only the AppliSales module, which doesn’t use SQLite.

I posted the problem on discourse.julialang.org: [Distributed computing, not found package error](https://discourse.julialang.org/t/distributed-computing-not-found-package-error/34851). @pfitzseb gave the solution:

Try

```
addprocs(n_procs; exeflags=`--project=$(Base.active_project())`)
```
instead – the currently active environment doesn’t propagate to processes started by addprocs by default.

Now the application runs smoothly again. Thank you, `@pfitzseb.

### 02/07/2020

Chapter 4, 5 en 6 are ready for a final check.

### 02/05/2020

While working on the AppliMaster module, I got yesterday the impression that I should always be working with the local package repository, `] active .`:

- Adding packages will update `Project.toml`, the file with the dependencies, and update the local Manifest.toml file. When you delete Manifest.toml, you have to add the packages again.

- When cloning a project works without adding the packages again.

So I removed AppliInvoicing, AppliGeneralLedger, and AppliSales from the general repository. This morning I started AppliMaster in Atom. My code in `test_remote_channels.jl` didn't work anymore. The two Databases invoicing.sqlite and `ledger.sqlite` were not created.

I added the packages AppliInvoicing, AppliGeneralLedger, and AppliSales again to the general repository, and my code was running well. The only explanation I could think of: remote code only looks at the general repository.

I need to review the documentation on this subject.

### 02/02/2020

The pages `test_remote_channels.jl` and `myfunctions.jl`, I have embellished with `@info`. The flow of the data has now become more explicit. The code is on github: [test\_remote\_channels.jl](https://github.com/rbontekoe/AppliMaster.jl/blob/master/src/test_remote_channels.jl).

Working with channels runs smoothly. I only run the functions that perform the operations on a different core. The `while true` loops for `task_1` and `task_2` tasks run locally. Should I also run these loops remotely?

So I had to renumber the subsequent chapters.

### 02/01/2020
Today I copied the blog from the AppliGate website to The course environment.

Things are going well with the course. The following modules are now ready(!):
- AppliMaster - the basic module.
- AppliInvoicing - the application itself.
- AppliSales - sending test orders to AppliInvoicing.
- AppliGeneralLedger - to process journal entries from AppliInvoicing.

In the last couple of weeks, I have been experimenting with the communication between the different parts. For the time being, I decided to work with Julia's channels. The implementation is in AppliMaster, [test_remote_channels.jl](https://github.com/rbontekoe/AppliMaster.jl/blob/master/src/test_remote_channels.jl).

## 2019

### 12/05/2019

Last week I managed to establish an SSH connection between two containers. This week I could finish [Chapter 9](https://www.appligate.nl/BAWJ/chapter9/), `Create the Container`, more or less. The next step is to test a channel connection between two containers.

### 11/15/2019

Almost ready to link www.appligate.nl to rbontekoe.github.io. We have to change the CNAME record at the provider from [appligate.appspot.com](http://appligate.appspot.com/) to [rbontekoe.github.io](https://rbontekoe.github.io/).

We also started with writing the course material for the online training [BAWJ](https://rbontekoe.github.io/BAWJ/).

### 10/21/2019

Why not build a website with Documenter.jl? We did it today. When you go to [AppliGate](https://rbontekoe.github.io), you enter our new site. In the meantime, we got more experience with Julia. E.g., we resized Rob's picture with Images.jl. It was straightforward.

````julia
julia> using Images

julia> img = load("rob.png")

julia> img2 = imresize(img, ratio=0.5)

julia> save("rob2.png", img2)
````

### 9/17/2019
Reading Think Julia I discovered the package Serialization. While playing with it, I realized that it could solve my CQRS and Event Sourcing problem. With the method serialize, you can create a text representation of an object, that you can store. With deserialize, you do the reverse. Serialize writes to an IOStream, and deserialize reads from it. An IOStream can be an IOBuffer or a file. It makes Event Sourcing easier.

I also looked at channels. You can use channels to communicate between processes. For the time being, I will use inter CPU-core communication. Later on, I extend it to remote nodes. I only have to expand the methods of createSubscriber and createPublisher.

### 9/10/2019
Last week I was busy implementing the database methods. I realized that the domain objects I wanted to keep must have an identification code. So Subscriber, Publisher, and Message got an id. To create the id, I used the hash function with a name and time as a parameter. It had consequences for the documentation. In the example code, I used the tag 'jldoctest,' so Documenter could test the example code during the generation of the manual. Because the ids keep changing, I had to give up. Too bad, because I found that a strong point of Documenter.jl. I replaced the test tag 'jldoctest' with the language tag 'julia.' Maybe there is something to do against continually changing values.

Infected by the CQRS thought, I decided to add changed domain objects to the database instead of modifying an existing record.
