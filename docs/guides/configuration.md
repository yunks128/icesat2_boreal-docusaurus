# Configuration Guide

This guide explains how to configure the ICESat-2 Boreal Forest Biomass Mapping project for your specific needs.

## Table of Contents

- [Configuration Guide](#configuration-guide)
  - [Table of Contents](#table-of-contents)
  - [Basic Configuration](#basic-configuration)
    - [Configuration File Structure](#configuration-file-structure)
  - [Environment Variables](#environment-variables)
  - [Data Sources](#data-sources)
  - [Processing Parameters](#processing-parameters)
    - [Biomass Calculation](#biomass-calculation)
    - [Quality Control](#quality-control)
  - [Output Settings](#output-settings)
  - [API Configuration](#api-configuration)
    - [Server Settings](#server-settings)
    - [Endpoint Configuration](#endpoint-configuration)
  - [Advanced Options](#advanced-options)
    - [Parallel Processing](#parallel-processing)
    - [Caching](#caching)
    - [Logging](#logging)
  - [Troubleshooting](#troubleshooting)
    - [Memory Issues](#memory-issues)
    - [Performance Tuning](#performance-tuning)
    - [Error Handling](#error-handling)
  - [Loading Configuration](#loading-configuration)

## Basic Configuration

### Configuration File Structure

The project uses YAML for configuration. Create a `config.yml` file in your project root:

```yaml
# config.yml
project:
  name: "ICESat-2 Boreal Analysis"
  version: "1.0.0"
  description: "Boreal forest biomass mapping configuration"

data:
  input_dir: "/path/to/input"
  output_dir: "/path/to/output"
  temp_dir: "/path/to/temp"
  
processing:
  threads: 4
  chunk_size: 1000
  memory_limit: "8GB"
```

## Environment Variables

Create a `.env` file to store sensitive information:

```bash
# .env
ICESAT2_API_KEY=your_api_key_here
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
MAAP_USERNAME=your_maap_username
MAAP_PASSWORD=your_maap_password
```

Required environment variables:
| Variable | Description | Required | Default |
|----------|-------------|----------|----------|
| ICESAT2_API_KEY | API key for ICESat-2 data access | Yes | None |
| AWS_ACCESS_KEY_ID | AWS access key | Yes | None |
| MAAP_USERNAME | MAAP platform username | Yes | None |
| DATABASE_URL | Database connection string | No | sqlite:///local.db |

## Data Sources

Configure data source settings in `data_sources.yml`:

```yaml
icesat2:
  product: "ATL08"
  version: "005"
  temporal_range:
    start: "2019-01-01"
    end: "2024-12-31"
  spatial_extent:
    min_lat: 45.0
    max_lat: 75.0
    min_lon: -180.0
    max_lon: 180.0

landsat:
  collection: "C02"
  tier: "T1"
  products:
    - "LC08"
    - "LC09"
  
sentinel2:
  processing_level: "L2A"
  cloud_coverage: 20
```

## Processing Parameters

### Biomass Calculation

Configure biomass estimation parameters:

```yaml
biomass:
  algorithms:
    method: "random_forest"
    params:
      n_estimators: 100
      max_depth: 15
      min_samples_split: 5
  
  validation:
    split_ratio: 0.2
    cross_validation: 5
    metrics:
      - "rmse"
      - "r2"
      - "mae"
```

### Quality Control

Set quality control thresholds:

```yaml
quality_control:
  outlier_detection:
    method: "isolation_forest"
    contamination: 0.1
  
  filters:
    cloud_cover_max: 20
    snow_cover_max: 10
    beam_sensitivity_min: 0.8
```

## Output Settings

Configure output formats and locations:

```yaml
output:
  formats:
    - type: "geotiff"
      compression: "LZW"
      resolution: 30
    - type: "netcdf"
      compression_level: 4
  
  metadata:
    author: "Your Name"
    institution: "Your Institution"
    contact: "your.email@institution.edu"
    license: "CC-BY-4.0"
```

## API Configuration

### Server Settings

```yaml
api:
  host: "0.0.0.0"
  port: 8000
  workers: 4
  timeout: 60
  
  rate_limiting:
    requests_per_minute: 60
    burst_limit: 100
  
  security:
    enable_cors: true
    allowed_origins:
      - "https://your-domain.com"
    api_key_header: "X-API-Key"
```

### Endpoint Configuration

```yaml
endpoints:
  biomass:
    cache_ttl: 3600
    max_area: 100000  # square kilometers
    
  timeseries:
    max_duration: 365  # days
    temporal_resolution: "monthly"
```

## Advanced Options

### Parallel Processing

Configure parallel processing settings:

```yaml
parallel:
  executor: "dask"
  scheduler: "distributed"
  
  cluster:
    type: "local"
    workers: 4
    threads_per_worker: 2
    memory_limit: "2GB"
```

### Caching

Set up caching configuration:

```yaml
cache:
  backend: "redis"
  url: "redis://localhost:6379"
  
  policies:
    data_ttl: 3600
    results_ttl: 86400
    max_size: "10GB"
```

### Logging

Configure logging settings:

```yaml
logging:
  level: "INFO"
  format: "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
  
  handlers:
    file:
      filename: "logs/icesat2_boreal.log"
      max_bytes: 10485760  # 10MB
      backup_count: 5
    
    sentry:
      dsn: "your-sentry-dsn"
      environment: "production"
```

## Troubleshooting

Common configuration issues and solutions:

### Memory Issues
```yaml
memory_management:
  chunk_size: 1000  # Reduce if memory errors occur
  garbage_collection:
    enabled: true
    frequency: 1000
```

### Performance Tuning
```yaml
performance:
  io_threads: 4
  compression_level: 4
  buffer_size: "1GB"
  
  optimization:
    enable_numba: true
    enable_caching: true
```

### Error Handling
```yaml
error_handling:
  retry_attempts: 3
  retry_delay: 5
  fallback_strategy: "local_cache"
```

## Loading Configuration

Use the configuration in your Python code:

```python
from icesat2_boreal.config import Config

# Load configuration
config = Config.from_file('config.yml')

# Access configuration values
input_dir = config.data.input_dir
n_threads = config.processing.threads

# Initialize processor with config
processor = BiomassProcessor(config)
```

Remember to:
- Keep sensitive information in `.env`
- Version control your configuration
- Document any custom settings
- Validate configuration on startup

---

*For more information, see the [API Documentation](api.md) or [Contact Support](support.md)*