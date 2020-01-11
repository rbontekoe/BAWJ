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
            "3 - The design" => "chapter3.md",
            "4 - Implementing the design" => "chapter4.md",
            "5 - Creating modules" => "chapter5.md"
        ],
        "Section 3 - Modules" => [
            "6 - Writing test software" => "chapter6.md",
            "7 - Documenting the modules" => "chapter7.md"
        ],
        "Section 4 - SSH enabled containers" => [
            "8 - Introduction" => "chapter8.md",
            "9 - Create SSH enabled Containers" => "chapter9.md",
            "10 - Raspberry Pi" => "chapter10.md"
        ],
        "Section 5 Up and running" => [
            "11 - Running functions remote" => "chapter11.md",
            "12 - Running the containers" => "chapter12.md",
            "13 - Logging" => "chapter13.md",
            "20 - Using Remote Channels (old stuff)" => "chapter20.md"
        ],

        "Appendix" => "appendix.md",
        "References" => "references.md"
    ]
)
