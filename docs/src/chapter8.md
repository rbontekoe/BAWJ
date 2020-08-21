# 8. The Domain Sub-module

UNDER DEVELOPMENT!

The module AppliAR follows the same structure as we have discussed in the Account module. We go deeper into the main differences.

### Contents

```@contents
Pages = ["chapter8.md"]
```

## The folder structure

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

## The Model

The sub-modules `Domain.jl`, `API.jl`, and `Infrastructure.jl` are in sub-folders and not directly under the src folder. It makes it easier to split and group things.

The file Domain.jl is in the sub-folder domain. As well as the file spec.jl we use for:
1. Specifying the abstract and concrete object hierarchy.
2. Documenting the functions.

When Domain.jl is loaded, it also loads spec.jl.

## Specifying the object hierarchy

The data structure consists of abstract and concrete data objects. The leaves are the concrete data objects that we define in `Domain.jl`.

The tree determines the structure of the invoice.

An invoice consists of a header and a body.  This applies to an unpaid invoice as well as a paid invoice. However, a paid invoice also contains the payment details.

Certain things apply to both types of invoices, for example:
- The invoice number.
- The training one wants to follow.

In both cases, the data-type `Invoice` applies. We can then refer to the data-type `Invoice`.

However, if we want to view the payment data, we must explicitly refer to `PaidInvoice`.

In our case, the invoice line is the specification of a training, but it could also be something else, for example, a textbook.

```
                 ______________________Realm_____________________
                 ↓                       ↓                      ↓
            Invoice               _____Structure____         Payment
            ↓     ↓               ↓       ↓        ↓            ↓
 UnpaidInvoice   PaidInvoice    Meta    Header  BodyItem   BankStatement
                                                   ↓
                                              OpenTraining

spec.jl:
abstract type Realm end
abstract type Invoice <: Realm end
abstract type Structure <: Realm end
abstract type BodyItem <: Structure end
abstract type Payment <: Realm end
```

## Domain.jl

Lets have a look at the `UnpaidInvoice`.

```
struct UnpaidInvoice <: Invoice
    _id::String
    _meta::MetaInvoice
    _header::Header
    _body::OpentrainingItem
end # UnpaidInvoice
```


## Reading Object Fields

We have defined functions to read the fields of an object. E.g. id(i::Invoice) returns the id of an unpaid invoice as well as of a paid invoice.

The advantage of defining functions to read fields are:
- You can change a field name of an object without effecting your program.
- Change the datatype of a field, but you let the function still returns the original datatype.
- More or less hiding the field names. However, when the user use the function `fieldnames` he can discover the names.

```
julia> using AppliAR

julia> fieldnames(UnpaidInvoice)
(:_id, :_meta, :_header, :_body)
```

To make my programs robust I work with immutable data types. When I want to change a value of an object I have to recreate the object. So basically I can only read the value from a field.

```
# Fields Invoice
meta(i::Invoice)::MetaInvoice = i._meta
header(i::Invoice)::Header = i._header
body(i::Invoice)::BodyItem = i._body
id(i::Invoice)::String = i._id

# Field of an PaidInvoice containing the bank statement
stm(i::PaidInvoice) = i._stm
```

You see that I refer to the abstract data type `Invoice` for retrieving the field values of `UnpaidInvoice` or `PaidInvoice`. Except, when I need the payment data I have explicitly refer to `PaidInvoce`.
