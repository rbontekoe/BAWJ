# 3. Experimenting with Modules

UNDER DEVELOPMENT!

### Contents

```@contents
Pages = ["chapter3.md"]
```

In chapter 2, we saw the design of the AppliAR module. In this chapter, we will implement it, the `AppliAR(.jl)` module and its sub-modules `Domain(.jl)`, `API(.jl)`, and `Infrastructure(.jl)`. Two packages that we will use are AppliSales and AppliGeneralLedger.

The AppliSales package supplies the orders that AppliAR module needs to create the invoices when a course starts. Besides sending and storing the invoices, it also creates the journal entries for the AppliGeneralLedger package.

## Course Example

Initial, we will build an application where we can register and retrieve persons. The module you can experiment with is `Accounts.`

In this chapter, we start with the setup of the development environment by creating the module Accounts.

Next, you will use the `Onion Architecture` to define the model which consists of the layers Domain, API, and Infrastructure. The layers are declared as sub-modules.

#### Domain
The domain has objects Person, Address, AddressType.

#### API
The API has the function `create`. It can be used for creating persons and the addresses.

#### Infrastructure
The Infrastructure has the functions `save` and `retrieve,` to save and retrieve persons.

## Activity 3.1 - Setup the Development Environment

#### Prerequisites
- Ubuntu 20.04.

