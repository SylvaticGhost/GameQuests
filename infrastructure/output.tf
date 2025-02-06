output "caller_identity" {
  description = "The AWS account ID and ARN of the caller"
  value       = data.aws_caller_identity.current
}

output "instance_id" {
  description = "The ID of the EC2 instance"
  value       = aws_instance.example.id
}

output "instance_public_ip" {
  description = "The public IP address of the EC2 instance"
  value       = aws_instance.example.public_ip
}

output "instance_type" {
  description = "The type of the EC2 instance"
  value       = aws_instance.example.instance_type
}

output "instance_public_dns" {
  description = "The public DNS of the EC2 instance"
  value       = aws_instance.example.public_dns
}

output "private_key_pem" {
  value     = tls_private_key.example.private_key_pem
  sensitive = true
}
