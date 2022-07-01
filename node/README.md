# Node.js Express Practical Implementation of the Air Routes APIs

## TL; DR

    Bookmark https://kelvinlawrence.net/book/Gremlin-Graph-Guide.html
    Install https://curl.se/download.html
    Install https://www.docker.com/products/docker-desktop/
    docker run --rm -p 8182:8182 imanabu/gremlin-air-routes-server 
    npm install
    npm start
    curl http://localhost:3000/api/count/airport

## APIs and Examples

* Many of the API calls returns the Vertex ID information. If you
need a full property from an element please use the
`/api/:kind/value-map/:id` interface.

* If a parameter requires a `kind` use `v` or `e`
* The [Practical Gremlin](https://kelvinlawrence.net/book/Gremlin-Graph-Guide.html) references
  are based on Version 283 of the document and may differ by the time you are reading
  this file. The book is referenced as `PG` in the rest of this document.
* Not every chapter from the PG book or query is covered in this product.

### Check The Version of the Air Routes DB

#### GET API
    curl http://localhost:3000/api/version
### Example
    curl http://localhost:3000/api/version
    ["2021-08-31 14:58:59 UTC","0.87","Kelvin R. Lawrence","version","Air Routes Data - Version: 0.87 Generated: 2021-08-31 14:58:59 UTC; Graph created by Kelvin R. Lawrence; Please let me know of any errors you find in the graph or routes that should be added."]

### Provide the ValueMap of a Vertex or Edge ID
This provides the field and values give an ID of a Vertex or an Edge using
the ValueMap Gremlin API. ValueMap values are always returned in an array.
The API will flatten that if there is only a singular value. It will also
return the element id value using ValueMap(true).

### GET API
    curl http://localhost:3000/api/value-map/:kind/:id
### Example
Note that your Vertex ID 2 may not be the same as I have.

    http://localhost:3000/api/value-map/v/2
    {
        "country": "US",
        "code": "ANC",
        "longest": 12400,
        "city": "Anchorage",
        "elev": 151,
        "icao": "PANC",
        "lon": -149.996002197266,
        "type": "airport",
        "region": "US-AK",
        "runways": 3,
        "lat": 61.1744003295898,
        "desc": "Anchorage Ted Stevens"
    }

### Count Vertices of a Label
See PG 3.2.3. Counting things.
#### GET API
    curl http://localhost:3000/api/count/:label
### Example
    curl http://localhost:3000/api/count/airport
    {"label":"airport","count":3503}

### Find Vertices With Specific Property and Value
See PG 3.2.2. Does a specific property exist on a given vertex or edge?
#### GET API
    curl http://localhost:3000/api/find/:label/:property/:value
### Example
    curl http://localhost:3000/api/find/airport/code/SFO
    [{"id":23,"label":"airport"}]
    curl http://localhost:3000/api/find/airport/region/US-NJ
    [{"id":608,"label":"airport"},{"id":632,"label":"airport"},{"id":2094,"label":"airport"},{"id":2105,"label":"airport"}]

### Group Count by Kind and What
See PG 3.2.4. Counting groups of things
#### GET API
    curl http://localhost:3000/api/group-count/:kind/by/:what
### Example
    curl http://localhost:3000/api/group-count/v/by/label
    {"continent":7,"country":237,"version":1,"airport":3503}
    curl http://localhost:3000/api/group-count/v/by/country
    {"PR":7,"PT":19,"PW":1,"PY":2,"QA":1,"AE":10,...

### List Vertices or Edges (not) that have a Property
See PG 3.2.4. Counting groups of things
#### GET API
    curl http://localhost:3000/api/has/:kind/:property
    curl http://localhost:3000/api/not-has/:kind/:property
### Example
    curl http://localhost:3000/api/has/v/airport
    curl http://localhost:3000/api/has/v/code
    [{"id":0,"label":"version"},{"id":1,"label":"airport"},{"id":2,"label":"airport"}
    curl http://localhost:3000/api/has-not/v/runways
    [{"id":0,"label":"version"},{"id":3504,"label":"country"},{"id":3505,"label":"country"},

### Where Can I Fly From an Airport
Coming soon...

### Where Can I Fly To From an Airport
Coming soon...

