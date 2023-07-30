import { Graph } from '../graph/graph';

export class Dijkstra {
  private graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  findShortestPath(start: string, end: string): string[] {
    const vertices = this.graph.getVertices();

    const costs: Record<string, number> = {};
    const parents: Record<string, string | null> = {};
    const processed: string[] = [];

    vertices.forEach((vertex) => {
      if (vertex === start) {
        costs[vertex] = 0;
      } else {
        costs[vertex] = Infinity;
      }
      parents[vertex] = null;
    });

    let node = this.lowestCostNode(costs, processed);

    while (node) {
      if (!this.graph.hasVertex(node)) {
        throw new Error(`Vertex "${node}" does not exist in the graph`);
      }

      const cost = costs[node];
      const children = this.graph.getNeighbors(node);
      for (const n in children) {
        const newCost = cost + children[n].weight;
        const childNode = children[n].vertex;

        if (costs[childNode] === Infinity || costs[childNode] > newCost) {
          costs[childNode] = newCost;
          parents[childNode] = node;
        }
      }

      processed.push(node);
      node = this.lowestCostNode(costs, processed);
    }

    const shortestPath: string[] = [end];
    let parent = parents[end];

    while (parent) {
      shortestPath.push(parent);
      parent = parents[parent];
    }

    return shortestPath.reverse();
  }

  private lowestCostNode(
    costs: Record<string, number>,
    processed: string[],
  ): string | null {
    return Object.keys(costs).reduce((lowest: string | null, node: string) => {
      if (lowest === null || costs[node] < costs[lowest]) {
        if (!processed.includes(node)) {
          lowest = node;
        }
      }
      return lowest;
    }, null);
  }
}
