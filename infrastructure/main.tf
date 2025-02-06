provider "aws" {
  region     = "eu-north-1"
  access_key = var.access_key
  secret_key = var.secret_key
}

data "aws_caller_identity" "current" {}

data "aws_ami" "latest_amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-arm64-gp2"]
  }
}

resource "aws_security_group" "allow_ssh" {
  name        = "allow_ssh_for_ec2"
  description = "Allow SSH inbound traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 2376
    to_port     = 2376
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 27017
    to_port     = 27017
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "tls_private_key" "example" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "aws_key_pair" "example" {
  key_name   = "hackaton-ec2"
  public_key = tls_private_key.example.public_key_openssh
}

resource "aws_instance" "example" {
  ami           = data.aws_ami.latest_amazon_linux.id
  instance_type = "t4g.nano"

  vpc_security_group_ids = [aws_security_group.allow_ssh.id]

  key_name = aws_key_pair.example.key_name

  tags = {
    Name = "Hackathon"
  }

  user_data = <<-EOF
              #!/bin/bash
              # Update the package database
              sudo yum update -y
              # Install Docker
              sudo amazon-linux-extras install docker -y
              # Start the Docker service
              sudo service docker start
              # Add the ec2-user to the docker group so you can execute Docker commands without using sudo
              sudo usermod -a -G docker ec2-user
              # Initialize Docker Swarm
              sudo docker swarm init
              # MongoDB
              sudo docker service create --name mongo --replicas 1 --publish published=27017,target=27017 --env MONGO_INITDB_ROOT_USERNAME=${var.mongo_username} --env MONGO_INITDB_ROOT_PASSWORD=${var.mongo_password} mongo:latest
              EOF
}

