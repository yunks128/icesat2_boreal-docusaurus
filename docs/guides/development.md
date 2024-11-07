---
sidebar_position: 5
---

# Development Guide

This guide provides information for developers who want to contribute to HySDS or build applications using the HySDS framework.

## Development Environment Setup

### Local Development Environment

```bash
# Clone the repository
git clone https://github.com/hysds/hysds.git
cd hysds

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install development dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Set up pre-commit hooks
pre-commit install
```

### Docker Development Environment

```dockerfile
# Development Dockerfile
FROM python:3.8-slim

WORKDIR /app
COPY requirements.txt requirements-dev.txt ./

RUN pip install -r requirements.txt -r requirements-dev.txt

COPY . .
```

## Project Structure

```plaintext
hysds/
├── docs/                  # Documentation
├── hysds/                # Main package
│   ├── __init__.py
│   ├── mozart/          # Job management
│   ├── grq/            # Data management
│   ├── metrics/        # System metrics
│   └── utils/          # Shared utilities
├── tests/               # Test suite
├── examples/            # Example applications
└── docker/             # Docker configurations
```

## Creating a Custom Processor

### Basic Processor Structure

```python
# processor.py
from hysds.celery import app

@app.task
class ExampleProcessor(object):
    def __init__(self):
        self.name = "Example Processor"
        
    def run(self, input_file, **kwargs):
        """
        Process the input file
        """
        try:
            # Processing logic here
            return {
                "status": "success",
                "output": output_file
            }
        except Exception as e:
            raise RuntimeError(f"Processing failed: {str(e)}")
```

### Processor Configuration

```yaml
# processor_config.yml
processor:
  name: "example_processor"
  version: "1.0.0"
  command: "python processor.py"
  
  inputs:
    - name: "input_file"
      type: "File"
      required: true
      
  outputs:
    - name: "output_file"
      type: "File"
```

## Working with Data

### Data Access

```python
from hysds.dataset import Dataset

def access_dataset(dataset_id):
    dataset = Dataset(dataset_id)
    
    # Access metadata
    metadata = dataset.metadata
    
    # Get file paths
    files = dataset.get_files()
    
    return files
```

### Data Publishing

```python
from hysds.dataset import publish

def publish_results(data_file, metadata):
    """Publish processing results"""
    dataset_id = publish(
        path=data_file,
        metadata=metadata,
        dataset_type="example_product"
    )
    return dataset_id
```

## Testing

### Unit Tests

```python
# test_processor.py
import unittest
from hysds.tests import HySDSTestCase

class TestExampleProcessor(HySDSTestCase):
    def setUp(self):
        super().setUp()
        self.processor = ExampleProcessor()
        
    def test_processing(self):
        result = self.processor.run("test_input.data")
        self.assertEqual(result["status"], "success")
```

### Integration Tests

```python
# test_integration.py
import unittest
from hysds.tests import HySDSIntegrationTestCase

class TestIntegration(HySDSIntegrationTestCase):
    def test_end_to_end(self):
        # Submit job
        job_id = self.submit_job(
            job_type="example_processor",
            params={"input_file": "test.data"}
        )
        
        # Wait for completion
        status = self.wait_for_job(job_id)
        self.assertEqual(status, "completed")
```

## API Development

### REST API Extension

```python
from flask import Blueprint, jsonify

api = Blueprint('custom_api', __name__)

@api.route('/custom/endpoint', methods=['GET'])
def custom_endpoint():
    try:
        # Implementation
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
```

### Job Type Development

```python
from hysds.job_types import register_job_type

@register_job_type
class CustomJobType:
    name = "custom_job"
    version = "1.0.0"
    
    def run(self, params):
        """Execute the job"""
        # Implementation
        pass
```

## Debugging and Monitoring

### Logging

```python
import logging

logger = logging.getLogger("hysds")

def setup_logging():
    logger.setLevel(logging.DEBUG)
    handler = logging.StreamHandler()
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)
```

### Metrics Collection

```python
from hysds.metrics import collect_metrics

def monitor_performance():
    metrics = collect_metrics()
    
    # Custom metrics
    metrics.update({
        "custom_metric": calculate_metric(),
        "processing_time": measure_time()
    })
    
    return metrics
```

## Contributing Guidelines

### Code Style
- Follow PEP 8 guidelines
- Use type hints for Python 3.8+
- Document all public methods and classes
- Write meaningful commit messages

### Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Make changes and add tests
4. Submit pull request
5. Address review comments

### Documentation
- Update relevant documentation
- Include docstrings
- Add example usage
- Update changelog

## Best Practices

### Development Tips
1. Use virtual environments
2. Run tests locally before committing
3. Keep components modular
4. Follow security guidelines

### Performance Considerations
1. Optimize data access patterns
2. Use appropriate caching
3. Monitor resource usage
4. Profile code performance

## Deployment

### Local Testing

```bash
# Build and run locally
docker-compose -f docker-compose.dev.yml up

# Run tests
pytest tests/
```

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: |
          pip install -r requirements.txt
          pytest tests/
```

## Additional Resources

- [API Documentation](../api)
- [Example Projects](../examples)
- [Community Forum](https://hysds-core.atlassian.net/)
- [GitHub Repository](https://github.com/hysds)

---

For detailed API references and advanced topics, please refer to our [documentation](https://hysds-core.atlassian.net/wiki/spaces/HYS/overview).