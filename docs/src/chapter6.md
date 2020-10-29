# 6. Accounts Package from a User Point of View

With `using <module name>` in your code, you make the exported functions and types immediately accessible in the current scope. You can display the elements by typing `Account` followed by pressing twice on the Tab-button.

In this chapter, you define the functions and types that you want to export.

### Contents

```@contents
Pages = ["chapter6.md"]
```

## Accounts.jl

The modified main module with the exports enabled. The user can use the functions and types when he loads the `Accounts module`.

```julia
module Accounts

export EMAIL, WORK # from Domain #1
export create # from API #2
export add_to_file, read_from_file # from Infrastructure #3

include("Domain.jl"); using .Domain
include("API.jl"); using .API
include("Infrastructure.jl"); using .Infrastructure

end
```
\#1 EMAIL and WORK are values we need in the create-function.

\#2 The user needs to create addresses and persons

\#3 The functions are used to store and retrieve persons.

## Activity 6.1: Export Elements

In this activity you define which functions, and types are exported when a software programmer uses our module `Accounts`.

#### Prerequisites
- Ubuntu 20.04.
- Julia 1.5+ installed.
- VSCode installed.
- Git installed.
- The finished [Exercise 5.1 - Adding the sub-module Infrastructure](../chapter5/index.html#Exercise-5.1:-Adding-the-Sub-Module-Infrastructure)

In this activity you will:
1. [Modify Accounts.jl](#Step-1:-Modify-Accounts.jl.).
2. [Display the Exported Elements](#Step-2:-Display-the-Exported-Elements.).
3. [Update the GitHub Repository](#Step-3:-Update-the-GitHub-Repository.).

---

##### Step 1: Modify Accounts.jl.

The code contains already the export element, but the lines precede with hashtags. You remove the hash tags.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ cd ~/.julia/dev/Accounts | Go to the Accounts project folder. |
| 2 | $ code . | Start Atom/Juno. |
| 3 | Open the file Accounts.jl |  |
| 4 | Remove the hashtags | According to section [Accounts.jl](#Accounts.jl-1) |
| 5 | Ctrl-S | Save the file. |

##### Step 2: Display the Exported Elements.

| 1 | Ctrl+Shift-P | Show All Commands. |
| 2 | Select: Julia: start REPL | Start Julia REPL. The code will be recompiled. |
| 3 | julia> ] | Start the package manager. |
| 4 | pkg> activate . | Open the Accounts environment. |
| 5 | Press: <BackSpace> | Return to the REPL. |
| 6 | julia> using Accounts | Load the Accounts module. |
| 7 | julia> Accounts. <Tab><Tab> | Display the exported elements. DON'T FORGET the dot (.) after Accounts. |

```julia
julia> Accounts4.

API            EMAIL           WORK            create          include
Domain         Infrastructure  add_to_file     eval            read_from_file
```

##### Step 3: Update the GitHub Repository.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Shift+Ctrl-G| Open Git panel when closed. |
| 2 | Put the cursor in the field `Message (Ctrl+Enter to commit on `'Master'` |  |
| 3 | Type: Define export elements Account.jl |  |
| 4 | On the line Changes, select: + | Stage All Changes. |
| 5 | Click on: `Stage All` |  |
| 6 | At the top of the pane, click on: ✓ | Click on the checkmark ✓ (Commit) at the top. |
| 7 | Click on: ∙∙∙  | Open Views and More Actions menu. It is located in the upper right corner of the pane.  |
| 8 | Select: Push | Push your changes to GitHub. |
| 9 | Verify on GitHub whether you see the uncommented exports in Accounts.jl |  |

## test_accounts.jl

We use the package DataFrames in the example code. With DataFrames you can manipulate tabular data. See [DataFrames](https://en.wikibooks.org/wiki/Introducing_Julia/DataFrames) for more information.

The code first starts with loading DataFrames in a try-catch block. When the statement `using DataFrames` throws an error then it starts the package manager and loads the package.

The high order functions `map` and `filter` are used. [High order functions](https://sodocumentation.net/julia-lang/topic/6955/higher-order-functions) use functions as arguments and operates on collections. The functions are mostly anonymous is the form of `x -> <expression using x>` where `x` is a consecutive element of the collection.

```julia
using Pkg

Pkg.activate(".")

using Accounts

@info("With DataFrames you can manipulate data")
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

@info("Print all rows and two columns")
println(df[:, [:created, :name]])

@info "Add a column email"
df[!, :email] = map(x -> (filter(y -> y.address_type == EMAIL, x))[1].address, df[:, :addresses])
println(df[:, [:created, :name, :email]])

@info("Remove the file $FILE_ACCOUNTS")
try
  rm("$FILE_ACCOUNTS") # remove the file
  @warn("File $FILE_ACCOUNTS removed from disk")
catch e
  @warn(e.msg)
end
```

## Activity 6.2: Test the Module as User

Users add Julia packages they need for their application. It can also be Julia packages on GitHub that are not registered like our Accounts.jl module. You need the url of the package.

#### Requisites
- Ubuntu 20.04.
- Julia 1.5+ installed.
- VSCode installed.
- Git installed.
- GitHub repository of Accounts is available on GitHub.

In this activity you will:
1. [Add and Test the Module Accounts.jl from GitHub](#Step-1:-Add-and-Test-the-Module-Accounts.jl-from-GitHub.).
2. [Create a program that uses Accounts.jl](#Step-2:-Create-a-program-that-uses-Accounts.jl.).

---

##### Step 1: Add and Test the Module Accounts.jl from GitHub.

You can add package on GitHub. The package name must and on `.jl`. The add command of the package manager accepts a url as argument.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ cd projects | Create the folder `projects` when it doesn't exist. |
| 2 | $ mkdir TestAccounts |  |
| 3 | $ cd TestAccounts |  |
| 4 | $ code . | Start CVSCode. |
| 5 | Ctrl+Shift-P | Show All Commands. |
| 6 | Select: Julia: start REPL | Start Julia REPL. The code will be compiled. |
| 7 | julia> ] | Open package manager. |
| 8 | pkg> activate . | Activate local environment. |
| 9 | (TestAccounts) pkg> add https://github.com/<your account name>/Accounts.jl | Load the package. Use `rbontekoe` as an account name in case you don't have a GitHub repository of Accounts yourself. |
| 10 | (TestAccounts) pkg>test Accounts | Run the tests. |

```julia
Test Summary: | Pass  Total
Domain.jl     |    1      1
Test Summary: | Pass  Total
API.jl        |    1      1
Test Summary:     | Pass  Total
Infrastructure.jl |    1      1
    Testing Accounts tests passed
```

If you use `rbontekoe` as account name you get another message, because in [exercise 6.1](#Exercise-6.1:-Redefine-runtests.jl) you will change the test code:

```julia
Test Summary: | Pass  Total
Accounts.jl   |    1      1
    Testing Accounts tests passed 
```

##### Step 2: Create a program that uses Accounts.jl.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Press: <BackSpace> | Press the BackSpace button to return to Julia. |
| 2 | File > New File |  |
| 3 | Ctrl-S | Save the file and give it the name, e.g. test_accounts.jl. |
| 4 | Press: <Enter> | Create the file. |
| 5 | Paste the code under the section [test_ accounts.jl](#test_accounts.jl-1) in the file |  |
| 6 | Ctrl-S | Save the file. |
| 7 | Use repeatably `Alt-Enter` to execute the lines | Run the code line by line. |

The output looks like:

```julia
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

The modified `runtests.jl` file.

```julia
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

## Exercise 6.1: Redefine runtests.jl

In this exercise, you run a test in the folder `TestAccounts` again with the modified Accounts module.
1. Return to the Accounts development environment and change the contents of `Accounts.jl` conform the section [runtest.jl](#runtest.jl-1).
2. Go to the package manager and run `test Accounts`.
3. Push the changes to your GitHub repository.
4. Go to the TestAccounts folder, start VSCode and Julia and activate the next package manager commands:
- activate .
- status
- update Accounts
- test Accounts

```julia
(@v1.5) pkg> activate .
 Activating environment at `~/projects/TestAccounts/Project.toml`

(TestAccounts) pkg> status
Status `~/projects/TestAccounts/Project.toml`
  [c01e8521] Accounts v0.1.0 `https://github.com/rbontekoe/Accounts.jl#master`
  [a93c6f00] DataFrames v0.21.6

(TestAccounts) pkg> update Accounts
   Updating registry at `~/.julia/registries/General`
######################################################################## 100,0%
   Updating git-repo `https://github.com/rbontekoe/Accounts.jl`
Updating `~/projects/TestAccounts/Project.toml`
  [c01e8521] ~ Accounts v0.1.0 `https://github.com/rbontekoe/Accounts.jl#master` ⇒ v0.1.0 `https://github.com/rbontekoe/Accounts.jl#master`
Updating `~/projects/TestAccounts/Manifest.toml`
  [c01e8521] ~ Accounts v0.1.0 `https://github.com/rbontekoe/Accounts.jl#master` ⇒ v0.1.0 `https://github.com/rbontekoe/Accounts.jl#master`

(TestAccounts) pkg> test Accounts
    Testing Accounts

Test Summary: | Pass  Total
Accounts.jl   |    1      1
    Testing Accounts tests passed

```

You might decide to change the version number of the module, for example to 0.2.0. You change the version number in the file `Project.toml`.

```julia
name = "Accounts"
uuid = "c01e8521-f333-4719-ae6f-8e8181cc4e4d"
authors = ["Rob Bontekoe <rbontekoe@appligate.nl> and contributors"]
version = "0.1.0"
```

The version number consists of three parts, where the notation `x.y.z` has the following [meaning](https://stackoverflow.com/questions/2864448/best-practice-software-versioning):
- x = main version number, 0-~.
- y = feature number, 1-~. Increase this number if the change contains new features with or without bug fixes.
- z = hotfix number, 0-~. Increase this number if the change only contains bug fixes.

## Summary

When you use an unregistered Julia package from GitHub, you can add it with the package manager. The add command needs the URL as an argument without the `.git` extension.