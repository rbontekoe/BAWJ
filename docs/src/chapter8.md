# 8. The Domain Sub-module

UNDER DEVELOPMENT!

The module AppliAR follows the same structure as we have discussed in the Account module. We go deeper into the main differences.

### Contents

```@contents
Pages = ["chapter8.md"]
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
     📄 AppliAR.jl
     📄 Report.jl
  ᵥ📁 test
     📄 runtests.jl #4
   📄 bank.csv	 
   📄 LICENCE
   📄 Project.toml  #5
   📄 README.md
```

\#1 Folders and files that make up the documentation of [AppliAR.jl](https://www.appligate.nl/AppliAR.jl/stable/).

\#2 The application files.

\#3 Julia help documentation.

\#4 Unit test file.

\#5 Contains the dependencies. Julia adds dependencies automatically to the `Project.toml` file when you activate the local environment (`pkg> activate .`) and add a package (module). See Manifest.toml](https://julialang.github.io/Pkg.jl/v1/toml-files/):
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
                                          OpenTraining

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

ou see that I refer to the abstract data type `Invoice` for retrieving the field values of `UnpaidInvoice` or `PaidInvoice`. Except, when I need the payment data I refer explicitly to `PaidInvoce`.

## 8.1 Case Study Part One - Redefining BodyItem as a Concrete Datatype

Our boss wants our module to be able to print invoices with more than one item, e.g. books and in-company training. He also believes that `Structure` must resemble a hard copy invoice and that any additional information should be retrieved from the metadata. So, `BodyItem` must be the leave of the tree.

```
 ____Structure____
 ↓       ↓       ↓
Meta   Header   BodyItem
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

We have to replace `OpenTrainingItem` with `BodyItem`. Also, we have to remove the abstract definition of BodyItem.

```
struct BodyItem <: Struture
    _prod_code::String
    _qty::Float64
    _descr::Array{String, 1}
    _unit_price::Float64
    _vat::Float64
end

code(b::BodyItem) = b._prod_code
descr(b::BodyItem{Array(String, 1)}) = b.descr
unit_price(b::BodyItem) = b._unit_price
quantity(b::BodyItem) = b._qty
vat(b::BodyItem) = b._vat

# Example of creatinga BodyItem

ot = OpentrainingItem("Learn Smiling", Date(2020, 9, 30), 1000.0, ["Mickey Mouse", "Mini Mouse"])

students = "Attendees: " * reduce((x, y) -> x * ", " * y, ot._students)
description  = [ot._name_training, Date(ot._date), students]

body = Body(
  ot._name_training, # code
  "Date: " * string(length(ot._students)), # quantity
  description, # descr
  ot._price_per_student, # unit_price
  ot._vat_perc # vat
  )
```
