## Project Structure

This document outlines the structure of the `icesat2_boreal` project, detailing the organization of directories and files, their purpose, and the relationships between various components. Each directory serves a specific function in the overall architecture, supporting tasks such as environment setup, data processing, algorithm execution, simulation, and validation.

### Root Directory

- `.gitignore`: Specifies files to be ignored by version control.
- `README.md`: Provides an overview of the project, including setup instructions and project description.
- `ssl_test.txt`: Possibly a placeholder or a configuration file related to SSL tests.

### Documentation Directory (`docs/`)

Static files used in the documentation are stored here.
- `static/`: Contains static assets like images or other media used in the project documentation.

### Data Processing Scripts (`dps/`)

Scripts and environment configuration files related to data processing are organized here:

- **Environment YML Files**: These files list dependencies for different virtual environments (`above_env.yml`, `above_env_3.1.4.yml`, `above_env_4.1.0.yml`, etc.).
- **Build Commands**: Shell scripts that contain commands to build the environment or execute certain stages of the data processing (`build_command_3.1.3.sh`, `build_command_4.1.0.sh`, etc.).
- **Main Environment File**: `env_main.yaml` and `requirements_main.txt` define dependencies and requirements for the main environment.
- **Algorithm Directories**: Each subdirectory contains necessary scripts and configuration files for individual algorithms (`alg_3-4`, `alg_resample`, `alg_3-1-3`, etc.). Each typically includes:
  - IPython Notebooks (`.ipynb`)
  - Shell scripts (`.sh`)
  - YAML configurations (`algorithm_config.yaml`)
- **Registered Scripts**: YAML files for registered algorithms or data processing steps (`do_HLS_stack_3-1-2.yml`, `run_extract_covars.yml`, etc.).

### Simulation Directory (`simulator/`)

Contains scripts and data related to simulating and generating test data for ICESat-2:
- `generateData.bash`: Script for generating simulation data.
- Subdirectories like `4.5.1.rh_comparison` and `4.5.sim_validation` contain README files and potentially additional scripts relevant to specific simulation tasks.

### Library Directory (`lib/`)

Houses Python modules and notebooks with utility functions and procedures used across the project:
- Scripts here (e.g., `3.1.2_dps.py`, `extract_covars.py`, `tile_atl08.py`) provide functionality for different data processing steps.
- Notebooks illustrate how to use these scripts or provide examples (`build_reduced_res.ipynb`).

### Notebooks Directory (`notebooks/`)

Categorized by stages or tasks, these Jupyter Notebooks are used for data exploration, model development, and validation:

- **General Notebooks**: Used for quick reviews and assessments (`3-DPS_review_pmm.ipynb`, `HLS_assess_ms_comps.ipynb`).
- **Publish Data**: Notebooks related to preparing and publishing data (`Publish_30m_ICESat-2.ipynb`).
- **Gridded Product Development**: Covers the creation and testing of gridded products (`3-DPS_review_LD.ipynb`, `Review_biomass_output.ipynb`).
- **Biomass Models**: Hosts models and scripts for predicting biomass (`boreal_functions.R`, `ground_photons/`, `old_models/`).
- **Radar Integration**: Integration with radar data (`build_agb_training_table.ipynb`, `create_s1rtc.ipynb`).
- **Validation**: Validation processes comparing ICESat-2 data to other datasets (`4.1 Comparison of ATL08 heights to ALS heights - EG, AN.ipynb`).
- **ICESat-2 Processing**: Initial data handling and extraction from the ICESat-2 datasets (`2.1 ICESat-2 data search and download - python - PM, CS, NT, AN, EG.ipynb`).
- **Reference Product Creation**: Steps for creating reference models and maps (`1.1 Reference biomass modeling (field_discrete return) - R- LD, JA, TF, PM, CS.ipynb`).

### Design Decisions

The project structure is designed to ensure modularity and scalability. The following design decisions were made:

1. **Modularity**: Each directory encapsulates specific functionality, making it easy to navigate and maintain.
2. **Environment Management**: Using multiple environment files ensures reproducibility across different versions of dependencies.
3. **Script Organization**: Separating scripts according to their role (data processing, simulation, validation, etc.) enhances clarity and reusability.
4. **Notebook Documentation**: Using Jupyter Notebooks for development and verification allows for an interactive approach to data analysis and sharing insights.

### Component Relationships

- **Environment YML and Build Scripts**: Define the execution environment and dependencies, ensuring consistency and compatibility.
- **Algorithms and Scripts in `dps/`**: Coordinated to process data through various algorithms, utilizing the resources defined in the library (`lib/`).
- **Simulation and Validation Notebooks**: Validate the outputs from processing scripts by comparing them with simulation results or external datasets.
- **Reference Product Notebooks**: Develop and refine models using scripts and output from data processing and validation stages.

This architecture ensures each component's responsibilities are clear, relationships are well-defined, and the project remains maintainable and scalable.