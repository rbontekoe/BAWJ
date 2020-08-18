# 5. Create and test Infrastructure.jl

The Infrastructure has functions that refer to the outer world. For example:
- JSON data that has to converted to Julia objects or visa versa,
- Julia objects that have to be stored,
- Stored objects that have to be converted to Julia objects,
- Event Sourcing, registering events and replay a history of events.
- CQRS (Command Query Responsibility Segregation) separating events from queries.



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

\#1 The module name is Infrastructure.

\#2 The sub-module uses only the elements that are defined in the sub-module Domain, API, Julia, and any loaded packages.

\#3 The code instantiate the sub-modules Domain and API.

\#4 Data stored on disk has to be serialized.

\#5 We export the methods `read_from_file` and `add_to_file`.

\#6 `read_from_file`

\#7 `add_to_file`


## Accounts.jl

```
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
```
using Pkg; Pkg.activate(".")

import Accounts: Domain, API, Infrastructure

using .Domain, .API, .Infrastructure

const FILE_ACCOUNTS = "./test_accounts.txt"

rob_address_email = create(EMAIL, "rbontekoe@appligate.nl")
rob_address_work = create(WORK,
  """
  Landweg 74
  3833VM LEUSDEN
  The Netherlands
  """
)

addresses = [rob_address_email, rob_address_work]

rob = create("Rob Bontekoe", addresses)

add_to_file(FILE_ACCOUNTS, [rob])

result = read_from_file(FILE_ACCOUNTS)

println(result)
```

## runtests.jl
```
using Accounts
using Test

const FILE_ACCOUNTS = "./test_accounts.txt"

import Accounts: Domain, API, Infrastructure
using .Domain, .API, .Infrastructure

@testset "Domain.jl" begin
    rob_address_email = Address(EMAIL, "rbontekoe@appligate.nl")
    rob = Person("Rob Bontekoe", [rob_address_email])
    email_addresses = filter(x -> x.address_type == EMAIL, rob.addresses)
    @test email_addresses[1].address == "rbontekoe@appligate.nl"
end

@testset "API.jl" begin
    rob_address_email = create(EMAIL, "rbontekoe@appligate.nl")
    rob = create("Rob Bontekoe", [rob_address_email])
    email_addresses = filter(x -> x.address_type == EMAIL, rob.addresses)
    @test email_addresses[1].address == "rbontekoe@appligate.nl"
end

@testset "Infrastructure.jl" begin
    dd_address_email = create(EMAIL, "donald@duckcity.com")
    donald = create("Donald Duck", [dd_address_email])
    add_to_file(FILE_ACCOUNTS, [donald])
    result = read_from_file(FILE_ACCOUNTS)
    first_person = result[1]
    @test first_person.addresses[1].address == "donald@duckcity.com"
    cmd = `rm $FILE_ACCOUNTS`
    run(cmd)
end

```

## Exercise 5.1 - Adding the sub-module Infrastructure.

1. Create the file `Infrastructure.jl` and add the code of section [Infrastructure.jl](#Infrastructure.jl-1) to the file.
2. Add the code of section [runtests.jl](#runtests.jl-1) to the file runtests.jl.
3. Modify  `Accounts.jl` according to section [Accounts.jl](#Accounts.jl-1).
4. Go to the package manager, activate Accounts (`activate .`) and run the test (`test Accounts`). You should see:

```
Test Summary: | Pass  Total
Domain.jl     |    1      1
Test Summary: | Pass  Total
API.jl        |    1      1
Test Summary:     | Pass  Total
Infrastructure.jl |    1      1
    Testing Accounts tests passed
```
