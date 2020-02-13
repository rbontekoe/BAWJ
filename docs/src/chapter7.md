# 7. Writing test software

Under development!

### What you will learn

```@contents
Pages = ["chapter7.md"]
```

## Folder structure AppliInvoicing module

Tests should be placed in the file `runtests.jl` in the folder `test.`

```
ᵥ📁AppliInvoicing
   📁 .git
   📁 src
  ᵥ📁 test
     📄 runtests.jl
```

## Using @testset and @test

An example from AppliInvoicing:

```Julia
using Test

@testset "Orders" begin
    using AppliSales
    orders = AppliSales.process()
    @test length(orders) == 3
    @test orders[1].org.name == "Scrooge Investment Bank"
    @test orders[1].training.name == "Learn Smiling"
end
```

## runtests.jl

When you put your tests in the file `runtests.jl` you can also run the tests of a module elsewhere, e.g. AppliMaster. Make sure you added the package (module) and are in the Package manager mode.

The Package manager command help (?):

```julia
julia> using Test

julia> ]

(v1.3) pkg> ?test
  test [--coverage] pkg[=uuid] ...

  Run the tests for package pkg. This is done by running the file **test/runtests.jl** in the package directory. The option --coverage
  can be used to run the tests with coverage enabled. The startup.jl file is disabled during testing unless julia is started with
  --startup-file=yes.
```

Example of running runtests.jl of AppliInvoicing.

```julia
(v1.3) pkg> test AppliInvoicing
  Testing AppliInvoicing

Test Summary: | Pass  Total
Orders        |    3      3
Test Summary:  | Pass  Total
UnpaidInvoices |    7      7
Test Summary:           | Pass  Total
Retrieve UnpaidInvoices |    7      7
Test Summary:                   | Pass  Total
Retrieve BankStatement from CSV |    2      2
Test Summary: | Pass  Total
JounalEntry's |    3      3
Test Summary:       | Pass  Total
process(db, orders) |    6      6
Test Summary:                | Pass  Total
retrieve_unpaid_invoices(db) |    2      2
Test Summary:               | Pass  Total
process(db, unpaid_invoices |    4      4
   Testing AppliInvoicing tests passed
```

See the all tests: [AppliInvoicing.jl/test/runtests.jl](https://github.com/rbontekoe/AppliInvoicing.jl/blob/master/test/runtests.jl)
