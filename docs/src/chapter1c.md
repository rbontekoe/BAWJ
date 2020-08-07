# 4. Create and test API.jl

UNDER DEVELOPMENT!

### What you will learn

```@contents
Pages = ["chapter1c.md"]
```

## API.jl

```julia
module API

import ..Accounts: Domain, API

using .Domain, .API

export create

"""
    create(address_type::AddressType, address::String)::Address
    create(name::String, addresses::Array{Address,1})::Person
    create(name::String)::Person

Create an Address or a Person object.

# Example
`````
julia> address_email = create(EMAIL, "donald@duckcity.com")

julia> donald = create("Donal Duck", [address_email])
`````
"""
function create end

create(address_type::AddressType, address::String)::Address = Address(address_type, address)

create(name::String, addresses::Array{Address,1})::Person = Person(name, addresses)

create(name::String)::Person = Person(name)

end
```

## Accounts.jl
```
module Accounts

export EMAIL, WORK # Domain
export create # API

include("Domain.jl"); using .Domain
include("API.jl"); using .API

end
```

## runtests.jl

```
using Accounts
using Test

import Accounts: Domain, API
using .Domain, .API

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
```
