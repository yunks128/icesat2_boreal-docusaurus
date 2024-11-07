# Development Guide

This guide provides comprehensive information for developers contributing to the ICESat-2 Boreal Forest Biomass Mapping project.

## Table of Contents
- [Development Guide](#development-guide)
  - [Table of Contents](#table-of-contents)
  - [Development Environment Setup](#development-environment-setup)
    - [Prerequisites](#prerequisites)
    - [Initial Setup](#initial-setup)
    - [Docker Setup](#docker-setup)
  - [Project Structure](#project-structure)
  - [Development Workflow](#development-workflow)
    - [Git Workflow](#git-workflow)
    - [Code Review Checklist](#code-review-checklist)
  - [Code Standards](#code-standards)
    - [Python Style Guide](#python-style-guide)
    - [Code Quality Tools](#code-quality-tools)
  - [Testing](#testing)
    - [Unit Tests](#unit-tests)
    - [Integration Tests](#integration-tests)
    - [Running Tests](#running-tests)
  - [Documentation](#documentation)
    - [Code Documentation](#code-documentation)
    - [API Documentation](#api-documentation)
  - [Performance Optimization](#performance-optimization)
    - [Profiling](#profiling)
    - [Memory Management](#memory-management)
  - [Deployment](#deployment)
    - [Production Build](#production-build)
    - [Continuous Integration](#continuous-integration)
  - [Troubleshooting](#troubleshooting)
    - [Common Issues](#common-issues)
    - [Debugging Tips](#debugging-tips)
  - [Additional Resources](#additional-resources)

## Development Environment Setup

### Prerequisites
- Python 3.8+
- Git
- Docker
- Make
- AWS CLI
- GDAL

### Initial Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nasa/icesat2_boreal.git
   cd icesat2_boreal
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Unix
   # or
   .\venv\Scripts\activate   # Windows
   ```

3. **Install Dependencies**
   ```bash
   # Install development requirements
   pip install -r requirements-dev.txt

   # Install pre-commit hooks
   pre-commit install
   ```

4. **Setup Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

### Docker Setup

```dockerfile
# Dockerfile.dev
FROM python:3.8-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gdal-bin \
    libgdal-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy project files
COPY . .

CMD ["python", "src/main.py"]
```

## Project Structure

```
icesat2_boreal/
├── src/
│   ├── data/              # Data processing modules
│   ├── models/            # ML models and algorithms
│   ├── visualization/     # Visualization tools
│   └── utils/             # Utility functions
├── tests/
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── fixtures/         # Test fixtures
├── docs/                 # Documentation
├── notebooks/           # Jupyter notebooks
├── scripts/             # Utility scripts
└── config/             # Configuration files
```

## Development Workflow

### Git Workflow

1. **Branch Naming Convention**
   ```
   feature/description
   bugfix/description
   hotfix/description
   release/version
   ```

2. **Commit Message Format**
   ```
   type(scope): description

   [optional body]
   [optional footer]
   ```

3. **Pull Request Process**
   ```bash
   # Create feature branch
   git checkout -b feature/new-feature

   # Make changes and commit
   git add .
   git commit -m "feat(data): add new data processing pipeline"

   # Push changes
   git push origin feature/new-feature
   ```

### Code Review Checklist

- [ ] Code follows style guide
- [ ] Tests are included
- [ ] Documentation is updated
- [ ] No security vulnerabilities
- [ ] Performance impact considered

## Code Standards

### Python Style Guide

```python
from typing import Dict, List, Optional

class DataProcessor:
    """Process ICESat-2 data for biomass estimation.

    Args:
        config: Configuration dictionary
        verbose: Enable verbose output

    Attributes:
        data_path: Path to input data
    """

    def __init__(self, config: Dict, verbose: bool = False) -> None:
        self.config = config
        self.verbose = verbose
        self.data_path = config.get('data_path')

    def process_data(self, input_data: List[float]) -> Optional[Dict]:
        """Process input data and return results.

        Args:
            input_data: List of input values

        Returns:
            Processed data dictionary or None if processing fails
        """
        if not input_data:
            return None

        # Processing logic here
        results = {'processed': True}
        return results
```

### Code Quality Tools

```bash
# Run linter
flake8 src tests

# Run type checker
mypy src

# Format code
black src tests

# Sort imports
isort src tests
```

## Testing

### Unit Tests

```python
# tests/unit/test_processor.py
import pytest
from src.data.processor import DataProcessor

def test_process_data():
    # Arrange
    processor = DataProcessor({'data_path': 'test/path'})
    test_data = [1.0, 2.0, 3.0]

    # Act
    result = processor.process_data(test_data)

    # Assert
    assert result is not None
    assert result['processed'] is True
```

### Integration Tests

```python
# tests/integration/test_pipeline.py
import pytest
from src.pipeline import Pipeline

@pytest.mark.integration
def test_full_pipeline():
    # Setup pipeline
    pipeline = Pipeline()
    
    # Run pipeline
    result = pipeline.run()
    
    # Verify results
    assert result.status == 'success'
```

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=src tests/

# Run specific test
pytest tests/unit/test_processor.py
```

## Documentation

### Code Documentation

```python
def calculate_biomass(height: float, density: float) -> float:
    """Calculate forest biomass using allometric equations.

    Args:
        height: Tree height in meters
        density: Wood density in g/cm³

    Returns:
        Biomass estimate in Mg/ha

    Raises:
        ValueError: If input parameters are invalid

    Example:
        >>> calculate_biomass(25.0, 0.5)
        150.75
    """
```

### API Documentation

```python
@app.post("/biomass")
async def calculate_biomass(
    request: BiomassRequest
) -> BiomassResponse:
    """Calculate biomass for given coordinates.

    Args:
        request: BiomassRequest object containing coordinates

    Returns:
        BiomassResponse with calculated biomass

    Example:
        curl -X POST "api/biomass" -d '{"lat": 65.5, "lon": -147.5}'
    """
```

## Performance Optimization

### Profiling

```python
import cProfile
import pstats

def profile_function():
    profiler = cProfile.Profile()
    profiler.enable()
    
    # Function to profile
    result = process_large_dataset()
    
    profiler.disable()
    stats = pstats.Stats(profiler).sort_stats('cumulative')
    stats.print_stats()
```

### Memory Management

```python
def process_large_dataset():
    # Use generators for memory efficiency
    for chunk in pd.read_csv('large_file.csv', chunksize=1000):
        process_chunk(chunk)
        
    # Clean up
    gc.collect()
```

## Deployment

### Production Build

```bash
# Build Docker image
docker build -t icesat2-boreal:latest .

# Run container
docker run -d \
    --name icesat2-boreal \
    -p 8000:8000 \
    -v data:/app/data \
    icesat2-boreal:latest
```

### Continuous Integration

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
      - name: Run tests
        run: |
          pip install -r requirements-dev.txt
          pytest
```

## Troubleshooting

### Common Issues

1. **Memory Errors**
   ```python
   # Solution: Use chunked processing
   def process_large_file():
       with dask.config.set(temporary_directory='/tmp'):
           df = dd.read_csv('large_file.csv')
           result = df.map_partitions(process_chunk)
   ```

2. **Performance Issues**
   ```python
   # Solution: Use parallel processing
   from multiprocessing import Pool

   with Pool(processes=4) as pool:
       results = pool.map(process_data, data_chunks)
   ```

### Debugging Tips

```python
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def process_data():
    try:
        logger.debug("Starting data processing")
        # Processing logic
        logger.info("Processing completed")
    except Exception as e:
        logger.error(f"Error processing data: {str(e)}")
        raise
```

---

## Additional Resources

- [API Documentation](api.md)
- [Configuration Guide](configuration.md)
- [Contributing Guide](contributing.md)
- [Change Log](changelog.md)

---

*For questions or support, please contact the development team at dev@icesat2-boreal.org*