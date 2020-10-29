# 4. Create and Test API.jl

In the API, you define the functions that one can use to write a software program using your module `Accounts`. The API uses only the elements from the inner shells, so Domain and the core consisting of Julia and the modules or packages. You will define a function `create` that one can use to create:
- an address.
- a person.

Julia's functions are dispatchable. Julia searches for the right method based on the number of arguments and their data-types. Functions that you can invoke with different parameters are called methods.

### Contents

```@contents
Pages = ["chapter4.md"]
```

## API.jl

````julia
module API #1

import ..Accounts: Domain #2

using .Domain #3

export create #4

"""
    create(address_type::AddressType, address::String)::Address
    create(name::String, addresses::Array{Address,1})::Person
    create(name::String)::Person

Create an Address or a Person object.

# Example
```julia
julia> using Accounts

julia> address_email = create(EMAIL, "donald@duckcity.com");

julia> donald = create("Donald Duck", [address_email]);

julia> donald.id
"14456927583164318539"

julia> donald.created
2020-09-28T10:56:29.997

julia> donald.name
"Donald Duck"

julia> donald.addresses
1-element Array{Accounts.Domain.Address,1}:
 Accounts.Domain.Address("7763679977726623090", Dates.DateTime("2020-09-28T10:56:29.461"), EMAIL, "donald@duckcity.com")
```
"""
function create end #5

create(address_type::AddressType, address::String)::Address = Address(address_type, address) #6

create(name::String, addresses::Array{Address,1})::Person = Person(name, addresses) #7

create(name::String)::Person = Person(name) #8

end
````
\#1 The module name is `API`.

\#2 The `API` sub-module uses only the functions and types that are defined in the sub-module Domain, Julia, and any loaded packages. `..Accounts` refers to the main-module of `API`. `import ..Accounts: Domain` give us a reference to the sub-module `Domain`, we can load in the next statement.

\#3 The code loads the sub-module Domain (`using .Domain`). The dot tells Julia that Domain is a sub-module. Julia loads all exported elements of Domain (Person, Address, AddressType, EMAIL, and WORK) into the scope of users code because we specify `using`. If we would use `import` instead of `using`, we also have to mention the module name (e.g. `Domain.EMAIL`).

Now, we can call them without mentioning the name of the sub-module. Julia warns if conflicts arise. In that case you use the naming as in `import`.

\#4 We export the `create` methods. It means that other modules and programs can use them directly unless it conflicts with similar names.

\#5 Here, we document the different use cases (methods) of the function `create`. One calls it `multiple dispatch` and it can be compared to `overloading` in Object-Oriented programming languages.

The methods must be indented and their signatures must be different. A signature is determined by the number of arguments and their data-types.

When users type a question mark followed by the function-name (`? create`) then Julia displays the text and the example. Run the example code by pasting it into the REPL, including the `julia>`-prompts.

\#6 The method `create` when we want to create an `Address`. `(address_type::AddressType, address::String)` is its signature.  `Address(address_type, address)` is the constructor of the data-type Address that we have defined in Domain.jl.

\#7 The method `create` when we want to create a `Person` with one or more addresses. `addresses::Array{Address,1}` specifies that the argument must be a one-dimensional array with `Address` objects.

\#8 This line creates a Person with an empty Address array. Although the object Person is not mutable, we can still add elements to the array. For example `push!(donald.addresses, <Address object>`).

## Accounts.jl

The main module `Accounts`.

```julia
module Accounts

#export EMAIL, WORK # Domain
#export create # API

include("Domain.jl"); using .Domain # load the module Domain
include("API.jl"); using .API # load the module API

end
```

## test_api.jl

```julia
using Pkg; Pkg.activate(".") # make the current folder the working environment

import Accounts: Domain, API # import the sub-modules Domain and API

using .Domain, .API # load the sub-modules Domain and API

donald_email = create(EMAIL, "donald@duckcity.com") # create an address object

donald_work = create(WORK, # create another addresses object
  """
  Donalds Hardware Store
  attn. Donald Duck
  1190 Seven Seas Dr
  FL 32830 Lake Buena Vista
  USA
  """
)

addresses = [donald_email, donald_work] # create an array with addresses

donald = create("Donald Duck", addresses) # create a person

println(donald) # print the data of the person to the console.
```

## runtests.jl

```julia
using Accounts # load the module Accounts
using Test # Test provides the macros @testset and @test

import Accounts: Domain, API
using .Domain, .API

@testset "Domain.jl" begin
    donald_email = Address(EMAIL, "donald@duckcity.com")
    donald = Person("Donald duck", [donald_email])
    email_addresses = filter(x -> x.address_type == EMAIL, donald.addresses) #1
    @test email_addresses[1].address == "donald@duckcity.com"
end

@testset "API.jl" begin
    donald_email = Address(EMAIL, "donald@duckcity.com")
    donald = Person("Donald Duck", [donald_email])
    email_addresses = filter(x -> x.address_type == EMAIL, donald.addresses) #1
    @test email_addresses[1].address == "donald@duckcity.com"
end
```
\#1 The function `filter` operates on a collection (`Array`) of `Address`'s and returns an new filtered collection. The first argument `x -> x.address_type == EMAIL` represents an anonymous function. `x` is a consecutive value from the `Array`. If the test `x.address_type == EMAIL` yields a `true` the function adds the `Address` to the new collection.

Similar high order functions are `map`, `reduce`, and `zip`.

## Exercise 4.1: Adding the Sub-module API.

#### Prerequisites
- Previous activities.

In this exercise you create the sub-module API. You can apply everything you've learned so far.

- Create the file `API.jl` and add the code of section [API.jl](#API.jl-1) to the file. Change the five back-tics into three back-tics. Remove the comments.
- Copy the code of section [runtests.jl](#runtests.jl-1) to the file runtests.jl.
- Modify  `Accounts.jl` according to section [Accounts.jl](#Accounts.jl-1).
- Create the file `test_api.jl` and paste the code of section [test_api.jl](#test_api.jl-1) into it. Test the code.
- Go to the package manager, activate the Accounts module (`]activate .`) and run the tests (`test Accounts`). You should see:

```julia
Test Summary: | Pass  Total
Domain.jl     |    1      1
Test Summary: | Pass  Total
API.jl        |    1      1
    Testing Accounts tests passed
```

- Return to the julia-prompt and type: `? create`. The help text of the function `create` is displayed.

```julia
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

- Push the changes to your GitHub repository. Check the changes on GitHub.
- Go to the Accounts folder `cd ~/.julia/dev/Accounts` and and type `git log --oneline`. You sloud see:

```julia
~/.julia/dev/Accounts$ git log --oneline
3b1af29 (HEAD -> master) Add API.jl sub-module
c76901f (origin/master) Add Domain.jl sub-module
0cf05da Files generated by PkgTemplates
82338c3 Initial commit
```

## Summary

Julia supports multiple dispatching, one function that has different signatures.

You can document functions by describing it between triple quotes directly above itself. Use four spaces to indent methods.

It is also customary to give cases of the use of the methods between triple backslashes. If you write it in the form of Julia REPL prompts `julia>`, then the user can copy the code entirety and paste it into the Julia REPL.

The function `filter` allows you to filter elements of an array. Because it has an (anonymous) function as an argument, one calls it a `higher-order function`. Other high order functions are `map` and `reduce`.
