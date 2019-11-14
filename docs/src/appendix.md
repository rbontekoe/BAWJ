# Appendix

## Introduction

I have a Windows 10 laptop with Ubuntu 18.04 installed on a separate disk. I start my machine form this disk.

All instalation instructions in this course are based on Ubuntu. Whenever possible I like to create the course environment in a Docker container, for the instructor and for the students.

In the course setup I use my machine as IJulia Notebook server.

Ideas are from [Andre Ferrari](https://github.com/andferrari/julia_notebook)

## Install Docker

See: [How To Install Docker On Ubuntu 18.04 Bionic Beaver](https://phoenixnap.com/kb/how-to-install-docker-on-ubuntu-18-04)

|Step        | Action      | Comment |
|:---------- | :---------- |:---------- |
| 1 | sudo apt-get update | Update Software Repositories. |
| 2 | sudo apt-get remove docker docker-engine docker.io | Uninstall Old Versions of Docker |
| 3 | sudo apt install docker.io | Install Docker |
| 4 | sudo systemctl start docker | Start and Automate Docker |
| 5 | sudo systemctl enable docker |
| 6 | docker --version | Check Docker Version |

## Dockerfile

If you have installed Docker, you can create a Docker `Image` from a Dockerfile. From this image you can create [Docker containers](https://www.docker.com/resources/what-container).

```docker
FROM "jupyter/minimal-notebook"

USER root

ENV JULIA_VERSION=1.1.0

RUN mkdir /opt/julia-${JULIA_VERSION} && \
    cd /tmp && \
    wget -q https://julialang-s3.julialang.org/bin/linux/x64/`echo ${JULIA_VERSION} | cut -d. -f 1,2`/julia-${JULIA_VERSION}-linux-x86_64.tar.gz && \
    tar xzf julia-${JULIA_VERSION}-linux-x86_64.tar.gz -C /opt/julia-${JULIA_VERSION} --strip-components=1 && \
    rm /tmp/julia-${JULIA_VERSION}-linux-x86_64.tar.gz

RUN ln -fs /opt/julia-*/bin/julia /usr/local/bin/julia

USER $NB_UID

# Add packages and precompile

RUN julia -e 'import Pkg; Pkg.update()' && \
    julia -e 'import Pkg; Pkg.add("Plots"); using Plots' && \
    # julia -e 'import Pkg; Pkg.add("PlotlyJS"); using PlotlyJS' && \
    julia -e 'import Pkg; Pkg.add("Distributions"); using Distributions' && \
    julia -e 'import Pkg; Pkg.add("Optim"); using Optim' && \
    julia -e 'import Pkg; Pkg.add("StatsPlots"); using StatsPlots' && \
    julia -e 'import Pkg; Pkg.add("IJulia"); using IJulia' && \
    fix-permissions /home/$NB_USER
```

## Install IJulia

!!! note

    The instruction are based on Ubuntu 18.04. We use the command line in a terminal window.

    First check whether Docker is installed on your system, by typing `docker --version`. If the command `docker` is not recognized, [install Docker](file:///home/rob/julia_projects/courses/bawj/docs/build/appendix/index.html#Install-Docker-1).


|Step        | Action      | Comment |
|:---------- | :---------- |:---------- |
| 1 | Open a terminal window on Ubuntu | `$` is the prompt of your OS. |
| 2 | $ mkdir work | Create the folder `work`. Optionally, create sub-directories with the names of your students. |
| 3 | $ mkdir julia | Create another directory `julia'. |
| 4 | $ cd julia | Goto the directory julia. |
| 5 | Copy the code of the section Dockerfile to the clipboard |
| 6 | $ nano Dockerfile | Open the text editor nano. |
| 7 | Ctrl-Shift-V | Paste the text on the clipboard into the text editor. |
| 8 | Ctrl-O | Save the Dockerfile. |
| 9 | Ctrl-X | Exit nano |
| 10 | $ ls | list the content of the directory julia.
| 11 | $ cat Dockerfile | Display the content of the Dockerfile. |
| 12 | $ docker build -t julia-image . | Create a Docker IJulia image. The name of the image is ```julia-image```. |
| 13 | $ docker run \-v ~/work:/home/jovjan/work -p 8888:8888 \-\-name julia julia-image | Create a Docker container, and the IJulia Notebook server starts. |
| 14 | Ctrl-C | Stop the server. |

## Using IJulia

### Instructor

|Step        | Action/Response | Comment |
|:---------- | :---------- |:---------- |
| 1 | $ docker start julia | Start the `IJulia`. |
| 2 | $ docker exec -it julia bash |  Start the Docker client. |
| 3 | jovyan@40f8c3bcf0c1:~$ **jupyter notebook list** | Display the token. |
|   |  ```jovyan@40f8c3bcf0c1:~$ jupyter notebook list Currently running servers: http://0.0.0.0:8888/?token=f394613a12c103a2de92e70aa34715b2183d58e3d5580a2e :: /home/jovyan``` | |
| 4 | Select the token | In this case: `f394613a12c103a2de92e70aa34715b2183d58e3d5580a2e`.
| 5 | Ctrl-Shift-C | Copy the token to the clipboard. |
| 6 | Store the key somewhere, so you can email it to your students. |
| 7 | $ Ctrl-D | Exit Docker client. |


## Important Docker commands
| Action      | Comment |
|:----------  |:---------- |
| docker images | Display all Docker Images. |
| docker ps | Display all running containers. |
| docker ps - a | Display all containers. |
| docker start <name or id> | E.g `docker start julia`. |
| docker exec -it <name or id> <command> | E.g `docker exec -it julia bash`. |
| docker exec -it <name or id> <command> | E.g `docker exec -it julia julia`. |
| Ctrl-D | Exit the container |
| docker stop <name or id> | E.g `docker stop julia`. |
| docker rm -f <name or id> | Delete a container. |
| docker rmi <image id> | Delete a image. |
