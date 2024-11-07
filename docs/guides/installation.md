---
sidebar_position: 3
---

# Installation Guide

This guide walks you through the process of installing and configuring HySDS for different deployment scenarios.

## Prerequisites

### System Requirements
- Operating System: Linux (Ubuntu 20.04 LTS recommended) or macOS
- Python 3.8 or higher
- Docker 20.10 or higher
- Minimum 16GB RAM
- 50GB available disk space

### Required Software
```bash
# Python and pip
python3 --version  # Should be 3.8 or higher
pip3 --version

# Docker
docker --version
docker-compose --version
```

### Cloud Platform Access (Optional)
- AWS credentials (for AWS deployment)
- NASA HECC access (for HECC deployment)
- On-premise cluster access

## Installation Methods

### 1. Docker-based Installation (Recommended)

```bash
# Clone the repository
git clone https://github.com/hysds/hysds.git
cd hysds

# Build base images
docker-compose build

# Start core services
docker-compose up -d mozart grq metrics redis elasticsearch
```

### 2. Python Package Installation

```bash
# Create virtual environment
python3 -m venv hysds-env
source hysds-env/bin/activate

# Install HySDS
pip install hysds

# Install additional requirements
pip install -r requirements.txt
```

## Component Setup

### 1. Core Components

#### Mozart Setup
```bash
# Configure Mozart
cat << EOF > mozart_config.yml
MOZART_ES_URL: http://localhost:9200
MOZART_REDIS_URL: redis://localhost:6379
RABBITMQ_URL: amqp://localhost:5672
EOF

# Initialize Mozart
hysds-mozart init -c mozart_config.yml
```

#### GRQ Setup
```bash
# Configure GRQ
cat << EOF > grq_config.yml
GRQ_ES_URL: http://localhost:9200
GRQ_DB_URL: sqlite:///grq_db.sqlite3
EOF

# Initialize GRQ
hysds-grq init -c grq_config.yml
```

#### Metrics Setup
```bash
# Configure Metrics
cat << EOF > metrics_config.yml
METRICS_ES_URL: http://localhost:9200
EOF

# Initialize Metrics
hysds-metrics init -c metrics_config.yml
```

### 2. Worker Configuration

```bash
# Configure Verdi worker
cat << EOF > worker_config.yml
MOZART_URL: http://localhost:8888
GRQ_URL: http://localhost:8878
WORK_DIR: /data/work
DOCKER_REGISTRY: registry.example.com
EOF

# Initialize worker
hysds-verdi init -c worker_config.yml
```

## Deployment Configurations

### 1. Single-Node Development Setup

```yaml
# docker-compose.dev.yml
version: '3'
services:
  mozart:
    image: hysds/mozart
    ports:
      - "8888:8888"
    environment:
      - ELASTICSEARCH_URL=http://elasticsearch:9200
      
  grq:
    image: hysds/grq
    ports:
      - "8878:8878"
    environment:
      - ELASTICSEARCH_URL=http://elasticsearch:9200
```

### 2. Production Cluster Setup

```yaml
# docker-compose.prod.yml
version: '3'
services:
  mozart:
    image: hysds/mozart
    deploy:
      replicas: 2
    environment:
      - ELASTICSEARCH_URL=http://elasticsearch:9200
      
  grq:
    image: hysds/grq
    deploy:
      replicas: 2
    environment:
      - ELASTICSEARCH_URL=http://elasticsearch:9200
```

### 3. Hybrid Cloud Setup

```yaml
# hybrid-config.yml
aws:
  region: us-west-2
  vpc_id: vpc-xxxxxxxx
  subnet_ids:
    - subnet-xxxxxxxx
    - subnet-yyyyyyyy

on_premise:
  network: 192.168.1.0/24
  storage_path: /data/hysds
```

## Post-Installation Steps

### 1. Verify Installation
```bash
# Check service status
hysds-admin status

# Test components
hysds-admin test mozart
hysds-admin test grq
hysds-admin test metrics
```

### 2. Security Configuration
```bash
# Generate SSL certificates
hysds-admin ssl generate

# Configure authentication
hysds-admin auth setup
```

### 3. Initial Data Setup
```bash
# Initialize datasets
hysds-admin data init

# Test data ingestion
hysds-admin ingest test-data.h5
```

## Common Issues and Solutions

### Elasticsearch Connection Issues
```bash
# Check Elasticsearch status
curl -X GET "localhost:9200/_cluster/health"

# Reset Elasticsearch indexes
hysds-admin es reset
```

### Worker Connection Problems
```bash
# Check worker connectivity
hysds-admin worker test-connection

# Reset worker configuration
hysds-admin worker reset
```

## Next Steps

After installation:
1. Complete the [Getting Started Guide](../getting-started)
2. Review [Security Best Practices](../security)
3. Set up your first [Processing Job](../tutorials#setting-up-your-first-processing-job)
4. Configure [Auto-scaling](../configuration/auto-scaling)

## Additional Resources

- [Configuration Reference](../configuration)
- [API Documentation](../api)
- [Troubleshooting Guide](../troubleshooting)
- [Community Support](https://hysds-core.atlassian.net/)

---

For more detailed information about specific deployment scenarios or advanced configuration options, please refer to our [documentation](https://hysds-core.atlassian.net/wiki/spaces/HYS/overview).