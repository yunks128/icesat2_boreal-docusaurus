---
sidebar_position: 4
---

# Configuration Guide

This guide provides detailed information about configuring HySDS components and optimizing them for different deployment scenarios.

## Core Component Configuration

### Mozart Configuration

```yaml
# mozart_config.yml
mozart:
  es_url: "http://localhost:9200"
  redis_url: "redis://localhost:6379"
  rabbitmq_url: "amqp://localhost:5672"
  
  # Job Management
  job_queues:
    - name: "factotum-job_worker-small"
      priority: 0
      max_running: 10
    - name: "factotum-job_worker-large"
      priority: 1
      max_running: 5
      
  # Workflow Settings
  workflow:
    timeout: 3600
    max_retries: 3
    retry_delay: 60
```

### GRQ (Geo Region Query) Configuration

```yaml
# grq_config.yml
grq:
  es_url: "http://localhost:9200"
  
  # Data Management
  datasets:
    cache_dir: "/data/cache"
    staging_dir: "/data/staging"
    
  # Search Configuration
  queries:
    max_size: 10000
    default_sort_field: "_id"
    
  # Facet Configuration
  facets:
    - field: "dataset_type"
      size: 100
    - field: "version"
      size: 50
```

### Metrics Configuration

```yaml
# metrics_config.yml
metrics:
  es_url: "http://localhost:9200"
  
  # Collection Settings
  collection:
    interval: 60
    batch_size: 1000
    
  # Retention Policy
  retention:
    days: 30
    max_size: "500GB"
```

## Worker Configuration

### Verdi Worker Setup

```yaml
# worker_config.yml
verdi:
  # Basic Settings
  work_dir: "/data/work"
  docker_registry: "registry.example.com"
  
  # Resource Limits
  resources:
    cpu_limit: 4
    memory_limit: "16GB"
    disk_limit: "100GB"
    
  # Container Settings
  container:
    default_image: "hysds/pge-base:latest"
    pull_policy: "IfNotPresent"
```

## Auto-Scaling Configuration

### AWS Auto-Scaling

```yaml
# autoscale_aws.yml
scaling:
  aws:
    min_instances: 1
    max_instances: 100
    
    # Spot Instance Configuration
    spot:
      enabled: true
      max_price: "0.50"
      instance_types:
        - "c5.2xlarge"
        - "c5.4xlarge"
        
    # Scaling Triggers
    triggers:
      queue_size:
        threshold: 100
        scale_up: 2
        scale_down: 1
      cpu_utilization:
        threshold: 70
```

### On-Premise Scaling

```yaml
# autoscale_onprem.yml
scaling:
  on_premise:
    min_workers: 1
    max_workers: 50
    
    # Resource Pools
    pools:
      small:
        cpu: 2
        memory: "4GB"
      large:
        cpu: 8
        memory: "16GB"
```

## Hybrid Deployment Configuration

```yaml
# hybrid_config.yml
hybrid:
  # AWS Configuration
  aws:
    region: "us-west-2"
    vpc_id: "vpc-xxxxxxxx"
    subnets:
      - "subnet-xxxxxxxx"
      - "subnet-yyyyyyyy"
      
  # On-Premise Configuration
  on_premise:
    network: "192.168.1.0/24"
    storage_path: "/data/hysds"
    
  # HECC Configuration
  hecc:
    head_node: "hfe03.nas.nasa.gov"
    storage_path: "/nobackup/user/hysds"
```

## Security Configuration

```yaml
# security_config.yml
security:
  # Authentication
  auth:
    type: "oauth2"
    provider_url: "https://auth.example.com"
    client_id: "your-client-id"
    
  # SSL/TLS Configuration
  ssl:
    enabled: true
    cert_path: "/etc/hysds/ssl/cert.pem"
    key_path: "/etc/hysds/ssl/key.pem"
    
  # Access Control
  rbac:
    enabled: true
    admin_group: "hysds-admin"
```

## Data Management Configuration

```yaml
# data_config.yml
data:
  # Storage Configuration
  storage:
    type: "s3"
    bucket: "hysds-data"
    region: "us-west-2"
    
  # Cache Configuration
  cache:
    size: "1TB"
    policy: "LRU"
    
  # Dataset Configuration
  datasets:
    default_type: "dataset"
    allowed_extensions: [".h5", ".nc", ".tif"]
```

## Performance Tuning

```yaml
# performance_config.yml
performance:
  # Elasticsearch Optimization
  elasticsearch:
    shards: 5
    replicas: 1
    refresh_interval: "30s"
    
  # Queue Optimization
  queues:
    max_size: 10000
    batch_size: 100
    
  # Worker Optimization
  workers:
    prefetch_count: 1
    heartbeat_interval: 60
```

## Monitoring Configuration

```yaml
# monitoring_config.yml
monitoring:
  # Metrics Collection
  metrics:
    enabled: true
    interval: 60
    
  # Alerting
  alerts:
    enabled: true
    endpoints:
      - type: "email"
        address: "ops@example.com"
      - type: "slack"
        webhook: "https://hooks.slack.com/..."
```

## Best Practices

### Resource Allocation
1. Start with conservative limits
2. Monitor resource usage
3. Adjust based on workload
4. Plan for peak usage

### Security Settings
1. Enable SSL/TLS
2. Implement authentication
3. Use role-based access
4. Regular security audits

### Performance Optimization
1. Tune Elasticsearch settings
2. Optimize worker configurations
3. Configure proper cache sizes
4. Monitor and adjust auto-scaling

## Next Steps

- Set up [Monitoring](../monitoring)
- Configure [Auto-scaling](../scaling)
- Implement [Security Measures](../security)
- Review [Best Practices](../best-practices)

## Additional Resources

- [Troubleshooting Guide](../troubleshooting)
- [API Documentation](../api)
- [Example Configurations](../examples)
- [Community Support](https://hysds-core.atlassian.net/)

---

For detailed information about specific configuration options, please refer to our [documentation](https://hysds-core.atlassian.net/wiki/spaces/HYS/overview).