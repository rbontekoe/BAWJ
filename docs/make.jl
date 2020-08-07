using Documenter

makedocs(
    sitename = "BAWJ",
    format = Documenter.HTML(),
    pages = [
        "Business Applications with Julia" => "index.md",
        "Blog" => "blog.md",
        "1 - The Application" => "chapter1.md",
        "Section 1 - Experimenting with modules" => [
            "2 - Setup the Development Environment" => "chapter1a.md",
            "3 - Create and test Domain.jl" => "chapter1b.md",
            "4 - Create and test API.jl" => "chapter1c.md",
            "5 - Create and test Infrastructure.jl" => "chapter1d.md",
            "6 - Accounts package from a user point of view" => "chapter1e.md",
        ],
        "Section 2 -  Accounts Receivable module" => [
            "7 - The design" => "chapter2.md",
            "8 - The Domain sub-module" => "chapter3.md",
        ],
        "Installation Instruction" => "appendix.md",
        "IJulia Notebook" => "notebook.md",
        "Overview Julia" => "overview.md",
        "References" => "references.md"
    ]
)
