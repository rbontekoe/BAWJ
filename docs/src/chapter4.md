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

import ..Accounts: Domain #2

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

julia> donald = create("Donald Duck", [address_email])
`````
"""
function create end #6

create(address_type::AddressType, address::String)::Address = Address(address_type, address) #7

create(name::String, addresses::Array{Address,1})::Person = Person(name, addresses) #8

create(name::String)::Person = Person(name) #9

end
```
\#1 The module name is `API`.

\#2 The `API` sub-module uses only the elements that are defined in the sub-module Domain, Julia, and any loaded packages. `..Accounts` refers to the super-domain of `API`. `import ..Accounts: Domain` give us a reference to the sub-module `Domain`.

\#3 The code instantiates the sub-module Domain (`using .Domain`). The dot tells Julia that Domain is a sub-module. Julia loads the elements Person, Address, AddressType, EMAIL, and WORK into the scope of the module because we specify `using`. If we would use `import` instead of `using`, we also have to mention the module name (e.g. Domain.EMAIL). Now, we can call them without mentioning the name of the sub-module.

\#4 We export the method `create`. It means that other modules and programs can use it directly. Functions without the keyword `function` are called methods.

\#5 We document the different uses (called `multiple dispatch`) of the method `create.` Users can use the question mark (`? create`) to display the text and the example. The whole example code, including the `julia>`-prompts, can be copied to the clipboard and pasted back into the REPL.

\#6 The function `create`.

\#7 The method `create` when we want to create an `Address`.

\#8 The method `create` when we want to create a `Person` with a known `Address`.

\#8 Creates a Person with an empty Address array. Although the object Person is not mutable, we can still add elements to the array. For example `push!(donald.addresses, <Address object>`).

## Accounts.jl
```
module Accounts

#export EMAIL, WORK # Domain
#export create # API

include("Domain.jl"); using .Domain
include("API.jl"); using .API

end
```

## test_api.jl

```
using Pkg; Pkg.activate(".")

import Accounts: Domain, API

using .Domain, .API

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

println(donald)
```

## runtests.jl

```
using Accounts
using Test

import Accounts: Domain, API
using .Domain, .API

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
```

## Exercise 4.1 - Adding the sub-module API.

#### Prerequisites
- Previous activities.

In this exercise you create the sub-module API. You can apply everything you've learned so far.

- Create the file `API.jl` and add the code of section [API.jl](#API.jl-1) to the file. Change the five back-tics into three back-tics. Remove the comments.
- Copy the code of section [runtests.jl](#runtests.jl-1) to the file runtests.jl.
- Modify  `Accounts.jl` according to section [Accounts.jl](#Accounts.jl-1).
- Create the file `test_api.jl` and paste the code of section `test_api.jl` into it. Test the code.
- Go to the package manager, activate the Accounts module (`]activate .`) and run the tests (`test Accounts`). You should see:

```
Test Summary: | Pass  Total
Domain.jl     |    1      1
Test Summary: | Pass  Total
API.jl        |    1      1
    Testing Accounts tests passed
```

- Return to the julia-prompt and type: `? create`. The help text of the function `create` is displayed.

```
help?> create
search: create searchsortedlast

  create(address_type::AddressType, address::String)::Address
  create(name::String, addresses::Array{Address,1})::Person
  create(name::String)::Person

  Create an Address or a Person object.

  Example
  ≡≡≡≡≡≡≡≡≡

  julia> address_email = create(EMAIL, "donald@duckcity.com")

  julia> donald = create("Donald Duck", [address_email])
```
