# Contributing to ICESat-2 Boreal Project

First off, thank you for considering contributing to the ICESat-2 Boreal Forest Biomass Mapping project! This project thrives because of our community's contributions.

## 📋 Table of Contents

- [Contributing to ICESat-2 Boreal Project](#contributing-to-icesat-2-boreal-project)
  - [📋 Table of Contents](#-table-of-contents)
  - [🤝 Code of Conduct](#-code-of-conduct)
  - [🚀 Getting Started](#-getting-started)
  - [💻 Development Process](#-development-process)
    - [Local Development](#local-development)
    - [Git Workflow](#git-workflow)
  - [📥 Pull Request Process](#-pull-request-process)
  - [📝 Style Guides](#-style-guides)
    - [Python Style Guide](#python-style-guide)
    - [Documentation Style](#documentation-style)
  - [🧪 Testing Guidelines](#-testing-guidelines)
  - [📚 Documentation](#-documentation)
    - [Required Documentation](#required-documentation)
    - [API Documentation Example](#api-documentation-example)
  - [🏷️ Issue Labels](#️-issue-labels)
  - [📊 Versioning](#-versioning)
  - [🎉 Recognition](#-recognition)
  - [❓Getting Help](#getting-help)

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## 🚀 Getting Started

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/icesat2_boreal.git
   cd icesat2_boreal
   ```

2. **Set Up Development Environment**
   ```bash
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # Unix
   # or
   .\venv\Scripts\activate  # Windows

   # Install dependencies
   pip install -r requirements-dev.txt
   
   # Install pre-commit hooks
   pre-commit install
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development Process

### Local Development

1. **Environment Setup**
   - Use Python 3.8 or higher
   - Install required packages: `pip install -r requirements-dev.txt`
   - Configure your IDE to use project's `.editorconfig`

2. **Code Quality Tools**
   ```bash
   # Run linter
   flake8 .

   # Run type checker
   mypy .

   # Format code
   black .
   ```

3. **Running Tests**
   ```bash
   # Run all tests
   pytest

   # Run with coverage
   pytest --cov=src tests/
   ```

### Git Workflow

1. **Keep Your Fork Updated**
   ```bash
   git remote add upstream https://github.com/nasa/icesat2_boreal.git
   git fetch upstream
   git merge upstream/main
   ```

2. **Commit Messages**
   ```
   type(scope): description

   [optional body]

   [optional footer]
   ```
   Types: feat, fix, docs, style, refactor, test, chore

## 📥 Pull Request Process

1. **Before Submitting**
   - Update documentation
   - Add/update tests
   - Run quality checks
   - Update CHANGELOG.md

2. **PR Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement

   ## Testing
   Describe testing done

   ## Related Issues
   Fixes #issue_number
   ```

3. **Review Process**
   - Two approvals required
   - All CI checks must pass
   - Documentation updated
   - Tests added/updated

## 📝 Style Guides

### Python Style Guide
- Follow PEP 8
- Use type hints
- Maximum line length: 88 characters (Black default)
- Docstring format: Google style

```python
def process_data(input_data: np.ndarray) -> Dict[str, float]:
    """Process input data and return analysis results.

    Args:
        input_data: Array containing raw measurements.

    Returns:
        Dictionary containing processed results.

    Raises:
        ValueError: If input_data is empty.
    """
```

### Documentation Style
- Clear and concise
- Include examples
- Update API documentation
- Keep README.md current

## 🧪 Testing Guidelines

1. **Test Structure**
   ```python
   def test_function_name():
       # Arrange
       test_input = ...

       # Act
       result = function_to_test(test_input)

       # Assert
       assert result == expected_output
   ```

2. **Test Coverage**
   - Minimum 80% coverage required
   - Cover edge cases
   - Include integration tests
   - Mock external services

## 📚 Documentation

### Required Documentation
- Function/class docstrings
- Module documentation
- Example usage
- Architecture diagrams
- API documentation

### API Documentation Example
```python
@api.route('/biomass', methods=['POST'])
def calculate_biomass():
    """Calculate forest biomass from input parameters.

    Request Body:
        {
            "latitude": float,
            "longitude": float,
            "date": string (YYYY-MM-DD)
        }

    Returns:
        {
            "biomass": float,
            "uncertainty": float,
            "unit": "Mg/ha"
        }
    """
```

## 🏷️ Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature requests
- `documentation`: Documentation updates
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed
- `performance`: Performance improvements
- `testing`: Testing related
- `wontfix`: This won't be worked on
- `priority`: Urgent issues

## 📊 Versioning

We use [Semantic Versioning](https://semver.org/):
- MAJOR version for incompatible API changes
- MINOR version for new functionality
- PATCH version for bug fixes

## 🎉 Recognition

All contributors will be:
- Listed in CONTRIBUTORS.md
- Acknowledged in release notes
- Added to paper authorships when applicable

## ❓Getting Help

- Join our [Slack channel](https://icesat2-boreal.slack.com)
- Ask in GitHub Discussions
- Email the maintainers
- Check the [FAQ](docs/faq.md)

---

Remember: The best way to ensure your contribution is accepted is to follow these guidelines and engage with the community. When in doubt, ask!

*Last Updated: November 2024*