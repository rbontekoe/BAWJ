# 14. Run the Application from a Notebook

!!! warning "UNDER DEVELOPMENT"

[Jupiter.org](https://jupyter.org/):
`The Jupyter Notebook is an open-source web application that allows you to create and share documents that contain live code, equations, visualizations and narrative text. Uses include: data cleaning and transformation, numerical simulation, statistical modeling, data visualization, machine learning, and much more.`

Julia supports Jupiter Notebooks. A notebook combined explaining text with code makes it ideal as a teaching tool. It also allows you to experiment with the code.

Assuming you created the containers test_sshd and test_sshd2 in chapter 13, we created two notebooks to test them.
- ar.ipynb
- website.ipynb

The notebooks are part of the GitHub project [TestAppliAR](https://github.com/rbontekoe/TestAppliAR.git). You need to add the package `IJulia.jl` to run the notebooks.

### Contents

```@contents
Pages = ["chapter14.md"]
```

## Activity 14.1: Using a Julia Notebook

##### Prerequisites
- A processor unit preferable of at least three cores.
- Ubuntu 20.04.
- Julia 1.5.
- Git installed.
- Docker installed.
- The two docker containers test_sshd and test_sshd2 were created according to the course [BAWJ, chapter 13](https://www.appligate.nl/BAWJ/stable/chapter13/).

In this activity, you will:
1. Add the IJulia package.
2. Prepare the containers.
3. Clone the GitHub project TestAppliAR.
4. Create the data files.

##### Step 1: Add the IJulia package

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ Add IJulia](../appendix/#Install-IJulia) | Follow the instruction in the link. |


##### Step 2: Prepare the containers

You will add the Julia packages AppliSales, AppliGenralLedger, AppliAR, and Query to the containers.

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ docker start test_sshd | Start the container test_sshd. |
| 2 | $ ssh rob@172.17.0.2 | Enter the container. |
| 3 | $ julia | Start Julia.
| 4 | julia> ] | Activate the Package Manager. |
| 5 | pkg> add AppliSales, AppliGenralLedger, Query | Add the packages |
| 6 | pkg> add https://github.com/rbontekoe/AppliAR.jl | Add AppliAR. |
| 7 | pkg> instantiate | Download the dependencies. |
| 8 | pkg> Ctrl-D | Exit Julia. |
| 9 | $ Ctrl-D | exit the container. |
| 10 | $ docker start test_sshd2 |  |
| 11 | $ ssh rob@172.17.0.3 | Enter the container test_sshd2. |
| 12 | Repeat steps 3 untill 9 |  |

##### Step 3: Clone the GitHub project TestAppliAR

You will clone the project TestAppliAR from GitHub, download the dependencies, and precompile the Julia code.

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ mkdir testar | Create a folder `testar` where you can store the cloned project. |
| 2 | $ cd testar |  |
| 3 | $ git clone https://github.com/rbontekoe/TestAppliAR.git | Clone the project. |
| 4 | $ cd TestAppliAR | Enter the folder TestAppliAR. |
| 5 | julia> ] | Activate the Package Manager. |
| 6 | pkg> add IJulia | [Add IJUlia](../appendix/#Install-IJulia). |
| 7 | pkg> activate . | Activate the current environment. |
| 8 | pkg> instantiate | Download dependecies. |
| 9 | pkg> precompile | Precompiling project... |
| 10 | pkg> <BackSpace> | Back to Julia. |

##### Step 4: Create the data files

You will use the notebook ar.ipynb to create the data files.

In test_sshd:
- test.txt
- test.txt

In test_sshd2
- test.txt
- test.txt
- invoice_nbr.txt

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | julia> using IJulia | Load IJulia. |
| 2 | julia> notebook(dir=".", detached=true) | Opens the start folder in the browser. |
| 3 | Double click on: ar.ipynb | Open the notebook. |
| 4 | Put the cursor in the first cell and press: Shift-Enter | Execute the code in the first cell. |
| 5 | Shift-Enter | Execute the code in the second cell. |
| 6 | Repeat executing the cells until the last cell | |

## Notebook commands

Working with a Notebook is rather intuitive. Here are some commands you will often use.

|Command       | Comment |
|:---------- | :---------- |
| Shift-Enter | Execute code and create a new cell below. |
| Ctrl-Enter | Execute code and stay in the cell |
| Tab | Code completion, e.g. printl-Tab => println. |
| Double Tab | List with options, e.g. print-Tab displays `print, println, and printstyled` |
| \sqrt-tab | Special characters, in this case `√`. |
| Esc-A | Create an empty cell above the current cell. |
| Esc-B | Create an empty cell below the current cell. |
| Esc-M | Change to a markdown cell. |
| Esc-Y | Change to code cell. |

Click on the keyboard icon to see more options.

## Exercise 14.1: Run a  Website

The second example is a notebook `website.ipynb` that starts a website where users can find information about unpaid invoices and the general ledger. The requirement is that the data files exist.

## Summary

Julia supports Jupyter Notebooks, for which you use the package `IJulia`. In Notebooks, you can give textual explanations to the code.  This makes it a suitable tool for course material. Especially since you can add cells afterward and experiment with your code.

For sending information, we use the actor model. Actors process independently and communicate with each other via messages. It makes it easy to set up a workflow.

In the second notebook `website.ipynb` we show how to create a website. You can also use the code in a Docker container, which we will show in the next chapter.
