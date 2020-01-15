# Chapter 19 \- Activity diagrams

## General Ledger - workflow

```
  ⚉
  ↓
process(entries::JournalEntry)
  ↓
  archive(::Array{JournalEntry})
  ↓
  book(::Array{JournalEntry)::Array{Record}
  ↓
  ◉
```

## Sales

```
  ⚉
  ↓
process()::Array{:Order}
  ↓
  ◉
```