In this activity you will create the development environment.
- Install Julia.
- Install Atom.
- Install Juno.
- Add the Julia package PkgTemplates.
- Create the basic application file structure for module `Accounts` using PkgTemplates.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | [Install Julia](../appendix/#Install-Julia-1) | Follow the Installation instructions. |
| 2 | [Install Git](../appendix/#Install-Git-1) |  |
| 3 | [Install Atom](../appendix/#Install-Atom-1) |  |
| 4 | [Install Juno](../appendix/#Install-Juno-1) |  |
| 5 | Close Atom |  |
| 6 | $ cd projects |  |
| 6 | $ julia | Start Julia. |
| 7 | julia> ] | Go to the package manager. |
| 8 | pkg> add PkgTemplates | Install the PkgTemplates package. |
| 9 | pkg> BackSpace | Back to Julia REPL. |
| 10 | julia> using PkgTemplates <enter> | Load PkgTemplates. |
| 11 | julia> t = template() <enter> | Create a default template. |
| 12 | julia> t("AppliAR") <enter> | Create the module AppliAR. |
| 13 | julia> Ctrl-D | Exit Julia |
| 14 | $ cd ~/.julia/dev/AppliAR | Go to the development folder. |
| 15 | $ atom . | Start Atom. |

Explore the file structure.

## Activity 3.2 - Create the Application Environment

#### Prerequisites
- Ubuntu 20.04 installed.
- Julia 1.5 installed.
- Atom/Juno installed.
- Git installed.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Ctrl+Alt-T | Create a terminal window. |
| 2 | cd projects |  |
| 3 | julia | Start Julia. |
| 4 | julia> using PkgTemplates | Load PkgTemplates. |
| 5 | julia> t = Template() | Create a default template. |
```Template:
  authors: ["Rob Bontekoe <rbontekoe@appligate.nl> and contributors"]
  dir: "~/.julia/dev"
  host: "github.com"
  julia: v"1.0.0"
  user: "rbontekoe"
  plugins:
    CompatHelper:
      file: "~/.julia/packages/PkgTemplates/aXRp5/templates/github/workflows/CompatHelper.yml"
      destination: "CompatHelper.yml"
      cron: "0 0 * * *"
    Git:
      ignore: String[]
      name: nothing
      email: nothing
      branch: nothing
      ssh: false
      jl: true
      manifest: false
      gpgsign: false
    License:
      path: "~/.julia/packages/PkgTemplates/aXRp5/templates/licenses/MIT"
      destination: "LICENSE"
    ProjectFile:
      version: v"0.1.0"
    Readme:
      file: "~/.julia/packages/PkgTemplates/aXRp5/templates/README.md"
      destination: "README.md"
      inline_badges: false
    SrcDir:
      file: "~/.julia/packages/PkgTemplates/aXRp5/templates/src/module.jl"
    TagBot:
      file: "~/.julia/packages/PkgTemplates/aXRp5/templates/github/workflows/TagBot.yml"
      destination: "TagBot.yml"
      cron: "0 0 * * *"
      token: Secret("GITHUB_TOKEN")
      ssh: Secret("DOCUMENTER_KEY")
      ssh_password: nothing
      changelog: nothing
      changelog_ignore: nothing
      gpg: nothing
      gpg_password: nothing
      registry: nothing
      branches: nothing
      dispatch: nothing
      dispatch_delay: nothing
    Tests:
      file: "~/.julia/packages/PkgTemplates/aXRp5/templates/test/runtests.jl"
      project: false
```
| Step | Action | Comment |
| :--- | :--- | :--- |
| 5 | julia> t("Accounts") | Create application environment. |
```
[ Info: Running prehooks
[ Info: Running hooks
 Activating environment at `~/.julia/dev/Accounts/Project.toml`
   Updating registry at `~/.julia/registries/General`
######################################################################## 100,0%
No Changes to `~/.julia/dev/Accounts/Project.toml`
No Changes to `~/.julia/dev/Accounts/Manifest.toml`
 Activating environment at `~/.julia/environments/v1.5/Project.toml`
[ Info: Running posthooks
[ Info: New package is at /home/rob/.julia/dev/Accounts
```
| Step | Action | Comment |
| :--- | :--- | :--- |
| 6 | julia> Ctrl-D | exit Julia. |
| 7 | $ cd ~/.julia/dev/Accounts/ | Got to development folder. |
| 8 | $ atom .| Start Atom/Juno. |

You will see the following file structure.

```
ᵥ📁 Accounts
   📁 .git
   📁 .github
  ᵥ📁 src
     📄 Accounts.jl
  ᵥ📁 test
     📄 runtests.jl
   📄 .gitignore
   📄 LICENCE
   📄 Manifest.toml
   📄 Project.toml
   📄 README.md
```

## Activity 3.3 - Create a Repository on GitHub

- Ubuntu 20.04 installed.
- Julia 1.5 installed.
- Atom/Juno installed.
- Git installed.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Go to [GitHub](https://github.com/) | Create an account if you don't have one. What is [GitHub](https://en.wikipedia.org/wiki/GitHub)? |
| 2 | Click on the tab `Repositories` |  |
| 3 | Click on the green button `New` |  |
| 4 | Give the repository the name `Accounts.jl` |  |
| 5 | Give the repository a description | E.g. A module for the BAWJ course with which you can experiment. |

!!! warning
    Start with a empty repository!

| Step | Action | Comment |
| :--- | :--- | :--- |
| 6 | Click on the green button `Create repository` | Button is located at the bottom side. |
| 7 | Return to your computer and go to the folder `~/.julia/dev/Accounts`|  ||
| 10 | $ git status | The response is: |

```
On branch master
nothing to commit, working tree clean
```

| Step | Action | Comment |
| :--- | :--- | :--- |
| 11 | $ atom .| Start Atom/Juno. |
| 12 | Click on the `Publish button` | You will find the button in the lower right corner. |
| 13 | Check the update on GitHub | You should see the same file structure. Manifest.toml is missing. |

###### Create the sub-module Domain.jl in the src-folder

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Go to the `~/.julia/dev/Accounts` folder|  |
| 3 | Remove all Taps in the right pane.|  |
| 4 | Right click on: src |  |
| 5 | Select: `New file` |  |
| 6 | Type: `Domain.jl` | A file that represents a module starts with a capital letter.  |
| 7 | Press: <Enter> | A new document appears in the pane next to the navigation pane. |

In the navigation pane you see the next folders and files:

```
ᵥ📁 AppliInvoicing
  ᵥ📁 src
     📄 Accounts.jl
     📄 Domain.jl
```

## Domain.jl

On the Domain page, you define the custom data structures that make-up your domain.

To define a data structure and type, use the keyword `struct`. The body consists of the fields of the data structure. A struct is a non-mutable object unless you use the preceding keyword `mutable.`

Use constructors to define standard values. It simplifies the creating op the object.

```julia
module Domain #1

using Dates #2

export Person, Address, AddressType, EMAIL, WORK #3

# local function to generate a unique id
create_key(name::String) = string(hash(name * string(time()))) #4

# enumerated type for an address.
@enum AddressType EMAIL WORK #5

struct Address #6
  id::String
  created::DateTime
  address_type::AddressType
  address::String
  #constructors
  Address(address_type, address) = new(create_key(address), now(), address_type, address)
end # Address

struct Person #7
  id::String
  created::DateTime
  name::String
  addresses::Array{Address, 1}
  #constructors
  Person(name) = new(create_key(name), name, [])
  Person(name, addresses) = new(create_key(name), now(), name, addresses)
end

end

```
\#1 Module names start with a capital letter.

\#2 If you need date functions like time(), date(), or now() you have the load the Dates package.

\#3 Define what other (sub-)modules default see when they want to use the sub-module Domain.

\#4 We use the hash function to generate an unique id.

\#5 The AddressTypes that you allow in an address.

\#6 The structure of the Address datatype. The constructor `create` allows the programmer to only specify the AddressType and the address. The fields `id` and `created` are generated by Julia code.

\#7 The Person datatype. The fields `id` and `created` are generated by Julia code. When you don't specify an address, the software creates an empty array. Later on, you can add addresses using the `push!` function.

## Exercice 3.4 - Adding Dates module as dependency

The Domain.jl code

#### Prerequisites
- Exercise 3.1, 3.2, and 3.3

| Step | Action | Comment |
| :--- | :--- | :--- |


1. Copy the domain data to the Domain.jl file in Juno.
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

## The final application file structure

The final folder structure and files for our Julia module [AppliAR.jl](https://github.com/rbontekoe/AppliAR.jl).

```
ᵥ📁 AppliAR
   📁 .git
   📁 .github
  ᵥ📁 docs #1
      📁 build
      📁 src
     ᵥ📁 stable
         📁 assets
         📁 chapter1
         📁 chapter2
         📁 chapter3
         📁 search
         📄 index.html
         📄 search_index.js
       📄 make.jl
       📄 Manifest.toml
       📄 Project.toml
  ᵥ📁 src #2
    ᵥ📁 api
       📄 Api.jl
       📄 spec.jl #3
    ᵥ📁 domain
       📄 Domain.jl
			 📄 spec.jl #3
    ᵥ📁 infrastructure
       📄 db.jl
       📄 doc.jl #3
       📄 Infrastructure.jl
     📄 AppliAR.jl
     📄 Reporting.jl
  ᵥ📁 test
     📄 Manifest.toml #4
     📄 Project.toml #4
     📄 runtests.jl #4
   📄 .coveralls.yml
	 📄 .gitignore
	 📄 .travis.yml
	 📄 bank.csv
   📄 LICENCE
   📄 Manifest.toml
   📄 Project.toml  #5
   📄 README.md
```
*Fig 1*

\#1 Folders and files that make up the documentation of [AppliAR.jl](https://www.appligate.nl/AppliAR.jl/stable).

\#2 The application files. We use the onion architecture.

\#3 Julia help documentation. See chapter [8. Documenting your code](https://www.appligate.nl/BAWJ/chapter8/).

\#4 Unit test file. See chapter [7. Writing test software](https://www.appligate.nl/BAWJ/chapter7/)

\#5 Project.toml contains the dependencies of the module. Julia adds dependencies automatically to the file when you activate the local environment (`pkg> activate .`) and add a package (module). See Manifest.toml](https://julialang.github.io/Pkg.jl/v1/toml-files/):
"The manifest file is an absolute record of the state of the packages in the environment. It includes exact information about (direct and indirect) dependencies of the project, and given a Project.toml + Manifest.toml pair it is possible to instantiate the exact same package environment, which is very useful for reproducibility."
