# Warehouse Management System using MySQL, Django, and Docker.

## Overview

This project is about a warehouse management system. The application allows the warehouse to create and manage user accounts 
with different levels of access and permissions. A warehouse manager should have access to all features and the operator should only have access to the outbound and inbound workflow.


## Getting Started

### Prerequisites

These are the requirements for the project.

- asgiref==3.5.2
- Django==4.1.3
- mysqlclient==2.1.1
- sqlparse==0.4.3
- tzdata==2022.7

### Installation

Provide step-by-step instructions on how to install and set up your project.

```bash
# Clone the repository
git clone https://github.com/tarunakugan18/django-mysql-docker.git

# Navigate to the project directory
cd django-mysql-docker

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Run the development server
python manage.py runserver
