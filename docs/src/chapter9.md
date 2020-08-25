# 9. The API Sub-module

UNDER DEVELOPMENT!

The API consists of functions that operate on the domain elements, for example:

- Create an invoice from an order.
- Create a paid invoice from an unpaid invoice.
- Create a journal entry for the general ledger.

### Contents

```@contents
Pages = ["chapter9.md"]
```

## API.jl

Example for creating an unpaid invoice from an order.

```
include("./spec.jl")

import ..AppliAR: Domain
using .Domain #1

using Dates

import AppliSales: Order # Order is not exported but is refered to in the next function #2
import AppliGeneralLedger: create_journal_entry #3

export create, conv2entry


create(order::Order, invoice_id::String)::UnpaidInvoice = begin #4
    meta = MetaInvoice(order.id, order.training.id)
    header_invoice = Header(
		    invoice_id, order.org.name, order.org.address, order.org.zip, order.org.city, order.org.country, order.order_ref, order.contact_name, order.contact_email)
    body_invoice = OpentrainingItem(order.training.name, order.training.date, order.training.price, order.students)
	return UnpaidInvoice(invoice_id, meta, header_invoice, body_invoice)
end
```
\#1 The API layer can only use elements from the inner Domain layer.

\#2 Order is defined in the package AppliSales.

\#3 We `borrow` the function from the AppliGeneralLedger package. The API function `conv2entry` uses it to create JournalEntry's for the package. Our module depends on AppliSales and AppliGeneralLedger and must be defined in Project.toml.

\#4 The function that returns an `UnpaidInvoice`.

## Case Study Part Two - Redefining BodyItem as a Concrete Datatype

In [Case Study Part One](../chapter8/index.html#.1-Case-Study-Part-One-Redefining-BodyItem-as-a-Concrete-Datatype-1) we decided to replace `OpentrainingItem` by the to concrete prompted data type `BodyItem`.

```
students = "Attendees: " * reduce((x, y) -> x * ", " * y, order.students)
description  = [order.training.name, "Date: " * string(Date(order._date)), students]

body = BodyItem(
  order.training.name, # code
  length(order.students), # quantity
  description, # descr
  order._price_per_student, # unit_price
  order._vat_perc # vat
  )
```

## Advantage of API as Sub-Module.

The line `export create, conv2entry` works for me as an interface. The Infrastructure layer uses these functions. We can change the inner working without facing problems with the Infrastructure layer. We should not forget to export `BodyItem` in the Domain module.

```
#export OpentrainingItem, name_training, date, price_per_student, students, vat_perc
export BodyItem, code, descr, unit_price, quantity, vat
```

## Exercise 9.1 - Change the code according to case study one and two

- Go to the folder ~/.julia/dev/
- Clone AppliAR.jl: git clone https://github.com/rbontekoe/AppliAR.jl.git
- Start Atom/Juno
- Start the Julia REPL
- Activate the local environment (pkg> activate .)
- Run the tests (pkg> test AppliAR)
- Close Atom/Juno
- Create a git branch (git branch dev)
- Activate the branch (git checkout dev)
- Start Atom/Juno

Creating a branch in git give you the possibility to experiment.

- Make the changes according to case study one and two.
- Run the test again (pkg> test AppliAR).
- When everything is working well execute the following code from the master branch.

```
$ git git checkout master

$ git merge dev

$ git branch -d dev # remove the dev branch
```

- run the tests again.

When you cooperate ith others on a project you cav create a PR or [Pull Request](https://hackernoon.com/how-to-git-pr-from-the-command-line-a5b204a57ab1).
