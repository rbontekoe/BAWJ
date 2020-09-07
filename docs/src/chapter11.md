# 11. The Sub-module Infrastructure

UNDER DEVELOPMENT!

The Infrastructure consists of elements and functions that use the domain and API elements as outlined in chapter 7 [Methods of the Infrastructure Layer](../chapter7/index.html#Methods-of-the-Infrastructure-Layer-1).

- Process an order to create unpaid invoices.
- Process bank statements to create paid invoices.
- Produce journal entries for the general ledger.
- Retrieve unpaid and paid invoices.

### Contents

```@contents
Pages = ["chapter11.md"]
```

## Infrastructure.jl

A partial overview of the Infrastructure module. See [AppliAR.jl/src/infrastructure/Infrastructure.jl](https://github.com/rbontekoe/AppliAR.jl/blob/master/src/infrastructure/Infrastructure.jl) for a complete list.

```
module Infrastructure

include("./db.jl") #1
include("./doc.jl") #2

using ..AppliAR #3

using CSV #4

import ..AppliAR: Domain, API #5
using .Domain
using .API

import AppliSales: Order #6
import AppliGeneralLedger: JournalEntry #7
using Dates

export process, read_bank_statements, retrieve_unpaid_invoices, retrieve_paid_invoices #8
```
\#1 File with database functions. For now we serialize the objects and save them in a text file.

\#2 The Infrastructure Julia documentation.

\#3 Instantiates of the main module

\#4 We use this package ti read CSV-files.

\#5 Instantiates of the sub-modules `API` and `Domain`. The sub-module `Infrastructure` has access to the exported API and Domain elements.

\#6 Reference to Order.

\#7 Reference to `JournalEntry`.

\#8 Functions that are directly accessible to others.


## Method process

In [The Procedure as an Activity Diagram](../chapter7/index.html#The-Procedure-as-an-Activity-Diagram-1) of chapter 7 we sketched the workflows. Here you can see the implementation of the workflow when an order is received.

```
process(orders::Array{Order, 1}; path=FILE_UNPAID_INVOICES) = begin
    # get last invoice number
    try
        read_from_file(FILE_INVOICE_NBR)
    catch e
        add_to_file(FILE_INVOICE_NBR, [START_INVOICE_NBR])
    end

    invnbr = last(read_from_file(FILE_INVOICE_NBR))

    # create invoices
    invoices = [create(order, "A" * string(invnbr += 1)) for order in orders]

    # save invoice number
    add_to_file(FILE_INVOICE_NBR, [invnbr])

    # archive invoices
    add_to_file(path, invoices)

    # create journal entries from invoices
    return entries = [conv2entry(inv, AR, SALES) for inv in invoices]

end # process orders
```

The function has a named argument `path` that is used to store the created invoices. The default file name is `test_invoicing.txt` and is used for testing purposes. For production purposes you have to specify a different name to prevent the file from being erased when you run the tests.

## Case Study Part Three - Replace OpentrainingItem by InvoiceItem

To keep it 'relatively simple' we replace `OpentrainingItem` by `InvoiceItem`.

## Exercide 10.1 - Changes for using InvoiceItem

The steps to be taken.
1. In the sub-module Domain, we remove `OpenTrainingItem` and the field methods (name_training,
date, price_per_student, students, vat_perc).
2. In the API sub-module we remove `create(order::Order, invoice_id::String)::UnpaidInvoice `.
3. In the sub-module API, we change the code of two `conv2entry` methods.
4. In the sub-module Infrastructure, we make all methods suitable for `InvoiceItem`.
5. Test the changes.
6. Change the test code in `runtests.jl`.

#### Step 1 - Remove `OpenTrainingItem`
- Go to the sub-module Domain and put `#=` and `=#` around `OpentrainingItem`.
- Put a `#` before the methods (name_training, date, price_per_student, students, vat_perc) to retrieve the Opentraining fields.
- Put a `#` before the the line that starts with `export OpentrainingItem`.

#### Step 2 - Remove `create(order::Order, invoice_id::String)`
- Put `#=` and `=#` around the method `create(order::Order, invoice_id::String)::UnpaidInvoice`.

#### Step 3 - Change the code of `conv2entry`

- Replace in both methods `conv2entry` the line `debit = price_per_student(b) * length(students(b))` by

```
debit = unit_price(b) * qty(b)
```

- Replace in both methods `conv2entry` the line `descr = name_training(b))` by:

```
descr = code(b)
```

#### Step 4 - Make all methods suitable for `InvoiceItem`

- In sub-module Infrastructure, change the code of the first method process where the invoices are created by

```
# create invoices
invoices = [(create(getfield(order, fieldnames(typeof(order))[3]), order, "A" * string(invnbr += 1))) for order in orders]
```

#### Step 5 - Test the changes.
- Create a file `test.jl` with the next code and test it line by line.

```
using Pkg; Pkg.activate(".")

using AppliAR
using AppliSales

import AppliAR: Domain, API
using .Domain, .API

orders = AppliSales.process()

invnbr = 1000

invoices = [(create(getfield(order, fieldnames(typeof(order))[3]), order, "A" * string(global invnbr += 1))) for order in orders]

b = body(invoices[2])

descr(b)

AppliAR.process(orders)

unpaid_invoices = retrieve_unpaid_invoices()

stms =  read_bank_statements("./bank.csv")

AppliAR.process(unpaid_invoices, stms)

```

#### Step 6 - Change the test code in runtests.jl

Change the testcode in `runtests.jl`.
