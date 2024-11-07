---
id: api reference
sidebar_label: API Reference
title: API Reference
---

## lib/extract_filter_atl08.py

### Classes

#### `Range`
A helper class to manage data ranges, useful in various data filtering operations.

**Attributes**:
- `start` (float, int): The start point of the range.
- `end` (float, int): The end point of the range.

**Methods**:
- `__init__(self, start, end)`: Initializes a new Range instance with a start and an end.
- `__eq__(self, other)`: Checks for equality with another Range.
- `__contains__(self, item)`: Checks if an item is within the Range.
- `__iter__(self)`: Enables iteration over the Range.
- `__str__(self)`: Returns a string representation of the Range.

### Functions

#### `rec_merge1(data)`
Recursively merges dictionary `data`.

**Parameters**:
- `data` (dict): The dictionary to be merged.

**Returns**:
- dict: Merged dictionary.

**Example**:
```python
merged_data = rec_merge1(data)
```

#### `extract_atl08(input_file, output_file)`
Extracts ATL08 data from `input_file` and writes to `output_file`.

**Parameters**:
- `input_file` (str): Path to the input file containing ATL08 data.
- `output_file` (str): Path to the output file where extracted data will be written.

**Returns**:
- None

**Example**:
```python
extract_atl08('input.h5', 'output.csv')
```

#### `main()`
Main entry point of the script, handling command line arguments and executing the primary workflow.

**Parameters**:
- None

**Returns**:
- None

**Example**:
```python
if __name__ == "__main__":
    main()
```

## lib/merge_neighbors_atl08.py

### Functions

#### `local_to_s3(local_path, s3_path)`
Uploads a local file at `local_path` to an S3 bucket at `s3_path`.

**Parameters**:
- `local_path` (str): Path to the local file.
- `s3_path` (str): Path in the S3 bucket where the file will be uploaded.

**Returns**:
- None

**Example**:
```python
local_to_s3('local/file.txt', 's3://bucket/file.txt')
```

#### `get_neighbors(index, distance)`
Finds neighboring data points within a specified distance from the given index.

**Parameters**:
- `index` (int): The reference index.
- `distance` (float): Maximum distance to search for neighbors.

**Returns**:
- list: List of neighboring data points.

**Example**:
```python
neighbors = get_neighbors(10, 5.0)
```

#### `main()`
Main entry point for merging neighbors' data.

**Parameters**:
- None

**Returns**:
- None

**Example**:
```python
if __name__ == "__main__":
    main()
```

## lib/FilterUtils.py

### Functions

#### `reorder_4326_bounds(bounds)`
Reorders geographic bounds to conform with the EPSG:4326 coordinate system.

**Parameters**:
- `bounds` (list): List of bounds.

**Returns**:
- list: Reordered bounds.

**Example**:
```python
new_bounds = reorder_4326_bounds(old_bounds)
```

#### `get_granules_list(query)`
Retrieves a list of data granules matching the provided query.

**Parameters**:
- `query` (str): Search query for data granules.

**Returns**:
- list: List of granules matching the query.

**Example**:
```python
granules = get_granules_list('atl08')
```

#### `prep_filter_atl08_qual(input_file, output_file)`
Prepares ATL08 data for quality filtering.

**Parameters**:
- `input_file` (str): Path to the input file.
- `output_file` (str): Path to the output file.

**Returns**:
- None

**Example**:
```python
prep_filter_atl08_qual('input.csv', 'output.csv')
```

## lib/CovariateUtils.py

### Classes

#### `or`
A placeholder class likely representing logical operations; specifics need to be defined.

**Methods**:
- TBD.

### Functions

#### `creds_expiration_timestamp()`
Returns the timestamp of AWS credentials expiration.

**Parameters**:
- None

**Returns**:
- str: Timestamp of credentials expiration.

**Example**:
```python
timestamp = creds_expiration_timestamp()
```

#### `get_index_tile()`
Retrieves the index for a tile.

**Parameters**:
- TBD

**Returns**:
- TBD

**Example**:
```python
index_tile = get_index_tile()
```

#### `reader(filepath)`
Reads a file from the given filepath.

**Parameters**:
- `filepath` (str): Path to the file.

**Returns**:
- TBD

**Example**:
```python
content = reader('file.txt')
```

#### `write_cog(data, output_path)`
Writes data to a Cloud Optimized GeoTIFF (COG) at the specified output path.

**Parameters**:
- `data`: Data to write.
- `output_path` (str): Path to the output COG file.

**Returns**:
- None

**Example**:
```python
write_cog(data, 'output_path.tif')
```

#### `get_creds(service_name)`
Retrieves credentials for a given service.

**Parameters**:
- `service_name` (str): The name of the service.

**Returns**:
- dict: Dictionary containing credentials.

**Example**:
```python
creds = get_creds('s3')
```

