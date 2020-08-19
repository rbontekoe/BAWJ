# 6. Accounts Package from a User Point of View

When you use `using <module name>` in your code the it makes the exported elements immediately accessible in the current scope. You can display the elements by typing `Account.` followed by pressing twice on the Tab-button.

In this chapter you will define which elements will be exported.

### Contents

```@contents
Pages = ["chapter6.md"]
```

## Accounts.jl

```
module Accounts

export EMAIL, WORK # Domain #1
export create # API #2
export add_to_file, read_from_file # Infrastructure #3

include("Domain.jl"); using .Domain
include("API.jl"); using .API
include("Infrastructure.jl"); using .Infrastructure

end
```
\#1 EMAIL and WORK are values we need in the create-function.

\#2 The user needs create to create addresses and persons

\#3 The function to store and retrieve persons.

## Activity 6.1 - Export elements

In this activity you define which functions, enumerated values, and DataType are immediately available.

#### Prerequisites
- Ubuntu 20.04.
- Julia 1.5 installed.
- Atom/Juno installed.
- Git installed.
- The finished exercise [Exercise 5.1 - Adding the sub-module Infrastructure](../chapter5/index.html#Exercise-5.1-Adding-the-Sub-module-Infrastructure.-1)

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ cd ~/.julia/dev/Accounts | Go to the Acoounts project folder. |
| 2 | $ atom . | Start Atom/Juno. |
| 3 | Open the file Accounts.jl |  |
| 4 | Remove the hashtags | Accordingly to the section [Accounts.jl](#Accounts.jl-1) |
| 5 | Ctrl-S | Save the file. |
| 6 | Ctrl-D | Close Julia. |
| 7 | Press: <Enter> | Start Julia REPL. |
| 8 | julia> ] | Start the package manager. |
| 9 | pkg> activate . | Open Accounts environment. |
| 10 | Press: <BackSpace> |  |
| 11 | julia> using Accounts | Lead Accounts module. |
| 12 | julia> Accounts. <Tab><Tab> | Display exported elements. |

```
julia> Accounts.
API            Domain          EMAIL           Infrastructure  WORK            
add_to_file     create        eval            include         read_from_file

## test_accounts.jl
```

## test_accounts.jl

```
using Pkg; Pkg.activate(".")

using Accounts

@info("With DataFrames you can manpulate data")
try
  using DataFrames
catch e
  Pkg.add("DataFrames")
  using DataFrames
end

mm_email = create(EMAIL, "mickey@duckcity.com")
dd_email = create(EMAIL, "donald@duckcity.com")
dd_work = create(WORK,
  """
  Magic Kingdom
  1180 Seven Seas Dr
  Lake Buena Vista
  FL 32830
  United States
  """
)

dd_addresses = [dd_email, dd_work]

donald = create("Donald Duck", dd_addresses)
mickey = create("Mickey Mouse", [mm_email])

@info("Save and retrieve the data")

const FILE_ACCOUNTS = "./test_accounts.txt"

@info("Add Donald and Mickey to a file")
add_to_file(FILE_ACCOUNTS, [donald, mickey])

@info("Read the data from the file and pass it to a DataFrame")
df = read_from_file(FILE_ACCOUNTS) |> DataFrame

# @info("Describe DataFrame df")
# println(describe(df))

@info("Show some data")
println(df.name)

@info("Print all rows")
println(df[:, [:created, :name]])

@info "Add a column email"
df[!, :email] = map(x -> (filter(y -> y.address_type == EMAIL, x))[1].address, df[:, :addresses])
println(df[:, [:created, :name, :email]])

@info("Remove the file $FILE_ACCOUNTS")
try
  rm("$FILE_ACCOUNTS") # remove file
  @warn("File $FILE_ACCOUNTS removed from disk")
catch e
  @warn(e.msg)
end
```

## Activity 6.2 - Test the Module

#### Requisites
- Ubuntu 20.04.
- Julia 1.5 installed.
- Atom/Juno installed.
- Git installed.
- GitHub repository of Accounts is available.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ cd projects | Create the folder `projects` when it doesn't exist. |
| 2 | $ mkdir TestAccounts |  |
| 3 | # cd TestAccounts |  |
| 4 | atom . |  |
| 5 | Juno > Open REPL |  |
| 6 | Press: Enter-button |  |
| 7 | julia> ] |  |
| 8 | pkg> activate . |  |
| 9 | (TestAccounts) pkg> add https://github.com/<your account name>/Accounts.jl | Download the package. Use `rbontekoe` in case you doesn't have a GitHub repository of Accounts yourself. |
| 10 | Press: BackSpace-button | Return to Julia. |
| 11 | File > New File | Create a new file, e.g. test_accounts.jl. |
| 12 | Press: <Enter> | Create the file. |
| 13 | Ctrl-S | Save the file. |
| 15 | Paste the code under the section [test_ accounts.jl](#test_accounts.jl-1) in the file |  |
| 16 | Use repeatably `Shift-Enter` to execute the lines | Run the code line by line. |

The output looks like:

```
environment at `~/.julia/dev/Accounts/Project.toml`
[ Info: With DataFrames you can manpulate data
[ Info: Save and retrieve the data
[ Info: Add Donald and Mickey to a file
[ Info: Read the data from the file and pass it to a DataFrame
[ Info: Show some data
["Donald Duck", "Mickey Mouse"]

[ Info: Print all rows
│ Row │ created                 │ name         │
│     │ Dates.DateTime          │ String       │
├─────┼─────────────────────────┼──────────────┤
│ 1   │ 2020-08-19T12:07:12.236 │ Donald Duck  │
│ 2   │ 2020-08-19T12:07:12.605 │ Mickey Mouse │

[ Info: Add a column email
2×3 DataFrame
│ Row │ created                 │ name         │ email               │
│     │ Dates.DateTime          │ String       │ String              │
├─────┼─────────────────────────┼──────────────┼─────────────────────┤
│ 1   │ 2020-08-19T12:07:12.236 │ Donald Duck  │ donald@duckcity.com │
│ 2   │ 2020-08-19T12:07:12.605 │ Mickey Mouse │ mickey@duckcity.com │

[ Info: Remove the file ./test_accounts.txt
┌ Warning: File ./test_accounts.txt removed from disk
└ @ Main ~/.julia/dev/Accounts2/src/test_accounts.jl:56
```

## runtest.jl

```
using Accounts
using Test

const FILE_ACCOUNTS = "./test_accounts.txt"

@testset "Accounts.jl" begin
    donald_email = create(EMAIL, "donald@duckcity.com")
    donald = create("Donald Duck", [donald_email])
    add_to_file(FILE_ACCOUNTS, [donald])
    result = read_from_file(FILE_ACCOUNTS)
    first_person = result[1]
    @test first_person.addresses[1].address == "donald@duckcity.com"
    cmd = `rm $FILE_ACCOUNTS` # linux remove file statement
    run(cmd) # remove file
end
```

## Exercise 6.1 - Redefine runtests.jl

In this exercise you run a test in the folder `TestAccounts` again with the modified Accounts module.
1. Return to the Accounts development environment and change the contents of `Accounts.jl` conform the section [runtest.jl](#runtest.jl-1).
2. Go to the package manager and run `test Accounts`.
3. Got to the folder `TestAccounts`, start Atom/Juno and activate the `TestAccounts` environment. Run first `update Accounts` and next `test Accounts`. Run your test software.
