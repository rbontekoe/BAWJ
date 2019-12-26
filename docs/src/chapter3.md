# 3 - The design

### What you will learn

```@contents
Pages = ["chapter3.md"]
```

First, let's look at some terms and definitions. We'll convert the procedure `Invoicing` into an activity diagram. Using the Onion Architecture pattern, we define the `Domain` objects and the Julia `API`-functions. In the `Infrastructure` layer, we put the functions that interact with the outer world and the inner layers.

---

## Terms and definitions

The points of attention are:
- Procedure,
- Domain-driven design,
- Distributed processing, and
- Style conventions.

### Procedure

A procedure is a description of work practice, a workflow. It describes a series of activities or actions in a particular order and interacts with people and machines. Actions make use of resources. Data, a service or a product, is the output of work.

### Domain-driven design

Each process should be domain-specific. Subject matter experts and users of the domain speak the same language and use the same definitions and synonyms for concepts and objects. It leads to a Domain-driven design paradigm.

The Onion Architecture lends itself perfectly to the domain-driven design pattern. It divides an application into four areas: core, domain, API, and infrastructure.

The core consists out of the Julia language constructs and Julia modules. [Modules](https://docs.julialang.org/en/v1/manual/modules/index.html) are also called packages.

The next layer, the domain, defines the domain entities and concepts. Between its elements, there must be coherence. You only use constructs from the `core.` `UnpaidInvoice` is an example.

The next peel is the API. The API consists of Julia functions that operate on the domain elements, and are used to create programs. You only use constructs from the `core and the domain.`

`create_unpaidinvoice,` `create_paidinvoice,` `create_pdf` are examples.

 The infrastructure layer is the ultimate peel. With its functions, it communicates with the external world. Adapters overcome mismatches between interfaces. When you write you the code, you use `elements from the inner layers.`

### Distributed processing

Programs, written in Julia language, also can run on other processor cores. Even in Docker containers on remote machines. Julia uses the master-worker concept. It means that the master executes Julia's functions on workers.

### Style conventions

The article [Blue: a Style Guide for Julia](https://github.com/invenia/BlueStyle) describes the style conventions.

---

## A procedure as a starting point
In 1994 we were delivering Lotus Notes instructor-led training in the Netherlands. We became ISO-9001 certified one year later. ISO is short for the International Organization for Standardization. A part of ISO is the section procedures.

A procedure describes a workflow or business process. It specifies the activities to be carried out by people or machines and the resources that are required to produce a result.

An input triggers a process. Every action creates an output, most of the time, modified information or side-effects such as saving data.

The example I use in the course is the procedure `Invoicing.`

### The course example

In 1998 we rewrote our procedures as a table. Every row represents an activity or action. Next to the events are the columns with the roles involved with the work. The original procedure:

**Procedure**: Invoicing.

**Roles**:
OM = Office Manage, AOM = Assistant Office Manager.

**Input**: List of orders.

| Step| Action | AOM | OM | Output | Tool | Exception |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Create an invoice per order | R | A | Created and authorized invoices | Order file | |
| 2 | Archive a copy of the invoice | R | | Archived copy | Accounts Receivable unpaid | |
| 3 | Send the invoice to the customer | R | I | Invoice sent | |
| 4 | Book the invoice | R | A | Booked invoice | General ledger |
| 5 | Book the paid invoice | R | A | Paid invoice | Bank records, General ledger | |
| 6 | Archive the paid invoice | R | I | Archived invoice | Accounts Receivable paid |
| 7 | Check unpaid invoices | | R | List of unpaid invoices to contact customer | Note in CRM system |

**RASCI**
- R = Responsible, the entity who is responsible for the execution of the activity.
- A = Approves, the entity who approves the result before going to the next step.
- S = Supports, the members of the team.
- C = Consults, an entity.
- I = Informed, notify the entity about the result.


Let's see how we can automate the procedure with Julia. We tackle it with a technique of Domain-Driven Design and the Onion architecture.

---

## The procedure as an activity diagram

The activity diagram represents an API-layer. The actions are Julia functions. You can add types to arguments and return value in Julia, noted by a double colon (::) followed by the name of the type. This defines the domain entities, e.g., `::OpenCourseOrder, ::UnpaidInvoice`.

Equal sign bars (======) represents forking, and joining. Here we can determine which tasks can run in parallel.

```
    ○ List(::OpenCourseOrder)
    ↓
  create(::OpenCourseOrder)::UnpaidInvoice
    ↓
    ===========================
    ↓                         ↓
    archive(::UnpaidInvoice)  create(::UnpaidInvoice)::PDF  
    ↓                         ↓
    ===========================
    ↓
    send_email(::UnpaidInvoice, ::PDF)
    ↓
    post(::UnpaidInvoice)::JournalStatement # to General Ledger
    ↓
↻   ⋄ last Order?
    ↓ yes
    ◉


    ○ List(::BankStatement)
    ↓
  find(::BankStatement)::UnpaidInvoice
    ↓
    ⋄ UnpaidInvoice found?
↻   ↓ yes
    create(::UnpaidInvoice, ::Bankstatement)::PaidInvoice
    ↓
    ===========
    ↓         ↓
    archive   post_journalstm(::PaidInvoice)::JournalStatement
    ↓         ↓   
    ===========
    ↓
↻   ⋄ last BankStatement ?
    ↓ yes
    build_report_unpaid_invoices, when payment term is overdue.
    ↓
    send_report
    ↓
    ◉  
```

## The design

From the activity diagram we get:

### Domain

The domain objects (types) are:

Domain Types:
- Invoice¹.
- UnpaidInvoice <: Invoice.
- PaidInvoice <: Invoice.

External types
- Sales.OpenCourseOrder².
- GeneralLedger.BankStatement³.
- GeneralLedger.JournalStatement³.
- GeneralLedger.JournalStatement³.

General Types:
- DataFrame⁴

¹ Abstract Type.

² Defined in the module Sales. We iterate on a list of orders that we will create in the test code to simplify the course.

³ Defined in the module GeneralLedger.

⁴ In the module DataFrames, delivered with Julia.

### API Invoicing

The API contains the methods (functions) of the module. The methods use only elements from the core or domain. An overview of we need:

- create(order::Order)::UnpaidInvoice
- create(::UnpaidInvoice)::PaidInvoice
- create(::Invoice)::JournalStatement

We define and create the `Order, with the Training, Company, Contact, and Student` objects in the test code to simplify the course.

[DataFrames.jl](SQLite, tableName),  makes it easy to work with data.

### Methods of Infrastructure layer:

Database:
- connect(path::String)::SQLite.DB
- save(db::SQLite.DB, tablename::String, invoice::Array{Invoice, 1})
- read(db::SQLite.DB, tablename::String, selection::String)::DataFrame

DBAdapter:
- archive(invoice::Invoice, save(db::SQLite.DB, tablename::String, invoice::Invoice))
- find(Invoice.id, read(db::SQLite.DB, tablename::String, "item='$Invoice.id'"))::DataFrame

Email:
- to_pdf(invoice::Invoice, filename::String)::File
- send(invoice::Invoice, filename::String)
- send(report::DataFrame)

[SQLite.jl](https://juliadatabases.github.io/SQLite.jl/stable/) is the Julia package for SQLite, which we will use in the course. You can use it as an on-disk database file, but also as an in-memory database. The last option is ideal for testing.

## Application infrastructure

```
                               +-----------+
                               | 1. Master |
                               +-----------+
                                     ↓
                                     ◊
   OpenCourseOrder / BankStatement  ↙ ↘  JournalStatement
                   +--------------+     +--------------------+
                   | 2. Invoicing |     | 3. General Ledger  |   Workers
                   +--------------+     +--------------------+
                          ↓
                   JournalStatement
```
1. Master \- Runs in a container.
2. Worker Invoicing \- Function, see [Activity diagram](#Activity-diagram-1), runs in a container.
3. Worker General Ledger \- Dummy, runs on a core.


## ToDo

- Thinking of Literate.jl as a package to make PDFs.
- How to attach a PDF to an email?
- How to send an email?
- [SMTPClient.jl](https://github.com/aviks/SMTPClient.jl)
