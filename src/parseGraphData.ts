import { Graph, Edge } from './graph/graph';

function isGraphData(
  data: any,
): data is { nodes: any; edges: { features: any[]; type: string } } {
  return (
    data &&
    data.nodes !== undefined &&
    data.edges !== undefined &&
    Array.isArray(data.edges.features) &&
    typeof data.edges.type === 'string'
  );
}

export function parseGraphData(
  graphData: string | { nodes: any; edges: any[] },
): Graph {
  try {
    if (typeof graphData === 'string') {
      graphData = JSON.parse(graphData);
    }

    // Type guard to ensure graphData is of the correct type before accessing its properties.
    if (!isGraphData(graphData)) {
      console.log('Invalid graph data', graphData); //
      throw new Error('Invalid graph data');
    }

    if (typeof graphData.edges === 'string') {
      const parsedEdges = JSON.parse(graphData.edges);

      // Assign the 'features' array to 'edges'.
      if (parsedEdges.features && Array.isArray(parsedEdges.features)) {
        graphData.edges = parsedEdges.features;
      } else {
        throw new Error('Invalid edge data');
      }
    }
    console.log('GRAPHDATA ===', graphData);

    if (!isGraphData(graphData)) {
      throw new Error(
        `Invalid graph data: ${JSON.stringify(graphData, null, 2)}`,
      );
    }

    const graph = new Graph();
    for (const edgeData of graphData.edges.features) {
      console.log('edgeData ===', edgeData);
      const edge = new Edge(
        edgeData.properties.osmid,
        edgeData.id,
        edgeData.properties.length,
      );
      graph.addEdge(edge);
    }

    return graph;
    // parsing logic here
  } catch (error: any) {
    throw new Error(`Failed to parse graph data: ${error.message}`);
  }
}
