using Documenter

makedocs(
    sitename = "BAWJ",
    format = Documenter.HTML(),
    pages = [
        "Business Applications with Julia" => "index.md",
        "Blog" => "blog.md",
        "1 - The Application" => "chapter1.md",
        "Section 1 - Experimenting with Modules" => [
            "2 - Setup the Development Environment" => "chapter2.md",
            "3 - Create and Test Domain.jl" => "chapter3.md",
            "4 - Create and Test API.jl" => "chapter4.md",
            "5 - Create and Test Infrastructure.jl" => "chapter5.md",
            "6 - The Accounts Package from a User Point of View" => "chapter6.md",
            "7 - Documenting your module" => "chapter7.md",
        ],
        "Section 2 -  The Accounts Receivable Module" => [
            "8 - The Design" => "chapter8.md",
            "9 - The Sub-Module Domain" => "chapter9.md",
            "10 - The Sub-Module API" => "chapter10.md",
            "11 - The Sub-Module Infrastructure" => "chapter11.md",
            "12 - The Main-Module AppliAR.jl" => "chapter12.md",
        ],
        "Section 3 - Using containers" => [
            "13 - Creating SSH Enabled Containers" => "chapter13.md",
            "14 - Run the Application from a Notebook" => "chapter14.md",
            "15 - Running the Website from a Container" => "chapter15.md",
        ],
        "Section 4 - Miscellaneous" => [
            "16 - Logging" => "chapter16.md",
            "17 - Implementing AppliAR (Accounts Receivable) Package" => "chapter17.md",
            "18 - PosgreSQL" => "chapter18.md",
            "19 - Jenkins-slave" => "chapter19.md"
        ],
        "Installation Instruction" => "appendix.md",
        "IJulia Notebook" => "notebook.md",
        "Overview Julia" => "overview.md",
        "References" => "references.md"
    ]
)
