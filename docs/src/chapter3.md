# 3 - Set-up the design

### What you will learn

```@contents
Pages = ["chapter3.md"]
```

First, let's look at some terms and definitions. Next, the procedure `Invoicing` that we will automate with Julia. Then, we take a look at the requirements set by domain-driven design. We close with the `design` to we will implement.

---

## Definitions

The points of attention are:
- Procedure,
- Controlleds process,
- Automatic process,
- Transaction data,
- Domain-driven design, and
- Style conventions.

### Procedure

A procedure is a description of work practice. It describes a series of actions in a particular order and interacts with people and machines. Actions make use of resources. Data, a service or a product, is the output of work.

A process is the realization of the procedure. There are controlled and automatic processes.

### Controlled process

A controlled process is activated by an input.

In the course, we look at a procedure `invoicing,` which is activated when it receives a list of attendees of a training course. It produces invoices and sends them to the organization that has registered the student. Journal records are sent to the general ledger application.

### Automatic process

An automatic process has a heartbeat that runs the process by itself and produces a continuous output.

In the course, we look at a process that takes pictures every five seconds of the hallway. When there is a noticeable difference with the previous image, it will be sent to another application for further analysis.

### Transaction data

Both processes generate a lot of data that can be stored in a file or database. They are the owner of that data. The data can be analyzed to make a prediction. Nowadays, machine learning, in particular, deep learning techniques, are used for these tasks.

In the case of the invoicing process, we could look at the trend of payment morale. In the case of the picture-taking process, we could determine whether the room is empty or not.

### Domain-driven design

Each process should be domain-specific. Subject matter experts and users of the domain speak the same language and use the same definitions and synonyms for concepts and objects. This leads to a Domain-driven design paradigm.

The Onion Architecture lends itself perfectly to the domain-driven design pattern. It divides domain-specific matters into four areas:
core,
domain,
API, and
infrastructure.

The core is the Julia language and libraries.

The next peel, the domain, defines and materializes domain objects and concepts.  Between its elements, there must be coherence. You only use constructs from the `core.` An invoice or an empty-room are examples.

The next layer is the API. The API consists of Julia functions that operate on the domain elements, and are used to create programs. You only use constructs from the `core and the domain.`

`process_list_of_attendees,` `create_invoice,` `create_pdf,` `create_empty_room` are examples.

 The infrastructure layer is the ultimate peel. The infrastructure has functions that communicate with the external world. Adapters are used to overcome mismatches between interfaces. When you write you the code, you use `elements from the inner layers.`

`create_list_of_attendees` is an example function that processes a REST POST-command.

### Style conventions

The style conventions in this course are described in [Blue: a Style Guide for Julia](https://github.com/invenia/BlueStyle).

---

## A procedure as a starting point
In 1994 we were delivering Lotus Notes instructor-led training in the Netherlands. We became ISO-9001 certified one year later. ISO is short for the International Organization for Standardization. A part of ISO is the section procedures.

A procedure describes a workflow. It specifies the activities to be carried out by people or machines and the resources that are required to produce a result.

An input triggers a process. Every action creates an output, which can be data, a product, or a service.

The example I use in the course is the procedure `Invoicing`.

### The course example

In 1998 we rewrote our procedures as a table. Every row represents an action. Next to the activities are the columns with roles involved with the work. We used the RASCI notation for the kind of task of a role:

| Abbr | Meaning | Description |
| :--- | :--- | :--- |
| R | Responsible | The person who is responsible for the execution of the activity. |
| A | Approves | The person who approves the result before going to the next step. |
| S | Supports | The members of the team. |
| C | Consults | The person or entity to be consulted. |
| I | Informed | The person to be notified about the result. |

---

**Procedure**: Invoicing.

**Roles**:
OM = Office Manage, AOM = Assistant Office Manager.

**Input**: A list of students who have shown up in the classroom.

| Step| Action | AOM | OM | Output | Tool | Exception |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Create an invoice per student | R | A | Created and authorized invoices | Order file | |
| 2 | Archive a copy of the invoice | R | | Archived copy | Accounts Receivable unpaid | |
| 3 | Send the invoice to the customer | R | I | Invoice sent | |
| 4 | Book the invoice | R | A | Booked invoice | General ledger |
| 5 | Book the paid invoice | R | A | Paid invoice | Bank records, General ledger | |
| 6 | Archive the paid invoice | R | I | Archived invoice | Accounts Receivable paid |

**End result**: A paid invoice.

Let's see how we can automate the procedure with Julia. We tackle it with a technique of Domain Driven Design and the Onion architecture.


## A review of the procedure Invoicing

Looking at the `Invoicing` procedure, I see one domain or department, namely `Account Receivable`. It receives information from the process `Training Delivery`, which produces the list of students who have shown up in the classroom.

The resources are:
- Order file.
- CSV list of bank records.
- General Ledger.

Owner of:
- Invoice

Output
- Journalized unpaid invoices for General Ledger.
- Journalized paid invoices for General Ledger.
- Report of unpaid invoices.
- Invoice as PDF.

### Summarized

We send the invoices to the customer by email. We store copies of the invoices locally. We sent a journalized copies to General Ledger. We need:

- Dummy Order file module.
- Dummy Training Delivery module.
- Dummy General Ledger module.
- Bank records file.

## The design

### Domain

The domain objects are:

- Invoice.
- InvoiceStatus: UNPAID, PAID.
- JournalRecord.

### API Invoicing

The API contains the methods (functions) of the module. The methods use only elements from the core or of the domain. An overview of what I think we need:

- create_invoice(id::String, company::Company, order::Order, students::Array(String, 1))::Invoice
- update_nvoice_status(invoice::Invoice; status="PAID")::Invoice
- create_journal_record(invoice::Invoice)::Journalrecord
- read_csv(file::String)::DataFrame
- find_invoice(df::DataFrame)::Invoice
- report_unpaid_invoices(db::SQLiteDB, table::String)::Dataframe

[DataFrames.jl](SQLite, tableName),  makes it easy to work with data.

### Infrastructure

The methods of Infrastructure layer:

- connect(path::String)::SQLiteDB
- create(db::SQLiteDB, tablename::String, invoice::Invoice)
- gather(db::SQLiteDB, tableName::String, selection::String)::DataFrame
- create_pdf(invoice::Invoice)::PDF
- send_invoice(invoice::Invoice, pdf::PDF)

[SQLite.jl](https://juliadatabases.github.io/SQLite.jl/stable/) is the Julia package for SQLite, which we will use in the course. You can use it as an on-disk database file, but also as an in-memory database. The last option is ideal for testing.

I am thinking of Literate.jl as package to make PDFs.

ToDo:

- How to attach a PDF to an email?
- How to send an email?
