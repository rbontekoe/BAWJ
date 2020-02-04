# 5. Creating modules

UNDER DEVELOPMENT!

### What you will learn

```@contents
Pages = ["chapter5.md"]
```

Nowadays, applications are modular. We switched from monolithic applications to small, collaborated stand-alone applications that run in containers, micro-services. They are more scalable, and you can develop and roll them out independently. The programming language for a particular module depends on the expertise of the developer.

In this chapter, we start with the simplified [general ledger](https://en.wikipedia.org/wiki/General_ledger) module. The invoicing module sends journal statements to the general ledger module, which stores them in the journal. We split it into the sub-ledgers tax, sales, and accounts receivable debit in the case of an unpaid bill. And we brake it down to the sub-ledger bank and accounts receivable credit.

When we understand the rules for developing a module, we create the module for the Invoicing module.

## Domain.jl

```
struct JournalStatement
    period::Int64
    stm_nbr::Int64
    date::Date
    invoice_nbr::String
    from::Int64
    to::Int64
    debit::Float64
    credit::Float64
    vat::Float64
    descr::String
    # constructors
    JournalStatement(period, stm_nbr, date, invoice_nbr, from, to, debit, credit, vat, descr) =
    new(period, date, stm_nbr, invoice_nbr, from, to, debit, credit, vat, descr)
end

struct Record
    accountid::Int64
    date::DateTime
    customerid::String
    invoice_nbr::String
    stm_nbr::String
    debit::Float64
    credit::Float64
    descr::String
end

struct Account
    id::Int64
    name::String
end
```

goto your develpment folder
start julia
]
generate AppliGeneralLegder
Crtl-C, Ctrl-D
cd AppliGeneralLegder
goto GitHub
new
create AppliGeneralLegder.jl
echo "# AppliGeneralLegder.jl" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/rbontekoe/AppliGeneralLegder.jl.git

git push -u origin master
Username for 'https://github.com': rbontekoe
Password for 'https://rbontekoe@github.com':
Counting objects: 3, done.
Writing objects: 100% (3/3), 239 bytes | 239.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/rbontekoe/AppliGeneralLegder.jl.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.


create domain/domail.jl
create api/api.jl

select domain.jl
copy domain.jl


## api.jl
```
create_account(id, name) = Account(id, name)

create_record(accountid, date, customerid, invoice_nbr, stm_nbr, debit, credit, descr) =
    Record(accountid, date, customerid, invoice_nbr, stm_nbr, debit, credit, descr)

create_journal_statement(period, stm_nbr, date, invoice_nbr, from, to, debit, credit, vat, descr) =
    JournalStatement(period, stm_nbr, date, invoice_nbr, from, to, debit, credit, vat, descr)
```

## infrastructure.jl
```

```

## Export

## Course

## Registration
