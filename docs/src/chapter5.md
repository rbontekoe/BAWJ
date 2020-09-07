# 5. Create and Test Infrastructure.jl

The Infrastructure has functions that refer to the outer world and can use elements from the Domain and API layers. For example:
- converting JSON data to Julia objects or visa versa.
- storing Julia's objects.
- retrieving objects.
- Event Sourcing, registering events, and replaying a history of events.
- CQRS (Command Query Responsibility Segregation), separating events from queries.

In this chapter, you learn to store and retrieve data-types.

### Contents

```@contents
Pages = ["chapter5.md"]
```

## Infrastructure.jl

```julia
module Infrastructure #1

import ..Accounts: Domain, API #2

using .Domain, .API #3

using Serialization #4

export add_to_file, read_from_file #5

function add_to_file(file::String, data::Array{T, 1} where T <: Any) #6
    io = open(file, "a+")
    [serialize(io, r) for r in data]
    close(io)
end

function read_from_file(file::String) #7
    io = open(file, "r")

    r = []
    while !eof(io)
        push!(r, deserialize(io))
    end

    close(io)

    return r
end

end

```

\#1 The name of the module is Infrastructure.

\#2 The sub-module uses only the elements from the higher `onion` peels, Domain, API, Julia, and any loaded packages.

\#3 The code loads the sub-modules Domain and API.

\#4 You have to serialize data you want to store on disk.

\#5 We export the methods `read_from_file` and `add_to_file`.

\#6 Read the data from a text file and deserialize it.

\#7 Serialize the data and write it to a text file.


## Accounts.jl

The main module should also load the Infrastructure sub-module.

```julia
module Accounts

#export EMAIL, WORK # Domain
#export create # API
#export add_to_file, read_from_file # Infrastructure

include("Domain.jl"); using .Domain
include("API.jl"); using .API
include("Infrastructure.jl"); using .Infrastructure

end
```

## test_infr.jl

An example of how to use the code.

```julia
using Pkg; Pkg.activate(".") # activate the Accounts environment from Julia

import Accounts: Domain, API, Infrastructure

using .Domain, .API, .Infrastructure

const FILE_ACCOUNTS = "./test_accounts.txt" # Julia gives a warning when the value is changed

donald_email = create(EMAIL, "donald@duckcity.com")
donald_work = create(WORK,
  """
  Donalds Hardware Store
  attn. Donald Duck
  1190 Seven Seas Dr
  FL 32830 Lake Buena Vista
  USA
  """
)

addresses = [donald_email, donald_work]

donald = create("Donald Duck", addresses)

add_to_file(FILE_ACCOUNTS, [donald])

result = read_from_file(FILE_ACCOUNTS)

println(result)
```

## runtests.jl

The tests are extended for the sub-module Infrastructure

```julia
using Accounts
using Test

const FILE_ACCOUNTS = "./test_accounts.txt"

import Accounts: Domain, API, Infrastructure
using .Domain, .API, .Infrastructure

@testset "Domain.jl" begin
    donald_email = Address(EMAIL, "donald@duckcity.com")
    donald = Person("Donald duck", [donald_email])
    email_addresses = filter(x -> x.address_type == EMAIL, donald.addresses)
    @test email_addresses[1].address == "donald@duckcity.com"
end

@testset "API.jl" begin
    donald_email = Address(EMAIL, "donald@duckcity.com")
    donald = Person("Donald Duck", [donald_email])
    email_addresses = filter(x -> x.address_type == EMAIL, donald.addresses)
    @test email_addresses[1].address == "donald@duckcity.com"
end

@testset "Infrastructure.jl" begin
    donald_email = create(EMAIL, "donald@duckcity.com")
    donald = create("Donald Duck", [donald_email])
    add_to_file(FILE_ACCOUNTS, [donald])
    result = read_from_file(FILE_ACCOUNTS)
    first_person = result[1]
    @test first_person.addresses[1].address == "donald@duckcity.com"
    cmd = `rm $FILE_ACCOUNTS`
    run(cmd)
end

```

## Exercise 5.1 - Adding the Sub-Module Infrastructure.

In this exercise, you perform the following tasks.

Step 1 - You create the file `Infrastructure.jl` with the Infrastructure sub-module code and update `Accounts.jl`. Add `Serialization` as a  dependency of the module in `Project.toml`.

Step 2 - You append the unit test code to the file `runtests.jl` and verify it.

Step 3 - You see an example of the code on how to use it as a programmer.

Step 4 - You update your GitHub repository.

---

- Create the file `Infrastructure.jl` and add the code of section [Infrastructure.jl](#Infrastructure.jl-1) to the file.
- Modify  `Accounts.jl` according to section [Accounts.jl](#Accounts.jl-1).
- Add the `Serialization` package as dependency to `Project.toml`.
- Add the code from section [runtests.jl](#runtests.jl-1) to the file runtests.jl.
- Go to the package manager, activate Accounts (`activate .`).
- Run the test (`test Accounts`). You should see:

```julia
Test Summary: | Pass  Total
Domain.jl     |    1      1
Test Summary: | Pass  Total
API.jl        |    1      1
Test Summary:     | Pass  Total
Infrastructure.jl |    1      1
    Testing Accounts tests passed
```

- Create the file `test_infr.jl` and copy the code from section [test_infr.jl](l#test_infr.jl-1) into it.
- Test the code.
- Push the changes to your GitHub repository. Check the changes on GitHub.
