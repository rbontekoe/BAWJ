# 6. Accounts Package from a User Point of View

## Activity - Test the package

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ cd projects |  
| 2 | $ mkdir TestAccounts |  |
| 3 | # cd TestAccounts |  |
| 4 | atom . |  |
| 5 | Juno > Open REPL |  |
| 6 | Press: Enter-button |  |
| 7 | julia> ] |  |
| 8 | pkg> activate . |  |
| 9 | (TestAccounts) pkg> add https://github.com/rbontekoe/Accounts.jl | Load package. |
| 10 | Press: BackSpace-button | Return to Julia. |
| 11 | File > New File | Create a new file. |
| 12 | Ctrl-S | Save the file. |
| 13 | Type: test_accounts.jl | Type the file name. |
| 14 | Press: Enter-button | save the file. |
| 15 | Paste the code below under `test_ accounts.jl` in the file |  |
| 16 | Use repeatably `Shift-Enter` to execute the lines | Run the code line by line. |

## test_accounts.jl

```
using Pkg; Pkg.activate(".")

using Accounts

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

@info("With DataFrames you can manpulate data")
using DataFrames

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

## Output

```
 Activating environment at `~/.julia/dev/Accounts/Project.toml`
[ Info: Save and retrieve the data
[ Info: Add Donald and Mickey to a file
[ Info: With DataFrames you can manipulate data
[ Info: Read the data from the file and pass it to a DataFrame

[ Info: Show some data
["Donald Duck", "Mickey Mouse"]

[ Info: Print all rows
2×2 DataFrame
│ Row │ created                 │ name         │
│     │ Dates.DateTime          │ String       │
├─────┼─────────────────────────┼──────────────┤
│ 1   │ 2020-08-07T15:55:15.52  │ Donald Duck  │
│ 2   │ 2020-08-07T15:55:16.505 │ Mickey Mouse │

[ Info: Add a column email
2×3 DataFrame
│ Row │ created                 │ name         │ email               │
│     │ Dates.DateTime          │ String       │ String              │
├─────┼─────────────────────────┼──────────────┼─────────────────────┤
│ 1   │ 2020-08-07T15:55:15.52  │ Donald Duck  │ donald@duckcity.com │
│ 2   │ 2020-08-07T15:55:16.505 │ Mickey Mouse │ mickey@duckcity.com │

[ Info: Remove the file ./test_accounts.txt
┌ Warning: File ./test_accounts.txt removed from disk
└ @ Main ~/.julia/dev/Accounts/src/test_accounts.jl:50
```
