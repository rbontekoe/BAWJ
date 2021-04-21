# 19. Configuring Jenkins-Slave

The Udemy course [Learn DevOps: CI/CD with Jenkins using Pipelines and Docker](https://www.udemy.com/course/learn-devops-ci-cd-with-jenkins-using-pipelines-and-docker/) teaches how to work with Jenkins slaves. I had some problems with activating the Jenkins-slave container on a second system.

!!! warning "UNDER DEVELOPMENT"

### Contents

```@contents
Pages = ["chapter19.md"]
```

## Activity 19.1: Configuring the Jenkins-slave

##### Prerequisites
- The system with the Jenkins-Master runs in a Docker container on Ubuntu 20.04.
- Your second system with Jenkins-Slave runs as a Docker container on Ubuntu 20.04.
- You have started the two computer.
- You have the SSH keys available.

In this activity you will: 
1. [Copy public key to slave](#Step-1:-Copy-public-key-to-slave).
2. [Create local SSH keys](#Step-2:-Install-Docker-on-slave).
3. [Configure slave](#Step-3:-Configure-slave)
4. [Create Jenkins-slave container](#Step-4:-Create-Jenkins-slave-container)
5. [On the Jenkins-master](#Step-5:-On-the-Jenkins-master)

##### Step 1: Copy public key to slave

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ ssh-copy-id <user>@<ip-address slave> | |
| 2 | $ sudo chmod 666 /var/run/docker.sock |  |

##### Step 2: Install Docker on slave

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ sudo apt update |  |
| 2 | $ sudo apt install docker.io |  |
| 3 | $ sudo systemctl start docker |  |
| 4 | $ sudo systemctl docker enable |  |
| 5 | $ sudo groupadd docker |  |
| 6 | $ sudo usermod -aG docker $USER |  |
| 7 | $ sudo reboot |  |

##### Step 3: Configure slave

| Step | Action | Comment
| :--- | :--- | :--- |
| 1 | $ mkdir -p /var/jenkins_home/.ssh |  |
| 2 | $ cp /home/$USER/.ssh/authorized_keys /var/jenkins_home/.ssh |  |
| 3 | $ sudo chmod 700 /var/jenkins_home/.ssh |  |
| 4 | $ sudo chmod 600 /var/jenkins_home/.ssh/authorized_keys |  
| 5 | $ sudo chown -R 1000:1000 /var/jenkins_home |  |
| 6 | $ sudo chmod 666 /var/run/docker.sock |  |

##### Step 4: Create Jenkins-slave container

Run the following docker command:

```
docker run -p 2222:22 \
  -v /var/jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --restart always \
  -d wardviaene/jenkins-slave
```

##### Step 5: On the Jenkins-master

| Step | Action | Comment 
| :--- | :--- | :--- |
| 1 | $ ssh-keyscan -p 2222 <ip-address slave> >> /var/jenkins_home/.ssh/known_hosts|  |

Test:

| Step | Action | Comment 
| :--- | :--- | :--- |
| 2 | $ docker exec -it jenkins bash |  |
| 3 | $ ssh jenkins@<ip-address slave> -p 2222 |  |

## Activity 19.2: Configuring the Jenkins Node

In Jenkins, select `New node`:

```
Name: Builder 2
# of executers: 2 
Remote root directory: /var/jenkins_home
Labels: builder2
Use: Only build jobs with label expressions matching this node
Output method:
 Launch agent via SSH
 Host: <ip-address Jenkins slave>
 Credentials: #1
 Host Key Verifications Strategy:
   Select 'Require manual verification of initial connection' #2
```
#1 Create an account with the name `jenkins` and past the your private key in the field (`cat rsa-id.pub`)

#2 The first time you will see the message ??? appears in the menu, click on it.