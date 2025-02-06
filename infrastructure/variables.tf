variable "access_key" {
  description = "AWS access key"
  type        = string
  sensitive   = false
}

variable "secret_key" {
  description = "AWS secret key"
  type        = string
  sensitive   = true
}

variable "mongo_username" {
  description = "MongoDB username"
  type        = string
  sensitive   = false
}

variable "mongo_password" {
  description = "MongoDB password"
  type        = string
  sensitive   = true
}
