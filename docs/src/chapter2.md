# 2. Setup the Development Environment

In this chapter, you learn to create your development environment based on Ubuntu 20.04 and Julia version 1.5.

### Contents

```@contents
Pages = ["chapter2.md"]
```

## Get Experience with Modules

To get experience with Julia and modules, we start with building an application where we can register and retrieve persons. The module name is `Accounts.`

The activities are
- Activity 2.1: Setup the Development Environment.
- Activity 2.2: Create the Accounts module.
- Activity 2.3: Create a Repository on GitHub.

We use the `Onion Architecture` to define a model that consists of the layers Domain, API, and Infrastructure. The layers are declared as sub-modules. See also [Domain-driven Design](../chapter8/index.html#Domain-Driven-Design) in section 2 `Accounts Receivable` of chapter 7 `The design`.

#### The Domain layer
The domain has the objects Person, Address, and AddressType.

#### The API layer
The API has the function `create`. It can be used for creating persons and addresses.

#### The Infrastructure layer
Infrastructure has the functions `save` and `retrieve` to save and retrieve persons.

## Activity 2.1: Setup the Development Environment

In this activity, you will create a development environment.
- Install Julia.
- Instal Git.
- Install VSCode.
- Add the Julia package PkgTemplates.

#### Prerequisites
- Ubuntu 20.04.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Ctrl+Alt-T | Open a terminal window. |
| 2 | [Install Julia](../appendix/index.html#Install-Julia) | Follow the Installation instructions. |
| 3 | [Install Git](../appendix/index.html#Install-Git) |  |
| 4 | [Install VSCode](../appendix/index.html#Install-Julia-for-VSCode) |  |
| 6 | Close VSCode |  |
| 7 | $ julia | Start Julia. |
| 8 | julia> ] | Go to the package manager. |
| 9 | pkg> add PkgTemplates | Add the PkgTemplates package. |
| 10 | pkg> <BackSpace> | Back to Julia REPL. |
| 11 | julia> Ctrl-D | Exit Julia |

## Activity 2.2: Create the Accounts Module.

In this activity you will create the basic application file structure for the module `Accounts` using PkgTemplates:
- Create a template.
- Create the module Accounts.
- Go to the development directory `~/.julia/dev/Accounts/`.
- Start Atom/Juno.

#### Prerequisites
- Activity 2.1.
- Ubuntu 20.04.
- Julia 1.5+ installed.
- VSCode 1.50+ installed.
- Git 2.25.1+ installed.
- Julia [PkgTemplates](https://github.com/invenia/PkgTemplates.jl) package installed.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ julia | Start Julia. |
| 2 | julia> using PkgTemplates | Load PkgTemplates. |
| 3 | julia> t = Template() | Construct a default template. |

```Template:
  authors: ["Rob Bontekoe <rbontekoe@appligate.nl> and contributors"]
  dir: "~/.julia/dev"
  host: "github.com"
  julia: v"1.0.0"
  user: "rbontekoe"
  plugins:
    CompatHelper:
      file: "~/.julia/packages/PkgTemplates/aXRp5/templates/github/workflows/CompatHelper.yml"
      destination: "CompatHelper.yml"
      cron: "0 0 * * *"
    Git:
      ignore: String[]
      name: nothing
      email: nothing
      branch: nothing
      ssh: false
      jl: true
      manifest: false
      gpgsign: false
    License:
      path: "~/.julia/packages/PkgTemplates/aXRp5/templates/licenses/MIT"
      destination: "LICENSE"
    ProjectFile:
      version: v"0.1.0"
    Readme:
      file: "~/.julia/packages/PkgTemplates/aXRp5/templates/README.md"
      destination: "README.md"
      inline_badges: false
    SrcDir:
      file: "~/.julia/packages/PkgTemplates/aXRp5/templates/src/module.jl"
    TagBot:
      file: "~/.julia/packages/PkgTemplates/aXRp5/templates/github/workflows/TagBot.yml"
      destination: "TagBot.yml"
      cron: "0 0 * * *"
      token: Secret("GITHUB_TOKEN")
      ssh: Secret("DOCUMENTER_KEY")
      ssh_password: nothing
      changelog: nothing
      changelog_ignore: nothing
      gpg: nothing
      gpg_password: nothing
      registry: nothing
      branches: nothing
      dispatch: nothing
      dispatch_delay: nothing
    Tests:
      file: "~/.julia/packages/PkgTemplates/aXRp5/templates/test/runtests.jl"
      project: false
```
| Step | Action | Comment |
| :--- | :--- | :--- |
| 4 | julia> t("Accounts") | Create the package environment `Accounts`. |
```
[ Info: Running prehooks
[ Info: Running hooks
 Activating environment at `~/.julia/dev/Accounts/Project.toml`
   Updating registry at `~/.julia/registries/General`
######################################################################## 100,0%
No Changes to `~/.julia/dev/Accounts/Project.toml`
No Changes to `~/.julia/dev/Accounts/Manifest.toml`
 Activating environment at `~/.julia/environments/v1.5/Project.toml`
[ Info: Running posthooks
[ Info: New package is at /home/rob/.julia/dev/Accounts
```
| Step | Action | Comment |
| :--- | :--- | :--- |
| 5 | julia> Ctrl-D | Exit Julia. |
| 6 | $ cd ~/.julia/dev/Accounts/ | Go to `Accounts` folder. |
| 7 | $ code .| Start VSCode. |
| 8 | Close the Welcome page |  |

You will see the following file structure.

```
ᵥ📁 Accounts
   📁 .git
   📁 .github
  ᵥ📁 src
     📄 Accounts.jl #1
  ᵥ📁 test
     📄 runtests.jl #2
   📄 .gitignore
   📄 LICENCE
   📄 Manifest.toml
   📄 Project.toml #3
   📄 README.md
```
\#1 File with the name of the module where you define among other things:
- sub-modules,
- (export) of the functions that others can invoke immediately,
- as well as data structures, and
- (import) of the elements, you want to use from other (sub-)modules or packages.

\#2 Unit tests.

\#3 Contains the module version and its dependencies.

## Activity 2.3: Create a Repository on GitHub

In this activity, you create a repository on GitHub. You can push changes in the design of the module to GitHub. Later on, you will learn how others can use the module.

#### Prerequisites
- Ubuntu 20.04.
- Julia 1.5+ installed.
- VSCode 1.50+ installed.
- Git installed.
- A GitHub account.
- [Activity 2.2: Create the Accounts Module.](#Activity-2.2:-Create-the-Accounts-Module.)

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Ctrl+Shift-P | Show All Commands. |
| 2 | Select: Publish to GitHub |  |
| 3 | Extend the name Accounts with: .jl | DON'T FORGET this step!!! | 
| 4 | Select: Publish to GitHub public repository |  |
| 5 | Ctrl+Shift-G | Open Source Control panel.  |
| 6 | Hover over `Changes` and click on the `+` sign | Stage all changes. |
| 7 | Type: Initial state | Above `Stages Changes` line in field Messages(Ctrl+Enter to commit... ). | 
| 8 | Ctrl+Enter | Commit the changes. |
| 9 | Select: Save All & Commit |  |
| 10 |  
| 6 | Click on: `...` | Open Views and More Actions menu. |




| 1 | Go to [GitHub](https://github.com/) | Create an account if you don't have one. What is [GitHub](https://en.wikipedia.org/wiki/GitHub)? |
| 2 | Click on the green button `New` | Maybe you have first to click on the tab `Repositories`. |
| 3 | Give the repository the name: `Accounts.jl` | **The extention `.jl` is mandatory**. |
| 4 | Give the repository a description | E.g. A module for the BAWJ course with which you can experiment. |

!!! warning
    Don't change the default settings!

| Step | Action | Comment |
| :--- | :--- | :--- |
| 5 | Click on the **green** button `Create repository` | The button is located at the bottom side. |
| 6 | Go to the folder `~/.julia/dev/Accounts` |  |
| 7 | $ git status | The response is: |

```
On branch master
nothing to commit, working tree clean
```

| Step | Action | Comment |
| :--- | :--- | :--- |
| 8 | $ atom .| Start Atom/Juno. |
| 9 | Click on the `Publish` button | You will find the button in the lower right corner. |
| 10 | Check the update on GitHub | You should see the same file structure. Manifest.toml is missing¹. |

¹ "The Manifest. toml is like a screenshot of your current environment that has all the information needed to replicate this environment elsewhere, e.g. the URL of unregistered packages, branch, commit, etc," see [What’s the use a Project.toml file and the use of a Manifest.toml in a Julia project?](https://discourse.julialang.org/t/whats-the-use-a-project-toml-file-and-the-the-use-of-a-manifest-toml-in-a-julia-project/22524). The file is mentioned in the file `.gitignore` and will not be pushed to GitHub. When you provide this file to another person then one can create the same environment as you have after activating the folder (`pkg> activate .`) representing the git clone of your package (`$ git clone https://github.com/rbontekoe/Accounts.jl.git`).
