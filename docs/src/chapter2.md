# Overview Julia

```@contents
Pages = ["chapter2.md"]
```

There are many excellent courses on [Julia](https://julialang.org/learning/). We suppose that the reader has some basic knowledge of Julia, as in [Think Julia](https://benlauwens.github.io/ThinkJulia.jl/latest/book.html). We recapitulate the most important differences with other languages.

## Concatenation

In Julia is the asterisk (\*) used as a concatenation symbol instead of the plus-sign (+) in other languages.

```@docstr
julia> a = "Hello "
"Hello"

julia> b = "World!"
"World!"

julia> c = a * b
"Hello World!"
```
[Top](#Overview-Julia-1)

## Iteration

[See Think Julia, 7. Iteration](https://benlauwens.github.io/ThinkJulia.jl/latest/book.html#chap07)

Some examples.
```@docstr
julia> range = 0:0.1:0.5π # values from 0 to 0.5π radians (90°), with a step value of 0.1 radian
0.0:0.1:1.5

julia> y = [sin(x) for x in range] # calculate sin for the values in the variable range
16-element Array{Float64,1}:
 0.0                
 0.09983341664682815
 0.19866933079506122
 0.2955202066613396
 0.3894183423086505
 0.479425538604203  
 0.5646424733950355
 0.6442176872376911
 0.7173560908995228
 0.7833269096274834
 0.8414709848078965
 0.8912073600614354
 0.9320390859672264
 0.963558185417193  
 0.9854497299884603
 0.9974949866040544

julia> using Plots

julia> plot(x -> sin(x) , 0:0.1:2π) # passing a value to sin(x)

julia> plot(sin, 0:0.1:2π) # works also

```

[Top](#Overview-Julia-1)

## Help

```@docstr

julia> ?
help?> sin
search: sin sinh sind sinc sinpi sincos asin using isinf asinh asind isinteger

  sin(x)

  Compute sine of x, where x is in radians.

  ────────────────────────────────────────────────────────────────────────────

  sin(A::AbstractMatrix)

  Compute the matrix sine of a square matrix A.

  If A is symmetric or Hermitian, its eigendecomposition (eigen) is used to
  compute the sine. Otherwise, the sine is determined by calling exp.

  Examples
  ≡≡≡≡≡≡≡≡≡≡

  julia> sin(fill(1.0, (2,2)))
  2×2 Array{Float64,2}:
   0.454649  0.454649
   0.454649  0.454649
```

[Top](#Overview-Julia-1)

## User defined functions

```@docstr
julia> function f(x, ϕ, b)
         sin(x + ϕ) + b
       end
f (generic function with 1 method)

julia> 0.3f(0.5π, 0.1π, 1)
0.5853169548885461

```

### Multiple dispatch

In object oriented languages like Java we can overload a method. Julia, however, is a functional language. Here we can use the same function name as long as the signatures are different.

```@docstr
julia> f(x) = sin(x) # function with one argument
f (generic function with 1 methods)

julia> f(x, ψ) = sin(x - ψ)  # function with two arguments
f (generic function with 2 methods)

julia> f(x, ψ, b) = sin(x - ψ) + b   # function with three arguments
f (generic function with 3 methods)

julia> f(x::Int64) = sin(x/180 * π) # function in degrees, argument has to be an integer
f (generic function with 4 methods)

julia> methods(f) # show all methods of the function f
# 4 methods for generic function "f":
[1] f(x::Int64) in Main at REPL[10]:1
[2] f(x) in Main at REPL[2]:1
[3] f(x, ψ) in Main at REPL[3]:1
[4] f(x, ψ, b) in Main at REPL[4]:1

julia> f(0.5π) # 90 degrees in radians
1.0

julia> f(0.5π, 0.1π) # with 0.1π phase shift in radians
0.9510565162951536

julia> f(0.5π, 0.1π, 1)
1.9510565162951536

julia> f(90) # 90 degrees as integer
1.0

julia> f(90.0) # should be 0.5π
0.8939966636005579

```

[Top](#Overview-Julia-1)

## User defined data structures

Julia is not a object oriented programming language. But you can define data structures with constructors, and use the dot notation to refer to its data elements.

```@docstr

julia> struct Subscriber
           id::String
           name::String
           email::String
           #constructors
           Subscriber(name::String) = new( createKey(name), name, "" )
           Subscriber(name::String, email::String) = new( createKey(name), name, email )
       end # defined Subscriber object

julia> createKey(name::String) = string(hash(name * string(time())))
createKey (generic function with 1 method)

julia> daisy = Subscriber("Daisy")
Subscriber("6761641919537447636", "Daisy", "")

julia> daisy.name
"Daisy"
```

## Plotting data

[See Plots](https://docs.juliaplots.org/latest/examples/gr/)

### Installing the Plots package

```julia
julia> ]

(v1.1) pkg> add Plots <Enter>

(v1.1) pkg> Ctrl-C

julia>
```
### Using Plots

```@docstr

julia> using Plots; gr()

julia> plot(x -> sin(x/180 * π), 0:01:360, xlabel="Degrees", title="Plot sin", label="No phase shift")

julia> ψ = 30 # degrees
30

julia> plot!( x -> sin( (x - ψ)/180 * π ), 0:01:360, label="$(ψ)° phase shift")

```

[Top](#Overview-Julia-1)

## Docker

[Top](#Overview-Julia-1)

## Summary

[Top](#Overview-Julia-1)
