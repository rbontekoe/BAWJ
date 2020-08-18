# Appendix

## Introduction

I have a Lenovo Legion Y520 Windows 10 laptop with Ubuntu 20.04 installed on a Samsung portable SSD T5 disk. I start my machine from this disk.

All installation instructions in this course are based on Ubuntu.

## Install Julia

Prerequisites
- Your computer OS is Ubuntu 20.04 64 bit.

| Step        | Action      | Comment |
| :---------- | :---------- | :---------- |
| 1 | [Download Julia](https://julialang.org/downloads/) | Click on the link and find the row `Generic Linux Binaries for x86`. Click on `64-bit`. Download the file eg. julia-1.5.0-rc2-linux-x86_64.tar.gz |
| 2 | Ctrl+Alt-T | Open a terminal window. |
| 2 | $ mkdir julia | Create a folder |
| 3 | $ cd julia | Enter folder |
| 4 | $ mv ~/Downloads/julia-1.5.0-rc2-linux-x86_64.tar.gz .| Move the downloaded file to folder `julia`. |
| 5 | $ tar -zxvf jjulia-1.5.0-rc2-linux-x86_64.tar.gz | Extract the file. |
| 6 | $ sudo ln -s /home/rob/julia-1.5.0-rc2-linux-x86_64.tar.gz /usr/local/bin/julia | Create a symbolic link. |
| 7 | $ julia | Start Julia. |
| 8 | Ctrl-D | Close Julia. |

!!! info
    You can remove a symbolic link with: `rm julia`.

## Install Git

Prerequisites
- Your computer OS is Ubuntu 20.04 64 bit.
- You preferably have a [GitHub account](https://github.com/).

Step        | Action      | Comment |
| :---------- | :---------- | :---------- |
| 1 | sudo apt install git | |
| 2 | git config --global user.email "<your email address>" |  |
| 3 | git config --global user.name "<your first and last name>" | E.g. "Rob Bontekoe" |
| 4 | git config --global github.user "<yout git hub name>" | E.g. "rbontekoe" |
| 5 | cat .gitconfig | Show your git data. |

## Install Atom

Prerequisites
- Your computer OS is Ubuntu 20.04 64 bit.
- You have installed Julia.
- You have installed Git.

See also: http://docs.junolab.org/stable/man/installation/

Step        | Action      | Comment |
| :---------- | :---------- | :---------- |
| 1 | goto https://atom.io/ | |
| 2 | select `Download .deb` | |
| 4 | cd ~/Downloads/ |  |
| 5 | sudo apt install ./atom-amd64.deb |  |

## Install Juno

Prerequisites
- Your computer OS is Ubuntu 20.04 64 bit.
- You have installed Julia.
- You have installed Git
- You have installed Atom.

Step        | Action      | Comment |
| :---------- | :---------- | :---------- |
| 1 | mkdir projects |  |
| 2 | cd projects |  |
| 3 | atom <Enter> | Start Atom. |  |
| 4 | Ctrl-, | Open settings. |
| 5 | Select: `Packages` |  |
| 6 | Type: `uber-juno` | In field under Installed packages. |
| 7 | Click on the button: `install` | Juno will be installed, can take a while. |
| 8 | Close Atom |  |
| 9 | atom . | Start atom again with current directory as default. |
| 10 | Select from menu: Juno | Juno menu opens. |
| 11 | Select: Open REPL | Julia will be started. |
| 12 | 1 + 2 <Enter> | Result of addition will be shown in the REPL. |
| 13 | Select from menu: `File` |  |
| 14 | Select: `New file` |  |
| 15 | Type: `println("Hello world!")` |  |
| 16 | Shift-Enter | `Hello world!` will be shown in the file after the statement. |
| 17 | Ctrl-S | The file can be saved. |

## Install IJulia

Prerequisites
- Julia 1.0+ has been installed.

|Step        | Action      | Comment |
|:---------- | :---------- |:---------- |
| 1 | julia | Start Julia. |
| 2 | ] | Activate package manager. |
| 3 | add IJulia | Install package. |
| 4 | BackSpace | Back to the julia prompt. |
| 5 | using IJulia | Load package. |
| 6 | notebook(detached=true, dir=".") | Start IJulia. |

Only the first time you get the next question:

install Jupyter via Conda, y/n? [y]:

Type: y <Enter>

Your browser window opens.

|Step        | Action      | Comment |
|:---------- | :---------- |:---------- |    
| 7 | Select: New > Julia 1.5.0-rc2 | Create a new Julia notebook. |
| 8 | Type: 1 + 2 | Enter a formula in a cell. |
| 9 | Shift-Enter | Execute formula. The result 3 will be shown. |

## Install Docker

Prerequisites
- Your computer OS is Ubuntu 18.04 or higher.

|Step        | Action      | Comment |
|:---------- | :---------- |:---------- |
| 1 | sudo apt-get update | Update Software Repositories. |
| 2 | sudo apt-get remove docker docker-engine docker.io | Uninstall Old Versions of Docker |
| 3 | sudo apt install docker.io | Install Docker |
| 4 | sudo systemctl start docker |  |
| 5 | sudo systemctl enable docker |  |
| 6 | sudo docker version | Check Docker Version |

See also: [How To Install Docker On Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

## Important Docker commands
| Action      | Comment |
|:----------  |:---------- |
| sudo docker images | Display all Docker Images. |
| sudo docker ps | Display all running containers. |
| sudo docker ps - a | Display all containers. |
| sudo docker start <name or id> | E.g `docker start julia`. |
| sudo docker exec -it <name or id> <command> | E.g `docker exec -it julia bash`. |
| sudo docker exec -it <name or id> <command> | E.g `docker exec -it julia julia`. |
| Ctrl-D | Exit the container |
| sudo docker stop <name or id> | E.g `docker stop julia`. |
| sudo docker rm -f <name or id> | Delete a container. |
| sudo docker rmi <image id> | Delete a image. |

---

## To be reconsidered, I am not sure to deliver on-line courses this way.

## Dockerfile

Prerequisites
- Your computer OS is Ubuntu 20.04.
- You have installed Dockerversion version 0.18.0 or higher.

If you have installed Docker, you can create a Docker `Image` from a Dockerfile. From an image you can create [Docker containers](https://www.docker.com/resources/what-container).

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

Prerequisites
- Your computer OS is Ubuntu 20.04.
- You have installed Dockerversion version 0.18.0 or higher.

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


## Install Ubuntu on Samsung T5 and Lemovo Legion Y520 with Windows 10

The steps I have done.

|Step        | Action/Response | Comment |
|:---------- | :---------- |:---------- |
| 1 | Download ISO-image from Ubuntu 18.04. website |  |
| 2 | Copy with Rufus to [USB-stick](https://github.com/kfechter/LegionY530Ubuntu/blob/master/Sections/CreateBootDrive.md) |  |
| 3 | Start machine and press F2 | Change the Bios Lenovo |
```
Under Boot tab:
Fast Boot disabled
Under Security tab:
Secureboot disabled
See:
https://github.com/kfechter/LegionY530Ubuntu/blob/master/Sections/InstallUbuntu.md
```

|Step        | Action/Response | Comment |
|:---------- | :---------- |:---------- |
| 4 | Start Y520 with Windows 10 and press F12 |  |
| 5 | Choose Ubuntu | Restart via USB. |
| 6 | After restart choose for install Ubuntu on 500GB portable disk |  |
| 7 | sudo apt update |  |
| 8 | sudo do-release-upgrade -d | [Upgrade to Ubuntu 20.04](https://ubuntu.com/blog/how-to-upgrade-from-ubuntu-18-04-lts-to-20-04-lts-today). |
