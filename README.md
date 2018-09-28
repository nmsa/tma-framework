# TMA-Utils Library 

Main dependency to use during the development of the containers of the TMA Framework.


## Prerequisites

You need [maven](https://maven.apache.org/) to build this project.

If you cannot install `maven` in your system, you should use the `docker` image available at [libraries](../). In this case, `docker` is mandatory.


## Build

To build the library, you need to run the following command.

```sh
mvn clean install
```

**Note:** As an alternative, you can take advantage of the [libraries](../) docker image to ease your deployment.

## Usage

To use the tma-utils in the development of your component, you just need to include the library in your [maven](https://maven.apache.org/) project, using the code below.

```xml
<dependency>
    <groupId>eubr.atmosphere.tma</groupId>
    <artifactId>tma-utils</artifactId>
    <version>0.0.1-SNAPSHOT</version>
</dependency>
```
