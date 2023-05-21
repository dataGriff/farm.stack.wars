variable "region" {
  type        = string
  default     = "northeurope"
  description = "The is the Azure region the resources will be deployed into."
  validation {
    condition     = contains(["northeurope", "westeurope"], var.region)
    error_message = "The region is not in the correct region."
  }
}

variable "environment" {
  type        = string
  default     = "learning"
  description = "The is the environment the resources belong to. e.g. learning, development, production."
  validation {
    condition     = contains(["learning", "development", "production"], var.environment)
    error_message = "The environment is not valid."
  }
}

variable "team" {
  type        = string
  default     = "datagriff"
  description = "The is the team that own the resources."
  validation {
    condition     = contains(["datagriff", "hungovercoders", "dogadopt"], var.team)
    error_message = "The team is not valid."
  }
}

variable "organisation" {
  type        = string
  default     = "datagriff"
  description = "The is the organisation that owns the resources."
  validation {
    condition     = contains(["datagriff", "hungovercoders", "dogadopt"], var.organisation)
    error_message = "The organisation is not valid."
  }
}

variable "domain" {
  type        = string
  default     = "spacecrafts"
  description = "The is the business problem domain being solved by the resources."
}

variable "azure_namespace" {
  type        = string
  default     = "dgrf"
  description = "The is the unique namespace added to resources."
}

locals {
  region_shortcode       = (var.region == "northeurope" ? "eun" : var.region == "westeurope" ? "euw" : "unk")
  environment_shortcode  = (var.environment == "learning" ? "lrn" : var.environment == "development" ? "dev" : var.environment == "production" ? "prd" : "unk")
  resource_group_name    = "${local.environment_shortcode}-${var.domain}-rg"
  cosmos_mongo_name      = "${local.environment_shortcode}-${var.domain}-cosdbmon-${local.region_shortcode}-${var.azure_namespace}"
  key_vault_short_domain = substr(var.domain, 0, 8)
  key_vault_name         = "${local.environment_shortcode}-${local.key_vault_short_domain}-kv-${local.region_shortcode}-${var.azure_namespace}"
  tags = {
    environment = var.environment
    team        = var.team
    domain      = var.domain
  }
}

