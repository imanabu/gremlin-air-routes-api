# Python 3 Based Server Example

# Struggles and Solutions

## where(__.) Does Not Get Sensed In Your IDE

* You may run into a situation where `__` is not found in your IDE, for example, `.where(__.in("label"))`
  does not compile. This is because __ is actually a class in the graph_traversal library. You should import:

    from gremlin_python.process.graph_traversal import __
  
  in your code for __ to work. 

* You may run into camel cased methods like `hasLabel` becoming obsolete. This is because the python's
  naming convention does not allow camel case in many symbols. Most gremlin methods have python compliant
  symbols like `has_label` instead of `hasLabel`
