# 5. Creating modules

UNDER DEVELOPMENT!

### What you will learn

```@contents
Pages = ["chapter5.md"]
```

With modules we can build applications. A [module](https://docs.julialang.org/en/v1/manual/modules/index.html) is a demarcated unit, with its own namespace. You create a module with the package manages command `generate`, as we did during step 5 in the activity of the [previous chapter](https://www.appligate.nl/BAWJ/chapter4/#Create-the-base-folder-AppliInvoicing-1).

The command created tho next:
- Project.toml
- src/AppliInvoicing.jl


## AppliInvoicing.jl

```
module AppliInvoicing #1

greet() = print("Hello World!") #2

export create, process, retrieve_unpaid_invoices, read_bank_statements \#3

include("./infrastructure/infrastructure.jl") #4

end # module

```
\#1 The module block with its name.

\#2 Initial the only statements, can be removed.

\#3 The functions that other programs can use.

\#4 The path to our model.

## Exports

Exports are the interface to the module. Here you mention the function from the API and infrastructure layers. I don't export elements from the domain; one can use the import statement when a reference is necessary.

## Dependencies

The file Project.toml contains the base information of the module and the dependencies.

```
name = "AppliInvoicing"
uuid = "3941c6da-33b5-11ea-2884-afa98fed5e3b"
authors = ["Rob Bontekoe <rbontekoe@appligate.nl>"]
version = "0.2.0"

[deps]
AppliGeneralLedger = "153ef306-36d1-11ea-1f0d-e3f38f84e10d"
AppliSales = "a1ddd20a-2e39-11ea-38f9-6b919ef027c3"
CSV = "336ed68f-0bac-5ca0-87d4-7b16caf5d00b"
DataFrames = "a93c6f00-e57d-5684-b7b6-d8193f3e46c0"
Dates = "ade2ca70-3891-5945-98fb-dc099432e06a"
Logging = "56ddb016-857b-54e1-b83d-db4d58db5568"
SQLite = "0aa819cd-b072-5ff4-a722-6bc24af294d9"
Test = "8dfed614-e22c-5e08-85e1-65c5234f0b40"
```

Initial is the section [deps] empty. Dependencies are automatically if you [activate](https://www.simonwenkel.com/2018/10/06/a-brief-introduction-to-package-management-with-julia.html) the
project mode with: `] activate ./` and add a package.

Use `update` in this mode to receive the latest package versions.

Use `remove` to delete a package from the list.

Use `gc` to remove unnecessary stuff.

## GitHub

In [chapter 4](https://www.appligate.nl/BAWJ/chapter4/#Create-a-repository-on-GitHub-1) you learned how to create a Julia package at GitHub.

## Download a package

To add a package that is not registered at Julialang, you use command `add` followed by the (git) package name , e.g. `add https://github.com/rbontekoe/AppliGeneralLedger.jl`.
