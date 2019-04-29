# Maven Archetype - ATMOSPHERE TMA-Framework

The [**ATMOSPHERE**](http://www.atmosphere-eubrazil.eu) [`TMA-Framework`](https://github.com/eubr-atmosphere/tma-framework) `maven archetype` provides the 'template' for the `java` projects to be used in the development of the framework artifacts.

It provides a common configuration for naming, class structure, build and logging functionalities. 
It helps to achieve consistency in projects used in the development.


Read more about [`maven archetype`](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html).




## Usage:

1. In this folder, do: `mvn clean install`
2. In the target folder for your project, do
	`$ mvn -DarchetypeGroupId=eu.atmosphere.tmaf -DarchetypeArtifactId=atmosphere-tmaf-archetype -DarchetypeVersion=1.1 -DarchetypeRepository=local -DgroupId=eu.atmosphere.tmaf -DartifactId=project-name -Dversion=1.0 -Dpackage=eu.atmosphere.tmaf.project-name -Darchetype.interactive=false --batch-mode archetype:generate`



## Authors
* Nuno Antunes

