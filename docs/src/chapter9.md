# 9. The Sub-Module Domain

!!! warning "UNDER DEVELOPMENT"

The module AppliAR follows the same structure as we have discussed in the Account module. We go deeper into the main differences.

### Contents

```@contents
Pages = ["chapter9.md"]
```

## PkgTemplate

How I created the module `AppliAR`.

```
julia> using PkgTemplates # Load the PkgTemplates package

julia> t = Template(; # The configuration used to generate the package
              user="rbontekoe",
              license="MIT",
              authors=["Rob Bontekoe"],
              julia_version=v"1.3",
              ssh=true,
              plugins=[
                  TravisCI(),       # Continious Integration
                  Codecov(),        # Improve your code review
                  Coveralls(),      # Which parts aren’t covered by your test suite
                  AppVeyor(),       # CI/CD service
                  GitHubPages(),    # Documentation
              ],
       )

julia> generate(t, "AppliAR") # Create the local package in ~/.julia/dev
```

## The Application Folder Structure

```
ᵥ📁AppliAR
   📁 docs #1
     📁 src
     📁 stable
       📁 assets #1
       📁 chapter1 #1
       📁 chapter2 #1
       📁 chapter3 #1
       📁 chapter4 #1
       📄 index.html #1
       📄 search_index.js #1
  ᵥ📁 src #2
    ᵥ📁 api
       📄 Api.jl
       📄 spec.jl #3
    ᵥ📁 domain
       📄 Domain.jl
       📄 spec.jl #3
    ᵥ📁 infrastructure
       📄 Infrastructure.jl
       📄 db.jl
       📄 doc.jl #3
     📄 AppliAR.jl #4
  ᵥ📁 test
     📄 runtests.jl #5
   📄 bank.csv	 
   📄 LICENCE
   📄 Project.toml  #6
   📄 README.md
```

\#1 Folders and files that make up the documentation of [AppliAR.jl](https://www.appligate.nl/AppliAR.jl/stable/).

\#2 The application files.

\#3 Julia help documentation.

\#4 Contains the AppliAR module code.

\#5 Unit test file.

\#6 Contains the dependencies. Julia adds dependencies automatically to the `Project.toml` file when you activate the local environment (`pkg> activate .`) and add a package (module). See [Manifest.toml](https://julialang.github.io/Pkg.jl/v1/toml-files/):
"The manifest file is an absolute record of the state of the packages in the environment. It includes exact information about (direct and indirect) dependencies of the project, and given a Project.toml + Manifest.toml pair it is possible to instantiate the exact same package environment, which is very useful for reproducibility."

## The Model

The sub-modules `Domain.jl`, `API.jl` and `Infrastructure.jl` shape the model and are located in the sub-folders. It makes it easier to split and group things.

The file Domain.jl is in the sub-folder domain. As well as the file spec.jl we use for:
1. Specifying the abstract object hierarchy.
2. Documenting the functions.

When Domain.jl is loaded, it also loads spec.jl.

## Specifying the Object Hierarchy

A data structure consists of abstract and concrete data types. The leaves are the concrete data types that we define in `Domain.jl`.

We have three branches, Invoice, Structure, and Payment.

The `Structure` branch determines the basic structure. It consists of a Header, a Body, and a Footer.

A `PaidInvoice` is an `UnpaidInvoice` plus payment details.


We can then refer to the data-type `Invoice` when we want for example:
- Get the invoice number.
- Get the order number.
- Saving and retrieving an invoice.

However, if we want to view the payment data, we must explicitly refer to `PaidInvoice`.

```
                 _____________________ARDomain_______________
                 ↓                       ↓                  ↓
            Invoice             ___Structure____         Payment
            ↓     ↓             ↓     ↓        ↓            ↓
 UnpaidInvoice  PaidInvoice   Meta  Header  BodyItem   BankStatement
                                               ↓
                                       OpentrainingItem

spec.jl, abstract types:
abstract type ARDomain end
abstract type Invoice <: ARDomain end
abstract type Structure <: ARDomain end
abstract type BodyItem <: Structure end
abstract type Payment <: ARDomain end
```

## Domain.jl

Let's have a look at the `UnpaidInvoice`.

```
struct UnpaidInvoice <: Invoice
    _id::String
    _meta::MetaInvoice
    _header::Header
    _body::OpentrainingItem
end # UnpaidInvoice
```


## Reading Object Fields

We have defined functions to read the fields of an object. E.g. `id(i::Invoice)` returns the id of an unpaid invoice as well as of a paid invoice.

