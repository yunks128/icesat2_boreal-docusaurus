---
sidebar_position: 2
---

# Getting Started with HySDS

This guide will help you set up and run your first HySDS deployment. We'll cover the basic concepts, installation process, and initial configuration.

## Prerequisites

Before you begin, ensure you have:

- Python 3.8 or higher
- Docker installed and running
- Access to one of the following environments:
  - AWS account
  - On-premise computing resources
  - NASA HECC access (optional)
- Git for version control

## Basic Components

HySDS consists of several key components:

### 1. Resource Management
- **GRQ (Geo Region Query)**: Geospatial data management and faceted search
- **Mozart**: Job management and workflow orchestration
- **Metrics**: Runtime analytics for compute fleet

### 2. Processing Components
- **Factotum**: "Hot" helper workers for low-latency processes
- **Verdi Workers**: Distributed compute nodes running at scale
- **Data Management**: Rolling storage of data products

## Quick Installation

1. Clone the HySDS repository:
```bash
git clone https://github.com/hysds/hysds.git
cd hysds
```

2. Install using pip:
```bash
pip install hysds
```

3. Set up basic configuration:
```bash
hysds-configure init
```

## Basic Configuration

Create a basic configuration file `config.yml`:

```yaml
MOZART_URL: http://localhost:8888
GRQ_URL: http://localhost:8878
METRICS_URL: http://localhost:8866
FACTOTUM_URL: http://localhost:8844

QUEUE_NAMING_CONVENTION: "job_worker-%s"
REDIS_JOB_STATUS_URL: "redis://localhost:6379"
REDIS_JOB_STATUS_KEY: "jobs"
```

## First Steps

### 1. Start Core Services
```bash
hysds-service start mozart
hysds-service start grq
hysds-service start metrics
```

### 2. Verify Installation
```bash
hysds-status check
```

### 3. Run a Test Job
```bash
hysds-submit-job --type example --queue test-queue
```

## Basic Usage Examples

### Submit a Processing Job
```python
from hysds.orchestrator import submit_job

job_params = {
    "input_file": "example.data",
    "processing_type": "standard"
}

submit_job("example-job-type", job_params)
```

### Monitor Job Status
```python
from hysds.mozart import get_job_status

status = get_job_status("job_id_123")
print(f"Job Status: {status}")
```

## Common Deployment Patterns

1. **Single Instance Setup**
   - Good for development and testing
   - All components on one machine

2. **Basic Production Setup**
   - Separate machines for Mozart and GRQ
   - Distributed Verdi workers

3. **Hybrid Cloud Setup**
   - Components spread across cloud and on-premise
   - Auto-scaling worker groups

## Next Steps

1. Learn about [Advanced Configuration](../guides/configuration)
2. Explore [Scaling Options](../guides/scaling)
3. Review [Security Best Practices](../guides/security)
4. Check out [Example Workflows](../guides/workflows)

## Troubleshooting

### Common Issues

1. **Connection Errors**
   - Verify all services are running
   - Check firewall settings
   - Confirm correct URLs in config

2. **Job Failures**
   - Check logs in Mozart UI
   - Verify worker configuration
   - Ensure data access permissions

### Getting Help

- Visit our [GitHub Issues](https://github.com/hysds/hysds/issues)
- Join our [Community Slack](https://hysds.slack.com)
- Check the [FAQ Section](../guides/faq)

## Resource Links

- [API Documentation](../guides/api)
- [Architecture Overview](../guides/architecture)
- [Community Guidelines](../guides/community)
- [Example Applications](../guides/examples)

---

For more detailed information, please refer to our [full documentation](https://hysds-core.atlassian.net/wiki/spaces/HYS/overview).