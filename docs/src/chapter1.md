# 1. The Final Application

## The Application Architecture

We will look in this course at the module AppliAR.jl. To gain some experience we begin with building the module `Accounts.` in chapter 2.

AR is short for Accounts Receivable. We test the module with two supporting packages: AppliSales.jl and AppliGeneralLedger.jl.

The application architecture is based on the **actor model**. The article [The actor model in 10 minutes](https://www.brianstorti.com/the-actor-model/) explains the model very well. The link comes from the [Rocket.jl](https://biaslab.github.io/Rocket.jl/stable/) documentation, the package we use to test our AppliAR.jl module.

```
                           StmActor
                              |
                              | BankStatement(s)
                              ↓       
       SalesActor -------> ARActor -------> GLActor
                  Order(s)    ↑    Entry(s)    ↑
                              ↓                ↓
                            Store            Store
```
Fig 1. The application architecture.

- The SalesActor uses the AppliSales package to send the orders to the ARActor.
- The StmActor reads a CSV file with bank statements and sends them to the ARActor.
- The ARActor (Accounts Receivable) uses the AppliAR.jl module to process orders and bank statements and sends journal entries to the GLActor.
- GLActor uses the AppliGeneralLedger package and turns journal entries into general ledger statements.

I use the word package for an official registered Julia [module](https://docs.julialang.org/en/v1/base/base/#module).

A module is Julia code with a clearly defined boundary. We use the [onion architecture](https://www.thinktocode.com/2018/08/16/onion-architecture/) to achieve it. The peels Domain, API, and Infrastructure are defined as sub-modules.

The [example](https://www.appligate.nl/AppliAR.jl/stable/chapter4/) on AppliAR.jl page shows the case with docker containers.

Before we discuss the application, you can gain some experience with building a module called `Accounts.`
