# 8. Documenting your code

Under development!

### What you will learn

```@contents
Pages = ["chapter8.md"]
```

## An example

You can document your code, which the user can see when one uses Julia's help. Place the whole between three quotation marks, just above a function. The first line starts with four spaces, followed by the syntax of the function. On the next lines, you can tell what it does.

You can also use an example. Start with `# Example` with on the next lines the case enclosed between three back-ticks. It can be the code you copied from the REPL.

*Example*
```
"""
    create(order::Order, invoice_id::String)::UnpaidInvoice

Create an UnpaidInvoice from an AppliSales.Order

# Example
````jldoctest #1 #2
julia> using AppliInvoicing

julia> using AppliSales

julia> orders = AppliSales.process()

julia> invnbr = 1000

julia> invoices = [create(order, "A" * string(global invnbr += 1)) for order in orders]
```` #1
"""
create(order::Order, invoice_id::String)::UnpaidInvoice = begin
    meta = MetaInvoice(order.id, order.training.id)
    header_invoice = Header(
            invoice_id, order.org.name, order.org.address, order.org.zip, order.org.city, order.org.country, order.order_ref, order.contact_name, order.contact_email)
    body_invoice = OpentrainingItem(order.training.name, order.training.date, order.training.price, order.students)
    return UnpaidInvoice(invoice_id, meta, header_invoice, body_invoice)
end
```
\#1 - Replace the four back-ticks by **three** back-ticks.

\#2 - [documenter.jl](https://github.com/JuliaDocs/Documenter.jl) tests the code when it encounters `jldoctest`.

## Activity 8.1 - Using Help

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Start Julia | |
| 2 | julia> ]    | Activate Package Manager. |
| 3 | pkg> add https://github.com/rbontekoe/AppliInvoicing.jl | Add AppliInvoicing. Use `update` when you already added the package. |
| 4 | pkg>  Ctrl-C | Back to Julia. |
| 5 | julia> using AppliInvoicing | |
| 6 | Julia> ? | Go to the Help mode. |
| 7 | help?> create | Search for the `create` functions. Julia displays two `create` methods. |

The first method is `create(order::Order, invoice_id::String)::UnpaidInvoice`:

```
search: create searchsortedlast

  create(order::Order, invoice_id::String)::UnpaidInvoice

  Create an UnpaidInvoice from an AppliSales.Order

  Example
  ≡≡≡≡≡≡≡≡≡

  julia> using AppliInvoicing

  julia> using AppliSales

  julia> orders = AppliSales.process()

  julia> invnbr = 1000

  julia> invoices = [create(order, "A" * string(global invnbr += 1)) for order in orders]

  ───────────────────────────────────────────────────────────────────

```

| Step | Action | Comment |
| :--- | :--- | :--- |
| 8 | Select the code under example to the clipboard| Including the `julia>` prompts.|
| 9 | Ctrl-C | Copy the code to the clipboard. |
| 9 | julia> Ctrl-V | Paste the code at the `julia>` prompt. Immediately, Julia executes the code. |
