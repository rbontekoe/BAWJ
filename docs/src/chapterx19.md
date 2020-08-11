# 19. Activity diagrams

Old stuff I want to keep!

## General Ledger - workflow

```
⚉ process(entries::JournalEntry)
↓
archive(::Array{JournalEntry})
↓
book(::Array{JournalEntry)::Array{Record}
↓
◉
```

## Sales - workflow

```
⚉ process()::Array{:Order}
↓
create_training()::Training
↓
create_org()::Organization
↓
create_order()::Order
↓
◉
```
