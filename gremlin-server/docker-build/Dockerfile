FROM adoptopenjdk/openjdk8
EXPOSE 8182
RUN apt-get update && apt-get install -y dos2unix
RUN apt-get install net-tools
ADD ./src/apache-tinkerpop-gremlin-server-3.6.0 ./gremlin-server
RUN dos2unix /gremlin-server/start.sh
RUN dos2unix /gremlin-server/bin/gremlin-server.sh
RUN chmod a+x /gremlin-server/start.sh
RUN chmod a+x /gremlin-server/bin/gremlin-server.sh
CMD /gremlin-server/start.sh
