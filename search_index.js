var documenterSearchIndex = {"docs":
[{"location":"appendix/#Appendix-1","page":"Appendix","title":"Appendix","text":"","category":"section"},{"location":"appendix/#Introduction-1","page":"Appendix","title":"Introduction","text":"","category":"section"},{"location":"appendix/#","page":"Appendix","title":"Appendix","text":"I have a Windows 10 laptop with Ubuntu 18.04 installed on a separate disk. I start my machine form this disk.","category":"page"},{"location":"appendix/#","page":"Appendix","title":"Appendix","text":"All instalation instructions in this course are based on Ubuntu. Whenever possible I like to create the course environment in a Docker container, for the instructor and for the students.","category":"page"},{"location":"appendix/#","page":"Appendix","title":"Appendix","text":"In the course setup I use my machine as IJulia Notebook server.","category":"page"},{"location":"appendix/#","page":"Appendix","title":"Appendix","text":"Ideas are from Andre Ferrari","category":"page"},{"location":"appendix/#Install-Docker-1","page":"Appendix","title":"Install Docker","text":"","category":"section"},{"location":"appendix/#","page":"Appendix","title":"Appendix","text":"See: How To Install Docker On Ubuntu 18.04 Bionic Beaver","category":"page"},{"location":"appendix/#","page":"Appendix","title":"Appendix","text":"Step Action Comment\n1 sudo apt-get update Update Software Repositories.\n2 sudo apt-get remove docker docker-engine docker.io Uninstall Old Versions of Docker\n3 sudo apt install docker.io Install Docker\n4 sudo systemctl start docker Start and Automate Docker\n5 sudo systemctl enable docker \n6 docker –version Check Docker Version","category":"page"},{"location":"appendix/#Dockerfile-1","page":"Appendix","title":"Dockerfile","text":"","category":"section"},{"location":"appendix/#","page":"Appendix","title":"Appendix","text":"If you have installed Docker, you can create a Docker Image from a Dockerfile. From this image you can create Docker containers.","category":"page"},{"location":"appendix/#","page":"Appendix","title":"Appendix","text":"FROM \"jupyter/minimal-notebook\"\n\nUSER root\n\nENV JULIA_VERSION=1.1.0\n\nRUN mkdir /opt/julia-${JULIA_VERSION} && \\\n    cd /tmp && \\\n    wget -q https://julialang-s3.julialang.org/bin/linux/x64/`echo ${JULIA_VERSION} | cut -d. -f 1,2`/julia-${JULIA_VERSION}-linux-x86_64.tar.gz && \\\n    tar xzf julia-${JULIA_VERSION}-linux-x86_64.tar.gz -C /opt/julia-${JULIA_VERSION} --strip-components=1 && \\\n    rm /tmp/julia-${JULIA_VERSION}-linux-x86_64.tar.gz\n\nRUN ln -fs /opt/julia-*/bin/julia /usr/local/bin/julia\n\nUSER $NB_UID\n\n# Add packages and precompile\n\nRUN julia -e 'import Pkg; Pkg.update()' && \\\n    julia -e 'import Pkg; Pkg.add(\"Plots\"); using Plots' && \\\n    # julia -e 'import Pkg; Pkg.add(\"PlotlyJS\"); using PlotlyJS' && \\\n    julia -e 'import Pkg; Pkg.add(\"Distributions\"); using Distributions' && \\\n    julia -e 'import Pkg; Pkg.add(\"Optim\"); using Optim' && \\\n    julia -e 'import Pkg; Pkg.add(\"StatsPlots\"); using StatsPlots' && \\\n    julia -e 'import Pkg; Pkg.add(\"IJulia\"); using IJulia' && \\\n    fix-permissions /home/$NB_USER","category":"page"},{"location":"appendix/#Install-IJulia-1","page":"Appendix","title":"Install IJulia","text":"","category":"section"},{"location":"appendix/#","page":"Appendix","title":"Appendix","text":"note: Note\nThe instruction are based on Ubuntu 18.04. We use the command line in a terminal window.First check whether Docker is installed on your system, by typing docker --version. If the command docker is not recognized, install Docker.","category":"page"},{"location":"appendix/#","page":"Appendix","title":"Appendix","text":"Step Action Comment\n1 Open a terminal window on Ubuntu $ is the prompt of your OS.\n2 $ mkdir work Create the folder work. Optionally, create sub-directories with the names of your students.\n3 $ mkdir julia Create another directory `julia'.\n4 $ cd julia Goto the directory julia.\n5 Copy the code of the section Dockerfile to the clipboard \n6 $ nano Dockerfile Open the text editor nano.\n7 Ctrl-Shift-V Paste the text on the clipboard into the text editor.\n8 Ctrl-O Save the Dockerfile.\n9 Ctrl-X Exit nano\n10 $ ls list the content of the directory julia.\n11 $ cat Dockerfile Display the content of the Dockerfile.\n12 $ docker build -t julia-image . Create a Docker IJulia image. The name of the image is julia-image.\n13 $ docker run -v ~/work:/home/jovjan/work -p 8888:8888 --name julia julia-image Create a Docker container, and the IJulia Notebook server starts.\n14 Ctrl-C Stop the server.","category":"page"},{"location":"appendix/#Using-IJulia-1","page":"Appendix","title":"Using IJulia","text":"","category":"section"},{"location":"appendix/#Instructor-1","page":"Appendix","title":"Instructor","text":"","category":"section"},{"location":"appendix/#","page":"Appendix","title":"Appendix","text":"Step Action/Response Comment\n1 $ docker start julia Start the IJulia.\n2 $ docker exec -it julia bash Start the Docker client.\n3 jovyan@40f8c3bcf0c1:~$ jupyter notebook list Display the token.\n jovyan@40f8c3bcf0c1:~$ jupyter notebook list Currently running servers: http://0.0.0.0:8888/?token=f394613a12c103a2de92e70aa34715b2183d58e3d5580a2e :: /home/jovyan \n4 Select the token In this case: f394613a12c103a2de92e70aa34715b2183d58e3d5580a2e.\n5 Ctrl-Shift-C Copy the token to the clipboard.\n6 Store the key somewhere, so you can email it to your students. \n7 $ Ctrl-D Exit Docker client.","category":"page"},{"location":"appendix/#Important-Docker-commands-1","page":"Appendix","title":"Important Docker commands","text":"","category":"section"},{"location":"appendix/#","page":"Appendix","title":"Appendix","text":"Action Comment\ndocker images Display all Docker Images.\ndocker ps Display all running containers.\ndocker ps - a Display all containers.\ndocker start <name or id> E.g docker start julia.\ndocker exec -it <name or id> <command> E.g docker exec -it julia bash.\ndocker exec -it <name or id> <command> E.g docker exec -it julia julia.\nCtrl-D Exit the container\ndocker stop <name or id> E.g docker stop julia.\ndocker rm -f <name or id> Delete a container.\ndocker rmi <image id> Delete a image.","category":"page"},{"location":"references/#References-1","page":"References","title":"References","text":"","category":"section"},{"location":"references/#Julia-1","page":"References","title":"Julia","text":"","category":"section"},{"location":"references/#","page":"References","title":"References","text":"The Emergent Features of JuliaLang: Part I\nThe Emergent Features of JuliaLang: Part II - Traits\nThink Julia\nParallel Computing","category":"page"},{"location":"references/#Julia-Wikibooks-1","page":"References","title":"Julia Wikibooks","text":"","category":"section"},{"location":"references/#","page":"References","title":"References","text":"Index\nIntroducing Julia/Types","category":"page"},{"location":"references/#Julia-Machine-Learning-1","page":"References","title":"Julia Machine Learning","text":"","category":"section"},{"location":"references/#","page":"References","title":"References","text":"","category":"page"},{"location":"references/#Julia-Package-Manger-1","page":"References","title":"Julia Package Manger","text":"","category":"section"},{"location":"references/#","page":"References","title":"References","text":"A Brief Introduction to Package Management with Julia 1.0\nPkg + BinaryBuilder – The Next Generation","category":"page"},{"location":"references/#Atom/Juno-Documentation-1","page":"References","title":"Atom/Juno Documentation","text":"","category":"section"},{"location":"references/#","page":"References","title":"References","text":"Juno Documentation","category":"page"},{"location":"references/#Docker-1","page":"References","title":"Docker","text":"","category":"section"},{"location":"references/#","page":"References","title":"References","text":"Running the \"Real Time Voice Cloning\" project in Docker","category":"page"},{"location":"references/#Miscellaneous-1","page":"References","title":"Miscellaneous","text":"","category":"section"},{"location":"references/#","page":"References","title":"References","text":"Auto Cue\nThis AI Clones Your Voice After Listening for 5 Seconds","category":"page"},{"location":"chapter1/#Introduction-Notebook-1","page":"1 - Intro Notebook","title":"Introduction Notebook","text":"","category":"section"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"Pages = [\"chapter1.md\"]","category":"page"},{"location":"chapter1/#What-is-a-notebook?-1","page":"1 - Intro Notebook","title":"What is a notebook?","text":"","category":"section"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"In this case, \"notebook\" or \"notebook documents\" denote documents that contain both code and rich text elements, such as figures, links, equations, ... Because of the mix of  code and text elements, these documents are the ideal place to bring together an analysis description, and its results, as well as, they can be executed perform the data analysis in real tme.See","category":"page"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"Top","category":"page"},{"location":"chapter1/#Options-to-use-a-notebook-1","page":"1 - Intro Notebook","title":"Options to use a notebook","text":"","category":"section"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"You have several option to work with IJulia:","category":"page"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"You have installed Julia on your own machine.\nYou have installed Docker on your own machine and run IJulia from a container with Julia and IJulia installed.\nYou make use of the IJulia server installed on the machne of your instructor.","category":"page"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"The IJulia Notebook is installed on the machine of the instructor, but you can also install IJula on your own notebook. Follow the instruction in the appendix.","category":"page"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"Top","category":"page"},{"location":"chapter1/#Starting-IJulia-1","page":"1 - Intro Notebook","title":"Starting IJulia","text":"","category":"section"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"Ask your instructor for the public ip-address and the token.","category":"page"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"The first time you enter the IJulia server, it will ask you one time for the token.","category":"page"},{"location":"chapter1/#Login-to-the-IJulia-server-1","page":"1 - Intro Notebook","title":"Login to the IJulia server","text":"","category":"section"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"Step Action Comment\n1 Start browser \n2 http://x.x.x.x:8888 Ask instructor for the complete the public ip-address of the IJulia server\n3 Enter the token in the Password or token field \n4 Click on the Log in button ","category":"page"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"Top","category":"page"},{"location":"chapter1/#Create-a-new-notebook-1","page":"1 - Intro Notebook","title":"Create a new notebook","text":"","category":"section"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"(Image: Test)","category":"page"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"Step Action/Response Comment\n1 Click on work directory \n2 Click on button New Open New menu.\n3 Select on item Julia.x.x.x Create a new Julia Notebook.\n New Notebook is opened \n4 Place the cursor in the first cel In this cell you can type your code.\n5 println(\"Hello World!\") Type your Julia code.\n6 Shift-Enter Activate the code and create a new cell","category":"page"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"Top","category":"page"},{"location":"chapter1/#Notebook-commands-1","page":"1 - Intro Notebook","title":"Notebook commands","text":"","category":"section"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"Working with a Notebook is rather intuitive. Here are some commands you will often use.","category":"page"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"Command Comment\nShift-Enter Execute code and create a new cell below.\nCtrl-Enter Execute code and stay in the cell\nTab Code completion, e.g. printl-Tab => println.\nDouble Tab List with option, e.g. print-Tab displays print, println, and printstyled\n\\sqrt-tab Special characters, in this case √.\nEsc-A Create empty cell above the current cell.\nEsc-B Create empty cell below current cell.\nEsc-M Change to a markdown cell.\nEsc-Y Change to code cell.","category":"page"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"Click on the keyboard icon to see more options.","category":"page"},{"location":"chapter1/#","page":"1 - Intro Notebook","title":"1 - Intro Notebook","text":"Top","category":"page"},{"location":"chapter1/#Summary-1","page":"1 - Intro Notebook","title":"Summary","text":"","category":"section"},{"location":"chapter2/#Overview-Julia-1","page":"2 - Overview Julia","title":"Overview Julia","text":"","category":"section"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"Pages = [\"chapter2.md\"]","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"There are many excellent courses on Julia. We suppose that the reader has some basic knowledge of Julia, as in Think Julia. We recapitulate the most important differences with other languages.","category":"page"},{"location":"chapter2/#Concatenation-1","page":"2 - Overview Julia","title":"Concatenation","text":"","category":"section"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"In Julia is the asterisk (*) used as a concatenation symbol instead of the plus-sign (+) in other languages.","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"julia> a = \"Hello \"\n\"Hello\"\n\njulia> b = \"World!\"\n\"World!\"\n\njulia> c = a * b\n\"Hello World!\"","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"Top","category":"page"},{"location":"chapter2/#Iteration-1","page":"2 - Overview Julia","title":"Iteration","text":"","category":"section"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"See Think Julia, 7. Iteration","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"Some examples.","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"julia> range = 0:0.1:0.5π # values from 0 to 0.5π radians (90°), with a step value of 0.1 radian\n0.0:0.1:1.5\n\njulia> y = [sin(x) for x in range] # calculate sin for the values in the variable range\n16-element Array{Float64,1}:\n 0.0                \n 0.09983341664682815\n 0.19866933079506122\n 0.2955202066613396\n 0.3894183423086505\n 0.479425538604203  \n 0.5646424733950355\n 0.6442176872376911\n 0.7173560908995228\n 0.7833269096274834\n 0.8414709848078965\n 0.8912073600614354\n 0.9320390859672264\n 0.963558185417193  \n 0.9854497299884603\n 0.9974949866040544\n\njulia> using Plots\n\njulia> plot(x -> sin(x) , 0:0.1:2π) # passing a value to sin(x)\n\njulia> plot(sin, 0:0.1:2π) # works also\n","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"Top","category":"page"},{"location":"chapter2/#Help-1","page":"2 - Overview Julia","title":"Help","text":"","category":"section"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"\njulia> ?\nhelp?> sin\nsearch: sin sinh sind sinc sinpi sincos asin using isinf asinh asind isinteger\n\n  sin(x)\n\n  Compute sine of x, where x is in radians.\n\n  ────────────────────────────────────────────────────────────────────────────\n\n  sin(A::AbstractMatrix)\n\n  Compute the matrix sine of a square matrix A.\n\n  If A is symmetric or Hermitian, its eigendecomposition (eigen) is used to\n  compute the sine. Otherwise, the sine is determined by calling exp.\n\n  Examples\n  ≡≡≡≡≡≡≡≡≡≡\n\n  julia> sin(fill(1.0, (2,2)))\n  2×2 Array{Float64,2}:\n   0.454649  0.454649\n   0.454649  0.454649","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"Top","category":"page"},{"location":"chapter2/#User-defined-functions-1","page":"2 - Overview Julia","title":"User defined functions","text":"","category":"section"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"julia> function f(x, ϕ, b)\n         sin(x + ϕ) + b\n       end\nf (generic function with 1 method)\n\njulia> 0.3f(0.5π, 0.1π, 1)\n0.5853169548885461\n","category":"page"},{"location":"chapter2/#Multiple-dispatch-1","page":"2 - Overview Julia","title":"Multiple dispatch","text":"","category":"section"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"In object oriented languages like Java we can overload a method. Julia, however, is a functional language. Here we can use the same function name as long as the signatures are different.","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"julia> f(x) = sin(x) # function with one argument\nf (generic function with 1 methods)\n\njulia> f(x, ψ) = sin(x - ψ)  # function with two arguments\nf (generic function with 2 methods)\n\njulia> f(x, ψ, b) = sin(x - ψ) + b   # function with three arguments\nf (generic function with 3 methods)\n\njulia> f(x::Int64) = sin(x/180 * π) # function in degrees, argument has to be an integer\nf (generic function with 4 methods)\n\njulia> methods(f) # show all methods of the function f\n# 4 methods for generic function \"f\":\n[1] f(x::Int64) in Main at REPL[10]:1\n[2] f(x) in Main at REPL[2]:1\n[3] f(x, ψ) in Main at REPL[3]:1\n[4] f(x, ψ, b) in Main at REPL[4]:1\n\njulia> f(0.5π) # 90 degrees in radians\n1.0\n\njulia> f(0.5π, 0.1π) # with 0.1π phase shift in radians\n0.9510565162951536\n\njulia> f(0.5π, 0.1π, 1)\n1.9510565162951536\n\njulia> f(90) # 90 degrees as integer\n1.0\n\njulia> f(90.0) # should be 0.5π\n0.8939966636005579\n","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"Top","category":"page"},{"location":"chapter2/#User-defined-data-structures-1","page":"2 - Overview Julia","title":"User defined data structures","text":"","category":"section"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"Julia is not a object oriented programming language. But you can define data structures with constructors, and use the dot notation to refer to its data elements.","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"\njulia> struct Subscriber\n           id::String\n           name::String\n           email::String\n           #constructors\n           Subscriber(name::String) = new( createKey(name), name, \"\" )\n           Subscriber(name::String, email::String) = new( createKey(name), name, email )\n       end # defined Subscriber object\n\njulia> createKey(name::String) = string(hash(name * string(time())))\ncreateKey (generic function with 1 method)\n\njulia> daisy = Subscriber(\"Daisy\")\nSubscriber(\"6761641919537447636\", \"Daisy\", \"\")\n\njulia> daisy.name\n\"Daisy\"","category":"page"},{"location":"chapter2/#Plotting-data-1","page":"2 - Overview Julia","title":"Plotting data","text":"","category":"section"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"See Plots","category":"page"},{"location":"chapter2/#Installing-the-Plots-package-1","page":"2 - Overview Julia","title":"Installing the Plots package","text":"","category":"section"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"julia> ]\n\n(v1.1) pkg> add Plots <Enter>\n\n(v1.1) pkg> Ctrl-C\n\njulia>","category":"page"},{"location":"chapter2/#Using-Plots-1","page":"2 - Overview Julia","title":"Using Plots","text":"","category":"section"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"\njulia> using Plots; gr()\n\njulia> plot(x -> sin(x/180 * π), 0:01:360, xlabel=\"Degrees\", title=\"Plot sin\", label=\"No phase shift\")\n\njulia> ψ = 30 # degrees\n30\n\njulia> plot!( x -> sin( (x - ψ)/180 * π ), 0:01:360, label=\"$(ψ)° phase shift\")\n","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"Top","category":"page"},{"location":"chapter2/#Useful-to-know-Version-1.1.1-(2019-05-16)-1","page":"2 - Overview Julia","title":"Useful to know - Version 1.1.1 (2019-05-16)","text":"","category":"section"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"Testing conditions","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"julia> x = 5\n5\n\njulia> 0 < x < 6\ntrue\n\njulia> 0 ≤ x ≤ 5 # ≤  is \\le<Tab>\ntrue\n\njulia> 0 ≤ x ≤ 4\nfalse\n\njulia> 5 ≥ x ≥ 0 # ≥ is \\ge<Tab>\ntrue\n\njulia> x ≠ 4 # ≠ is \\ne<Tab>\ntrue\n","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"Sets, symbolsπ","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"julia> a = [1, 2, 3]\n3-element Array{Int64,1}:\n 1\n 2\n 3\n\njulia> b = [3, 4, 5]\n3-element Array{Int64,1}:\n 3\n 4\n 5\n\njulia> a ∩ b # ∩ is \\cap<Tab>, also intersect(a, b)\n1-element Array{Int64,1}:\n 3\n\njulia> a ∪ b # ∩ is \\cup<Tab>, also union(a, b)\n5-element Array{Int64,1}:\n 1\n 2\n 3\n 4\n 5\n\njulia> symdiff(a, b) # forgot the symbol\n4-element Array{Int64,1}:\n 1\n 2\n 4\n 5\n\njulia> 3 ∈ a # 3 element of a, \\in<Tab>\ntrue\n\njulia> 3 ∉ a # 3 not an element of a, \\notin<Tab>\nfalse\n\njulia> a ⊆ b # a subset of b, ⊆ is \\subseteq<Tab>\nfalse\n\njulia> b ⊇ [3, 4] # b is superset of [3, 4], ⊆ = \\supseteq<Tab>\ntrue","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"Natural constant ℯ and π","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"\njulia> ℯ # \\euler<Tab>\nℯ = 2.7182818284590...\n\njulia> π # \\pi<Tab>\nπ = 3.1415926535897...\n\njulia> factorial(4)\n24\n\njulia> 1*2*3*4\n24","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"Functional programming","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"\njulia> a = [2, 3, 4]\n3-element Array{Int64,1}:\n 2\n 3\n 4\n\njulia> map(x -> x^2, a)\n3-element Array{Int64,1}:\n 4\n 9\n16\n\njulia> reduce( (x, y) -> x + y, a)\n9\n\njulia> sum(a)\n9\n\njulia> reduce( (x, y) -> x^2 + y^2, a)\n185\n\njulia> (2^2 + 3^2)^2 + 4^2\n185","category":"page"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"Top","category":"page"},{"location":"chapter2/#Summary-1","page":"2 - Overview Julia","title":"Summary","text":"","category":"section"},{"location":"chapter2/#","page":"2 - Overview Julia","title":"2 - Overview Julia","text":"Top","category":"page"},{"location":"#","page":"Business Applications with Julia","title":"Business Applications with Julia","text":"(Image: AppliGate)","category":"page"},{"location":"#Building-Business-Applications-with-Julia-1","page":"Business Applications with Julia","title":"Building Business Applications with Julia","text":"","category":"section"},{"location":"#Preface-1","page":"Business Applications with Julia","title":"Preface","text":"","category":"section"},{"location":"#","page":"Business Applications with Julia","title":"Business Applications with Julia","text":"In July 2018, I read an article about a new programming language that was rapidly gaining in popularity, Julia. It appealed to me how you could define a function. Almost exactly as I learned it during my bachelor study Electronics: f(x) = 2x² + 3x + 1, in Julia written as 2x^2 + 3x + 1. Then I set up a project to learn how to implement the observer pattern. It was easy, but I left it out because I was working on Scala at that moment.","category":"page"},{"location":"#","page":"Business Applications with Julia","title":"Business Applications with Julia","text":"While working with Scala, I came in touch with the Onion Architecture, after watching Wade Waldron's presentation, Domain-Driven Design, and Onion Architecture. Since then, I use it.","category":"page"},{"location":"#","page":"Business Applications with Julia","title":"Business Applications with Julia","text":"The ease with which I could build business applications with Julia stayed with me.","category":"page"},{"location":"#","page":"Business Applications with Julia","title":"Business Applications with Julia","text":"At the beginning of 2019, a recruiter told me that the interest in Scala in the Netherlands was waning. Should I continue with Scala?","category":"page"},{"location":"#A-course-was-born-1","page":"Business Applications with Julia","title":"A course was born","text":"","category":"section"},{"location":"#","page":"Business Applications with Julia","title":"Business Applications with Julia","text":"I decided to stop with Scala and picked up my Julia observer trial project again. From the code, I created a Julia package, RbO.jl.","category":"page"},{"location":"#","page":"Business Applications with Julia","title":"Business Applications with Julia","text":"It turned out that I could create beautiful documentation, using the package Documenter.jl. You write it in the markdown language and can insert examples of how to use your code. During the creation of the HTML code, you can have the cases tested, which is useful if you later expand the module and generate the documentation again. The documentation can be seen at the GitHub Pages.","category":"page"},{"location":"#","page":"Business Applications with Julia","title":"Business Applications with Julia","text":"I had already a GitHub Pages profile, and thought: \"Why not set up the AppliGate website in this way and link it to my profile.\" I did it: https://www,appligate.nl.","category":"page"},{"location":"#","page":"Business Applications with Julia","title":"Business Applications with Julia","text":"With trying out so many things with Julia, the problem arose at a certain point that I could not find specific trials back in my notes. After the success of the website, I thought: \"Why not set up a course where I can register all the interesting things?\".","category":"page"},{"location":"#Developing-Business-Applications-with-Julia-1","page":"Business Applications with Julia","title":"Developing Business Applications with Julia","text":"","category":"section"},{"location":"#","page":"Business Applications with Julia","title":"Business Applications with Julia","text":"The result is this course Business Applications with Julia I am creating now.","category":"page"},{"location":"#","page":"Business Applications with Julia","title":"Business Applications with Julia","text":"Rob Bontekoe","category":"page"},{"location":"#Index-(Course-is-under-development)-1","page":"Business Applications with Julia","title":"Index (Course is under development)","text":"","category":"section"},{"location":"#","page":"Business Applications with Julia","title":"Business Applications with Julia","text":"Pages = [\"index.md\", \"chapter1.md\", \"chapter2.md\", \"appendix.md\", \"references.md\"]","category":"page"}]
}
