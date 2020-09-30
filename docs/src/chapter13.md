# 13. Creating SSH Enabled Containers

UNDER DEVELOPMENT!

### Contents

```@contents
Pages = ["chapter13.md"]
```

The article [Dockerize an SSH service](https://docs.docker.com/engine/examples/running_ssh_service/) uses Ubuntu 16.04 as the base image. However, Julia 1.0 and higher needs Ubuntu 18.04, so we have changed the Dockerfile. This version of Ubuntu also requires that you create a user with administrator rights when you use SSH to connect.

You also learn to install Julia in the container.

To make use of passwordless connections between containers, you also learn to create SSH keys.

In the next chapter, we will show you how to create containers on a Raspberry Pi 3B. I have another project running where I communicate with a Raspberry Pi to transfer images to my laptop.

See also the Pact book Julia 1.0 Programming: [Installing Julia from binaries](https://subscription.packtpub.com/book/application_development/9781788998369/1/ch01lvl1sec12/installing-julia-from-binaries)


## Activity 13.1: Create local SSH keys

Prerequisites:
- Your system has Ubuntu 18.04 that runs on an Intel x86 processor.
- You have started your computer.
- You haven't created the keys before.

Steps:
1. Check previous created keys.
2. Create local SSH keys.

##### Step 1: Check previous created keys

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ ls -l .ssh | |

**Response**

```
ls: cannot access '.ssh': No such file or directory
```

You haven't created the key before, go to step 2.

```
total 16
-rw-r--r-- 1 root root  107 nov 13 10:57 config
-rw------- 1 rob  rob  3247 okt 16 15:04 id_rsa
-rw-r--r-- 1 rob  rob   748 okt 16 15:04 id_rsa.pub
-rw-r--r-- 1 rob  rob   444 dec  3 14:59 known_hosts
```

You have created the keys before, no further action is required. The file id_rsa.pub contains your public key. Later on, we will create a copy of it in the SSH enabled container.

##### Step 2: Create local SSH keys on your computer

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

Prerequisites:
- Your system has Ubuntu 18.04 that runs on an Intel x86 processor.
- You have started your computer.
- You have installed Docker (See appendix).

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

##### Step 1: Create a Dockerfile in the folder test_ssh

Step | Action | Comment |
| :--- | :--- | :--- |
| 2 | $ sudo mkdir test-ssh | Create a new folder. |
| 3 | $ cd test-ssh | Go to the folder. |
| 4 | Select the content of the Dockerfile [above](#The-Dockerfile-1) | |
| 5 | Ctrl-C | Copy the selected text to the clipboard. |
| 6 | $ nano Dockerfile | Create a new empty file. |
| 7 | Shift-Ctrl-V | Paste text from the clipboard into nano. |
| 8 | Ctrl-O <Enter>| Save the file.|
| 9 | Ctrl-X | Exit nano. |

##### Step 2: Create a Docker image eg\_sshd and the container test\_sshd

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ docker build \-t eg\_sshd . | Create a Docker image from the Dockerfile |
| 2 | $ docker run \-d \-p 2222:22 \-\-name test\_sshd eg\_sshd | Create a container |
| 3 | $ docker exec -it test_sshd bash | Enter the container |
| 4 | Ctrl-D | Leave the container. |

##### Step 3: Create a user `rob`, who has administrator rights

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ docker exec -it test_sshd bash | Enter the container |
| 2 | # adduser rob | You get the next response: |

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
    You are asked to give the user rob a password. The password you will use in the future for the SSH connection to the container, so write it down. You need it the first time when you want to enable passwordless communication. From Ubuntu 18.04 on, you don't know the roots' password anymore. That is the reason we had to create a user with administrator rights for SSH connections.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 3 | # usermod -aG sudo rob | Give user administrator rights. |
| 4 | # apt-get install sudo | You act as root when you precede your commands with `sudo.` It is not installed yet in this minimized container. |
| 5 | # su rob | Switch to the user rob |  |
| | To run a command as administrator (user "root"), use "sudo <command>". \nSee "man sudo_root" for details. | |
| 5 | Ctrl-D | Back as root user. |
| 6 | Ctrl-D | Leave the container. |

##### Important steps?

| Step | Action | Comment
| :--- | :--- | :--- |
| 6 | $ chmod 700 ~/.ssh | Change right the folder .ssh |
| 7 | $ chmod 600 ~/.ssh/authorized_keys | Change right of the file authorized_keys |


## Activity 13.3: Install Julia

Prerequisites:
- Your system has Ubuntu 18.04 running on the Intel x86 processor.
- The container test\_sshd exists.
- The container has the user `rob`, who has administrators (sudo) rights.

Activity:
1. Download the Julia binary and copy it to the container.
2. Install Julia and test the installation.
3. Create a symbolic link to start Julia from everywhere.

##### Step 1: Download the Julia binary and copy it to the container

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | [Download Julia](https://julialang.org/downloads/) | eg. julia-1.3.0-linux-x86_64.tar.gz |
| 2 | $ docker ps -a | Check whether container test_ssh exists. |
| 2 | $ docker start test_sshd | Start the container. |
| 3 | $ docker cp julia\-1.3.0\-linux\-x86\_64.tar.gz test\_sshd:/home/rob | Copy the downloaded file to the container. |
| 4 | $ docker exec -it test_sshd bash | Enter the container. |
| 5 | $ su rob | Switch to user rob. |
| 6 | $ cd ~ | Go to home directory. |
| 7 | $ ls | You see the file julia\-1.3.0\-linux\-x86\_64.tar.gz |

##### Step 2: Install Julia and test the installation

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ mkdir julia | Create folder julia. OS asks for yur password. |
| 2 | $ mv julia-1.3.0-linux-x86_64.tar.gz julia | Move file to folder. |
| 3 | $ cd julia | Enter folder |
| 4 | $ tar -zxvf julia-1.3.0-linux-x86_64.tar.gz | Extract the file. |
| 5 | $ ls | List the content of the folder. |
| 6 | julia-1.3.0  julia-1.3.0-linux-x86_64.tar.gz | |
| 7 | $ cd julia-1.3.0/bin/ | We will test Julia. |
| 8 | $ sudo ./julia | Start Julia. You get the next response: |

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

### Step 3: Create a symbolic link to start Julia from anywhere

| Step | Action | Comment
| :--- | :--- | :--- |
| 1| Ctrl-D | Leave Julia. |
| 2 | cd ~ | To home directory. |
| 3 | $ sudo ln -s /home/rob/julia/julia-1.3.0/bin/julia /usr/local/bin/julia | Create link. |
| 4 | $ julia | Start Julia. |

## Activity 13.4: Test the container.

Prerequisites:
- You have an SSH enabled container.
- You have created the SSH authorized_keys [See](#Activity-1-Create-local-SSH-keys-1).

Steps:
1. Copy your public key to the container.
2. Test the SSH connection with the container.

##### Step 1: Copy your public key to the container

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ docker ps | Check whether the container is already running. |
| 2 | $ docker start test_sshd | Start the container if not running. |
| 3 | $ docker port test\_sshd 22 | Find the port number |
| | 0.0.0.0:32768 | Port number is 32768. |
| 4 | $ ssh-copy-id  rob@localhost -p 32769 | Copy file to container |
| 5 | $ ssh rob@localhost -p 32768 | Connect to the container. |

Enter y, and continue.

```
The authenticity of host '[localhost]:32768 ([127.0.0.1]:32768)' can't be established.
ECDSA key fingerprint is SHA256:lix3DGk69mhTnPlb0WE70syuDWVh59XL3az/4UJDInc.
Are you sure you want to continue connecting (yes/no)? yes
```

Type your password.

```
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
rob@localhost's password:
```

Then some instructions.

```
Number of key(s) added: 1

Now try logging into the machine, with:   "ssh -p '32769' 'rob@localhost'"
and check to make sure that only the key(s) you wanted were added
```

!!! info
    Your keys are stored in the folder /etc/ssh/.

##### Step 2: Test the SSH connection with the container.

| Step | Action | Comment
| :--- | :--- | :--- |
| 1| ssh rob@localhost -p 32768 | You get the next response: |

```
Welcome to Ubuntu 18.04.3 LTS (GNU/Linux 5.0.0-37-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

This system has been minimized by removing packages and content that are
not required on a system that users do not log into.

To restore this content, you can run the 'unminimize' command.
Last login: Thu Dec  5 12:16:21 2019 from 172.17.0.1
rob@13304c03391d:~$
```

!!! info
    You can also work with the docker network address.

    ```
    docker inspect test_sshd | grep "IPAddress"
    ```

    The response is:

    ```
    "SecondaryIPAddresses": null,
    "IPAddress": "172.17.0.2",
            "IPAddress": "172.17.0.2",
    ```

    You can also use:

    ```
    ssh rob@172.17.0.2
    ```

## Exercise 13.1: Create a Second Container

Create a second container **test_sshd2**:
- You don't have to create the keys again!
- Use the same image eg_sshd.
- Check the port number of test_sshd2.
- Name of the administrative user can be kept the same: rob.

We will use both containers in chapter 14.
