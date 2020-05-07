# Implementing AppliAR (Accounts Receivable) package

See also: [Developing Julia Packages](https://www.youtube.com/watch?v=QVmU29rCjaA)

## Step 1 - Create a package
1.  Create the local package AppliAR (Accounts Receivable)
2.  Create the GitHub Repository AppliAR.jl
3.  Push local repostitory to GitHub

---

##### Step 1.1 - Create the local package AppliAR (Accounts Receivable)

Prerequisites
- Ubuntu 18.04
- Julia 1.3 installed
- [Atom](https://atom.io/) installed
- [GitHub](https://github.com/) account
- [GitKraken](https://www.gitkraken.com/pricing) installed
- [Travis CI](https://travis-ci.com/) account

|Step     | Action      | Comment |
|:---------- | :---------- |:---------- |
| 1 | $ julia | Start Julia. |
| 2 | julia> ] | Select the Package REPL. |
| 3 | pkg> add PkgTemplates | Install [PkgTemplates.jl](https://github.com/invenia/PkgTemplates.jl) |
| 4 | pkg> BackSpace | Back to the Julia REPL. |
| 5 | Paste the following code into the Julia REPL | |

    julia> using PkgTemplates # Start the PkgTemplates package

    julia> t2 = Template(; # Create the template
                  user="rbontekoe",
                  license="MIT",
                  authors=["Rob Bontekoe"],
                  julia_version=v"1.3",
                  ssh=true,
                  plugins=[
                      TravisCI(),       # Continious Integration
                      Codecov(),        # Improve your code review
                      Coveralls(),      # Which parts aren’t covered by your test suite
                      AppVeyor(),       # CI/CD service
                      GitHubPages(),    # Documentation
                  ],
       )

    julia> generate(t, "AppliAR") # Create the local package in ~/.julia/dev


|:---------- | :---------- |:---------- |
|:---------- | :---------- |:---------- |
| 1 | $ julia | Start Julia. |
    julia> 1 + 2
| 2 | Etc. | |

##### Step 1.2 - Create the GitHub Repository AppliAR.jl

|Step     | Action      | Comment |
|:---------- | :---------- |:---------- |
| 1 | https://github.com.<YOURNAME> | Go to your GitHub account. |
| 2 | Click on the Tab `Repositories` | |
| 3 | Click on the button `New` | |
| 4 | type: AppliAR.jl | Type your package name ending with `.jl` in the `Repository name` field. |
| 5 | Click on the button `Create repository` | |

##### Step 1.3 - Push local repostitory to GitHub

|Step     | Action      | Comment |
|:---------- | :---------- |:---------- |



## Step 2 - Implement the AppliAR
1.  
2.  
3.  

## Step 3 - Creating the Domain items
1.  
2.  
3.

### Step 4 - Creating the API functions
1.  
2.  
3.  

### Step 5 - Creating the API tests
1.  
2.  
3.  

### Step 6 - Creating the Infrastructure functions
1.  
2.  
3.  

### Step 7 - Creating inthe Infra tests
1.  
2.  
3.
