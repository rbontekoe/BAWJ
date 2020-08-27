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

A code fragment the API sub-module to creating an unpaid invoice from an order. See [AppliAR.jl/src/api/API.jl](https://github.com/rbontekoe/AppliAR.jl/blob/master/src/api/API.jl) for the complete code of the API layer.

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

In [Case Study Part One](../chapter8/index.html#.1-Case-Study-Part-One-Redefining-BodyItem-as-a-Concrete-Datatype-1) we decided to keep `OpentrainingItem` and create another data type `InvoiceItem`.

```
struct InvoiceItem <: BodyItem
    _prod_code::String
    _qty::Float64
    _descr::Array{String, 1}
    _unit_price::Float64
    _vat_perc::Float64
		# constructors
	  InvoiceItem(code, qty, descr, unit_price) = new(code, qty, descr, unit_price, 0.21)
	  InvoiceItem(code, qty, descr, unit_price, vat_perc) = new(code, qty, descr, unit_price, vat_perc)
end
```

## Advantage of API as Sub-Module.

The statement `export create, conv2entry` works for me as an interface.

The Infrastructure layer uses these methods.  Of course, I must maintain the current signatures. But I can change the code with no penalties.

And, I can create new methods with the same names but with a different signature, when I have to add other types of invoice items to the body. To differentiate between the different types, I use an extra type parameter.

In the next example it is the type `AppliSales.Training` but I can follow the same strategy for `AppliSales.Incompany` and `AppliSales.Book` when they exist.

```
create(type::AppliSales.Training, order::Order, invoice_id::String)::UnpaidInvoice = begin
	meta = MetaInvoice(order.id, order.training.id)
  header_invoice = Header(
		  invoice_id, order.org.name, order.org.address, order.org.zip, order.org.city, order.org.country, order.order_ref, order.contact_name, order.contact_email)

	# compose the description for the invoice
	students = "Attendees: " * reduce((x, y) -> x * ", " * y, order.students)
	description  = [order.training.name, "Date: " * string(Date(order.training.date)), students]

	body_invoice = InvoiceItem(
		order.training.name, # code
		length(order.students), # quantity
		description, # descr
		order.training.price # unit_price
	)

	return UnpaidInvoice(invoice_id, meta, header_invoice, body_invoice)
end
```

And, I should not forget to export `InvoiceItem` in the Domain module.

```
export OpentrainingItem, name_training, date, price_per_student, students, vat_perc
export InvoiceItem, code, descr, unit_price, qty, vat
```

## Exercise 9.1 - Change the code according to case study one and two

- Go to a folder, for example `projects`.
- Clone AppliAR.jl.

```
$ git clone https://github.com/rbontekoe/AppliAR.jl.git
```

- Enter the folder AppliAR.jl and start Atom/Juno.
- Start the Julia REPL.
- Activate the local environment and run the test.

```
pkg> activate .

pkg> test AppliAR
```

- Close Atom/Juno.
- Start a development branch. Creating a branch in git give you the possibility to experiment.

```
$ git branch dev

$ git checkout dev

$ git status
```

- Start Atom/Juno.
- Make the changes according to [Case Study Part One](../chapter8/index.html#.1-Case-Study-Part-One-Redefining-BodyItem-as-a-Concrete-Datatype-1). Export InvoiceItem and functions in `Domain.jl`.
- Change the data types of the field 'body' in `UnpaidInvoice` and `PaidInvoice` to the abstract type `BodyItem`.
- Add the new create-function to the API according to Case Study Part Two.
- Add `Training` to the import statement of AppliSales in API.jl and instantiate AppliSales.

```
import AppliSales: Order, Training

using AppliSales
```

- Run the test again.

```
pkg> test AppliAR
```

## To Redefine

- When everything is working well merge your changes into the master branch.

```
$ git git checkout master

$ git merge dev

$ git branch -d dev # remove the dev branch
```

- run the tests again.

!!! info
    When you cooperate with others on a project you can create a [Pull Request (PR)](https://hackernoon.com/how-to-git-pr-from-the-command-line-a5b204a57ab1) with your motivation to merge your changes.
