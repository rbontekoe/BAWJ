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
            "3 - Implementing the design" => "chapter3.md"
        ],
        "IJulia Notebook" => "notebook.md",
        "Overview Julia" => "overview.md",
        "Appendix" => "appendix.md",
        "References" => "references.md"
    ]
)
