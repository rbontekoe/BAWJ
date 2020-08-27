# 10. The Infrastructure Sub-module

UNDER DEVELOPMENT!

The Infrastructure consists of elements and functions that use the domain and API elements as outlined in chapter 7 [Methods of the Infrastructure Layer](../chapter7/index.html#Methods-of-the-Infrastructure-Layer-1).

- Process an order to create unpaid invoices.
- Process bank statements to create paid invoices.
- Produce journal entries for the general ledger.
- Retrieve unpaid and paid invoices.

### Contents

```@contents
Pages = ["chapter10.md"]
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


## process

In [The Procedure as an Activity Diagram](../chapter7/index.html#The-Procedure-as-an-Activity-Diagram-1) of chapter 7 we sketched the workflows. Here you can see the effect of the workflow when an order is received.

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

## Case Study 10.1 - Make Infrastructure ready for InvoiceItem
