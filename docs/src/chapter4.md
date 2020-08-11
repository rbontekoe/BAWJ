# 4. Create and test API.jl

In this chapter, you define the functions that one can use to make-up a program.

In this case it is the function `create` that we use to create as well as addresses or persons. Julia functions are dispatch-able,which means that the function is matched based on the number of arguments and their type.

### Contents

```@contents
Pages = ["chapter4.md"]
```

## API.jl

```julia
module API #1

import ..Accounts: Domain, API #2

using .Domain #3

export create #4

""" #5
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
function create end #6

create(address_type::AddressType, address::String)::Address = Address(address_type, address) #7

create(name::String, addresses::Array{Address,1})::Person = Person(name, addresses) #8

create(name::String)::Person = Person(name) #9

end
```
\#1 The module name is API.

\#2 The API sub-module uses only the elements that are defined in the sub-module Domain, Julia, and any loaded packages.

\#3 The code instantiates the sub-module Domain (`using .Domain`). The dot tells Julia that Domain is a sub-module. Julia loads the elements Person, Address, AddressType, EMAIL, and WORK into the scope of the module because we specify `using`. If we would use `import` instead of `using`, we also have to mention the module name (e.g. Domain.Person). Now, we can call them without mentioning the sub-module name.

\#4 We export the method `create`. It means that other modules and programs can use it directly. Functions wit.hout the keyword `function` are called methods.

\#5 We describe the usage of the different uses of `create.` Users can use the question mark (`? create`) to display the text.

\#6 The function we want to inform the user about.

\#8 Create a Person with an Address.

\#9 Create a Person with an empty Address array. Although the object Person is not mutable, we can still add elements to an array. For example `push!(donald.addresses, <Address object>`).

## Accounts.jl
```
module Accounts

#export EMAIL, WORK # Domain
#export create # API

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
    dd_address_email = Address(EMAIL, "donald@duckcity.com")
    donald = Person("Donald Duck", [dd_address_email])
    email_addresses = filter(x -> x.address_type == EMAIL, Donald.addresses)
    @test email_addresses[1].address == "donald@duckcity.com"
end

@testset "API.jl" begin
    dd_address_email = Address(EMAIL, "donald@duckcity.com")
    donald = Person("Donald Duck", [dd_address_email])
    email_addresses = filter(x -> x.address_type == EMAIL, donald.addresses)
    @test email_addresses[1].address == "donald@duckcity.com"
end
```

## Exercise 4.1 - Adding the sub-module API.

1. Create the file `API.jl` and add the code of section [API.jl](#API.jl-1) to the file.
2. Add the code of section [runtests.jl](#runtests.jl-1) to the file runtests.jl.
3. Modify  `Accounts.jl` according to section [Accounts.jl](#Accounts.jl-1).
4. Go to the package manager, activate Accounts (`activate .`) and run the test (`test Accounts`). You should see:

```
Test Summary: | Pass  Total
Domain.jl     |    1      1
Test Summary: | Pass  Total
API.jl        |    1      1
    Testing Accounts tests passed
```
