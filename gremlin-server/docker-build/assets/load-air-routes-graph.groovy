// You can use this file to load the air-routes graph from the Gremlin Console
//
// To execute use the console command ":load load-air-routes-graph.groovy"
//

def addItUp(x, y) { x + y }

// an init script that returns a Map allows explicit setting of global bindings.
def globals = [:]

// defines a sample LifeCycleHook that prints some output to the Gremlin Server console.
// note that the name of the key in the "global" map is unimportant.
globals << [hook : [
  onStartUp: { ctx ->
    ctx.logger.info("Loading graph data for air routes...")

    // An example of an initialization script that can be configured to run in Gremlin Server.
    // Change the path below to point to wherever you put the graphml file
    graph.io(graphml()).readGraph('data/air-routes-latest.graphml')

  }
] as LifeCycleHook]

// define the default TraversalSource to bind queries to - this one will be named "g".
// ReferenceElementStrategy converts all graph elements (vertices/edges/vertex properties)
// to "references" (i.e. just id and label without properties). this strategy was added
// in 3.4.0 to make all Gremlin Server results consistent across all protocols and
// serialization formats aligning it with TinkerPop recommended practices for writing
// Gremlin.
globals << [g : traversal().withEmbedded(graph).withStrategies(ReferenceElementStrategy)]