# 7. Documenting your Module

UNDER DEVELOPMENT!

To display the documentation of your project to the public, you have several options, amongst others:
- Use the README.md file.
- Create the documentation with the Julia package `Documenter.jl`.

You write the documentation in [markdown language](https://en.wikipedia.org/wiki/Markdown).

The Julia package Documenter.jl creates HTML-pages based on the Julia [Markdown language](https://docs.julialang.org/en/v1/stdlib/Markdown/). See also the Documenter.jl [Style Guide](https://juliadocs.github.io/Documenter.jl/stable/contributing/#Style-Guide) for guidelines.

If you have a GitHub website, then the documentation becomes visible when you push the data to GitHub. An example is a documentation for the [AppliGeneralLedger](https://www.appligate.nl/AppliGeneralLedger.jl/) package we use in this course.

You can set up a website by creating a repository with the name `<your username>.gitub.io` and enable it for `GitHub Pages` and push your pages written in markdown language to GitHub.

### Contents

```@contents
Pages = ["chapter7.md"]
```

## Activity 7.1 - Initialize the File Structure for the Documentation

Before you write the documentation you have to set up the file structure.

#### Prerequisites
- Ubuntu 20.04.
- Julia 1.5+ installed.
- VSCode installed.
- Git installed.
- The finished [Exercise 5.1: Adding the sub-module Infrastructure](../chapter5/index.html#Exercise-5.1:-Adding-the-Sub-Module-Infrastructure).
- A GitHub website. See [GitHub pages](https://pages.github.com/) for more information.

In this activity you will:
1. [Create the git branch](#Step-1:-Create-the-Git-Branch.).
2. [Add the Documenter.jl and DocumenterTools.jl packages](#Step-2:-Add-the-Documenter-and-DocumenterTools-Packages.).
3. [Create the file structure for your documentation](#Step-3:-Create-the-File-Structure.).

---

##### Step 1: Create the Git Branch.

When you want to add new features to a project it is common to create a Git branch. This gives you the freedom to write and test your code without disturbing the current code. You finish your work by merging it into the main branch. In this step, you create the branch `docs`.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ cd ~/.julia/dev/Accounts | Or make a clone of Accounts with `git clone https://github.com/rbontekoe/Accounts.jl.git`. |
| 2 | $ git branch docs | Create a new branch. |
| 3 | $ git checkout docs | Make the docs branch active. |
| 4 | $ code . | Start VSCode. |
| 5 | Ctrl+Shift-P | Show All Commands. |
| 6 | Select: Julia: start REPL | Start Julia REPL. The code will be recompiled. |
||

##### Step 2: Add the Documenter and DocumenterTools Packages.

Documentation for GitHub is more or less standardized when you want to use [GitHub Pages](https://pages.github.com/). To assist you, you can use the Julia packages Documenter.jl and  DocumenterTools.jl.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | julia> ] | Start the package manager. |
| 2 | pkg> add Documenter | Add the Documenter.jl package. It is installed in the general repository, so we can use it always. |
| 3 | pkg> add DocumenterTools | Add the tool to generate the basic [file structure](https://juliadocs.github.io/Documenter.jl/stable/) |
| 4 | Press: <BackSpace> | Return to Julia. |
||

##### Step 3: Create the File Structure.

The Julia package DocumenterTools.jl creates the folder `docs` in your project and the necessary folders and files.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | julia> using Documenter | Load the Documenter package. |
| 2 | julia> using DocumenterTools | Load the DocumenterTools package. |
| 3 | julia> DocumenterTools.generate(name="Accounts") | Create the basic file structure. |
||

```
ᵥ📁 Accounts
  ᵥ📁 docs #1
    ᵥ📁 src #2
       📄 index.md #3
     📄 .gitignore #4
     📄 make.jl #5
     📄 Project.toml #6
```
\#1 DocumenterTools creates a sub-folder doc.

\#2 `src` is one of the two sub-folders within `docs`. The other one is `build` that will be created when you run `make.jl`.

\#3 `index.md` is the markdown file for the home-page of the documentation.

\#4 `.gitignore` contains the files that will not be uploaded to `GitHub`. It contains the `build`-folder.

\#5 `make.jl` is the Julia program that converts the markdown to HTML-files. The files are put in the `build`-folder.

\#6 Since Julia version 1.2 you can specify dependencies used by Documenter in Project.jl. (A similar situation applies to the `test`-folder.)

## Activity 7.2 - Create the API page

You start with building the markdown file for the API method `create`. Later on in this chapter, you will create the documentation for the Infrastructure methods plus an extra markdown file for an Example.

#### Prerequisites
- The previous [activity 7.1](#Activity-7.1-Initialize-the-Folder-for-the-Documentation-1).
- Optional - Julia markdown [documentation](https://docs.julialang.org/en/v1/stdlib/Markdown/)

In this activity you will:
1. [Modify the home page](#Step-1:-Modify-the-home-page.).
2. [Create the file api.md]().

##### Step 1: Modify the home page.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Open index.md | Under the folder `docs/src` |
| 2 | Type on line 3: `Documentation of Accounts.jl` |  |
||

##### Step 2: Create the file api.md.
Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Save the file: Ctrl-S |  |
| 2 | Select: `src` |  |
| 3 | Right click and select: `New File` |  |
| 4 | Type: api.md |  |
| 5 | Save the file: <Enter> | Press the Enter-button to create the file. |
| 6 | Paste the following code into the file: |  |
||

````
# 1. API

## create
```@docs
create
```
````

Step | Action | Comment |
| :--- | :--- | :--- |
| 7 | Save the file: Ctrl-S |  |
||

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

## Activity 7.3 - Create the documentation

You create the documentation with the aid of the Julia code in the file `make.jl`. The code creates HTML-files from the markdown files in the folder `docs/build`.

#### Prerequisites

- The previous [activity 7.2](#Activity-7.2-Create-the-API-page).

In this activity you will:
1. [Modify the file `make.jl`](#Step-1:-Modify-the-File-make.jl.).
2. [Run the code in the file `make.jl`](#Step-2:-Run-the-Code-in-the-File-make.jl.).
3. [Display the generated documentation in the browser](#Step-3:-Display-the-Generated-Documentation-in-the-Browser.).
4. [Copy the HTML-Code to the Folders stable and dev](#Step-4:-Copy-the-HTML-Code-to-the-Folders-stable-and-dev.)

---

##### Step 1: Modify the File make.jl.

Step | Action | Comment |
| :--- | :--- | :--- |
[ 1 | Open the file `make.jl`|  |
| 2 | Replace the code in the code from section [make.jl](#make.jl) |  |
| 3 | Ctrl-S | Save the file.  |
||

##### Step 2: Run the Code in the File make.jl.

It is time to create the HTML-files.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Ctrl-D | Close Julia in REPL panel. |
| 2 | $ atom . | Start Atom/Juno. |
| 3 | ] | Activate package manager. |
| 4 | Pkg> activate . | Activate current folder. |
| 5 | <BackSpace> | Return to Julia. |
| 6 | Right-click on: `make.jl` |  |
| 7 | Select: Juno > Run All | Run the Julia code in the file. You can also click on the triangle in the icon pane left. The following messages appears in the REPL pane:|
||

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

"""info


##### Step 3: Display the Generated Documentation in the Browser.

The code in make.jl creates HTML folders and files in `docs/build`. You can look at the result in your browser.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Open your browser |  |
| 2 | Ctrl-O | Browser command to open a HTML-file. |
| 3 | Select: Home > .julia > dev > Accounts > docs > build > index.html | Open index.html. |
||

##### Step 4: Copy the HTML-Code to the Folders stable and dev.

Often you see the documentation split into `stable` and `dev`. As long as you are working on new features, you want to show it only to people who are interested in it. And that is the documentation you put into the `dev-folder`. When you merge the git branch into the main branch, then you copy it to the `stable-folder`.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Go to the terminal where you started Atom | `~/.jula/dec/Accounts`|
| 2 | Go to the docs folder |  |
| 3 | Execute the following commands: |  |
||

```
mkdir dev

mkdir stable

cd ../dev

cp -r ../build/* .
```

Step | Action | Comment |
| :--- | :--- | :--- |
| 4 | Go to your browser |  |
| 5 | Ctrl-O |  |
| 6 | Select: Home > .julia > dev > Accounts > docs > dev > index.html |  |
||

## Exercise 7.1: Show the Documentation on the Web.

When you have a GitHub website you can show the documentation on the web.

### Prerequisites
- GitHub website: https://<your name>/github.io/

Steps:
- Update Accounts on GitHub.
- Activate pages for Accounts: Settings > GitHub Pages.
- Select `master` in `Select branch`.
- Select folder: `/docs`.
- Click on the `Save`-button.
- Display the documentation in the browser: `https://<your name>/github.io/Accounts/stable`

## Exercise 7.2: Add Docstrings to the Infrastructure Methods

Introduction

### Prerequisites
- Exercide 7.1

Steps:
- Paste the following Docstring just above the method `add_to_file` in `Infrastructure.jl`.

````
"""
    add_to_file

Store persons in the datastore.

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

- Paste the following Docstring just above the method `read_from_file` in `Infrastructure.jl`.

````
"""
    read_from_file

Get persons from the datastore.

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

- Create the file `Infrastructure.md`.
- Add the following code to the file:

````
# Infrastructure

## add\_to\_file
```@docs
add_to_file
```

## read\_from\_file
```@docs
read_from_file
```

````

- Run `make.jl`.
- Inspect the result in your browser.

## Summary
