using Documenter

makedocs(
    sitename = "BAWJ",
    format = Documenter.HTML(),
    pages = [
        "Business Applications with Julia" => "index.md",
        "Section 1" => [
            "1 - Intro Notebook" => "chapter1.md",
            "2 - Overview Julia" => "chapter2.md"
        ],
        "Section 2 - Building the application" => [
            "3 - Set-up the design" => "chapter3.md",
            "4 - Implementing the design" => "chapter4.md",
            "5 - Writing test software" => "chapter5.md"
        ],
        "Section 3 - Modules" => [
            "6 - Creating modules" => "chapter6.md",
            "7 - Documenting the modules" => "chapter7.md"
        ],
        "Section 4 - SSH enabled containers" => [
            "8 - Introduction" => "chapter8.md",
            "9 - Create the Container" => "chapter9.md",
            "10 - Raspberry Pi" => "chapter10.md"
        ],
        "Section 5 Up and running" => [
            "11 - Conatiner-container communication" => "chapter11.md",
            "12 - Running the containers" => "chapter12.md"
        ],
        "Appendix" => "appendix.md",
        "References" => "references.md"
    ]
)
