from setuptools import setup, find_packages

with open("README.md", "r") as fh:
	long_description = fh.read()

setup(
    name='tmalibrary',
    version='9.5',
    author='Rui Silva',
    author_email='rfsilva@student.dei.uc.pt',
    description='Probe and Actuator Library',
    long_description = long_description,
    long_description_content_type = "text/markdown",
    url='https://github.com/rfrsilva/tmalibrary',
    packages=find_packages(),
    classifiers=[
    	"Programming Language :: Python :: 3",
    	"License :: OSI Approved :: MIT License",
    	"Operating System :: OS Independent",
    ],
)
