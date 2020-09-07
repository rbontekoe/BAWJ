# 12. The Main-module AppliAR.jl

UNDER DEVELOPMENT!

We have decided to replace `OpentrainingItem` by `InvoiceItem`:

1. Change `training_id` to `prod_code` in MetaInvoice.
2. Modify the main package `AppliAR.jl`.
3. Test the changes.
4. Push our changes to the Master branch.

### Contents

```@contents
Pages = ["chapter12.md"]
```


## Step 1 - Modify MetaInvoice

- Modify `MetaInvoice` according to the next code:

```
struct MetaInvoice <: Structure
  _order_id::String
  _prod_code::String #1
  _date::DateTime
  _currency::String
  _currency_ratio::Float64
  # Constructors
  #MetaInvoice(order_id, training_id) = new(order_id, training_id, now(), "€", 1.0)
  #MetaInvoice(order_id, training_id, date, currency, currency_ratio) = new(order_id, training_id, now(), currency, currency_ratio)
	MetaInvoice(order_id, prod_code) = new(order_id, prod_code, now(), "€", 1.0) #1
  MetaInvoice(order_id, prod_code, date, currency, currency_ratio) = new(order_id, prod_code, now(), currency, currency_ratio) #1
end # MetaInvoice
```
\#1 `_training_id` is changed to `_prod_code`.

- Change `training_id(m::MetaInvoice)` to `prod_code(m::MetaInvoice)`

```
#training_id(m::MetaInvoice)::String = m._training_id
prod_code(m::MetaInvoice)::String = m._prode_code
```

## Step 2 - Change AppliAR.jl

- Change `OpentrainingItem` to `InvoiceItem` in `AppliAR.jl`.

```
module AppliAR

import AppliSales: Order
import AppliGeneralLedger: JournalEntry

# main methods
export process, retrieve_unpaid_invoices, retrieve_paid_invoices, read_bank_statements

# methods to retrieve values from fields
export UnpaidInvoice, PaidInvoice, meta, header, body, id
export PaidInvoice, stm
export BankStatement, date, descr, iban, amount
export MetaInvoice, order_id, training_id, date, currency, currency_ratio
export Header, invoice_nbr, name, address, postal_code, city, country, order_ref, name_contact, email_contact
#export OpentrainingItem, name_training, date, price_per_student, students, vat_perc #1
export InvoiceItem, code, descr, unit_price, qty, vat_perc #2

# instantiate the sub-modules
include("./domain/Domain.jl"); using .Domain
include("./api/API.jl"); using .API
include("./infrastructure/Infrastructure.jl"); using .Infrastructure
```
\#1 Promote line to a comment.

\#2 Replace `OpentrainingItem` by `InvoiceItem`.

## Step 3- Test the Changes.
- Create a file `test2.jl` with the next code and test it line by line.

```
using Pkg; Pkg.activate(".")

using AppliAR

using AppliSales

orders = AppliSales.process()

entries1 = AppliAR.process(orders)

unpaid_invoices = retrieve_unpaid_invoices()

stms =  read_bank_statements("./bank.csv")

entries2 = AppliAR.process(unpaid_invoices, stms)

```

## Step 4 - Push your Changes to the Master Branch

- When everything is working well merge your changes into the git master branch.

```
$ git git checkout master

$ git merge dev

$ git branch -d dev # remove the dev branch, be careful!!!
```

When you have made changes to the master branch in the meantime then start with rebasing the `dev` branch.

```
$ git checkout dev

$ git rebase master
```

- run the tests again.

!!! info
    When you cooperate with others on a project you can create a [Pull Request (PR)](https://hackernoon.com/how-to-git-pr-from-the-command-line-a5b204a57ab1) with your motivation to merge your changes.
