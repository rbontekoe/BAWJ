# IJulia Notebook

Whenever possible I like to create the course environment in a Docker container, for the instructor and for the students.

In online courses, I use my machine as IJulia Notebook server.

Ideas are from [Andre Ferrari](https://github.com/andferrari/julia_notebook)

```@contents
Pages = ["notebook.md"]
```

## What is a notebook?

> In this case, "notebook" or "notebook documents" denote documents that contain both code and rich text elements, such as figures, links, equations, ... Because of the mix of  code and text elements, these documents are the ideal place to bring together an analysis description, and its results, as well as, they can be executed perform the data analysis in real tme.[See](https://www.datacamp.com/community/tutorials/tutorial-jupyter-notebook?utm_source=adwords_ppc&utm_campaignid=898687156&utm_adgroupid=48947256715&utm_device=c&utm_keyword=&utm_matchtype=b&utm_network=g&utm_adpostion=1t1&utm_creative=229765585186&utm_targetid=dsa-473406581035&utm_loc_interest_ms=&utm_loc_physical_ms=1010646&gclid=CjwKCAiAwZTuBRAYEiwAcr67OT0L2OMoR-APTl3_d0nqhdJevnsFnoJscqhbdNXm5gCw25Ul5zJlLBoCDMEQAvD_BwE)

[Top](#Introduction-Notebook-1)

## Options to use a notebook
You have several option to work with IJulia:
1. You have installed Julia on [your own machine](https://subscription.packtpub.com/book/programming/9781788998369/1/ch01lvl1sec12/installing-julia-from-binaries).
2. You have installed Docker on your own machine and run IJulia from a container with [Julia and IJulia installed](https://github.com/andferrari/julia_notebook).
3. You make use of the IJulia server installed on the [machne of your instructor](file:///home/rob/julia_projects/courses/bawj/docs/build/appendix/index.html#Install-IJulia-1).

The IJulia Notebook is installed on the machine of the instructor, but you can also install IJula on your own notebook. Follow the instruction in the appendix.

[Top](#Introduction-Notebook-1)

## Starting IJulia

Ask your instructor for the public ip-address and the token.

The first time you enter the IJulia server, it will ask you one time for the token.

### Login to the IJulia server

|Step        | Action      | Comment |
|:---------- | :---------- |:---------- |
| 1 | Start browser |
| 2 | http://x.x.x.x:8888| Ask instructor for the complete the public ip-address of the IJulia server |
| 3 | Enter the token in the **Password or token** field |
| 4 | Click on the Log in button |

[Top](#Introduction-Notebook-1)

## Create a new notebook

![Test](file:///home/rob/julia_projects/courses/bawj/images/pic1.png)

|Step        | Action/Response | Comment |
|:---------- | :---------- |:---------- |
| 1 | Click on work directory |
| 2 | Click on button New | Open New menu. |
| 3 | Select on item Julia.x.x.x | Create a new Julia Notebook. |
|  |  New Notebook is opened |
| 4 | Place the cursor in the first cel | In this cell you can type your code. |
| 5 | println("Hello World!") | Type your Julia code. |
| 6 | Shift-Enter | Activate the code and create a new cell

[Top](#Introduction-Notebook-1)

## Notebook commands

Working with a Notebook is rather intuitive. Here are some commands you will often use.

|Command       | Comment |
|:---------- | :---------- |
| Shift-Enter | Execute code and create a new cell below. |
| Ctrl-Enter | Execute code and stay in the cell |
| Tab | Code completion, e.g. printl-Tab => println. |
| Double Tab | List with option, e.g. print-Tab displays `print, println, and printstyled` |
| \sqrt-tab | Special characters, in this case `√`. |
| Esc-A | Create empty cell above the current cell. |
| Esc-B | Create empty cell below current cell. |
| Esc-M | Change to a markdown cell. |
| Esc-Y | Change to code cell. |

Click on the keyboard icon to see more options.

[Top](#Introduction-Notebook-1)

## Summary