The advantage of defining functions to read fields are:
- You can change the field name of an object without affecting your program.
- Change the data type of a field, but you let the function still returns the original datatype.
- More or less hiding the field names. However, when the user uses the function `fieldnames` he can discover the names.

```
julia> using AppliAR

julia> fieldnames(UnpaidInvoice)
(:_id, :_meta, :_header, :_body)
```

To make my programs robust I prefer to work with immutable data types. When I want to change the value of a field of an object then I have to recreate the object. So basically I only need to read the value from a field.

```
# Fields Invoice
meta(i::Invoice)::MetaInvoice = i._meta
header(i::Invoice)::Header = i._header
body(i::Invoice)::BodyItem = i._body
id(i::Invoice)::String = i._id

# Field of an PaidInvoice containing the bank statement
stm(i::PaidInvoice) = i._stm
```

You see that I refer to the abstract data type `Invoice` for retrieving the field values of `UnpaidInvoice` or `PaidInvoice`. Except, when I need the payment data I refer explicitly to `PaidInvoce`.

## 9.1 Case Study Part One: Redefining BodyItem as a Concrete Datatype

Our boss wants our module to be able to print invoices with more than one item, e.g. books and in-company training. He also believes that `Structure` must resemble a hard copy invoice and that any additional information should be retrieved from the metadata. Promoting `BodyItem` to a leave of the tree could cause problems if we have already stored invoices. It is easier to add another leave, `InvoiceItem`.

```
 ____Structure____
 ↓       ↓       ↓
Meta   Header   BodyItem
                 ↓    ↓
   OpentrainingItem  InvoiceItem
```

Example of the body of a hard copy invoice:

| Item| Qty| Description | Price | VAT | Total |
| :--- | ---: | :--- | ---: | ---: | ---: |
| LS | 2 | Learn Smiling | 1,000.00 | 0.21 | 2,420,00 |
|  |  | Date 2020/9/30 |  |  |  |
|  |  | Attendees: Mickey Mouse, Mini Mouse |  |  |  |
|  |  |  |  |  |  |
| BAWJ | 1 | Sylabus | 15,00 | 0.21 | 18.15 |
|  |  |  |  |  |  |
| Total |  |  |  |  |2,438,25 |

We have to add `InvoiceItem`.

```
struct InvoiceItem <: BodyItem
	_prod_code::String
 	_qty::Float64
 	_descr::Array{String, 1}
 	_unit_price::Float64
 	_vat_perc::Float64
 	# constructors
	InvoiceItem(code, qty, descr, unit_price) = new(code, qty, descr, unit_price, 0.21)
	InvoiceItem(code, qty, descr, unit_price, vat_perc) = new(code, qty, descr, unit_price, vat_perc)
end

code(b::InvoiceItem) = b._prod_code
descr(b::InvoiceItem) = b._descr
unit_price(b::InvoiceItem) = b._unit_price
qty(b::InvoiceItem) = b._qty
vat_perc(b::InvoiceItem) = b._vat_perc

# Example of creating an InvoiceItem

julia> using Pkg; Pkg.activate(".")

julia> using AppliSales

julia> using Dates

julia> import AppliAR: Domain

julia> using .Domain

julia> order = AppliSales.process()[2]
AppliSales.Order("11183030955785246264", AppliSales.Organization("12468650793473591401", "Duck City Chronicals", "1185 Seven Seas Dr", "FL 32830", "Lake Buena Vista", "USA"), AppliSales.Training("LS", DateTime("2019-08-30T00:00:00"), 2, "Learn Smiling", 1000.0), "DD-001", "Mickey Mouse", "mickey@duckcity.com", ["Mini Mouse", "Goofy"])

julia> students = "Attendees: " * reduce((x, y) -> x * ", " * y, order.students)
"Attendees: Mini Mouse, Goofy"

julia> description  = [order.training.name, "Date: " * string(Date(order.training.date)), students]
3-element Array{String,1}:
 "Learn Smiling"
 "Date: 2019-08-30"
 "Attendees: Mini Mouse, Goofy"

julia> body_invoice = InvoiceItem(
               order.training.name, # prod_code
               length(order.students), # qty
               description, # descr
               order.training.price, # unit_price
       )
InvoiceItem("Learn Smiling", 2.0, ["Learn Smiling", "Date: 2019-08-30", "Attendees: Mini Mouse, Goofy"], 1000.0, 0.21)
```
