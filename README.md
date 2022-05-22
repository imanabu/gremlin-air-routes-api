# gremlin-air-routes-api
Example REST API backends

## Current Project Status

* 22-May-2022: The Docker image for test server is completed, and begin implementation of the node API 
  functions.

    docker run --rm -p 8182:8182 imanabu/gremlin-air-routes-server


## What is This Project?

This project will contain various REST API examples using Apache Tinkerpop Gremlin APIs using 
the example database and tutorials provided in [Practical Gremlin](https://www.kelvinlawrence.net/book/Gremlin-Graph-Guide.html)
authored by Kelvin Lawrence.

## Why This Project? 
When I learn a new DB technology like Gremlin, the initial ramp up has been difficult because:

* I usually fail to connect to the database the first time,
* I usually can connect to the database but driver won't let me do much more than that,
* I usually fail to run my first query I write,
* I usually do not know how to map the database data to and from JSON from the query returns in the API or SDK of the database,
* I usually need something quick and simple to perform more query experiments

I am sure you have had similar frustrations. 

I will go through the steps of creating a new server from scrach in each of target platform, and
will document any "gotchas" along the way.

## Who Can Use This Project?

If you are interested in developing server backends that need Gremlin access but do not know
how and where to start, this might be the right starting point for you.

## Is this Free? Can I Use This to Make Money?

Yes, it is open, free and both your and my rights are protected under the Apache 2.0 License. If you do not or cannot agree with
these license terms, then please do not use this project.

## Project Roadmap

### May 2022 - Start on Node.js and Typescript based implementation.

### Then...

* Implement Python flask based server. 
* Implement Scala and Play Framework based server.
* Implement GO based server.

## What to Bring

* A suitable Linux, Macintosh, or Windows desktop computer with a modern OS installed and 8 GB or more
  of memory installed. Most DB engines will consume some good chunk of memory,

* This project will require my Air Routes Gremlin Server docker image. As such you need to have
  the docker, usually the `docker desktop` installed and then do the pull. (To be provided soon),

* A few gig of disk space,

* Visual Studio Code (Please note that I use Jetbrains IDEs)

* PostMan or other suitable REST API tool. This project is not intended to provide you with an "airline reservation" style UI.

* Coffee, Tea, Soda or pure Water to keep you awake and hydrated.

## Other Helpful Stuff

* [gdotv](https://gdotv.com) is an excellent Graph IDE I use to explore and maintain my Graphs.

## Disclaimers - Not a Real Travel Guide Program!

Please do not use the data or results to plan your next trip to Rome, Taj Mahar, or (a place of your choice). with this project. 
Do not provide such guidance resources on public internet based on this project. The airline industry can changes routes, 
cancels flights aggainst your wishes and change pricing and boarding priorities by the minute. 

## Who Wrote This and How to Contact the Author?

My details are provided in my github profile. 
Please contribute your fixes and improvements as Pull Requests and also bug reports on the
project's GitHub page at https://github.com/imanabu/gremlin-air-routes-api




