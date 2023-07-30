import { Dijkstra } from './algorithms/dijkstra';
import { Graph, Edge } from './graph/graph';
import { uploadOsmFileAndProcessGraph } from './graphService';

async function main() {
  const graphLoad = await uploadOsmFileAndProcessGraph(
    '/home/dmitry/transitaioptimiser/open-routing-engine/map.osm',
  );

  if (!graphLoad) {
    console.error('Failed to process graph');
    return;
  }

  const graph = new Graph();

  const realData = graphLoad; // Здесь подразумевается, что функция loadRealData уже определена где-то в вашем коде
  console.log('REALDATA ===', realData);
  // realData.nodes.features.forEach((node) => {
  //   graph.addVertex(node.id);
  // });
  //
  // realData.edges.features.forEach((edge) => {
  //   graph.addEdge(new Edge(edge.source, edge.target, edge.weight));
  // });

  // теперь вы можете использовать полученный граф как обычно
  const dijkstra = new Dijkstra(graph);

  console.log('Dijkstra ===', dijkstra);

  console.time('Dijkstra algorithm execution');
  const startNodeID = '567058794'; // This should be a valid node ID from your graph
  const endNodeID = '10804810280'; // This should be a valid node ID from your graph

  const shortestPath = dijkstra.findShortestPath(startNodeID, endNodeID);
  console.timeEnd('Dijkstra algorithm execution');

  console.log(shortestPath);
  console.log('Shortest path from: ', shortestPath.join(' -> '));
}

main();
