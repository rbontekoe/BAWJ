# 1 - The Application

## The Application Architecture

We will look at in this course at the module AppliAR.jl. AR is short for Accounts Receivable. We test the module with two supporting packages: AppliSales.jl and AppliGeneralLedger.jl

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
- The ARActor (Accounts Receivable) uses the Applijl module to process orders and bank statements and sends journal entries to the GLActor.
- GLActor uses the AppliGeneralLedger package and turns journal entries into general legder statements.

I use the word package for an official registered Julia [module](https://docs.julialang.org/en/v1/base/base/#module). A module is Julia code with a clearly defined boundary. We can achieve it by using the [onion architecture](https://www.thinktocode.com/2018/08/16/onion-architecture/).

The [example](https://www.appligate.nl/AppliAR.jl/stable/chapter4/) on AppliAR.jl page shows a case with docker containers.
