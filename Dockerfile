FROM    maven:3.5.3-jdk-8-alpine

ENV     libs /atmosphere/tma/libraries


#Adding TMA-Utils
WORKDIR ${libs}/tma-utils

# Prepare by downloading dependencies
ADD     tma-utils/pom.xml  ${libs}/tma-utils/pom.xml
RUN     ["mvn", "dependency:resolve"]
RUN     ["mvn", "verify"]

# Adding source, compile and package into a fat jar
ADD     tma-utils/src      ${libs}/tma-utils/src
RUN     ["mvn", "install"]

