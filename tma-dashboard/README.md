# TMA-Dashboard
 
This is a decision support tool, more precisely a dashboard developed as a web page, which allows to:
-   Create and visualize TMA’s metrics, quality models and configuration profiles;
-   Plot probed data from monitored systems;
-   Plot calculated metric values by Analyze for monitored systems (and optionally the ids of applied plans alongside);
-   Export charts as images;
-   Export charts configurations;
-   Manage charts in a homepage;
-   Simulate metrics values;
-   Manage adaptation rules;

# Index

 -   [Installation](#Installation)
 -   [API communication setup](#API-communication-setup)
 -   [Implementation Details](#Implementation-Details)

## Installation

To build the container image hosting the webpage server, you should run the following command on the Worker node:

```
sh build.sh
```

To deploy the image built in the previous step as a pod in the kubernetes cluster, you should run the following command on the master node:

```
kubectl create -f tma-dashboard-deployment.yaml
```

Now, to interact with the tool you should access the URL: `http://IP_WORKER:31000/`. In case your ISP is blocking the traffic on that port, use the *externalIP* feature of Kubernetes to expose the web server at the URL: `http://EXTERNAL_IP_DEFINED:80/`.

## API communication setup

The IP address and port of TMA's API (URL_API_TMA), where requests from this tool will be sent to, are configured in [Configurations.js](tma-dashboard/src/configurations/Configurations.js) file, under the following directory:

```
...\tma-dashboard\src\configurations\
```

With the default deploy of TMA's API, the IP address and port of this configuration file should be, respectively, the Kubernetes Master machine IP address and 32026. 

## Implementation Details

This webpage was created in the form of a SPA (Single Page Application) using React, and Semantic UI for styling. 

Its functioning is based on performing requests to TMA's API (URL_API_TMA) whenever it needs data. Additionally, requests related to adaptation rules are redirected to and from TMA's Planning API (URL_PLANNING). Whenever requests sent from the webpage involve timestamps, they are converted to UTC before arriving at the API.

The webpage uses libraries to provide some of its main features:
 -  `Chart.js` to create charts
 -  `Reaflow`, with few customization, to generate the tree structure of quality models
 -  `jsPDF` to generate a pdf file with a chart image
 
To communicate with TMA's API, the `axios` library is used and a module ([ApiModule.js](tma-dashboard/src/utils/api/ApiModule.js)) contains all the communication methods. Also, the client-side input validation resides in [ValidInputs.js](tma-dashboard/src/utils/ValidInputs.js) file.

## Authors
* João Ribeiro
