$root="./src/apache-tinkerpop-gremlin-server-3.6.0"
$conf="$root/conf"
$data="$root/data"
$scripts="$root/scripts"
Copy-Item ./assets/gremlin-server.yaml $conf/.
Copy-Item ./assets/air-routes-latest.graphml  $data/.
Copy-item ./assets/start.sh $root/.
Copy-Item ./assets/load-air-routes-graph.groovy $scripts/.
docker build -t imanabu/gremlin-air-routes-server:latest .
