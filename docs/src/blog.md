# Blog

## 2020

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
