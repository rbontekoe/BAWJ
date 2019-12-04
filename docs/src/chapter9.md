# Ubuntu 18.04

## Index
```@contents
Pages = ["chapter9.md"]
```

The article [Dockerize an SSH service](https://docs.docker.com/engine/examples/running_ssh_service/) uses Ubuntu 16.04 as the base image. However, Julia 1.0 and higher needs Ubuntu 18.04, so we have changed the Dockerfile. This version of Ubuntu also requires that you create a user with administrator rights when you use SSH to connect.

You also learn to install Julia in the container.

To make use of passwordless connections between containers, you also learn to create certificates.

In the next chapter, we will show you how to create containers on a Raspberry Pi 3B. I have another project running where I communicate with a Raspberry Pi to transfer images to my laptop.

See also the Pact book Julia 1.0 Programming: [Installing Julia from binaries](https://subscription.packtpub.com/book/application_development/9781788998369/1/ch01lvl1sec12/installing-julia-from-binaries)

## Activity 1 \- Create a SSH enabled container

Prerequisites:
- Your system has Ubuntu 18.04 that runs on an Intel x86 processor.
- You have started your computer.

Steps:
1. Create a Dockerfile in the folder test_sshd.
2. Create a Docker image eg\_ssdh and the container test\_sshd.
3. Create a user `rob`, who has administrator rights.

## The Dockerfile
```
FROM ubuntu:18.04

RUN apt-get update && apt-get install -y openssh-server
RUN mkdir /var/run/sshd
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
```

### 1. Create a Dockerfile in the folder test_sshd

Step | Action | Comment |
| :--- | :--- | :--- |
| 2 | $ mkdir test-ssh | Create a new folder. |
| 3 | $ cd test-ssh | Go to the folder. |
| 4 | Select the content of the Dockerfile [above](#Dockerfile-1) | |
| 5 | Ctrl-C | Copy the selected text to the clipboard. |
| 6 | $ nano Dockerfile | Create a new empty file. |
| 7 | Shift-Ctrl-V | Paste text from the clipboard into nano. |
| 8 | Ctrl-O | Save the file. |
| 9 | Ctrl-X | Exit nano. |

### 2. Create a Docker image eg_ssdh and the container test_sshd

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ sudo docker build \-t eg\_sshd . | Create a Docker image from the Dockerfile |
| 2 | $ sudo docker run \-d \-P \-\-name test\_sshd eg\_sshd | Create a container |
| 3 | $ sudo docker port test\_sshd 22 | Find port number |
| | 0.0.0.0:32768 | Response | Port number is 32768. |
| 4 | $ sudo docker ps | Check whether the container is running. |
| 5 | $ sudo docker exec -it test_sshd bash | Enter the container |
| 6 | Ctrl-D | Leave the container. |

### 3. Create a user `rob`, who has administrator rights

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ sudo docker exec -it test_sshd bash | Enter the container |
| 2 | $ adduser rob |  |

You are asked to give the user rob a password. We will use the password in the future for the SSH connection to the container, so write it down. You need it the first time when you want to enable passwordless communication. From Ubuntu 18.04 on, you don't know the roots' password anymore. That is the reason we had to create a user with administrator rights for SSH connections.

Step | Action | Comment |
| 3 | $ usermod -aG sudo rob | Give user adminsistrator rights. |
| 4 | $ su rob | Switch to the user rob |
| 5 | # sudo -i | Back as root user |
| 6 | Ctrl-D | Leave the container. |


## Activity 2 - Install Julia in the container

Prerequisites:
- Your system has Ubuntu 18.04 running on the Intel x86 processor.
- The container test\_sshd exists.
- The container has the user `rob`, who has administrators (sudo) rights.

Activity:
1. Download the Julia binary and copy it to the container.
2. Install Julia and test the installation.
3. Create a symbolic link to start Julia from everywhere.

### 1. Download the Julia binary and copy it to the container

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | [Download Julia](https://julialang.org/downloads/) | eg. julia-1.3.0-linux-x86_64.tar.gz |
| 2 | $ docker ps -a | Check whether container test_ssh exists. |
| 2 | $ docker start test_sshd | Start the container. |
| 3 | $ docker cp julia-1.3.0-linux-x86_64.tar.gz test_sshd:/home/rob| Copy the downloaded file to the container. |
| 4 | ~$ docker exec -it test_sshd bash | Enter the conatiner. |
| 5 | $ su rob | Switch to user rob. |

### 2. Install Julia and test the installation

| Step | Action | Comment
| :--- | :--- | :--- |
| 5 | # mkdir julia | Create folder julia. |
| 6 | # mv julia-1.3.0-linux-x86_64.tar.gz julia | Move file to folder. |
| 7 | # cd julia | Enter folder |
| 8 | /julia# tar -zxvf julia-1.3.0-linux-x86_64.tar.gz | Extract the file |
| 9 | /julia# ls | List the content of the folder. |
| | julia-1.3.0  julia-1.3.0-linux-x86_64.tar.gz | Response |
| 10 | /julia# cd julia-1.3.0/bin/ | We will test Julia. |
| 11 | /julia/julia-1.3.0/bin#./julia | Start Julia. |

The result (leave Julia with Ctrl-D).
```               _
   _       _ _(_)_     |  Documentation: https://docs.julialang.org
  (_)     | (_) (_)    |
   _ _   _| |_  __ _   |  Type "?" for help, "]?" for Pkg help.
  | | | | | | |/ _` |  |
  | | |_| | | | (_| |  |  Version 1.3.0 (2019-11-26)
 _/ |\__'_|_|_|\__'_|  |  Official https://julialang.org/ release
|__/                   |

julia>
```

### 3. Create a symbolic link to start Julia from everywhere

|| Step | Action | Comment
| :--- | :--- | :--- |


## Test the SSH enabled container.

Prerequisites:
- You have an SSH enabled container.

Steps:
1. Create local SSH keys.
2. Copy your public key to the container.
3. Test the SSH connection with the container.

### 1. Create local SSH keys on your computer

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ sudo apt-get update |  |
| 2 | $ sudo apt-get install openssh-client | Install ssh client on Ubuntu. |
| 3 | $ ls -al ~/.ssh/id_*.pub | View old keys. |
| 4 | $ ssh-keygen -t rsa -b 4096 -C "your_email@domain.com" | Generate the key. |
| 5 | $ ls ~/.ssh/id_* | View your new keys. |

TODO: Lookup first what I did in the past! Want to use volumes in case container crashes, security, etc.

| Step | Action | Comment
| :--- | :--- | :--- |
| 8 | $ chmod 700 ~/.ssh | Change right the folder .ssh on Raspberry Pi |
| 9 | $ chmod 600 ~/.ssh/authorized_keys | Change right of the file authorized_keys on Raspberry Pi|

### 2. Copy your public key to the container

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ sudo docker ps | Check whether the container is already running. |
| 2 | $ sudo docker start test_sshd | Start the container if not running. |
| 5 | $ ssh-copy-id  rob@192.168.XXX.XXX | Copy file to container |
| 6 | $ | Check port number of container, eg, 32769 |
| 7 | $ ssh rob@localhost -p 32768 | Connect container. |
