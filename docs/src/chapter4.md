# 4. Implementing the design

UNDER DEVELOPMENT!

### What you will learn

```@contents
Pages = ["chapter4.md"]
```

In chapter 3, we saw how the design of the invoicing module. In this chapter, we will implement it, the `AppliInvoicing` module. Two other modules that will come in the picture are AppliSales and AppliGeneralLedger.

The AppliSales module supplies the orders that the AppliInvoicing needs to create the invoices when the course starts. Besides sending and storing the invoices, it also creates the journal entries for the AppliGeneralLedger module.

## Development environment

### Application folder and file structure

The final folder structure and files for our Julia application.

```
ᵥ📁AppliInvoicing
   📁 .git
  ᵥ📁 src
    ᵥ📁 api
       📄 api.jl
    ᵥ📁 domain
       📄 domain.jl
    ᵥ📁 infrastructure
       📄 infrastructure.jl
     📄 AppliInvoicingl.jl
     📄 test.jl
  ᵥ📁 test
     📄 runtests.jl\
   📄 bank.csv
   📄 Manifest.toml
   📄 Project.toml  #1
   📄 README.md
```
\#1 Contains dependencies when working in the local activity mode. Julia adds dependencies automatically added when you add a package (module). Manifest.toml contains the references to the modules.


*Figure 1*

## Activity 4.1: Create the minimum folder structure and the file domain.jl

In this activity you will create the folder structure for the `invoicing` process. You partial set-up the folder structure according to figure 1:
- Create the base folder AppliInvoicing.
- Create a repository on GitHub.
- Create the folder `domain`under `src`.
- Create the file domain.jl.

###### Create the base folder AppliInvoicing

All steps are necessary, because we want to create a Julia module form our code.

Prerequisites
- Your computer OS is Ubuntu 18.04.
- You have sudo (administraton) rights.
- `git` is installed.
- `atom/juno` installed.

You can install git with the command: sudo apt-get install git.

Atom/juno is the IDE that is used in our example. To install juno see the next [instruction](http://docs.junolab.org/latest/man/installation/).

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ mkdir julia-projects | Create a working directory.  |
| 2 | $ cd julia-projects | |
| 3 | $ julia | Start Julia. |
| 4 | julia > ] | Open the package manager. |
| 5 | pkg> generate AppliInvoicing | Generate e.g. the package AppliInvoicing. The response you get is: |

`Generating project AppliInvoicing:
    AppliInvoicing/Project.toml
    AppliInvoicing/src/AppliInvoicing.jl`

Project.toml contains the package name and the dependencies.

###### Create a repository on GitHub

