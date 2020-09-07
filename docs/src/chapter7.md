
#7. Documenting your Module

To display the documentation to the public you have two options:
- Use the README.md file.
- Create the documentation using the Julia package `Documenter.jl`.

Documenter creates HTML-pages based on the Julia [Markdown language](https://docs.julialang.org/en/v1/stdlib/Markdown/). If you have created a GitHub website then the documentation is automatically visible when you push data to GitHub. For example, the documentation for the [AppliGeneralLedger documentation](https://www.appligate.nl/AppliGeneralLedger.jl/) package we use in this course.

You can create your personal website by creating a repository with the name `<your username>.gitub.io` and push it to GitHub.

### Contents

```@contents
Pages = ["chapter7.md"]
```


## Activity 7.1 - Create the Basic Document Files

#### Prerequstites
- Ubuntu 20.04.
- Julia 1.5 installed.
- Atom/Juno installed.
- Git installed.
- The finished exercise [Exercise 5.1 - Adding the sub-module Infrastructure](../chapter5/index.html#Exercise-5.1-Adding-the-Sub-module-Infrastructure.-1).
- A website. For example, a GitHub website. See [GitHub pages](https://pages.github.com/) for more information.


## Activity - Create the Accounts package Home Page
Step 1 - Create the git branch `docs`.

Step 2 - Add the Documenter and DocumenterTools packages.

Step 3 - Create the file structure and add markup to your home page.

Step 3 - Adding an additional folder `stable`.

#### Step 1 - Create the git branch `docs`.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ cd ~/.julia/dev/Accounts | Or make a clone of Accounts with `git clone https://github.com/rbontekoe/Accounts.jl.git`. |
| 2 | $ git branch docs | Create a new branch. |
| 3 | $ git checkout docs | Make the docs branch active. |
| 4 | $ atom . | Start Atom/Juno. |
| 5 | Juno > Open REPL | Start Julia. |

#### Step 2 - Add the Documenter and DocumenterTools packages.

Step | Action | Comment |
| :--- | :--- | :--- |
| 6 | ] | Start the package manager. |
| 7 | pkg> add Documenter | Add the Documenter.jl package. It is installed in our general repository, so we can use it always. |
| 8 | pkg> add DocumenterTools | Add the tool to generate the [basic file structure](https://juliadocs.github.io/Documenter.jl/stable/) |
| 9 | Press: <BackSpace> | Return ti Julia. |

#### Step 3 - Create the file structure and add markup to your home page.
Step | Action | Comment |
| :--- | :--- | :--- |
| 9 | julia> using Documenter> | Load the Documenter package. |
| 10 | julia> using DocumenterTools | Load the DocumenterTools package. |
| 11 | julia> DocumenterTools.generate(name="Accounts") | Create the basic file structure. |

```
ᵥ📁 Accounts
  ᵥ📁 docs #1
    ᵥ📁 src #2
       📄 index.md #3
     📄 .gitignore #4
     📄 make.jl #5
     📄 Project.toml #6
```
