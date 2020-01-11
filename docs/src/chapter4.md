# 4. Implementing the design

UNDER DEVELOPMENT!

### What you will learn

```@contents
Pages = ["chapter4.md"]
```

In chapter 3 we saw how the design of the invoicing module might look like. In this chapter we will implement the design. Two other module that will come in the picture are: AppliSales and AppliSQLite.

## Development environment

### Application folder and file structure

The final folder structure and files for our Julia application.

```
AppliInvoicing
- src
  - api
    - api.jl
  - domain
    - domain.jl
  - infrastructure
    - infrastructure.jl
  - AppliInvoicingl.jl
  - general_ledger
  - main.jl
  - print_invoice.jl
  - test.jl
- test
  - runtests.jl
```

*Figure 1*

## Activity 4.1: Create the minimum folder structure and the file domain.jl

In this activity you will create the folder structure for our `invoicing` process. You partial set-up the folder structure according to figure 1:
- Create the base folder AppliInvoicing.
- Create a repository on GitHub.
- Create the folder `domain`under `src`.
- Create the file domain.jl.

###### Create the base folder AppliInvoicing

All steps are necessary, because we want to create a Julia module form our code.

Prerequisites
- Your computer OS is Ubuntu 18.04.
- You have sudo (administraton) rights.
- `git` installed.
- `atom/juno` installed.

You can install git with the command: sudo apt-get install git.

To install juno see the next [instruction](http://docs.junolab.org/latest/man/installation/).

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ mkdir julia-projects | Create a working directory.  |
| 2 | $ cd julia-projects | |
| 3 | $ julia | Start Julia. |
| 4 | julia > ] | Open the package manager. |
| 5 | pkg> generate AppliInvoicing | Generate e.g. the package AppliInvoicing. Response: |

`Generating project AppliInvoicing:
    AppliInvoicing/Project.toml
    AppliInvoicing/src/AppliInvoicing.jl`

We come back to the generate files in chapter 6. Project.toml has the package name and its dependencies.

###### Create a repository on GitHub

Leave the package manager and Julia.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 6 | Go to GitHub | E.g. https://github.com/rbontekoe. Create an account if you don't have one. |
| 7 | Click on the tab `Repositories` |
| 8 | Click on the green button `New` | Botton upper right side. |
| 9 | Give the repository a name | E.g. `AppliInvoicing.jl` |
| 10 | Give the repository a description | E.g. Invoicing module for the course. |

!!! warning
    Start with a empty repository!

    After you pushed your first files you can define a licence and .gitignore for Julia, e.g.
    - Add .gitignore: julia.
    - Add licence: MIT licence.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 11 | Click on the green button `Create repository` | Button is located at the bottom side. |
| 12 | Return to your computer and enter the folder AppliInvoicing |  |

Install git: apt-get install git.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 13 | $ echo "# AppliInvoicing" >> README.md | Create README.md file. |
| 14 | $ git init |  |
| 16 | $ git status | Response: |

`On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	Project.toml
	README.md
	src/

nothing added to commit but untracked files present (use "git add" to track)`

| Step | Action | Comment |
| :--- | :--- | :--- |
| 17 | $ git add Project.toml | Add file to staged changes. |
| 18 | $ git add README.md |  |
| 19 | $ git add src/ | |
| 20 | $ git status | Response: |

`On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   Project.toml
	new file:   README.md
	new file:   src/AppliInvoicing.jl`

| Step | Action | Comment |
| :--- | :--- | :--- |
| 21 | $ git commit -m "first commit" | Response: |

`[master (root-commit) 3b06d57] first commit
 3 files changed, 10 insertions(+)
 create mode 100644 Project.toml
 create mode 100644 README.md
 create mode 100644 src/AppliInvoicing.jl`

| Step | Action | Comment |
| :--- | :--- | :--- |
| 22 | $ git remote add origin https://github.com/rbontekoe/AppliInvoicing.jl.git |  |
| 23 | $ git push -u origin master | push changed to your GitHub repository. | Push your files to your GitHub repository. GitHub asks for your userid and password. |

Check on GitHub the update.

###### Create the folder domain under the src-folder

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Enter the AppliInvoicing folder|  |
| 2 | $ atom . | Start Atom in the current directory AppliInvoicing.| **Don't forget the point (.)**. Here are the instructions to install [Atom/Juno](http://docs.junolab.org/latest/man/installation/) if you haven't done it already. |
| 3 | Remove all Taps in the right pane.| The Tabs are: Telemerty Consent, Welcome, and Welcom Guide. A tab will be remove by clicking on the x-symbol. |
| 4 | Right click on: src | |
| 5 | Select: `New folder` |  |
| 6 | Type: `domain` |  |
| 7 | Press: <Enter> | The new folder `domain` appears under the folder `src`. |
| 8 | Select the folder: `domain` |  |
| 9 | Right click on: `domain` |  |
| 10 | Select: `New file` |  |
| 11 | Type: `domain.jl` |  |
| 12 | Press: <Enter> | A new document appears in the pane next to the navigation pane. |

