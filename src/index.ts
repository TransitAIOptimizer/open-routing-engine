import { Graph, Edge } from './graph/graph';
import { Dijkstra } from './algorithms/dijkstra';

const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdge(new Edge('A', 'B', 1));
graph.addEdge(new Edge('A', 'C', 3));
graph.addEdge(new Edge('B', 'C', 2));
graph.addEdge(new Edge('C', 'D', 4));
graph.addEdge(new Edge('B', 'D', 8));
graph.addEdge(new Edge('E', 'D', 2));
graph.addEdge(new Edge('E', 'F', 3));
graph.addEdge(new Edge('B', 'F', 7));
graph.addEdge(new Edge('F', 'C', 5));
graph.addEdge(new Edge('D', 'F', 1));

const dijkstra = new Dijkstra(graph);
const shortestPath = dijkstra.findShortestPath('A', 'F');

console.log(shortestPath);

console.log('Shortest path from A to D: ', shortestPath.join(' -> '));
