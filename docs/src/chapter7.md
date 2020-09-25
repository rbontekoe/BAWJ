
# 7. Documenting your Module

UNDER DEVELOPMENT!

To display the documentation to the public you have several options, amongst others:
- Use the README.md file.
- Create the documentation with the Julia package `Documenter.jl`.

The documenter package creates HTML-pages based on the Julia [Markdown language](https://docs.julialang.org/en/v1/stdlib/Markdown/). If you have a GitHub website then the documentation is visible when you push data to GitHub. For example, the documentation for the [AppliGeneralLedger documentation](https://www.appligate.nl/AppliGeneralLedger.jl/) package we use in this course.

You can set up a website by creating a repository with the name `<your username>.gitub.io`, enable is for `GitHub Pages` and push your pages to GitHub.

### Contents

```@contents
Pages = ["chapter7.md"]
```

## Activity 7.1 - Initialize the Folder for the Documentation

In this activity we will create the primary folders.

#### Prerequstites
- Ubuntu 20.04.
- Julia 1.5 installed.
- Atom/Juno installed.
- Git installed.
- The finished exercise [Exercise 5.1 - Adding the sub-module Infrastructure](../chapter5/index.html#Exercise-5.1-Adding-the-Sub-module-Infrastructure.-1).
- A website. For example, a GitHub website. See [GitHub pages](https://pages.github.com/) for more information.

In this activity you:

- Create the git branch `docs`.

- Add the Documenter and DocumenterTools packages.

- Create the file structure.

- Add an additional folder `stable`.

---

##### Create the Git Branch `docs`

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ cd ~/.julia/dev/Accounts | Or make a clone of Accounts with `git clone https://github.com/rbontekoe/Accounts.jl.git`. |
| 2 | $ git branch docs | Create a new branch. |
| 3 | $ git checkout docs | Make the docs branch active. |
| 4 | $ atom . | Start Atom/Juno. |
| 5 | Juno > Open REPL | Start Julia. |

##### Add the Documenter and DocumenterTools Packages

Step | Action | Comment |
| :--- | :--- | :--- |
| 6 | julia> ] | Start the package manager. |
| 7 | pkg> add Documenter | Add the Documenter.jl package. It is installed in the general repository, so we can use it always. |
| 8 | pkg> add DocumenterTools | Add the tool to generate the basic [file structure](https://juliadocs.github.io/Documenter.jl/stable/) |
| 9 | Press: <BackSpace> | Return to Julia. |

##### Create the File Structure
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
\#1 DocumenterTools creates a sub-folder docs.

\#2 `src` is one of the two sub-folders within `docs`. The other one is `build` that will creates when you run `make.jl`.

\#3 `index.md` is the markup file for the home-page of the documentation.

\#4 `.gitignore` contains the files tat will not be uploaded to `GitHub`. It contains the `build`-folder.

\#5 `make.jl` is the Julia program that converts the markup to HTML-files. The files are put in the `build`-folder.

\#6 Since Julia version 1.2 you can specify dependencies used by Documenter in Project.jl. A similar situation applies to the `test`-folder.

##### Add an additional folder stable

ToDo

## chapter1.md

````julia
# 1. Domain objects

## Person
```@docs
Person
```

## Address
```@docs
Address
```
````

## Activity 7.2 - Create the Domain page

The idea is to create three markup files accordingly to the Onion layers plus an extra markup file for an Example:
- Domain - index.md
- API - api.md
- Infrastructure - infrastructure.md
- Example - axample.md

In this activity you use the `index.md` file for the Domain elements.

#### Prerequstites

- The previous [activity 7.1](#Activity-7.1-Initialize-the-Folder-for-the-Documentation-1).
- Optional - Julia markup [documentation](https://docs.julialang.org/en/v1/stdlib/Markdown/)

---

````
```julia
cd /
```
````

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Open index.md |  |
