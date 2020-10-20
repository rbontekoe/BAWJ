# Installation Instructions

## Introduction

I have a Lenovo Legion Y520 Windows 10 laptop with Ubuntu 20.04 installed on a [Samsung portable SSD T5](#Install-Ubuntu-on-Samsung-T5-and-Lemovo-Legion-Y520-with-Windows-10) disk. I start my machine from this disk.

All installation instructions in this course are based on Ubuntu 20.04.

## Install Julia

Julia is a language that is fast, dynamic, easy to use, and open source.

##### Prerequisites
- Your computer OS is Ubuntu 20.04 64 bit.

| Step        | Action      | Comment |
| :---------- | :---------- | :---------- |
| 1 | [Download Julia](https://julialang.org/downloads/) | Click on the link and find the row `Generic Linux Binaries for x86`. Click on `64-bit`. Download the file eg. julia-1.5.2-linux-x86_64.tar.gz |
| 2 | Ctrl+Alt-T | Open a terminal window. |
| 2 | $ mkdir julia | Create a folder |
| 3 | $ cd julia | Enter folder |
| 4 | $ mv ~/Downloads/julia-1.5.2-linux-x86_64.tar.gz .| Move the downloaded file to folder `julia`. |
| 5 | $ tar -zxvf julia-1.5.2-linux-x86_64.tar.gz | Extract the file. |
| 6 | $ cd julia/julia/julia-1.5.2/bin/ |  |
| 7 | $ ./julia | Start Julia. |
| 8 | julia> Ctrl-D | Close Julia. |
| 9 | cd ../.. |  |
| 10 | $ sudo ln -s /home/rob/julia/julia-1.5.2/bin/julia /usr/local/bin/julia | Create a symbolic link. |
| 11 | $ julia | Start Julia. |
| 12 | Ctrl-D | Close Julia. |
||

!!! info
    You can remove the symbolic link with: `sudo rm /usr/local/bin/julia`.

## Install Git

Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

##### Prerequisites
- Your computer OS is Ubuntu 20.04 64 bit.
- You preferably have a [GitHub account](https://github.com/).

Step        | Action      | Comment |
| :---------- | :---------- | :---------- |
| 1 | sudo apt install git | |
| 2 | git config --global user.email "<your email address>" |  |
| 3 | git config --global user.name "<your first and last name>" | E.g. "Rob Bontekoe" |
| 4 | git config --global github.user "<yout git hub name>" | E.g. "rbontekoe" |
| 5 | cat .gitconfig | Show your git data. |
||

## Install Atom

Atom is a free and open-source text and source code editor.

See also [Install Julia for VSCode](#Install-Julia-for-VSCode).

##### Prerequisites
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
||

## Install Juno

Juno is a development plugin for the Julia language.

See also [Install Julia for VSCode](#Install-Julia-for-VSCode).

##### Prerequisites
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
||

## Install Julia for VSCode

Juno will not be further expanded with new features. It looks like VSCode is going to be the future development platform for Julia. Watch the video [JuliaCon 2020 | (Juno 1.0) VSCode for Julia 1.0 | Sebastian P., Shuhei K., David A.](https://www.youtube.com/watch?v=rQ7D1lXt3GM&t=50s).

##### Prerequisites
- Your computer OS is Ubuntu 20.04 64 bit.
- You have installed Julia 1.5+.
- You have installed Git.

In this activity, you will:
1. [Install VSCode](#Step-1:-Install-VSCode.).
2. [Install the Julia Extension](#Step-2:-Install-the-Julia-Extension.).
3. [Optional, Show Inline Results](#Step-3-(optional):-Show-Inline-Results.).

---

##### Step 1: Install VSCode.

The installation of VSCode runs most smoothly if you install Julia and Git first.

Step        | Action      | Comment |
| :---------- | :---------- | :---------- |
| 1 | Go to the [VSCode site](https://code.visualstudio.com/) |  |
| 2 | Click on: Download | Select the Download button. |
| 3 | Right of .deb, select: 64 bit | Click on the 64 bit button.  |
| 4 | Select: Save | Select the Download folder and click on Save. |
| 5 | Go to your Download folder |  |
| 6 | Type: sudo apt install ./<downloaded .deb file> | E.g. sudo apt install ./code_1.50.0-1602051089_amd64.deb. VSCode will be installed. |
| 7 | cd ~ | Go to your home folder. |
| 8 | Type: code . | VSCode is started. |
||

##### Step 2: Install the Julia Extension.

You won't be able to work with Julia until you install the plugin.

Step        | Action      | Comment |
| :---------- | :---------- | :---------- |
| 1 | Ctrl+Shift-X | Open the Extensions pane. You can also hover over the most left icon column to find the option. |
| 2 | At the top of the pane, in the field `Search Extensions in Marketplace` type: julia | Find the Julia extension: Jul1a, Julia Language Support. |
| 3 | Click on: Install | Install the Julia extension. |
| 4 | Clear the field `Search Extensions in Marketplace` | Erease julia.

##### Step 3 (optional): Show Inline Results.

One of the great things about Juno is that you could see the result of a statement on the same line when you executed the code in a file step by step using Shift-<Enter>. This feature is now also available in the Julia extension. However, you step by step through your code in VSCode with Alt-<Enter>.

Step        | Action      | Comment |
| :---------- | :---------- | :---------- |
| 1 | Ctrl+Shift-X | Open the Extensions pane. You can also hover over the most left icon column to find the option. |
| 2 | Type: julia | Type `julia` in the `Search Extensions in Marketplace` field when the extension is not visible. |
| 3 | Click on the: Sprocket symbol | The `Install` button has been replaced by the sprocket symbol. It opens the menu of the julia extension. |
| 4 | Select: Extension Settings |  |
| 5 | Click in the adjacent pane on the tab: User | The tab User is the default selected tab! |
| 6 | Search for the option: julia > Execution: ResultType |  |
| 7 | Choose: inline | The default is REPL, which meanns that the results are printed in the terminal. |
||

Links:
- [Working with GitHub in VS Code](https://code.visualstudio.com/docs/editor/github)
- [Download Visual Studio Code](https://code.visualstudio.com/download)
- [julia-vscode](https://github.com/julia-vscode/julia-vscode)
- [Command Line Interface (CLI)](https://code.visualstudio.com/docs/editor/command-line)
- [JuliaCon 2020 | Using VS Code for Julia development | David Anthoff](https://www.youtube.com/watch?v=IdhnP00Y1Ks)
- [Julia VS Code extension v0.16 release](https://www.julia-vscode.org/docs/dev/release-notes/v0_16/#Inline-evaluation-1)

## Install IJulia

IJulia is a browser back-end for the Jupyter interactive notebook environment.

##### Prerequisites
- Julia 1.0+ has been installed.

|Step        | Action      | Comment |
|:---------- | :---------- |:---------- |
| 1 | julia | Start Julia. |
| 2 | ] | Activate package manager. |
| 3 | add IJulia | Install package. |
| 4 | BackSpace | Back to the julia prompt. |
| 5 | using IJulia | Load package. |
| 6 | notebook(detached=true, dir=".") | Start IJulia. |
||
```
Only the first time you get the next question:

install Jupyter via Conda, y/n? [y]:

Type: y <Enter>

Your browser window opens.
```
|Step        | Action      | Comment |
|:---------- | :---------- |:---------- |    
| 7 | Select: New > Julia 1.5.0-rc2 | Create a new Julia notebook. |
| 8 | Type: 1 + 2 | Enter a formula in a cell. |
| 9 | Shift-Enter | Execute formula. The result 3 will be shown. |
||

## Install Docker

Docker is an open container platform for developing, shipping, and running applications.

##### Prerequisites
- Your computer OS is Ubuntu 20.04 or higher.

See also: [How To Install Docker On Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

|Step        | Action      | Comment |
|:---------- | :---------- |:---------- |
| 1 | sudo apt-get update | Update Software Repositories. |
| 2 | sudo apt-get remove docker docker-engine docker.io | Uninstall Old Versions of Docker |
| 3 | sudo apt install docker.io | Install Docker |
| 4 | sudo systemctl start docker |  |
| 5 | sudo systemctl enable docker |  |
| 6 | sudo docker version | Check Docker Version |
||

## Install NVidia Driver

See: [How to install the NVIDIA drivers on Ubuntu 20.04 Focal Fossa Linux](https://linuxconfig.org/how-to-install-the-nvidia-drivers-on-ubuntu-20-04-focal-fossa-linux)

|Step        | Action      | Comment |
|:---------- | :---------- |:---------- |
| 1 | $ ubuntu-drivers devices | Check drivers |
||
```
== /sys/devices/pci0000:00/0000:00:01.0/0000:01:00.0 ==
modalias : pci:v000010DEd00001C8Dsv000017AAsd000039D1bc03sc02i00
vendor   : NVIDIA Corporation
model    : GP107M [GeForce GTX 1050 Mobile]
driver   : nvidia-driver-390 - distro non-free
driver   : nvidia-driver-450-server - distro non-free
driver   : nvidia-driver-435 - distro non-free
driver   : nvidia-driver-418-server - distro non-free
driver   : nvidia-driver-440-server - distro non-free
driver   : nvidia-driver-450 - distro non-free recommended
driver   : xserver-xorg-video-nouveau - distro free builtin
```
Step        | Action      | Comment |
|:---------- | :---------- |:---------- |
| 2 | $ sudo ubuntu-drivers autoinstall | Install recommended driver. |
| 3 | $ sudo reboot |  |
||

## Install CUDA for Docker Containers

See: [NIVIDIA User guide](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/user-guide.html)

##### Prerequisites
- You have [Docker installed](#Install-Docker)
- Julia version 1.5.0+

|Step        | Action      | Comment |
|:---------- | :---------- |:---------- |
| 1 | Run the following code below: | Enable GPU support for Docker. |
||
```
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo tee /etc/systemd/system/docker.service.d/override.conf <<EOF
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd --host=fd:// --add-runtime=nvidia=/usr/bin/nvidia-container-runtime
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```
|Step        | Action      | Comment |
|:---------- | :---------- |:---------- |
| 2 | sudo docker start test_sshd | Start the container. |
| 2 | ssh rob@172.17.0.2 | Enter the container. |
| 3 | julia | Start Julia. |
| 4 | using Pkg | Start package manager |
| 5 | Pkg.add(["BenchmarkTools", "CUDA", "Flux"])) | Load CUDA, etc. |
| 6 | <Backspace> | Return to Jullia. |
| 7 | using CUDA; has_cuda() | Test whether CUDA is enabled. |
||

TODO: It didn't work for me. Troubleshoot!
- https://github.com/JuliaGPU/docker

## Important Docker Commands
| Command     | Comment |
|:----------  |:---------- |
| sudo docker images | Display all Docker Images. |
| sudo docker ps | Display all running containers. |
| sudo docker ps - a | Display all containers. |
| sudo docker start <name or id> | E.g `docker start test_sshd`. |
| sudo docker exec -it <name or id> <command> | E.g `docker exec -it test_sshd bash`. |
| sudo docker exec -it <name or id> <command> | E.g `docker exec -it test_sshd julia`. |
| Ctrl-D | Exit the container |
| sudo docker stop <name or id> | E.g `docker stop test_sshd`. |
| sudo docker rm -f <name or id> | Delete a container. |
| sudo docker rmi <image id> | Delete an image. |
||

## Install Ubuntu on Samsung T5 and Lemovo Legion Y520 with Windows 10

The steps I have done.

|Step        | Action/Response | Comment |
|:---------- | :---------- |:---------- |
| 1 | Download ISO-image from Ubuntu 18.04. website |  |
| 2 | Copy with Rufus to [USB-stick](https://github.com/kfechter/LegionY530Ubuntu/blob/master/Sections/CreateBootDrive.md) |  |
| 3 | Start machine and press F2 | Change the Bios Lenovo |
||
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
||

---

## To be reconsidered, I am not sure to deliver on-line courses this way.

## Dockerfile

##### Prerequisites
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

##### Prerequisites
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