#### `common_mask(array1, array2)`
Returns a common mask for two arrays.

**Parameters**:
- `array1`, `array2`: Arrays to mask.

**Returns**:
- array: Combined mask of the two input arrays.

**Example**:
```python
mask = common_mask(array1, array2)
```

## lib/do_gee_download_by_subtile.py

### Functions

#### `get_gee_assets(query)`
Retrieves Google Earth Engine (GEE) assets based on a query.

**Parameters**:
- `query` (str): Query string for GEE assets.

**Returns**:
- list: List of GEE assets matching the query.

**Example**:
```python
assets = get_gee_assets('MODIS')
```

#### `create_polygon_from_coordinates(coords)`
Creates a polygon from a list of coordinates.

**Parameters**:
- `coords` (list): List of coordinates.

**Returns**:
- Polygon: Created polygon.

**Example**:
```python
polygon = create_polygon_from_coordinates(coords)
```

#### `create_fishnet(bounds, cell_size)`
Creates a fishnet grid within the specified bounds and cell size.

**Parameters**:
- `bounds` (list): Geographical bounds for the fishnet.
- `cell_size` (float): Size of each cell in the grid.

**Returns**:
- list: List of created grid cells.

**Example**:
```python
fishnet = create_fishnet([minx, miny, maxx, maxy], 1.0)
```

#### `main()`
Main entry point for downloading data by subtile.

**Parameters**:
- None

**Returns**:
- None

**Example**:
```python
if __name__ == "__main__":
    main()
```

## lib/extract_atl08.py

### Classes

#### `Range`
A helper class to manage data ranges, useful in various data filtering operations.

**Attributes**:
- `start` (float, int): The start point of the range.
- `end` (float, int): The end point of the range.

**Methods**:
- `__init__(self, start, end)`: Initializes a new Range instance with a start and an end.
- `__eq__(self, other)`: Checks for equality with another Range.
- `__contains__(self, item)`: Checks if an item is within the Range.
- `__iter__(self)`: Enables iteration over the Range.
- `__str__(self)`: Returns a string representation of the Range.

### Functions

#### `rec_merge1(data)`
Recursively merges dictionary `data`.

**Parameters**:
- `data` (dict): The dictionary to be merged.

**Returns**:
- dict: Merged dictionary.

**Example**:
```python
merged_data = rec_merge1(data)
```

#### `extract_atl08(input_file, output_file)`
Extracts ATL08 data from `input_file` and writes to `output_file`.

**Parameters**:
- `input_file` (str): Path to the input file containing ATL08 data.
- `output_file` (str): Path to the output file where extracted data will be written.

**Returns**:
- None

**Example**:
```python
extract_atl08('input.h5', 'output.csv')
```

#### `main()`
Main entry point of the script, handling command line arguments and executing the primary workflow.

**Parameters**:
- None

**Returns**:
- None

**Example**:
```python
if __name__ == "__main__":
    main()
```

## lib/ExtractUtils.py

### Classes

#### `or`
A placeholder class likely representing logical operations; specifics need to be defined.

**Methods**:
- TBD.

### Functions

#### `local_to_s3(local_path, s3_path)`
Uploads a local file at `local_path` to an S3 bucket at `s3_path`.

**Parameters**:
- `local_path` (str): Path to the local file.
- `s3_path` (str): Path in the S3 bucket where the file will be uploaded.

**Returns**:
- None

**Example**:
```python
local_to_s3('local/file.txt', 's3://bucket/file.txt')
```

#### `get_index_tile(index)`
Retrieves the index for a tile.

**Parameters**:
- `index` (int): Index of the tile.

**Returns**:
- int: Tile index.

**Example**:
```python
tile_index = get_index_tile(10)
```

#### `maap_search_get_h5_list(query)`
Searches for .h5 files in MAAP based on the query.

**Parameters**:
- `query` (str): Query string for searching .h5 files.

**Returns**:
- list: List of found .h5 files.

**Example**:
```python
h5_files = maap_search_get_h5_list('ATL08')
```

#### `extract_value_gdf_s3(gdf, s3_path)`
Extracts values from a GeoDataFrame and saves to S3.

**Parameters**:
- `gdf` (GeoDataFrame): GeoDataFrame containing the data.
- `s3_path` (str): S3 path for saving the extracted values.

**Returns**:
- None

**Example**:
```python
extract_value_gdf_s3(gdf, 's3://bucket/data.csv')
```

#### `extract_value_gdf(gdf, local_path)`
Extracts values from a GeoDataFrame and saves locally.

**Parameters**:
- `gdf` (GeoDataFrame): GeoDataFrame containing the data.
- `local_path` (str): Local path for saving the extracted values.

**Returns**:
- None

**Example**:
```python
extract_value_gdf(gdf, 'local/data.csv')
```

## lib/tile_atl08.py

### Functions

