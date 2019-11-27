# 3 - Set-up the design

### What you will learn

```@contents
Pages = ["chapter3.md"]
```

We start with an procedure `Invoicing` we want to automate with Julia. Next, we will look at the requirements set by domain driven design. We end with the `design` we will implement.

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

## Domain Driven Design and Onion Architecture

The trend nowadays is to create application consisting of different unambiguous and autonomous units, running in containers:
- You can quickly up and downscale containers based on the demand.
- The software programmers can use their preferred programming language.
- A unit is the owner of its data.

The onion architecture lends itself perfectly to the domain-driven design pattern. If you look at the design like it's an onion, it's a core with peels around it. The base consists of Julia.

The next peel is the domain. There must be coherence between its elements. The experts in this field speak the same language and use the same terms. Most items here are objects. You only use constructs from the core.

The next layer is the API. Here you only use elements from the core and the domain. The API consists of the functions you use in your program.

The outer peel is the Infrastructure layer. Its the connection with the external world. It uses the elements in the domain and API and adapters to match differences in technologies.

An example is a REST request. If it is in JSON format, you have to convert it to a form you use in your software. After processing the inquiry, you turn it back to JSON. You can do so with adapters.

When you write you the software, you only use the functions in the API and the Infrastructure layers.

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

- Message.
- Invoice.
- InvoiceStatus: UNPAID, PAID.
- JournalRecord.

### API Invoicing

The API contains the methods (functions) of the module. The methods use only elements from the core or of the domain. An overview of what I think we need:

- createInvoice(id::String, company::Company, order::Order, students::Array(String, 1))::Invoice
- updateInvoiceStatus(invoice::Invoice; status="PAID")::Invoice
- createJournalRecord(invoice::Invoice)::JournalRecord
- createJournalMessage(receiver::String, journalRecord::JournalRecord)::Message
- readCSV(file::String)::DataFrame
- findInvoice(df::DataFrame)::Invoice
- reportUnpaidInvoices(db::SQLiteDB, table::String)::Dataframe

[DataFrames.jl](SQLite, tableName),  makes it easy to work with data.

### Infrastructure

The methods of Infrastructure layer:

- connect(path::String)::SQLiteDB
- create(db::SQLiteDB, tableName::String, invoice::Invoice)
- gather(db::SQLiteDB, tableName::String, selection::String)::DataFrame
- createPDF(invoice::Invoice)::PDF
- sendInvoice(invoice::Invoice, pdf::PDF)

[SQLite.jl](https://juliadatabases.github.io/SQLite.jl/stable/) is the Julia package for SQLite, which we will use in the course. You can use it as an on-disk database file, but also as an in-memory database. The last option is ideal for testing.

I am thinking of Literate.jl as package to make PDFs.

ToDo:

- How to attach a PDF to an email?
- How to send an email?