Close the package manager and Julia: Ctrl-C, Ctrl-D.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 6 | Go to [GitHub](https://github.com/) | Create an account if you don't have one. What is [GitHub](https://en.wikipedia.org/wiki/GitHub). |
| 7 | Click on the tab `Repositories` |
| 8 | Click on the green button `New` | Bottom upper right side. |
| 9 | Give the repository a name | E.g. `AppliInvoicing.jl` |
| 10 | Give the repository a description | E.g. Invoicing module for the course BAWJ. |

!!! warning
    Start with a empty repository!

| Step | Action | Comment |
| :--- | :--- | :--- |
| 11 | Click on the green button `Create repository` | Button is located at the bottom side. |
| 12 | Return to your computer and enter the folder AppliInvoicing |  |

Install git: apt-get install git.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 13 | $ echo "# AppliInvoicing" >> README.md | Create README.md file. |
| 14 | $ git init |  |
| 16 | $ git status | The response you get is: |

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
| 20 | $ git status | The response is: |

`On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   Project.toml
	new file:   README.md
	new file:   src/AppliInvoicing.jl`

| Step | Action | Comment |
| :--- | :--- | :--- |
| 21 | $ git commit -m "first commit" | The response is: |

`[master (root-commit) 3b06d57] first commit
 3 files changed, 10 insertions(+)
 create mode 100644 Project.toml
 create mode 100644 README.md
 create mode 100644 src/AppliInvoicing.jl`

| Step | Action | Comment |
| :--- | :--- | :--- |
| 22 | $ git remote add origin https://github.com/rbontekoe/AppliInvoicing.jl.git |  |
| 23 | $ git push -u origin master | Push your files to your GitHub repository. GitHub asks for your userid and password. |
| 24 | Check the update on GitHub | |

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
ᵥ📁 AppliInvoicing
   📁 .git
  ᵥ📁 src
    ᵥ📁 domain
       📄 domain.jl
     📄 AppliInvoicing.jl
   📄 Project.toml
   📄 README.md
```

## domain.jl

To define a data structure and type, use the keyword `struct`. The body consists of the fields of the data structure.

Use constructors to define standard values, like the default currency symbol. It simplifies the creating op the object.

To keep things clear we create the following objects as part of the invoice:
- MetaInvoice, containing references to the order, the training, and the currency.
- HeaderInvoice, contains all the general information.
- OpentrainingItem, the invoice body consists of one item.

```julia
using Dates
using AppliGeneralLedger
using AppliSales # needed for test.jl and runtests.jl

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
end # MetaInvoice

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
end # HeaderInvoice

struct OpentrainingItem #5
    name_training::String
    date::DateTime
    price_per_student::Float64
    students::Array{String, 1}
    vat_perc::Float64
    # constructors
    OpentrainingItem(name_training, date, price_per_student, students) = new(name_training, date, price_per_student, students, 0.21) #6
    OpentrainingItem(name_training, date, price_per_student, students, vat_perc) = new(name_training, date, price_per_student, students, vat_perc)
end # OpentrainingItem

struct UnpaidInvoice
    id::String
    meta::MetaInvoice
    header::Header
    body::OpentrainingItem
end # UnpaidInvoice

struct BankStatement
    date::Date
    descr::String
    iban::String
    amount::Float64
end # BankStatement

struct PaidInvoice
    id::String
    meta::MetaInvoice
    header::Header
    body::OpentrainingItem
    stm::BankStatement
end # PaidInvoice
```
\#1 The invoice date.

\#2 We assume that most students are from a country in Europe where they have the euro as currency.

\#3 The information needed for the header of the invoice.

\#4 In the future, we will automatically generate a unique id.

\#5 It has the course information and the students who will attend the training.

\#6 You create a instance of a data structure by using its name with the arguments between brackets. If you want to instantiate it with less arguments you can define constructors (or you use keyword arguments in functions or methods).

On the domain page, one defines the custom data structures that make-up our domain. To avoid too many method arguments, we break it up in the substructures as `MetaInvoice,` `Header,` and `OpentrainingItem.`

`Header` represents the information we need for the header of the invoice. `OpentrainingItem` serves as the body of an invoice. In practice, the body of an invoice could consist of several lines, but we leave it now limited to one line.

I have split an invoice into two data structures: UnpaidInvoice and PaidInvoice. It facilitates the property of Julia, which is called `multiple dispatch.` You can see an example of it in the API layer where we use the same method name, `create`, for both data structures, which each have a different operation.

## Exercice 4.1

1. Copy the domain data to the domain.jl file in Juno.
2. Select the first statement and press Shift-Enter¹. Juno evaluates the line and prints the result at the end of it. Repeat it for all elements.
3. Save the file with Ctrl-S.
4. Create a folder `api` under the `scr`-folder.
5. Create the empty file `api.jl` in the folder `api.`
6. Create the empty files `infrastructure.jl` and `db.jl` in the folder 'infrastructure.'

##### Notes
¹ In Juno pressing Shift-Enter executes the selected statement and moves the cursor to the next piece of code. Ctrl-Enter doesn't touch the cursor.

## api.jl

In the API, we only use Julia code and the elements from the domain, the basic idea behind the onion architecture.

We use the include statement to have access to the domain elements. The relative path is to the domain.jl file.

We define in the API the functions and the methods that our program needs.

Functions start with the keyword `function` followed by the function name and the arguments between brackets:

```julia
function hello(name)
	println("Hello " * name) # the * is also used for string concatenation
end
```
Methods start with the name of the method followed by the arguments between brackets, an equal sign, and a statement:

```julia
hello(name) = println("Hello " * name)
```
When a method has more than one statement, we embed the statements between a `begin ... end block`:

```julia
hello(name) = begin
	name = uppercase(name)
	println("HELLO " * name)
end
```

There is no difference between functions and methods.

```julia
include("../domain/domain.jl") #1

import AppliSales.Order # Order is not exported but is refered to in the next method #2

# create unpaid invoices from an order
create(order::Order, invoice_id::String)::UnpaidInvoice = begin #3
    meta = MetaInvoice(order.id, order.training.id)
    header_invoice = Header(
        invoice_id, order.org.name, order.org.address, order.org.zip, order.org.city, order.org.country, order.order_ref, order.contact_name, order.contact_email)
    body_invoice = OpentrainingItem(order.training.name, order.training.date, order.training.price, order.students)
    return UnpaidInvoice(invoice_id, meta, header_invoice, body_invoice) #4
end

# create paid invoice from a bank statement
create(invoice::UnpaidInvoice, stm::BankStatement)::PaidInvoice = begin
    id = invoice.id
    meta = invoice.meta
    header = invoice.header
    body = invoice.body
    stm = stm
    return PaidInvoice(id, meta, header, body, stm)
end

# create journal entries from an unpaid invoice
# the create_journal_entry function is exported by AppliGeneralLedger
function conv2entry(inv::UnpaidInvoice, from::Int, to::Int)
    id = string(Date(now())) * "-" * string(global n += 1)
    customer_id = inv.header.name
    invoice_nbr = inv.header.invoice_nbr
    debit = inv.body.price_per_student * length(inv.body.students)
    credit = 0.0
    vat = debit * inv.body.vat_perc
    descr = inv.body.name_training
    return create_journal_entry(id, customer_id, invoice_nbr, from, to, debit, credit, vat, descr)
end

# create journal entries from a paid invoice
# the create_journal_entry function is exported by AppliGeneralLedger test module
function conv2entry(inv::PaidInvoice, from::Int, to::Int)
    id = string(Date(now())) * "-" * string(global n += 1)
    customer_id = inv.header.name
    invoice_nbr = inv.header.invoice_nbr
    debit = inv.stm.amount
    credit = 0.0
    vat = 0.0
    descr = inv.body.name_training
    return create_journal_entry(id, customer_id, invoice_nbr, from, to, debit, credit, vat, descr)
end
```
\#1 It loads the domain elements.

\#2 I only export the `api` and `infrastructure` pages from modules. Exporting domain elements can give irritating override errors. In the first API-method, we refer to Order, which cannot found by Julia. To make it accessible, use the import statement.  

\#3 As we mentioned before, Julia uses `multiple dispatch` as a kind of overloading we know from object-oriented languages. It means that you can use the same method or function name as long as the signatures are different. As you can see, we use the create method two times, one for creating unpaid invoices and one for paid invoices.

When you use the help function `? create` it shows the two.

\#4 When the last statement of a function block is also the return value, you can leave out the keyword `return.`

## infrastructure.jl

The infrastructure layer, the outer peel of the onion, uses the elements from the `api` and the `domain` layers.

The two methods that execute the workflow as we have described in our invoicing procedure are:
1. process(path, orders::Array{Order, 1})
2. process(path, invoices::Array{UnpaidInvoice, 1}, stms::Array{BankStatement, 1})

The first method creates unpaid invoices, the second one the paid invoices. Both generate the journal entries for the general ledger.

Take a peek at chapter 6 [Testing the application](https://www.appligate.nl/BAWJ/chapter6/) to get an idea how the data flows through the application.

```julia
using CSV
using DataFrames

include("../api/api.jl")
include("./db.jl") # database functions

@enum TableName begin
    UNPAID
    PAID
end # enumerator for TableName types

# get last statement number for today
n = 0

process(path, orders::Array{Order, 1}) = begin
    # connect to db
    db = connect(path)

    # get last order number
    invnbr = 1000 #ToDo

    # create invoices
    invoices = [create(order, "A" * string(invnbr += 1)) for order in orders]

    # archive invoices
    archive(db, string(UNPAID), invoices)

    # create journal entries from invoices
    return entries = [conv2entry(inv, 1300, 8000) for inv in invoices]
end # process(path, orders::Array{Order, 1})

#process(bankstm::Array(Bankstatement, 1) = begin
process(path, invoices::Array{UnpaidInvoice, 1}, stms::Array{BankStatement, 1}) = begin
    # connect to db
    db = connect(path)

    # create array with potential paid invoices based on received bank statements
    potential_paid_invoices = []
    for unpaid_invoice in invoices
      for stm in stms # get potential paid invoices
        if occursin(unpaid_invoice.id, stm.descr) # description contains invoice number
          push!(potential_paid_invoices, create(unpaid_invoice, stm))
        end
      end
    end

    # convert to an array with PaidInvoice's
    paid_invoices = convert(Array{PaidInvoice, 1}, potential_paid_invoices)

    # archive PaidInvoice's
    archive(db, string(PAID), paid_invoices)

    # return array with JournalEntry's
    return entries = [conv2entry(inv, 1150, 1300) for inv in paid_invoices]
end # process(path, invoices::Array{UnpaidInvoice, 1}, stms::Array{BankStatement, 1})

read_bank_statements(path::String) = begin
    # read the CSV file containing bank statements
    df = CSV.read(path) # returns a DataFrame

    # return an array with BankStatement's
    # row[1] is the first value of row, row[2] the second value, etc.
    return [BankStatement(row[1], row[2], row[3], row[4]) for row in eachrow(df)]
end # read_bank_statements

retrieve_unpaid_invoices(path)::Array{UnpaidInvoice, 1} = begin
    # connect to db
    db = connect(path)

    # retrieve unpaid invoices as dataframe
    unpaid_records = retrieve(db, string(UNPAID))

    # convert the dataframe to an array with UnpaidInvoice's.
    # row is an array with one element, which is an array.
    # row[1] is the the content of the element, the UnpaidInvoice.
    unpaid_invoices = [row[1] for row in eachrow(unpaid_records.item)]

    # return the array with UnpaidInvoice's
    return unpaid_invoices
end # retrieve_unpaid_invoices
```

## db.jl

A microservice is responsible for his data. If we also see a module as an independent component, the same argument would apply. For the Invoicing module, these are the `UnpaidInvoice` and `PaidInvoice` objects.

The db.jl page is based on [SQLite.jl](https://github.com/JuliaDatabases/SQLite.jl) module. It translates a data structure into a row in a table whose column names match the argument names of the function. The `store` method performs this action.

Sometimes you want to save a data structure in a single cell, possibly with additional information. We use the data structure `DatabaseItem` to achieve this. The column `item` contains the data structure in the serialized form. Use the `archive` method for this purpose.

Reading rows results in a DataFrame. It is similar to a spreadsheet where you use column names. If we retrieve the data from a table, it has the advantage of reading the column `item` of the DataFrame results in an array.

```Julia
# db.jl

using SQLite

# Database item
struct DatabaseItem{T}
   time::Float64
   agent::String
   action::String
   key::String
   item::T
end # DatabaseItem

# createDatabaseItem - internal method
const agent = "AB9F"
createDatabaseItem(item::Any; agent=agent, action="CREATE") = DatabaseItem(time(), agent, action, item.id, item)

# Connect with PATH_CSV
connect(path::String)::SQLite.DB = SQLite.DB(path)

# connect to in-memory database
connect()::SQLite.DB = SQLite.DB()

# archive an item as DatabaseItem
archive(db, table::String, items::Array{T, 1} where {T <: Any}) = begin
   # save items
   dbi = [ createDatabaseItem( i ; action="CREATE" ) for i in items]
   # return as dataframe
   DataFrame( dbi ) |> SQLite.load!(db, table)
end # archive

#store the fields of an item
store(db, table::String, items::Array{T, 1} where {T <: Any}) = begin
   DataFrame( items ) |> SQLite.load!(db, table)
end # store

# retrieve all item from a table
retrieve(db, table::String)::DataFrame = SQLite.Query( db, "select * from $table") |> DataFrame

# retrieve item form a table based on a sql condition
retrieve(db, table::String, condition::String )::DataFrame = SQLite.Query( db, "select * from $table where $condition")  |> DataFrame

# run a custom function
runfunct(funct, x, y, z) = funct(x, y, z)
```

## Exercice 4.2

To save time we clone my Invoicing repository from GitHub.

1. Goto your base folder.
2. Run thee command: git clone https://github.com/rbontekoe/AppliInvoicing.jl.git
3. Goto the folder AppliInvoicing.jl: cd AppliInvoicing.jl
3. Start Juno: atom .
4. Start Julia.
5. Goto the package manager: ]
6. **Activate the local environment** (and don't forget the point `.`): activate .
7. Open the page test.jl.
8. Use Shit-Enter to step door your code. You will see:

```
[ Info: 2020-02-04T12:02:13.613 - Test program started.
[ Info: The database test_invoicing.sqlite will be removed permanently by the last two statements of this page.
[ Info: 2020-02-04T12:02:20.128 - Orders received.
[ Info: 2020-02-04T12:02:23.586 - Unpaid invoices created.
[ Info: 2020-02-04T12:02:27.884 - Journal entries for unpaid invoices created.
[ Info: 2020-02-04T12:02:34.27 - Get bankstatement entries for testing.
[ Info: 2020-02-04T12:02:35.278 - Unpaid invoices retrieved from database.
[ Info: 2020-02-04T12:02:35.906 - Journal entries for paid invoices created.
```
