# Getting Started

Welcome to the ICESat-2 Boreal Forest Biomass Mapping project! This guide will help you get up and running quickly.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Basic Usage](#basic-usage)
- [Examples](#examples)
- [Next Steps](#next-steps)

## Prerequisites

### Required Software
- Python 3.8 or higher
- Git
- GDAL
- Docker (optional)

### Required Accounts
- NASA Earthdata Login
- MAAP Platform Access
- AWS Account (optional)

### System Requirements
```
Minimum Requirements:
- 8GB RAM
- 50GB Storage
- 4 CPU Cores

Recommended:
- 16GB RAM
- 200GB Storage
- 8 CPU Cores
- GPU (for ML workflows)
```

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/nasa/icesat2_boreal.git
cd icesat2_boreal
```

### 2. Create Virtual Environment
```bash
# Create and activate virtual environment
python -m venv venv

# On Unix/macOS
source venv/bin/activate

# On Windows
.\venv\Scripts\activate
```

### 3. Install Dependencies
```bash
# Install basic requirements
pip install -r requirements.txt

# For development
pip install -r requirements-dev.txt
```

### 4. Configure Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your credentials
nano .env
```

Example `.env` file:
```bash
EARTHDATA_USERNAME=your_username
EARTHDATA_PASSWORD=your_password
MAAP_API_KEY=your_api_key
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
```

## Quick Start

### 1. Basic Data Processing
```python
from icesat2_boreal import BiomassProcessor

# Initialize processor
processor = BiomassProcessor()

# Process sample data
result = processor.process_area(
    latitude=65.5,
    longitude=-147.5,
    radius_km=10
)

# Display results
print(result.summary())
```

### 2. Run Sample Analysis
```bash
# Run sample analysis script
python scripts/sample_analysis.py

# View results in notebooks/sample_results.ipynb
jupyter notebook notebooks/sample_results.ipynb
```

### 3. Docker Quick Start
```bash
# Build and run with Docker
docker compose up -d

# Access the web interface
open http://localhost:8000
```

## Basic Usage

### Data Processing Pipeline

```python
from icesat2_boreal import Pipeline
from icesat2_boreal.config import Config

# Load configuration
config = Config.from_file('config/default.yml')

# Initialize pipeline
pipeline = Pipeline(config)

# Process region of interest
results = pipeline.run(
    bbox={
        'min_lat': 60.0,
        'max_lat': 70.0,
        'min_lon': -150.0,
        'max_lon': -140.0
    },
    date_range={
        'start': '2020-01-01',
        'end': '2020-12-31'
    }
)

# Save results
results.save('output/results.nc')
```

### Visualization

```python
from icesat2_boreal.viz import BiomassMap

# Create visualization
viz = BiomassMap(results)

# Generate map
viz.plot(
    title='Boreal Forest Biomass',
    colormap='viridis',
    save_path='output/biomass_map.png'
)
```

### API Usage

```python
from icesat2_boreal.client import API

# Initialize API client
api = API(token='your_api_token')

# Get biomass estimate
biomass = api.get_biomass(
    lat=65.5,
    lon=-147.5,
    date='2024-01-01'
)

print(f"Estimated biomass: {biomass['value']} {biomass['units']}")
```

## Examples

### 1. Basic Biomass Estimation
```python
from icesat2_boreal import estimate_biomass

# Single point estimation
result = estimate_biomass(lat=65.5, lon=-147.5)
print(f"Biomass estimate: {result.value} Mg/ha")
```

### 2. Time Series Analysis
```python
from icesat2_boreal import TimeSeries

# Create time series
ts = TimeSeries(
    latitude=65.5,
    longitude=-147.5,
    start_date='2020-01-01',
    end_date='2024-01-01'
)

# Plot results
ts.plot(show_uncertainty=True)
```

### 3. Batch Processing
```python
from icesat2_boreal import BatchProcessor

# Define study areas
areas = [
    {'name': 'Site 1', 'lat': 65.5, 'lon': -147.5},
    {'name': 'Site 2', 'lat': 66.0, 'lon': -148.0},
]

# Process all sites
processor = BatchProcessor()
results = processor.process_sites(areas)

# Export results
results.to_csv('results.csv')
```

## Next Steps

### 1. Explore Advanced Features
- [Advanced Processing Guide](docs/advanced-processing.md)
- [Custom Algorithm Development](docs/algorithms.md)
- [Validation Methods](docs/validation.md)

### 2. Join the Community
- [Subscribe to Mailing List](https://lists.nasa.gov/icesat2-boreal)
- [Join Slack Channel](https://icesat2-boreal.slack.com)
- [Attend Community Calls](docs/community.md)

### 3. Contribute
- [Development Guide](docs/development.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

### 4. Additional Resources
- [API Documentation](docs/api.md)
- [User Guide](docs/user-guide.md)
- [FAQ](docs/faq.md)

## Common Issues and Solutions

### Connection Problems
```python
# Retry with exponential backoff
from icesat2_boreal.utils import retry_with_backoff

@retry_with_backoff(max_retries=3)
def fetch_data():
    return api.get_data()
```

### Memory Management
```python
# Process large datasets in chunks
from icesat2_boreal.utils import ChunkProcessor

processor = ChunkProcessor(chunk_size='1000MB')
processor.process_file('large_dataset.nc')
```

### Error Handling
```python
try:
    result = processor.run()
except DataQualityError as e:
    logger.warning(f"Data quality issue: {e}")
    result = processor.run(fallback=True)
```

## Support

If you need help:
1. Check the [Documentation](https://docs.icesat2-boreal.org)
2. Ask in [GitHub Discussions](https://github.com/nasa/icesat2_boreal/discussions)
3. Contact support: support@icesat2-boreal.org

---

*For more detailed information, please refer to our [comprehensive documentation](https://docs.icesat2-boreal.org).*