# Update tmalibrary

Instructions to update Python library tmalibrary


## Generating distribution archives

The generation of the distribution packages are done using the `setup.py` file. Before you compile this file, you need to change the version of the package to build. This can be done by editing the line 5 of this file.

After that, to generate the distribution package, you should execute the following command:

```sh
python setup.py bdist_wheel
```

## Uploading of distribution archives

To upload to the distribution packages to [Pypi](https://pypi.org/), you need to execute the following command:

```python
python -m twine upload --repository-url https://upload.pypi.org/legacy/ dist/*
```