#### `get_atl08_csv_list(query)`
Retrieves a list of ATL08 CSV files based on the query.

**Parameters**:
- `query` (str): Query string for searching ATL08 CSV files.

**Returns**:
- list: List of ATL08 CSV files matching the query.

**Example**:
```python
csv_files = get_atl08_csv_list('ATL08')
```

#### `update_atl08_version(version)`
Updates the version of ATL08 data.

**Parameters**:
- `version` (str): New version of the ATL08 data.

**Returns**:
- None

**Example**:
```python
update_atl08_version('v2')
```

#### `main()`
Main entry point for tiling ATL08 data.

**Parameters**:
- None

**Returns**:
- None

**Example**:
```python
if __name__ == "__main__":
    main()
```

## lib/3.1.5_dps.py

### Functions

#### `reader(filepath)`
Reads a file from the given filepath.

**Parameters**:
- `filepath` (str): Path to the file.

**Returns**:
- str: Content of the file.

**Example**:
```python
content = reader('file.txt')
```

#### `get_shape(gdf)`
Returns the shape of a GeoDataFrame.

**Parameters**:
- `gdf` (GeoDataFrame): The GeoDataFrame to get the shape of.

**Returns**:
- tuple: Shape of the GeoDataFrame.

**Example**:
```python
shape = get_shape(gdf)
```

#### `main()`
Main entry point for processing task.

**Parameters**:
- None

**Returns**:
- None

**Example**:
```python
if __name__ == "__main__":
    main()
```

## lib/build_tindex_master.py

### Functions

#### `local_to_s3(local_path, s3_path)`
Uploads a local file at `local_path` to an S3 bucket at `s3_path`.

**Parameters**:
- `local_path` (str): Path to the local file.
- `s3_path` (str): Path in the S3 bucket where the file will be uploaded.

**Returns**:
- None

**Example**:
```python
local_to_s3('local/file.txt', 's3://bucket/file.txt')
```

#### `s3fs_to_https(s3_path)`
Converts an S3 path to an HTTPS URL.

**Parameters**:
- `s3_path` (str): S3 path to convert.

**Returns**:
- str: HTTPS URL.

**Example**:
```python
https_url = s3fs_to_https('s3://bucket/file.txt')
```

#### `s3_to_local(s3_path, local_path)`
Downloads a file from S3 to a local path.

**Parameters**:
- `s3_path` (str): S3 path of the file.
- `local_path` (str): Local path to save the file.

**Returns**:
- None

**Example**:
```python
s3_to_local('s3://bucket/file.txt', 'local/file.txt')
```

#### `main()`
Main entry point for building the tile index master.

**Parameters**:
- None

**Returns**:
- None

**Example**:
```python
if __name__ == "__main__":
    main()
```

## lib/tileslib.py

### Functions:
- None specified. Placeholder for future updates.

## lib/CovariateUtils_topo.py

### Functions

#### `ds_getma(dataset)`
Gets masked array from the dataset.

**Parameters**:
- `dataset`: The dataset to process.

**Returns**:
- MaskedArray: Masked array representation of the dataset.

**Example**:
```python
masked_array = ds_getma(dataset)
```

#### `hillshade(elevation, azimuth, angle_altitude)`
Calculates hillshade from elevation data.

**Parameters**:
- `elevation` (Array): Elevation data.
- `azimuth` (float): Azimuth angle in degrees.
- `angle_altitude` (float): Altitude angle of the light source in degrees.

**Returns**:
- Array: Hillshade result.

**Example**:
```python
shade = hillshade(elevation, 315, 45)
```

## lib/3.1.2_dps.py

### Functions

#### `get_shape(gdf)`
Returns the shape of a GeoDataFrame.

**Parameters**:
- `gdf` (GeoDataFrame): The GeoDataFrame to get the shape of.

**Returns**:
- tuple: Shape of the GeoDataFrame.

**Example**:
```python
shape = get_shape(gdf)
```

#### `get_json(url)`
Fetches JSON data from a URL.

**Parameters**:
- `url` (str): URL to retrieve JSON data from.

**Returns**:
- dict: JSON data.

**Example**:
```python
data = get_json('https://api.example.com/data')
```

## lib/ee_download.py

### Classes

#### `Curler`
A helper class to perform curl operations for downloading data.

**Methods**:
- `__init__(self)`: Initializes the Curler instance.
- `download(url, destination)`: Downloads a file from a URL to a destination.
- `check_for_success(response)`: Checks if the curl request was successful.
- `download_image_by_asset_path(asset_path, destination)`: Downloads an image from GEE by asset path.
- `makedirs(directory)`: Makes directories recursively.
- `download_images_in_collection(collection, destination)`: Downloads images in a GEE collection.

---

This enhanced API documentation provides comprehensive details, parameter explanations, return values, and usage examples for each class and function, aiming to assist developers in understanding and utilizing the provided functionalities effectively.