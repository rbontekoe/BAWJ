# 13. Creating SSH Enabled Containers

In this chapter, you will learn how to communicate with Julia between different Docker containers. One uses SSH for this. The condition is that you can set up the connection without using a password by using SSH keys.

The article [Dockerize an SSH service](https://docs.docker.com/engine/examples/running_ssh_service/) uses Ubuntu 16.04 as the base image. However, Julia 1.0 and higher needs Ubuntu 18.04, so we have changed the Dockerfile. This version of Ubuntu also requires that you create a user with administrator rights when you use SSH to connect.

You create a Docker container using a Docker image. You need a Docker installation file to create an image. By default, the file is called `Dockerfile`.

Once you have started the container, you make it suitable for a passwordless SSH connection.

Finally, you install the software needed for the application, including Julia.

See also the Pact book Julia 1.0 Programming: [Installing Julia from binaries](https://subscription.packtpub.com/book/application_development/9781788998369/1/ch01lvl1sec12/installing-julia-from-binaries)

##### Contents

```@contents
Pages = ["chapter13.md"]
```

## Activity 13.1: Create local SSH keys

You need SSH keys for passwordless Julia communication between Docker containers.

##### Prerequisites
- Your system has Ubuntu 20.04 that runs on an Intel x86 processor.
- You have started your computer.
- You haven't created the SSH keys before.

In this activity you will: 
1. [Check previously created keys](#Step-1:-Check-previous-created-keys).
2. [Create local SSH keys](#Step-2:-Create-local-SSH-keys-on-your-computer).

##### Step 1: Check previous created keys

The folder `.shh` contains your keys if you have them created before.

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ ls -l ~/.ssh | |

**Response**

```
ls: cannot access '.ssh': No such file or directory
```

You haven't created the key before, go to step 2.

```
total 16
-rw------- 1 rob rob 3389 okt  8 16:48 id_rsa
-rw-r--r-- 1 rob rob  748 okt  8 16:48 id_rsa.pub
-rw------- 1 rob rob 1554 nov 17 14:56 known_hosts
-rw------- 1 rob rob 1554 nov 17 14:08 known_hosts.old
```

You have created the keys before, no further action is required. The file id_rsa.pub contains your public key. Later on, we will create a copy of it in the SSH enabled container.

##### Step 2: Create local SSH keys on your computer

The `openssh-client` software is needed to create the keys.

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ sudo apt-get update |  |
| 2 | $ sudo apt-get install openssh-client | Install ssh client on Ubuntu. |
| 3 | $ ls -al ~/.ssh/id_*.pub | View old keys. |
| 4 | $ ssh-keygen -t rsa -b 4096 -C "your_email@domain.com" | Generate the key. |
| 5 | $ ls ~/.ssh/id_* | View your new keys. |

See [SSH Connection Refused (Causes & Solutions)](https://likegeeks.com/ssh-connection-refused/#Change-in-public-keys-after-reinstall)

| Step | Action | Comment
| :--- | :--- | :--- |
| 6 | $ chmod 700 ~/.ssh | Change right the folder .ssh |
| 7 | $ chmod 600 ~/.ssh/authorized_keys | Change right of the file authorized_keys |

## Activity 13.2: Create the Container

When you want to create a container you need an image. An image is created from a `Dockerfile.`

##### Prerequisites:
- Your system has Ubuntu 20.04 that runs on an Intel x86 processor.
- You have started your computer.
- You have installed [Docker](../appendix/index.html#Install-Docker).

In this activity you will:
1. [Create a Dockerfile in the folder test\_sshd](#Step-1:-Create-a-Dockerfile-in-the-folder-test_ssh).
2. [Create a Docker image eg\_ssdh and the container test\_sshd](#Step-2:-Create-a-Docker-image-eg_sshd-and-the-container-test_sshd).
3. [Create a user `rob`, who has administrator rights](#Step-3:-Create-a-user-rob,-who-has-administrator-rights).

## The Dockerfile
```
FROM ubuntu:20.04

RUN apt-get update && apt-get install -y openssh-server
RUN mkdir /var/run/sshd
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise, the user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
```

##### Step 1: Create a Dockerfile in the folder test_ssh

You create the file `Dockerfile` in the folder e.g. test_ssh.

Step | Action | Comment |
| :--- | :--- | :--- |
| 2 | $ sudo mkdir test-ssh | Create a new folder. |
| 3 | $ cd test-ssh | Go to the folder. |
| 4 | Select the content of the Dockerfile [above](#The-Dockerfile-1) | |
| 5 | Ctrl-C | Copy the selected text to the clipboard. |
| 6 | $ sudo nano Dockerfile | Create a new empty file. |
| 7 | Shift-Ctrl-V | Paste text from the clipboard into nano. |
| 8 | Ctrl-O <Enter>| Save the file.|
| 9 | Ctrl-X | Exit nano. |

##### Step 2: Create a Docker image eg\_sshd and the container test\_sshd

You need an image before you can create a Docker container.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ sudo docker build \-t eg\_sshd . | Create a Docker image from the Dockerfile |
| 2 | $ sudo docker run \-d \-p 2222:22 \-\-name test\_sshd eg\_sshd | Create a container |
| 3 | $ sudo docker exec -it test_sshd bash | Enter the container |
| 4 | Ctrl-D | Leave the container. |

!!! info "Run docker commands without sudo"
    Create the [docker group](https://docs.docker.com/engine/install/linux-postinstall/) and add your user:

    1. Create the docker group: $ sudo groupadd docker.
    2. Add your user to the docker group: $ sudo usermod -aG docker $USER.
    3. Log out and log back in so that your group membership is re-evaluated. ...
    4. Verify that you can run docker commands without sudo 

##### Step 3: Create a user `rob`, who has administrator rights

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Implement the instructions of the info box above | Run docker commands without sudo. |
| 2 | $ docker exec -it test_sshd bash | Enter the container |
| 3 | # adduser rob | You get the next response: |

```
Adding user `rob' ...
Adding new group `rob' (1000) ...
Adding new user `rob' (1000) with group `rob' ...
The home directory `/home/rob' already exists.  Not copying from `/etc/skel'.
adduser: Warning: The home directory `/home/rob' does not belong to the user you are currently creating.
Enter new UNIX password:
Retype new UNIX password:
passwd: password updated successfully
Changing the user information for rob
Enter the new value, or press ENTER for the default
    Full Name []: Rob Bontekoe
    Room Number []:
    Work Phone []:
    Home Phone []:
    Other []:
Is the information correct? [Y/n] Y
```

!!! note
    You are asked to give the user rob a password. The password you will use in the future for the SSH connection to the container, so write it down. You need it the first time when you want to enable passwordless communication. From Ubuntu 20.04 on, you don't know the roots' password anymore. That is the reason we had to create a user with administrator rights for SSH connections.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 3 | # usermod -aG sudo rob | Give user administrator rights. |
| 4 | # apt-get update |  |
| 4 | # apt-get install sudo | You act as root when you precede your commands with `sudo.` It is not installed yet in this minimized container. |
| 5 | # su rob | Switch from user root to the user rob: | 

```
To run a command as administrator (user "root"), use "sudo <command>". \nSee "man sudo_root" for details.
```

| Step | Action | Comment |
| :--- | :--- | :--- |
| 6 | Ctrl-D | Back as user root. |
| 7 | Ctrl-D | Leave the container. |

## Activity 13.3: Install Julia

Installing Julia is done in the same way as you did before.

##### Prerequisites:
- Your system has Ubuntu 20.04 running on the Intel x86 processor.
- The container test\_sshd exists.
- The container has the user `rob`, who has administrators (sudo) rights.

In this activity you will:
1. [Download the Julia binary and copy it to the container](#Step-1:-Download-the-Julia-binary-and-copy-it-to-the-container).
2. [Install Julia and test the installation](#Step-2:-Install-Julia-and-test-the-installation).
3. [Create a symbolic link to start Julia from everywhere](#Step-3:-Create-a-symbolic-link-to-start-Julia-from-anywhere).

##### Step 1: Download the Julia binary and copy it to the container

With the command `docker cp` you can copy files to a container.

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | [Download Julia](https://julialang.org/downloads/) | eg. julia\-1.5.3\-linux\-x86\_64.tar.gz |
| 2 | $ docker ps -a | Check whether container test_ssh exists. |
| 2 | $ docker start test_sshd | Start the container. |
| 3 | $ docker cp ~/Downloads/julia\-1.5.3\-linux\-x86\_64.tar.gz test\_sshd:/home/rob | Copy the downloaded file to the container. |
| 4 | $ docker exec -it test_sshd bash | Enter the container. |
| 5 | $ su rob | Switch to user rob. |
| 6 | $ cd ~ | Go to home directory of the user. |
| 7 | $ ls -ll | You see the following files: |

```
total 102796
-rw-rw-r-- 1 rob rob 105260711 Nov 17 10:17 julia-1.5.3-linux-x86_64.tar.gz
```

##### Step 2: Install Julia and test the installation

Unpack the `.tar.gz` file and test if Julia starts.

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ sudo mkdir julia | Create folder julia. OS asks for yur password. |
| 2 | $ sudo mv julia-1.5.3-linux-x86_64.tar.gz julia | Move file to folder. |
| 3 | $ cd julia | Enter folder |
| 4 | $ sudo tar -zxvf julia-1.5.3-linux-x86_64.tar.gz | Extract the file. |
| 5 | $ ls -ll | List the content of the folder: |

```
total 102804
drwxr-xr-x 8 1337 1337      4096 Nov  9 18:56 julia-1.5.3
-rw-rw-r-- 1 rob  rob  105260711 Nov 17 10:17 julia-1.5.3-linux-x86_64.tar.gz
```

| Step | Action | Comment
| :--- | :--- | :--- |
| 6 | $ cd julia-1.5.3/bin/ | We will test Julia. |
| 7 | $ ./julia | Start Julia. You get the next response: |

```               _
   _       _ _(_)_     |  Documentation: https://docs.julialang.org
  (_)     | (_) (_)    |
   _ _   _| |_  __ _   |  Type "?" for help, "]?" for Pkg help.
  | | | | | | |/ _` |  |
  | | |_| | | | (_| |  |  Version 1.5.3 (2020-11-09)
 _/ |\__'_|_|_|\__'_|  |  Official https://julialang.org/ release
|__/                   |

julia>
```

### Step 3: Create a symbolic link to start Julia from anywhere

It is easier if you can start Julia from any folder.

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | Ctrl-D | Leave Julia. |
| 2 | cd ~ | To home directory. |
| 3 | $ sudo ln -s /home/rob/julia/julia-1.5.3/bin/julia /usr/local/bin/julia | Create link. |
| 4 | $ julia | Start Julia. |
| 5 | Ctrl-D | Leave Julia. |
| 6 | Ctrl-D | Leave container. |

## Activity 13.4: Test the container.

##### Prerequisites:
- You have an SSH enabled container.
- You have created the SSH authorized_keys [See](#Activity-1-Create-local-SSH-keys-1).

In this activity you will:
1. [Copy your public key to the container](#Step-1:-Copy-your-public-key-to-the-container).
2. [Test the SSH connection with the container](#Step-2:-Test-the-SSH-connection-with-the-container).

##### Step 1: Copy your public key to the container

You copy the public key you created in [activity 13.1](#Activity-13.1:-Create-local-SSH-keys) to the container for passwordless authentication.

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ docker ps | Check whether the container is already running. |
| 2 | $ docker start test_sshd | Start the container if not running. |
| 3 | $ docker inspect test_sshd \| grep "IPAddress" | Find internal IP address of the container:``\\``172.17.0.2 |
| 4 | $ ssh-copy-id rob@172.17.0.2 | Copy id to container for passwordless login. If you get an error message follow the instructions to remove keys ``\\``ssh-keygen -f "/home/rob/.ssh/known_hosts" -R "172.17.0.2"| and repeat the command. |

You get the next message:

```
The authenticity of host '172.17.0.2 (172.17.0.2)' can't be established.
ECDSA key fingerprint is SHA256:0qEmNoH8hb1OC73Hcecf4iY44vKAnLYOc6jNsdkkM2U.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
```

Type `yes` and enter your password.


##### Step 2: Test the SSH connection with the container.

Test if it works fine.

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ ssh rob@172.17.0.2 | You get the next response: |

```
Welcome to Ubuntu 20.04.1 LTS (GNU/Linux 5.4.0-53-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

This system has been minimized by removing packages and content that are
not required on a system that users do not log into.

To restore this content, you can run the 'unminimize' command.
```

## Exercise 13.1: Create a Second Container

You will create a second Docker container that we will use for the AppliAR module.

Create a second container **test_sshd2**:
- You don't have to create the keys again!
- Use the same image eg_sshd.
- Start at `Activity 13.2: Create the Container - step 2-2`. Use an different port number for ssh (2223): docker run -d -p 2223:22 --name test\_sshd2 eg_sshd
- The name of the administrative user can be kept the same: rob.

We will use both containers in chapter 14.
