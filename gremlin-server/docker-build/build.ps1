$root="./src/apache-tinkerpop-gremlin-server-3.6.0"
$bin="$root/bin"
$scripts="$root/scripts"
$data="$root/data"
Copy-Item autoload.txt $root
Copy-Item air-routes-latest.graphml.xml  $root
Copy-item start.sh $root
Copy-Item load-air-routes-graph.groovy $root

