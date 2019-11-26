# 3 - Set up the design

### What you will learn

```@contents
Pages = ["chapter3.md"]
```

We start with an old procedure `Invoicing` we want to automate. Next, we will look at the requirements set by domain driven design. We end with the `design` we will implement.

## Procedures
In 1998 we were delivering Lotus Notes instructor-led training in the Netherlands. We were ISO-9001 certified. ISO is short for the International Organization for Standardization. A part of ISO is the section procedures.

A procedure describes a workflow. It specifies the activities to be carried out by people or machines and the resources that are required to produce a result.

An input triggers a process. The output of an process is called a deliverable. It can be a product or data.

The example I use in the course is the procedure `Invoicing`.

### The course example

The original procedure.

**Procedure**: Invoicing.

**Input**: A list of students who have shown up in the course-room.

| Nbr | Action\Person | AOM | OM | Output | Tool | Exception |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Create invoice per student | R | A | Created and authorized invoices | Order file | |
| 2 | Archive copy of invoice | R | | Archived copy | Accounts Receivable unpaid | |
| 3 | Send invoice to customer | R | I | Invoice sent | |
| 4 | Booking invoice account receivable | R | A | Booked invoice | General ledger |
| 5 | Book paid invoice | R | A | Paid invoice | General ledger | |
| 6 | Archive paid invoice | R | I | Archived invoice | Accounts Receivable paid |

**Roles**:
OM = Office Manage, AOM = Assistant Office Manager.

**Task**:
R = Responsible, A = Approves, S = Supports, C = Consults, I = Informed.

**Output**: A paid invoice.

Lets see how we can automate the procedure with Julia.

## Domain Driven Design

The trend nowadays is to create application consisting of different unambiguous and autonomous units, running in containers — not depending on other units:
- You can quickly up and downscale containers based on demand.
- The software programmers can use their preferred programming language.
- A unit is the owner of its data.

If you look at the design like it's an onion, it's a core with peels around it. The base consists of Julia.

The next peel is the domain. There must be coherence between its elements. The experts in this field speak the same language. Most items here are objects. You only use constructs from the core.

The next layer is the API. Here you only use elements from the core and the domain. The API consists of the functions you use in your program.

The outer peel is the Infrastructure layer. Its the connection with the external world. It uses the elements in the domain and API and adapters.

An example is a REST request. If it is in JSON format, you have to convert it to a form you use in your software. After processing the inquiry, you turn it back to JSON. You can do so with adapters. Formally it is called the Ports and Adapters Architecture.

When you write you the software, you only use these functions in the API and Infrastructure layers.

## A review of the procedure Invoicing

If I look at the Invoicing procedure, I see one domain:
- Account Receivable.

It receives information from the domain Training Delivery, which produces the list of students who have shown up in the course-room.

The resources are:
- Order file
- List bank records (CSV)
- General Ledger

Owner of:
- Invoiced unpaid
- Invoiced paid

Output
- Invoiced unpaid and paid for General Ledger.

### Summarized

We send the invoices to the customer by email. We store a (journalized?) copy of the invoices locally. We sent a journalized copy to General Ledger. We need:
-	Invoicing module/container,
- Dummy Order file module,
-	Dummy Training Delivery module,
-	Dummy General Ledger module.
- Bank records (CSV file).

## The design

### Domain

The domain objects are:
- InvoiceUnpaid
- InvoicePaid
- MessageListStudents

### API Invoicing

The API contains of the methods (functions) of the module and only use element of the core or the domain:
- create_invoice_unpaid
- send_invoice
- update_invoice_unpaid
- create_message_invoice
- read_csv
- find_invoice
- create_invoice_paid
- report
- connect_db
- create

### Infrastructure

- None for the time being
