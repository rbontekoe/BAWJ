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
        ],
        "Section 2 -  The Accounts Receivable Module" => [
            "7 - The Design" => "chapter7.md",
            "8 - The Sub-module Domain" => "chapter8.md",
            "9 - The Sub-module API" => "chapter9.md",
            "10 - The Sub-module Infrastructure" => "chapter10.md",
            "11 - The Main-module AppliAR.jl" => "chapter11.md",
        ],
        "Section 3 - Using containers" => [
            "12 - Creating SSH Enabled Containers" => "chapter12.md",
            "13 - Run the Application in Containers" => "chapter13.md",
            "14 - Running the Containers" => "chapter14.md",
        ],
        "Section 4 - Miscelanious" => [
            "15 - Logging" => "chapter15.md",
            "16 - Implementing AppliAR (Accounts Receivable) Package" => "chapter16.md",
            "17 - PosgreSQL" => "chapter17.md",
        ],
        "Installation Instruction" => "appendix.md",
        "IJulia Notebook" => "notebook.md",
        "Overview Julia" => "overview.md",
        "References" => "references.md"
    ]
)
