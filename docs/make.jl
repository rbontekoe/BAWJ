using Documenter

makedocs(
    sitename = "BAWJ",
    format = Documenter.HTML(),
    pages = [
        "Business Applications with Julia" => "index.md",
        "Blog" => "blog.md",
        "Section 1 - Building the application" => [
            "1 - The Application" => "chapter1.md",
            "2 - The design" => "chapter2.md",
            "3 - Experimenting with Modules" => "chapter3.md",
        ],
        "Installation Instruction" => "appendix.md",
        "IJulia Notebook" => "notebook.md",
        "Overview Julia" => "overview.md",
        "References" => "references.md"
    ]
)
