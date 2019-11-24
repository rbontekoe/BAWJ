using Documenter

makedocs(
    sitename = "BAWJ",
    format = Documenter.HTML(),
    pages = [
        "Business Applications with Julia" => "index.md",
        "1 - Intro Notebook" => "chapter1.md",
        "2 - Overview Julia" => "chapter2.md",
        "Appendix" => "appendix.md",
        "References" => "references.md"
    ]
)
