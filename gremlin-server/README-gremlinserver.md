# The Reference Gremlin Server

## TL;DR

    docker run --rm -p 8182:8182 imanabu/gremlin-air-routes-server

# Detailed Information

This directory is used to create a Gremlin Server with the Air Route preloaded. 

## Where I Got The Data?

The graphml data are from [This Github Repo](https://github.com/krlawrence/graph/tree/master/sample-data)

This example uses [This GraphML File](https://github.com/krlawrence/graph/tree/master/sample-data)

## How Do I Build The Container

1. Go inside the `docker-build` dir.
2. First inspect `download-server.ps` and let it download the Gremlin Server and Data files, unpack and put them under
   `./src`
3. To build the docker image run `build.ps1` Please note that the modifications to the stock gremlin servers are found
   in the `assets` folder.
4. I use Docker Desktop to push the image to the `imanabu` docker hub.

# Interesting Point of Interest

## How Auto Load of Air Route Data File is Accomplished Upon Startup of the Gremlin Server

`conf/gremlin-server.yaml` modified so that it will run `load-air-routes-graph.groovy` script. 

    org.apache.tinkerpop.gremlin.jsr223.ScriptFileGremlinPlugin: {files: [scripts/load-air-routes-graph.groovy]}

The data is stored in `data/air-routes-latest.graphml` file. Please read the script file how that will do the
loading. They were lifted off from other script files in the scripts directory. 

## Docker Network Binding Issue

The `gremlin-server.yaml` file's `host:` parameter should be set to the docker's web address which is fixed to
`172.17.0.2` If it is fixed to the `localhost` it will not be accessible from the outside of the container.

