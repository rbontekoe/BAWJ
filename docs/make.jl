using Documenter

makedocs(
    sitename = "BAWJ",
    format = Documenter.HTML(),
    pages = [
        "Business Applications with Julia" => "index.md",
        "Blog" => "blog.md",
        "Section 1" => [
            "1 - Intro Notebook" => "chapter1.md",
            "2 - Overview Julia" => "chapter2.md"
        ],
        "Section 2 - Building the application" => [
            "3 - The design" => "chapter3.md",
            "4 - Implementing the design" => "chapter4.md",
            "5 - Creating modules" => "chapter5.md",
            "6 - Testing the application" => "chapter6.md"
        ],
        "Section 3 - Modules" => [
            "7 - Writing test software" => "chapter7.md",
            "8 - Documenting the modules" => "chapter8.md"
        ],
        "Section 4 - SSH enabled containers" => [
            "9 - Introduction" => "chapter9.md",
            "10 - Create SSH enabled Containers" => "chapter10.md",
            "11 - Raspberry Pi" => "chapter11.md"
        ],
        "Section 5 Up and running" => [
            "12 - Running functions remote" => "chapter12.md",
            "13 - Running the containers" => "chapter13.md",
            "14 - Logging" => "chapter14.md",
            "19 - Activity diagrams" => "chapter19.md",
            "20 - Using Remote Channels (old stuff)" => "chapter20.md"
        ],

        "Appendix" => "appendix.md",
        "References" => "references.md"
    ]
)
