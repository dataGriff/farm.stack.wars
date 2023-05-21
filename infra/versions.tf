terraform {

  cloud {
    organization = "datagriff"

    workspaces {
      name = "learn_azure_farm_stack_wars"
    }
  }

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.10.0"
    }
  }

  required_version = ">= 1.2.3"
}

provider "azurerm" {
  features {}
}

data "azurerm_client_config" "current" {}