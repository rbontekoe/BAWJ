# 4. Implementing the design

## Set-up development environment

### Application folder and file structure

The final folder structure and files for our Julia application.

```
tci.jl
- src
  - api
    - api.jl
  - domain
    - domain.jl
  - infrastructure
    - inftrastructure.jl
    - db.jl
  - main.jl
  - tcl.jl
- test
  - runtests.jl
```

*Figure 1*

### Activity: Create the minimum folder structure and file domain.jl

In this activity you will create the folder structure for our `invoicing` process. You partial tet-up the folder structure according to figure 1:
- Create the base folder tci.jl.
- Create the subfolders `src` and `domain`.
- Create the file domain.jl.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ mkdir tcj.jl | mkdir is the linux command to create a folder. |
| 2 | $ cd tcl.jl | Change to the new created folder. |
| 3 | $ atom . | Start Atom in the current directory tcl.jl. **Don't forget the point (.)**. Here are the instructions to install [Atom/Juno](http://docs.junolab.org/latest/man/installation/) if you haven't done it already. |
| 4 | Remove all Taps in the right pane.| The Tabs are: Telemerty Consent, Welcome, and Welcom Guide. A tab will be remove by clicking on the x-symbol. |
| 5 | Right click on: tci.jl | tci.jl is the base folder. It will also be the name of our future module. |
| 6 | Select: `New folder` | Dialog box `+ Enter the path for the new folder.` appears. |
| 7 | Type: `src` |  |
| 8 | Press: <Enter> | The new folder appears under the folder tci.jl |
| 9 | Right click on: `src` |  |
| 10 | Select: `New folder` |  |
| 11 | Type: `domain` |  |
| 12 | Press: <Enter> | The new folder `domain` appears under the folder `src`. |
| 13 | Select the folder: `src` |  |
| 14 | RightS click on: `domain` |  |
| 15 | Select: `New file` |  |
| 16 | Type: `domain.jl` |  |
| 17 | Press: <Enter> | A new document appears in the pane next to the navigation pane. |

In the navigation pane you see the next folders and files:

```
- tci.jl
  - src
    - domain
      - domain.jl
```

## Domain

For the domain object we will use ```strut```s. With the strut you can define a data type. There are abstract types and concrete types. We start with the concrete type.

### Concrete data types
In the previous [chapter](#The-design-1) we found the next resources for which we will create ```struct```s:

- Invoice.
- InvoiceStatus: UNPAID, PAID.
- JournalRecord.
- Message.

The invoice structure.

## Creating the invoice items

Let's say that the invoice has a header and a body. We also have to do some calculations, e.g, the VAT. SAnd, we want to refer to the training and the orders, which are most likely stored at another entities, e.g. Marketing, and Sales.

To keep things clear we create the following objects:
- HeaderInvoice.
- BodyInvoice.
- MetaInvoice.

Next, we combine these objects in blocks into the InvouceTraining.

### HeaderInvoice

We use the keyword `struct` to define a data structure. You give it a name and on the next line you mention the fields and their data types.

```julia
struct HeaderInvoice
    invoiceNbr::String
    nameOrganization::String
    cityOrganization::String
    orderRefOrganization::String
    nameContact::String
    emailContact::String
end # defined HeaderInvoice
```

### BodyInvoice

```julia
struct BodyInvoice
    nameTraining::String
    pricePerStudent::Float64
    students::Array{String, 1}
end # defined BodyInvoice
```

### MetaInvoice

```julia
struct MetaInvoice
    orderId::String
    trainingId::String
    date::DateTime
    vatPercentage::Float64
    currency::String
    currencyRatio::Float64 #  against the euro
end # defined MetaInvoice
```

### Enumerators

```julia
@enum InvoiceStatus begin
    UNPAID
    PAID
end # defined enumerator for InvoiceStatus
```

### InvoiceTraining

```julia
struct InvoiceTraining
    id::String
    date::DateTime
    meta::MetaInvoice
    header::HeaderInvoice
    body::BodyInvoice
    status::InvoiceStatus
end # defined InvoiceTraining
```

## Adding constructors

### MetaInvoice

```julia
using DateTime

struct MetaInvoice
    ...
    # Constructores
    MetaInvoice() = new("", "", now(), 0.21, "€", 1)
    #MetaInvoice(orderId, trainingId) = new(orderId, trainingId, now(), date, 0.21, "€", 1)
    MetaInvoice(orderId, trainingId, date, vatPercentage, currency, currencyRatio) =
        new(orderId, trainingId, date, vatPercentage, currency, currencyRatio)
end # defined MetaInvoice
```

#### InvoiceTraining
```julia
using DateTime

struct InvoiceTraining
    ...
    # Constructors
    InvoiceTraining(headerInvoice, bodyInvoice ) =
        new( "", now(), MetaInvoice(), headerInvoice, bodyInvoice, UNPAID )
    InvoiceTraining(id, date, meta, headerInvoice, bodyInvoice, status) =
        new( id, date, meta, date, headerInvoice, bodyInvoice,  status )
end # defined InvoiceTraining
```

## Testing the invoice

```julia
# main.jl

include("domain/domain.jl")

headerInvoice = HeaderInvoice("1001", "AppliGate", "Landweg 74\n3833 VM Leusden,\nNetherlands", "PO123", "Rob Bontekoe", "r@b.nl")
bodyInvoice = BodyInvoice("Learn Smiling, Aug 30, 31 2019 ", 1000.0, ["Jan", "Piet"])
inv = InvoiceTraining(headerInvoice, bodyInvoice)

# print header
println(inv.header.nameOrganization)
println("Attn. $(inv.header.nameContact)")
println("$(inv.header.cityOrganization)")
println()
print("INVOICE")
println("Date: $(Date(inv.date))")
println("Invoice number: $(inv.header.invoiceNbr)")
println("="^40)
println("Reference: $(inv.header.orderRefOrganization)")
println()
println("Training: $(inv.body.nameTraining)")
println()
nbrStudents = length(inv.body.students)
unitprice = round(inv.body.pricePerStudent * inv.meta.currencyRatio; digits=2)
price = round(nbrStudents * unitprice; digits=2)
vat = round(price*inv.meta.vatPercentage; digits=2)
totalprice = round(price + vat; digits=2)
symbol = inv.meta.currency

using Printf # package for formatting numbers

println("#     Price                        Total")
println("="^40)
println("$nbrStudents     $(@sprintf("%.2f", unitprice))                   $symbol$(@sprintf("%.2f", price))")
println()
println("STUDENT(S)")
println("-"^20)
for name in inv.body.students
    println(name)
end
println()
println("VAT                              $symbol$(@sprintf("%.2f", vat))")
println("="^40)
println("Total price                     $symbol$(@sprintf("%.2f", totalprice))")
```


## API

## Storage

## Infrastructure
