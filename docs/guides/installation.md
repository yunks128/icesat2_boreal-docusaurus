# Installation Guide

This guide provides detailed instructions for installing and setting up the ICESat-2 Boreal Forest Biomass Mapping project.

## Table of Contents
- [System Requirements](#system-requirements)
- [Installation Methods](#installation-methods)
- [Dependencies](#dependencies)
- [Environment Setup](#environment-setup)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

## System Requirements

### Minimum Requirements
```
Hardware:
- CPU: 4 cores
- RAM: 8GB
- Storage: 50GB free space
- Internet: Stable connection

Software:
- Python 3.8+
- Git
- GDAL 3.0+
```

### Recommended Specifications
```
Hardware:
- CPU: 8+ cores
- RAM: 16GB+
- Storage: 200GB+ SSD
- GPU: NVIDIA with 8GB+ VRAM (for ML workflows)

Software:
- Python 3.10+
- Docker
- AWS CLI
- CUDA 11.0+ (for GPU support)
```

## Installation Methods

### 1. pip Installation (Recommended)
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Unix/macOS:
source venv/bin/activate
# On Windows:
.\venv\Scripts\activate

# Install package
pip install icesat2-boreal
```

### 2. Docker Installation
```bash
# Pull the image
docker pull nasa/icesat2-boreal:latest

# Run container
docker run -d \
    --name icesat2-boreal \
    -p 8000:8000 \
    -v ${PWD}/data:/app/data \
    nasa/icesat2-boreal:latest
```

### 3. Source Installation
```bash
# Clone repository
git clone https://github.com/nasa/icesat2_boreal.git
cd icesat2_boreal

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate

# Install in development mode
pip install -e ".[dev]"
```

## Dependencies

### Core Dependencies
```txt
# requirements.txt
numpy>=1.20.0
pandas>=1.3.0
xarray>=0.19.0
geopandas>=0.10.0
rasterio>=1.2.0
scikit-learn>=1.0.0
torch>=1.9.0
gdal>=3.0.0
```

### Development Dependencies
```txt
# requirements-dev.txt
pytest>=6.0.0
black>=21.0.0
flake8>=3.9.0
mypy>=0.910
sphinx>=4.0.0
pre-commit>=2.15.0
```

### Optional Dependencies
```txt
# requirements-optional.txt
jupyterlab>=3.0.0
tensorflow>=2.6.0
dask>=2021.9.0
h5py>=3.0.0
```

## Environment Setup

### 1. System Dependencies

#### Ubuntu/Debian
```bash
# Update package list
sudo apt update

# Install system dependencies
sudo apt install -y \
    python3-dev \
    python3-pip \
    gdal-bin \
    libgdal-dev \
    gcc \
    g++ \
    make
```

#### macOS
```bash
# Using Homebrew
brew update
brew install \
    python@3.10 \
    gdal \
    gcc
```

#### Windows
```powershell
# Using Chocolatey
choco install -y `
    python3 `
    gdal `
    visualstudio2019buildtools
```

### 2. Environment Variables

Create `.env` file:
```bash
# .env
EARTHDATA_USERNAME=your_username
EARTHDATA_PASSWORD=your_password
MAAP_API_KEY=your_api_key
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
PYTHONPATH=${PYTHONPATH}:/path/to/icesat2_boreal
```

### 3. GDAL Configuration
```bash
# Set GDAL environment variables
export GDAL_DATA=/usr/share/gdal
export PROJ_LIB=/usr/share/proj
```

## Verification

### 1. Test Installation
```python
# test_installation.py
from icesat2_boreal import __version__
from icesat2_boreal.core import BiomassProcessor

def test_import():
    assert __version__ == "1.0.0"
    
def test_processor():
    processor = BiomassProcessor()
    assert processor is not None
```

### 2. Run Verification Script
```bash
# Run tests
pytest tests/

# Run sample processing
python scripts/verify_installation.py
```

### 3. Check GPU Support
```python
import torch

def check_gpu():
    if torch.cuda.is_available():
        print(f"GPU available: {torch.cuda.get_device_name(0)}")
        print(f"CUDA version: {torch.version.cuda}")
    else:
        print("No GPU available. Using CPU only.")
```

## Troubleshooting

### Common Issues

#### 1. GDAL Installation Issues
```bash
# If GDAL installation fails
conda install -c conda-forge gdal

# Or use OSGeo4W on Windows
# Download and run OSGeo4W installer
```

#### 2. Memory Issues
```python
# Configure memory limits
import os
os.environ['CUDA_VISIBLE_DEVICES'] = '0'  # Limit to first GPU
os.environ['RASTERIO_CACHE_SIZE'] = '512'  # MB
```

#### 3. Dependency Conflicts
```bash
# Create clean environment
conda create -n icesat2_boreal python=3.10
conda activate icesat2_boreal

# Install dependencies
conda install -c conda-forge --file requirements.txt
```

### Installation Logs

Keep installation logs for troubleshooting:
```bash
# Redirect installation output to log
pip install icesat2-boreal -v > install_log.txt 2>&1
```

### Validation Script
```python
def validate_installation():
    """Validate installation and dependencies."""
    import sys
    import pkg_resources
    
    required = {'numpy', 'pandas', 'gdal', 'torch'}
    installed = {pkg.key for pkg in pkg_resources.working_set}
    missing = required - installed
    
    if missing:
        print(f"Missing packages: {missing}")
        sys.exit(1)
    
    print("Installation validated successfully!")
```

## Uninstallation

### Clean Uninstall
```bash
# Remove package
pip uninstall icesat2-boreal

# Remove virtual environment
deactivate
rm -rf venv

# Remove Docker containers and images
docker stop icesat2-boreal
docker rm icesat2-boreal
docker rmi nasa/icesat2-boreal:latest
```

## Next Steps

After installation:
1. Follow the [Getting Started Guide](getting-started.md)
2. Review [Configuration Options](configuration.md)
3. Explore [Example Notebooks](../notebooks/)
4. Join the [Community](community.md)

## Support

If you encounter issues:
1. Check [Known Issues](https://github.com/nasa/icesat2_boreal/issues)
2. Search [Discussions](https://github.com/nasa/icesat2_boreal/discussions)
3. Contact support: support@icesat2-boreal.org

---

*For detailed API documentation, visit [docs.icesat2-boreal.org](https://docs.icesat2-boreal.org)*