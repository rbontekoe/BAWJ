using Documenter

makedocs(
    sitename = "BAWJ",
    format = Documenter.HTML(),
    pages = [
        "Business Applications with Julia" => "index.md",
        "Blog" => "blog.md",
        "1 - The Final Application" => "chapter1.md",
        "Section 1 - Experimenting with Modules" => [
            "2 - Setup the Development Environment" => "chapter2.md",
            "3 - Create and Test Domain.jl" => "chapter3.md",
            "4 - Create and Test API.jl" => "chapter4.md",
            "5 - Create and Test Infrastructure.jl" => "chapter5.md",
            "6 - The Accounts Package from a User Point of View" => "chapter6.md",
        ],
        "Section 2 -  The Accounts Receivable Module" => [
            "7 - The Design" => "chapter7.md",
            "8 - The Domain Sub-module" => "chapter8.md",
            "9 - The API Sub-module" => "chapter9.md",
            "10 - The Infrastructure Sub-module" => "chapter10.md",
        ],
        "Section 3 - Using containers" => [
            "11 - Creating SSH Enabled Containers" => "chapter11.md",
            "12 - Run the Application in Containers" => "chapter12.md",
            "13 - Running the Containers" => "chapter13.md",
        ],
        "Section 4 - Miscelanious" => [
            "14 - Logging" => "chapter14.md",
            "15 - Implementing AppliAR (Accounts Receivable) Package" => "chapter15.md",
            "16 - PosgreSQL" => "chapter16.md",
        ],
        "Installation Instruction" => "appendix.md",
        "IJulia Notebook" => "notebook.md",
        "Overview Julia" => "overview.md",
        "References" => "references.md"
    ]
)
