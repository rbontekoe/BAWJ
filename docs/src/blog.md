# Blog

## 2020

### 03/20/2020 - Design Patterns and best Practices with Julia

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
