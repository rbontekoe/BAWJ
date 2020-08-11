# 11. Creating containers on the Raspberry Pi

**UNDER DEVELOPMENT!!! - Almost ready**

### What you will learn

```@contents
Pages = ["chapter11.md"]
```

## Create the image and the container

Prerequisites:
- Your have Rasbian OS on your Raspberry Pi.
- You have `nano` installed (apt-get update && apt-get install nano)
- You have started your computer.
- You have installed Docker (See appendix). **TODO Check whether instructions are still right!!!**

Steps:
1. Create a Dockerfile in the folder test-sshd.
2. Create a Docker image eg\_ssdh and the container test\_sshd.
3. Create a user `rob`, who has administrator rights.
4. Check whether you have SSH access to the container.

## Remove next text
Following the instructions on [Dockerize an SSH service](https://docs.docker.com/engine/examples/running_ssh_service/).
- Created the container on Raspberry Pi.
- Tried the connection; it works nice but I have to login with a password.

### 1. Create a Dockerfile in the folder test_ssh

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | ssh pi@xxx.xxx.xxx.xxx | Login on Raspberry Pi. |
| 2 | Folow the instructions on [1. Create a Dockerfile in the folder test\_ssh](../chapter10/#.-Create-a-Dockerfile-in-the-folder-test_ssh-1) | Same Dockerfile |

### 2. Create a Docker image eg\_sshd and the container test\_sshd

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ docker build \-t eg\_sshd . | Create a Docker image from the Dockerfile |
| 2 | $ docker run \-d \-p 2222:22 \-\-name test\_sshd eg\_sshd | Create a container |

### 3. Create a user `rob`, who has administrator rights

Follow the instructions on [3. Create a user rob, who has administrator rights](../chapter10/#.-Create-a-user-rob,-who-has-administrator-rights-1).

### 4. Check whether you have SSH access to the container.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ ssh rob@xxx.xxx.xxx.xxx -p 2222 | Use the ip-address of your Raspberry Pi. |
| 2 | Login with the password you specified in previous step 3 | You should see something like `rob@675c5140e449:~$`. |

!!! info
    You can Copy your file with your file `id_rsa.pub` in the folder `~/.ssh` to establish passwordless access to your container. Use the command `ssh-copy-id rob@xxx.xxx.xxx.xxx -p 2222`, either form your laptop or a container on your laptop.  In this case is xxx.xxx.xxx.xxx the ip-address of your Raspberry Pi.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | Ctrl-D | Leave the container. |
| 2 | Ctrl-D | Leave the Raspberry Pi. |
| 3 | $ sudo docker start test_sshd | Start the `test_sshd` container on your laptop. |
| 4 | $ ssh-copy-id rob@xxx.xxx.xxx.xxx -p 2222 | copy your public key to the container running on the Raspberry Pi. |
| 5 | $ ssh rob@xxx.xxx.xxx.xxx -p 22222 | Connect to the remote container. The first time you have to login. |


## Install Julia

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ mkdir julia | Leave the container. |
| 2 | $ cd julia | |
| 3 | $ wget -c `https://julialang-s3.julialang.org/bin/linux/armv7l/1.3/julia-1.3.1-linux-armv7l.tar.gz` | Download the file. |
| 8 | $ tar -zxvf julia-1.3.1-linux-armv7l.tar.gz | Extract the file. |
| 9 | $ ls | List the content of the folder. |
| | julia-1.3.1  julia-1.3.1-linux-armv7l.tar.gz | |
| 10 | $ cd julia-1.3.0/bin/ | We will test Julia. |
| 11 | $ ./julia | Start Julia. |

##### Response

```               _
   _       _ _(_)_     |  Documentation: https://docs.julialang.org
  (_)     | (_) (_)    |
   _ _   _| |_  __ _   |  Type "?" for help, "]?" for Pkg help.
  | | | | | | |/ _` |  |
  | | |_| | | | (_| |  |  Version 1.3.1 (2019-12-30)
 _/ |\__'_|_|_|\__'_|  |  Official https://julialang.org/ release
|__/                   |
```


##### Create symbolic link

ln -s /home/rob/julia/julia-1.3.1/bin/julia /usr/local/bin/julia
