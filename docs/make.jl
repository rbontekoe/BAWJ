using Documenter

makedocs(
    sitename = "BAWJ",
    format = Documenter.HTML(),
    pages = [
        "Business Applications with Julia" => "index.md",
        "1 - Intro Notebook" => "chapter1.md",
        "2 - Overview Julia" => "chapter2.md",
        "3 - Set-up the design" => "chapter3.md",
        "4 - Implementing the design" => "chapter4.md",
        "5 - Writing test software" => "chapter5.md",
        "6 - Creating the modules" => "chapter6.md",
        "7 - Documenting the modules" => "chapter7.md",
        "8 - Creating our microservices" => "chapter8.md",
        "9 - Running the containers" => "chapter9.md",
        "Appendix" => "appendix.md",
        "References" => "references.md"
    ]
)
