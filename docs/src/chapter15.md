<<<<<<< HEAD
# 15. Running the Website from a Container
=======
# 14. Using a Web Framework as Interface
>>>>>>> 6865381f93ae0ab7b81a8ce00aa5c59ab3780a5c

!!! warning "UNDER DEVELOPMENT"

In this chapter, you will learn how to set up an application consisting of a gateway that lets tasks run in the Docker containers you created in the previous chapter. In chapter 15, we will extend the functionality with a web interface, for which we will use the Julia package `Bukdu.jl`. This choice is not entirely voluntary. Originally we thought to use Genie.jl as Julia Web Framework, but we discovered that `Distributed Computing` was a problem.

```
                web
                 ⇵
              gateway
         ________⇵________
         ⇵               ⇵
     test_sshd2      test_sshd
     (GeneralLedger)  AppliAR
```
*Fig 1: The three containers that make up the application* 

### Contents

```@contents
Pages = ["chapter15.md"]
```

## Activity 15.1: Create the Gateway Container

The Gateway container runs the software where actors perform different tasks on the other Docker containers. For communication between the different containers with Julia, the condition is that they have passwordless SSH connections.

With the `Rocket.jl` package you can set up an infrastructure based on actors. You can communicate with actors utilizing messages.

##### Prerequisites
- Your system has Ubuntu 20.04 that runs on an Intel x86 processor.
- You have installed [Docker](../appendix/index.html#Install-Docker).
- You have performed the activities and exercise of [chapter 13](../chapter13/index.html).
- The Docker image eg\_sshd exists.

In this activity you will:
1. [Create the `gateway` container](#Step-1:-Create-the-gateway-container).
2. SSH enable the container.
3. Install Julia.
4. Add the packages AppliSales, AppliAR, AppliGeneralLedger, Rocket, DataFrames, and Query.
5. SSH enable the container.
6. Create SSH keys for the container.
7. Add the files test_with_actors.jl and actors.jl

##### Step 1: Create the `gateway` container

You create the container gateway from the image eg\_sshd.

Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ docker run \-d \-p 2224:22 -p 8004:8000 \-\-name gateway eg\_sshd | Create a container gateway. |
| 2 | $ docker exec -it gateway bash | Enter the container |
| 3 | # adduser rob | |
| 4 | # apt-get update | Download package information |
| 5 | # apt-get install sudo | You act as root when you precede your commands with `sudo.` It is not installed yet in this minimized container. |
| 6 | # usermod -aG sudo rob | Give user administrator rights. |
| 7 | Ctrl-D | Leave the container. |
||

##### Step 2: SSH enable the container

You copy the public key you created in [activity 13.1](#Activity-13.1:-Create-local-SSH-keys) to the container for passwordless authentication.

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ docker stop test\_sshd test\_sshd2 gateway | Stop the containers. |
| 2 | $ docker start test\_sshd test\_sshd2 gateway | Start the containers. |
| 3 | $ docker ps | Check whether the containers are running. |
| 4 | $ docker inspect gateway \| grep "IPAddress" | Find internal IP address of the container:``\\``172.17.0.4 |
| 5 | $ ssh-copy-id rob@172.17.0.4 | Copy id to container for passwordless login. |
||

You get the next message:

```
The authenticity of host '172.17.0.4 (172.17.0.4)' can't be established.
ECDSA key fingerprint is SHA256:0qEmNoH8hb1OC73Hcecf4iY44vKAnLYOc6jNsdkkM2U.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
```

Type `yes` and enter your password.

##### Step 3: Install Julia

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ docker start test\_sshd test\_sshd2 gateway | Ensure all containers are running. |
| 2 | $ docker cp ~/Downloads/julia\-1.5.3\-linux\-x86\_64.tar.gz gateway:/home/rob | Copy the downloaded file to the container. |
| 3 | $ docker exec -it gateway bash | Enter the container. |
| 4 | # su rob | Switch to user rob. |
| 5 | $ cd ~ | Go to home directory of the user. |
| 6 | $ sudo mkdir julia | Create folder julia. OS asks for yur password. |
| 7 | $ sudo mv julia-1.5.3-linux-x86_64.tar.gz julia | Move file to folder. |
| 8 | $ cd julia | Enter the folder |
| 9 | $ sudo tar -zxvf julia-1.5.3-linux-x86_64.tar.gz | Extract the file. |
| 10 | $ cd julia-1.5.3/bin/ | We will test Julia. |
| 11 | $ ./julia | Start Julia. You get the next response: |
| 12 | julia> Ctrl-D | Leave Julia. |
| 13 | cd ~ | To home directory. |
| 14 | $ sudo ln -s /home/rob/julia/julia-1.5.3/bin/julia /usr/local/bin/julia | Create link. |
| 15 | $ julia | Start Julia. |
| 16 | julia> Ctrl-D | Leave Julia. |
| 17 | $ Ctrl-D | Return to root. |
| 18 | # Ctrl-D | Leave container. |
||

## Activity 15.2: Restart the Containers and Enable SSH for the Container `gateway`

##### Prerequisites:
- [Activity 15.1](#Activity-14.1:-Create-the-Gateway-Container).
- You have the three containers `test_sshd`,`test_sshd2`, and `gateway`.  You created `test_sshd`, and `test_sshd2`in chapter 13, [Create the Container](../chapter13/index.html#Activity-2-Create-the-Container).
- [Run Docker commands without sudo](../chapter13/index.html#Step-2:-Create-a-Docker-image-eg_sshd-and-the-container-test_sshd).

In this activity you will:
1. [Start the containers and check their Docker internal IP-address](#Step-1:-Start-the-containers-and-check-their-Docker-internal-IP-address).
2. [Use SSH to Connect from gateway to test\_sshd and test\_sshd 2 and install the packages](#Step-2:-Use-SSH-to-Connect-from-gateway-to-test_sshd-and-test_sshd-2-and-install-the-packages).

---

###### Step 1: Start the containers and check their Docker internal IP-address

| Step | Action | Comment
| :--- | :--- | :--- |
| 2 | $ docker restart test\_sshd test\_sshd2 gateway | Start the containers. |
| 3 | $ docker ps | Check whether the containers are running. |
| 4 | $ docker inspect \-f "{{ .NetworkSettings.IPAddress }}" test_sshd | e.g. 172.17.0.2 |
| 5 | $ docker inspect \-f "{{ .NetworkSettings.IPAddress }}" test_sshd2 | e.g. 172.17.0.3 |
| 6 | $ docker inspect \-f "{{ .NetworkSettings.IPAddress }}" gateway | e.g. 172.17.0.4 |
||

###### Step 2: Use SSH to Connect from gateway to test\_sshd and test\_sshd 2 and install the packages

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ ssh rob@172.17.0.4 |  |
| 2 | $ sudo apt-get update |  |
| 3 | $ sudo apt-get install openssh-client | Install ssh client in container. |
| 4 | $ ssh-keygen -t rsa -b 4096 -C "your_email@domain.com" | Generate the key. |
| 8 | $ ssh-copy-id rob@172.17.0.2 | Copy id to container test\_sshd for passwordless login. |
| 9 | $ ssh-copy-id rob@172.17.0.3 | Copy id to container test\_sshd2 for passwordless login. |
| 10 | $ ssh rob@172.17.0.2 | Check paswordless login. |
| 11 | $ Ctrl-D | Leave container. |
| 12 | $ ssh rob@172.17.0.3 | Check paswordless login. |
| 13 | $ Ctrl-D | Leave container. |
| 14 | $ julia | Start Julia in the container gateway. |
| 15 | julia> ] | Activate the package manager. |
| 16 | pkg> add AppliSales AppliGeneralLedger Rocket DataFrames Query | Add the packages. |
| 17 | pkg> add https://github.com/rbontekoe/AppliAR.jl
| 18 | pkg> precompile | Precompile all the project dependencies. |
| 19 | pkg> instantiate | Downloads all the dependencies for the project. |
| 20 | pkg> <Backspace> | Leave package manager. |
| 21 | julia> Ctrl-D | Leave Julia. |
| 22 | $ ssh rob@172.17.0.2 | Enter the container test_sshd. |
| 23 | $ julia | Start Julia in the container. |
| 24 | julia> ] | Activate the package manager. |
| 25 | pkg> add AppliSales AppliGeneralLedger AppliAR DataFrames Query | Add the packages. |
| 26 | pkg> add https://github.com/rbontekoe/AppliAR.jl
| 27 | pkg> precompile | Precompile all the project dependencies. |
| 28 | pkg> instantiate | Downloads all the dependencies for the project. |
| 29 | pkg> <Backspace> | Leave package manager. |
| 30 | julia> Ctrl-D | Leave Julia. |
| 31 | $ Ctrl-D | Leave the container test\_ssh. |
| 32 | $ ssh rob@172.17.0.3 | Enter the container test_sshd2. |
| 33 | Repeat the steps 22 untill 31 for the container test\_sshd2 (172.17.0.3) |  | 
||
