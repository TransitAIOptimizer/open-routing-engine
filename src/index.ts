import { Graph, Edge } from './graph/graph';
import { Dijkstra } from './algorithms/dijkstra';

// Creating a graph and adding edges
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addEdge(new Edge('A', 'B', 1));
graph.addEdge(new Edge('B', 'C', 2));
graph.addEdge(new Edge('C', 'A', 3));

// Creating an instance of Dijkstra and finding the shortest path
const dijkstra = new Dijkstra(graph);
const shortestPath = dijkstra.findShortestPath('A', 'C');

console.log(shortestPath);
