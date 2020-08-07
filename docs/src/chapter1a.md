# 2. Setup the Development Environment

UNDER DEVELOPMENT!

### What you will learn

```@contents
Pages = ["chapter1a.md"]
```

## The Course Example

To get experience with Julia and modules, we will build first an application where we can register and retrieve persons. The module name is `Accounts.`

The activities are:
- Activity 2.1 - Setup the Development Environment.
- Activity 2.2 - Create the Accounts module.
- Activity 2.3 - Create a Repository on GitHub.

We use the `Onion Architecture` to define the model which consists of the layers Domain, API, and Infrastructure. The layers are declared as sub-modules.

#### The Domain Layer
The domain has the objects Person, Address, and AddressType.

#### The API Layer
The API has the function `create`. It can be used for creating persons and the addresses.

#### The Infrastructure Layer
The Infrastructure has the functions `save` and `retrieve,` to save and retrieve persons.

## Activity 3.1 - Setup the Development Environment

#### Prerequisites
- Ubuntu 20.04.

In this activity you will create the development environment.
- Install Julia.
- Install Atom.
- Install Juno.
- Add the Julia package PkgTemplates.
- Create the basic application file structure for module `Accounts` using PkgTemplates.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | [Install Julia](../appendix/#Install-Julia-1) | Follow the Installation instructions. |
| 2 | [Install Git](../appendix/#Install-Git-1) |  |
| 3 | [Install Atom](../appendix/#Install-Atom-1) |  |
| 4 | [Install Juno](../appendix/#Install-Juno-1) |  |
| 5 | Close Atom |  |
| 6 | $ cd projects |  |
| 6 | $ julia | Start Julia. |
| 7 | julia> ] | Go to the package manager. |
| 8 | pkg> add PkgTemplates | Install the PkgTemplates package. |
| 9 | pkg> BackSpace | Back to Julia REPL. |
| 10 | julia> using PkgTemplates <enter> | Load PkgTemplates. |
| 11 | julia> t = template() <enter> | Create a default template. |
| 12 | julia> t("AppliAR") <enter> | Create the module AppliAR. |
| 13 | julia> Ctrl-D | Exit Julia |
| 14 | $ cd ~/.julia/dev/AppliAR | Go to the development folder. |
| 15 | $ atom . | Start Atom. |

Explore the file structure.

## Activity 3.2 - Create the Accounts module.

#### Prerequisites
- Ubuntu 20.04 installed.
- Julia 1.5 installed.
- Atom/Juno installed.
- Git installed.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Ctrl+Alt-T | Create a terminal window. |
| 2 | cd projects |  |
| 3 | julia | Start Julia. |
| 4 | julia> using PkgTemplates | Load PkgTemplates. |
| 5 | julia> t = Template() | Create a default template. |
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
| 5 | julia> t("Accounts") | Create application environment. |
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
| 6 | julia> Ctrl-D | exit Julia. |
| 7 | $ cd ~/.julia/dev/Accounts/ | Got to development folder. |
| 8 | $ atom .| Start Atom/Juno. |

You will see the following file structure.

```
ᵥ📁 Accounts
   📁 .git
   📁 .github
  ᵥ📁 src
     📄 Accounts.jl
  ᵥ📁 test
     📄 runtests.jl
   📄 .gitignore
   📄 LICENCE
   📄 Manifest.toml
   📄 Project.toml
   📄 README.md
```

## Activity 3.3 - Create a Repository on GitHub

- Ubuntu 20.04 installed.
- Julia 1.5 installed.
- Atom/Juno installed.
- Git installed.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Go to [GitHub](https://github.com/) | Create an account if you don't have one. What is [GitHub](https://en.wikipedia.org/wiki/GitHub)? |
| 2 | Click on the tab `Repositories` |  |
| 3 | Click on the green button `New` |  |
| 4 | Give the repository the name `Accounts.jl` |  |
| 5 | Give the repository a description | E.g. A module for the BAWJ course with which you can experiment. |

!!! warning
    Start with a empty repository!

| Step | Action | Comment |
| :--- | :--- | :--- |
| 6 | Click on the green button `Create repository` | Button is located at the bottom side. |
| 7 | Return to your computer and go to the folder `~/.julia/dev/Accounts`|  ||
| 10 | $ git status | The response is: |

```
On branch master
nothing to commit, working tree clean
```

| Step | Action | Comment |
| :--- | :--- | :--- |
| 11 | $ atom .| Start Atom/Juno. |
| 12 | Click on the `Publish button` | You will find the button in the lower right corner. |
| 13 | Check the update on GitHub | You should see the same file structure. Manifest.toml is missing. |