In the navigation pane you see the next folders and files:

```
- AppliInvoicing
  - src
    - domain
      - domain.jl
		AppliInvoicing.jl
	Project.toml
	README.md
```

## domain.jl

When us use packages in your application, define it at the top of the domain.jl file.

We use date and time in our application. To activate the build-in package you use the statement: using Dates.

To define a data structure and type, we use the keyword `struct`. The body consists of the fields of the data structure.

Use constructors to define standard values, like the default valuta symbol. It simplifies the creating op the object.

To keep things clear we create the following objects as part of the invoice:
- MetaInvoice, containing references to the order, the training, and the currency.
- HeaderInvoice, contains all the general information.
- OpentrainingItem, the invoice body consists of one item.

```julia
using Dates # module use date functions

# Meta data
struct MetaInvoice
    order_id::String
    training_id::String
    date::DateTime #1
    currency::String
    currency_ratio::Float64
    # Constructors
    MetaInvoice(order_id, training_id) = new(order_id, training_id, now(), "€", 1.0) #2
    MetaInvoice(order_id, training_id, date, currency, currency_ratio) = new(order_id, training_id, now(), currency, currency_ratio)
end # defined MetaInvoice

struct Header #3
    invoice_nbr::String #4
    name::String
    address::String
    zip::String
    city::String
    country::String
    order_ref::String
    name_contact::String
    email_contact::String
end # defined HeaderInvoice

struct OpentrainingItem #5
    name_training::String
    date::DateTime
		days::Int64
    price_per_student::Float64
    students::Array{String, 1}
    vat_perc::Float64
    # constructors
    OpentrainingEntry(name_training, date, days, price_per_student, students) = new(name_training, days, date, price_per_student, students, 0.21)
    OpentrainingEntry(name_training, date, price_per_student, students, vat_perc) = new(name_training, days, date, price_per_student, students, vat_perc)
end # defined OpentrainingItem

struct UnpaidInvoice
    id::String
    meta::MetaInvoice
    header::Header
    body::OpentrainingItem
end # defined UnpaidInvoice
```
\#1 Invoice date

\#2 We assume that most students are from a country in Europe where they have the euro as currency.

\#3 Information from the order form.

\#4 In the future we will automatically generate a unique id.

\#5 Course information and students who attend the training.


## Exercice 4.1

1. Copy the domain data to the domain.jl file in atom.
2. Select the first statement, and press <Enter>. The line will be evaluated. Repeat for all elements.
3. Save the file with Ctrl-S.
4. Create a folder `api` under the scr-folder.
5. Create the file `api.jl` in the folder `api`.

## api.jl

In the API we only use Julia code and the elements from the domain, the basic idea behind the onion architecture.

We use the include statement to have access to the domain elements. The relative path is to the domain.jl file.

Basically, we define in the API the functions that our program needs. When the function has more than one statement, we embed the statements between a begin ... end block.

The function `create` needs a `Order` as argument, and an id. As said before in the future we generate a unique id automatically within the block.



```
include("../domain/domain.jl")

create(order::Order, invoice_id::String)::UnpaidInvoice = begin
    meta = MetaInvoice(order.id, order.training.id)
    header_invoice = Header(
		    invoice_id, order.org.name, order.org.address, order.org.zip, order.org.city, order.org.country,      order.order_ref, order.contact_name, order.contact_email)
    body_invoice = OpentrainingItem(order.training.name, order.training.date, order.training.price, order.students)

    invoice = UnpaidInvoice(invoice_id, meta, header_invoice, body_invoice)
end
```





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

## Dunmmies

##### JournalStatement

```
struct JournalRecord
    date::DateTime
    custid::String
    invnbr::String
    stmnbr::Int64
    from::Int64
    to::Int64
    debit::Float64
    credit::Float64
    vat::Float64
    pctvat::Float64
    descr::String
end
```

##### Account General Ledger

```
struct Account
    date::DateTime
    custid::String
    invnbr::Int64
    stmnbr::Int64
    debit::Float6
    credit::Float6
    descr::String
end

stmnbr accounts receivable = 1300
stmnbr vat = 1501
stmnbr sales scheduled courses = 8100
```
