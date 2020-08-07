# 5. Create and test Infrastructure.jl

UNDER DEVELOPMENT!

### What you will learn

```@contents
Pages = ["chapter1d.md"]
```

## Infrastructure.jl

```
module Infrastructure

    import ..Accounts: Domain, API

    using .Domain, .API

    using Serialization

    export add_to_file, read_from_file

function read_from_file(file::String)
    io = open(file, "r")

    r = []
    while !eof(io)
        push!(r, deserialize(io))
    end

    close(io)

    return r
end

function add_to_file(file::String, data::Array{T, 1} where T <: Any)
    io = open(file, "a+")

    [serialize(io, r) for r in data]

    close(io)
end

end

```

## Accounts.jl

```
module Accounts

export EMAIL, WORK # Domain
export create # API
export add_to_file, read_from_file # Infrastructure

include("Domain.jl"); using .Domain
include("API.jl"); using .API
include("Infrastructure.jl"); using .Infrastructure

end
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
