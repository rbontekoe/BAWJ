# 11. Creating containers on the Raspberry Pi

**UNDER DEVELOPMENT!**

## Docker

## Dockerfile

What I did on 12/01/2019.

Following the instructions on [Dockerize an SSH service](https://docs.docker.com/engine/examples/running_ssh_service/).

```
FROM ubuntu:18.04
#FROM ubuntu:16.04

RUN apt-get update && apt-get install -y openssh-server
RUN mkdir /var/run/sshd
#RUN echo 'root:THEPASSWORDYOUCREATED' | chpasswd
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
- Created the container on Raspberry Pi.
- Tried the connection; it works nice but I have to login with a password.

First created the Dockerfile, then:

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | ssh pi@192.168.XXX.XXX | Login on Raspberry Pi. |
| 2 | $ mkdir test-ssh | Create a new folder |
| 3 | $ cd test-ssh | Step into the folder |
| 4 | Select the content of the Dockerfile [above](#Dockerfile-1) | |
| 5 | Ctrl-C | Copy selected text to the clipboard |
| 6 | $ nano Dockerfile | Create a new empty file |
| 7 | Shift-Ctrl-V | Paste text on clipboard into nano |
| 8 | Ctrl-O | Save the file |
| 9 | Ctrl-X | Exit nano |
| 10 | $ docker build \-t eg\_sshd . | Create a Docker image from the Dockerfile |
| 11 | $ docker run \-d \-P \-\-name test\_sshd eg\_sshd | Create a container |
| 12 | $ docker port test\_sshd 22 | Find port number |
| | 0.0.0.0:32769 | Response | Port number is 32769 |
| 13 | Ctrl-D | Leave Raspberry Pi |
| 14 | $ ssh root@192.168.XXX.XXX -p 32769 | Login remote on container with ssh |

!!! note

    - apt-get update && apt-get install -y julia -> doesn't work on Ubuntu 18.04

    Some Linux command I had to use because RUN echo 'root:THEPASSWORDYOUCREATED' | chpasswd didn't work either.

    - adduser rob
    - usermod -aG sudo rob
    - su rob
    - sudo -i
    - userdel rob
    - see [also](https://linoxide.com/linux-how-to/ssh-docker-container/)

    I also had to run `unminimize` to get `sudo` available. `unminimize` did't work in the container on the Raspberry Pi -> you have to be root.

    Next step: create the certificates, so you don't have to login with a password (required by Julia). DONE.

    Yes, I can make a ssh container-container connection between my laptop and the Raspberry Pi. Ubuntu 18.04.

    Next step is to install Julia on both containers having Ubuntu 18.04 installed.


## Activity for passwordless for machine -> machine communication (Obsolete?)

What I tried three weeks before 12/01/2019: **machine -> machine** connection.

| Step | Action | Comment |
| :--- | :--- | :--- |
| 1 | $ sudo apt-get update |  |
| 2 | $ sudo apt-get install openssh-client | Install ssh client on Ubuntu |
| 3 | $ ls -al ~/.ssh/id_*.pub | On Ubuntu |
| 4 | $ ssh-keygen -t rsa -b 4096 -C "your_email@domain.com" | On Ubuntu |
| 5 | $ ls ~/.ssh/id_* | On Ubuntu |
| 5 | $ ssh-copy-id  pi@192.168.XXX.XXX | Copy file to Raspberry Pi |
| 7 | $ ssh pi@192.168.XXX.XXX | Connect to raspberry pi |
| 8 | $ chmod 700 ~/.ssh | Change right the folder .ssh on Raspberry Pi |
| 9 | $ chmod 600 ~/.ssh/authorized_keys | Change right of the file autorized_keys on Raspberry Pi|


TODO: Lookup first what I did in the past! Want to use volumes in case container crashes, security, etc.

| Step | Action | Comment
| :--- | :--- | :--- |
| 8 | $ chmod 700 ~/.ssh | Change right the folder .ssh on Raspberry Pi |
| 9 | $ chmod 600 ~/.ssh/authorized_keys | Change right of the file authorized_keys on Raspberry Pi|
