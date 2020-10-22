# 2. Setup the Development Environment

In this chapter, you learn to create your development environment based on Ubuntu 20.04 and Julia version 1.5.

### Contents

```@contents
Pages = ["chapter2.md"]
```

## Get Experience with Modules

To get experience with Julia and modules, we start with building an application where we can register and retrieve persons. The module name is `Accounts.`

We use the `Onion Architecture` to define a model that consists of the layers Domain, API, and Infrastructure. The layers are declared as sub-modules. See also [Domain-driven Design](../chapter8/index.html#Domain-Driven-Design) in section 2 `Accounts Receivable` of chapter 7 `The design`.

#### The Domain Layer.
The domain has the objects Person, Address, and AddressType.

#### The API Layer.
The API has the function `create`. It can be used for creating persons and addresses.

#### The Infrastructure Layer.
Infrastructure has the functions `save` and `retrieve` to save and retrieve persons.

## Activity 2.1: Setup the Development Environment

You work with VSCode as IDE. Before installing it, you need first to install Julia and Git.

#### Prerequisites
- Ubuntu 20.04.

In this activity, you will create a development environment.
- Install Julia.
- Instal Git.
- Install VSCode.
- Add the Julia package PkgTemplates.

---

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

Many developers use PkgTempates to create Julia packages. You can upload packages to GitHub. Others can use them in their Julia projects. 

You can also register your packages on GitHub in [Julia Hub](https://juliahub.com/ui/Packages). For example, AppliSales and AppliGeneralLedger are registered packages that you use in the course.

#### Prerequisites
- Activity 2.1.
- Ubuntu 20.04.
- Julia 1.5+ installed.
- VSCode 1.50+ installed.
- Git 2.25.1+ installed.
- Julia [PkgTemplates](https://github.com/invenia/PkgTemplates.jl) package installed.

In this activity you will:
1. Use the Julia package PkgTemplates to create our initial package Accounts.
2. Start VSCode.

---

##### Step 1: Use the Julia package PkgTemplates to create our initial package Accounts.

Invenia created the package [PkgTemplates](https://github.com/invenia/PkgTemplates.jl). It assists you to create new Julia packages in an easy, repeatable, and customizable way.

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
||

##### Step 2: Start VSCode.

A development platform like VSCode makes working with Julia easy. It replaces Atom with the extension Juno.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ cd ~/.julia/dev/Accounts/ | Go to `Accounts` folder. |
| 2 | $ code .| Start VSCode. By typing a dot you will only open the files int the current folder. |
| 3 | Close the Welcome page |  |
||

You will see the following file structure.

```
v Accounts
   > .github/workflows
  v src
    - Accounts.jl #1
  v test
    - runtests.jl #2
  - .gitignore
  - LICENCE
  - Manifest.toml #4
  - Project.toml #3
  - README.md
```
\#1 File with the name of the module where you define among other things:
- sub-modules,
- (export) of the functions that others can invoke immediately,
- as well as data structures, and
- (import) of the elements, you want to use from other (sub-)modules or packages.

\#2 Unit tests.

\#3 Contains the module version and its dependencies.

\#4 "The Manifest. toml is like a screenshot of your current environment that has all the information needed to replicate this environment elsewhere, e.g. the URL of unregistered packages, branch, commit, etc," see [What’s the use a Project.toml file and the use of a Manifest.toml in a Julia project?](https://discourse.julialang.org/t/whats-the-use-a-project-toml-file-and-the-the-use-of-a-manifest-toml-in-a-julia-project/22524). The file is mentioned in the file `.gitignore` and will not be pushed to GitHub. When you provide this file to another person then one can create the same environment as you have after activating the folder (`pkg> activate .`) representing the git clone of your package (`$ git clone https://github.com/rbontekoe/Accounts.jl.git`).

## Activity 2.3: Create a Repository on GitHub

In this activity, you create a repository on GitHub. You can push changes in the design of the module to GitHub. Later on, you will learn how others can use the module.

In this step, you will add the extension .jl to the package name Accounts. This way, others can use it by adding it to their application with the command: `add https://github.com/<your username>Accounts.jl`.

#### Prerequisites
- Ubuntu 20.04.
- Julia 1.5+ installed.
- VSCode 1.50+ installed.
- Git installed.
- You have a GitHub account.
- [Activity 2.2: Create the Accounts Module.](#Activity-2.2:-Create-the-Accounts-Module.)

In this activity you will:
1. [Create a repository on GitHub.](#Step-1:-Create-a-repository-on-GitHub.)
2. [Push our local repostitory to GitHub.](#Step-2:-Push-our-local-repostitory-to-GitHub.)

---

##### Step 1: Create a repository on GitHub.

"GitHub is a free code hosting platform for version control and collaboration." It is used by millions of developers worldwide. VSCode facilitates working with GitHub.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Ctrl+Shift-P | Show All Commands. |
| 2 | Select: Publish to GitHub | Create a GitHub repository. |
| 3 | Extend the name Accounts with: .jl | DON'T FORGET this step!!! | 
| 4 | Select: Publish to GitHub public repository |  |
||

##### Step 2: Push our local repostitory to GitHub.

However, the repository created in the previous step is empty. In this step, we 'push' our local data to Github.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Ctrl+Shift-G | Open Source Control pane.  |
| 2 | Click on: ∙∙∙ | Open Views and More Actions menu. It is located in the upper right corner of the pane. | 
| 3 | Select: Push | You get the next message: |
||
```
The branch 'master' has no upstream branch. Would you like to publish this branch?
```
| Step | Action | Comment |
| :--- | :--- | :--- |
| 4 | Select: OK | GitHub is updated with the new repository. |
| 5 | Go to Accounts.jl on GitHub | All files have the comment 'Files generated by PkgTemplates'. |
||


## Summary

TODO

https://code.visualstudio.com/docs/introvideos/basics