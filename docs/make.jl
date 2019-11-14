using Documenter

makedocs(
    sitename = "BAWJ",
    format = Documenter.HTML(),
    pages = [
        "Index" => "index.md",
        "Chapter 1 - Intro Notebook" => "chapter1.md",
        "Chapter 2 - Overview Julia" => "chapter2.md",
        "Appendix" => "appendix.md",
        "References" => "references.md"
    ]
)
