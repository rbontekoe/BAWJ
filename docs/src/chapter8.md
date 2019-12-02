# 8. Creating our microservices

UNDER DEVELOPMENT!

## Docker

## Dockerfile

What I did on 12/01/2019.

Following the instructions on [Dockerize an SSH service](https://docs.docker.com/engine/examples/running_ssh_service/).

```
FROM ubuntu:16.04

RUN apt-get update && apt-get install -y openssh-server
RUN mkdir /var/run/sshd
RUN echo 'root:THEPASSWORDYOUCREATED' | chpasswd
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
```

## Inter container communication

What I did on 12/01/2019.

Following the instructions on [Dockerize an SSH service](https://docs.docker.com/engine/examples/running_ssh_service/).
- Created the container on raspberry pi.
- Tried the connection; it works nice but I have to login with a password.

First created the Dockerfile, then:

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ docker build -t eg_sshd|
| 2 | $ docker run -d -P --name test_sshd eg_sshd |
| 3 | $ docker port test_sshd 22 | Find port. |
| | 0.0.0.0:32769 | Response |

SSH
- local: ssh root@localhost -p 32769
- remote: ssh root@192.168.XXX.XXX -p 32769

Next step: create the certificates, so you don't have to login with a password (required by Julia)

## How to Setup Passwordless SSH Login

What I tried three weeks before 12/01/2019: container -> machine connection.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ sudo apt-get install openssh-client | Install ssh client on Ubuntu |
| 2 | $ ls -al ~/.ssh/id_*.pub | On Ubuntu |
| 3 | $ ssh-keygen -t rsa -b 4096 -C "your_email@domain.com" | On Ubuntu |
| 4 | $ ls ~/.ssh/id_* | On Ubuntu |
| 5 | $ ssh-copy-id  pi@192.168.XXX.XXX | Copy file to raspberry pi |
| 6 | $ ssh pi@192.168.XXX.XXX | Connect to raspberry pi |

### On Raspberry Pi

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ chmod 700 ~/.ssh | Change right the file .ssh |
| 2 | $ chmod 600 ~/.ssh/authorized_keys | Change right of the file autorized_keys |

### ToDo

Procedure for container -> container communication.

## Channel

## DockerCompose
