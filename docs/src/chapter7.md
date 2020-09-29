
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
- The finished [Exercise 5.1: Adding the sub-module Infrastructure](../chapter5/index.html#Exercise-5.1:-Adding-the-Sub-Module-Infrastructure).
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

## api.md

````julia
# 1. API

## create
```@docs
create
```
````

## Activity 7.2 - Create the API page

The idea is to create two markup files accordingly to the Onion layers API and Infrastructure plus an extra markup file for an Example:
- API - api.md
- Infrastructure - infrastructure.md
- Example - example.md

In this activity you use the `chapter1.md` file for the API documentation.

#### Prerequstites

- The previous [activity 7.1](#Activity-7.1-Initialize-the-Folder-for-the-Documentation-1).
- Optional - Julia markup [documentation](https://docs.julialang.org/en/v1/stdlib/Markdown/)

---

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Open index.md | Under the folders `docs/src` |
| 2 | Type on line 3: `Documentation of Accounts.jl` |  |
| 3 | Save the file: Ctrl-S |  |
| 4 | Select `src` |  |
| 5 | Right click and select: `New File` |  |
| 6 | Type: chapter1.md |  |
| 7 | Save the file: <Enter> | Press the Enter-button to create the file. |
| 8 | Paste the following code in the file: |  |

````
# 1. API

## create
```@docs
create
```
````

Step | Action | Comment |
| :--- | :--- | :--- |
| 9 | Save the file: Ctrl-S |  |


## make.jl

```
using Documenter
using Accounts
using Dates

makedocs(;
    modules=[Accounts],
    format=Documenter.HTML(),
    pages=[
        "Accounts" => "index.md",
        "1 - API" => "api.md",
        #"2 - Infrastructure" => "infrastructure.md",
        #"3 - Example" => "example.jl"
    ],
    sitename="Accounts.jl",
)
```

## Activity 7.3 - Create the documention

You create the documentation with the add of the Julia code in the file `make.jl`. The code creates HTML-files from the markup files in the folder `docs/build`.

In this activity you will:
- Modify the file `make.jl`.
- Run the code in the file `make.jl`.
- Display the generated documentation in the browser.

#### Prerequstites

- The previous [activity 7.2](#Activity-7.2-Create-the-API-page).

---

##### Modify the file make.jl.

Step | Action | Comment |
| :--- | :--- | :--- |
[ 1 | Open the file `make.jl`|  |
| 2 | Replace the code in the code from section [make.jl](#make.jl) |  |
| 3 | Ctrl-S | Save the file.  |

##### Run the code in the file make.jl.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Ctrl-D | Close Julia in REPL panel. |
| 2 | $ atom . | Start Atom/Juno. |
| 3 | ] | Activate package manager. |
| 4 | Pkg> activate . | Activate current folder. |
| 5 | <BackSpace> | Return to Julia. |
| 6 | Right click on: `make.jl` |  |
| 7 | Select: Juno > Run All | Run the Julia code in the file. |

You get the next messages:

```
[ Info: SetupBuildDirectory: setting up build directory.
[ Info: Doctest: running doctests.
[ Info: ExpandTemplates: expanding markdown templates.
[ Info: CrossReferences: building cross-references.
[ Info: CheckDocument: running document checks.
[ Info: Populate: populating indices.
[ Info: RenderDocument: rendering document.
[ Info: HTMLWriter: rendering HTML pages.
```

##### Display the generated documentation in the browser.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Open your browser |  |
| 2 | Ctrl-O | Browser command to open a HTML-file. |
| 3 | Select: Home > .julia > dev > Accounts > docs > build > index.html | Open index.html. |

##### Copy the HTML-code to the folders stable and dev.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Go to the terminal where you started Atom | `~/.jula/dec/Accounts`|
| 2 | Go to the docs folder |  |
| 3 | execute the following commands: |  |

```
mkdir dev

mkdir stable

cd stable

cp -r ../build/* .

cd ../dev

cp -r ../build/* .
```


Step | Action | Comment |
| :--- | :--- | :--- |
| 4 | Go to your browser |  |
| 5 | Ctrl-O |  |
| 6 | Select: Home > .julia > dev > Accounts > docs > stable > index.html |  |

## Exercise 7.1: Show the documentation on the web.

When you have a GitHub website the you can show the documentation on the web.

### Prerequisites
- GitHub website: https://<your name>/github.io/

Steps:
- Update Accounts on GitHub.
- Activate pages for Accounts: Settings > GitHub Pages.
- Select `master` in `Select branch`.
- Select folder: `/docs`.
- Click on `Save`-button.
- Display the documentation in the browser: `https://<your name>/github.io/Accounts/stable`


## Docstring for the add\_to\_file Method

````
"""
    add_to_file

Add Person's to the datastore.

# Example
```julia
julia> using Accounts

julia> const FILE_ACCOUNTS = "./test_accounts.txt";

julia> address_email = create(EMAIL, "donald@duckcity.com");

julia> donald = create("Donald Duck", [address_email]);

julia> add_to_file(FILE_ACCOUNTS, [donald])
```
"""
````

## Docstring for the read\_from\_file Method

````
"""
    read_from_file

Get Person's from the datastore.

# Example
```julia
julia> using Accounts

julia> const FILE_ACCOUNTS = "./test_accounts.txt";

julia> address_email = create(EMAIL, "donald@duckcity.com");

julia> donald = create("Donald Duck", [address_email]);

julia> add_to_file(FILE_ACCOUNTS, [donald])

julia> read_from_file(FILE_ACCOUNTS)
1-element Array{Any,1}:
 Accounts.Domain.Person("10973269859630729578", DateTime("2020-09-28T10:41:17.59"), "Donald Duck", Accounts.Domain.Address[Accounts.Domain.Address("6678746402434096981", DateTime("2020-09-28T10:41:17.277"), EMAIL, "donald@duckcity.com")])
```
"""
````

## Exercise 7.2: Add Docstrings to the Infrastructure Methods

- Paste the Docstring [add\_to\_file](#Docstring-for-the-add_to_file-Method) just above the method `add_to_file` in `Infrastructure.jl`.
- Paste the Docstring [read\_from\_file](#Docstring-for-the-read_from_file-Method) just above the method `read_from_file` in `Infrastructure.jl`.
