export class Edge {
  constructor(
    public vertex1: string,
    public vertex2: string,
    public weight: number,
  ) {}
}

export class Graph {
  adjacencyList: { [key: string]: { vertex: string; weight: number }[] };
  private edges: Edge[] = [];
  private vertices: Set<string> = new Set();

  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex: string): void {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  hasVertex(vertex: string): boolean {
    return vertex in this.adjacencyList;
  }

  addEdge(edge: Edge) {
    // Check if both vertices exist in the graph, add them if not
    if (!this.adjacencyList[edge.vertex1]) {
      this.adjacencyList[edge.vertex1] = [];
    }
    if (!this.adjacencyList[edge.vertex2]) {
      this.adjacencyList[edge.vertex2] = [];
    }

    // Add edge to the adjacency list
    this.adjacencyList[edge.vertex1].push({
      vertex: edge.vertex2,
      weight: edge.weight,
    });

    // If the graph is undirected, you should also add the inverse edge
    // this.adjacencyList[edge.vertex2].push({ vertex: edge.vertex1, weight: edge.weight });

    // Keep track of the edges and vertices
    this.edges.push(edge);
    this.vertices.add(edge.vertex1);
    this.vertices.add(edge.vertex2);
  }

  // Method to get all the edges of the graph
  getEdges(): Edge[] {
    return this.edges;
  }

  // Method to get all the vertices of the graph
  getVertices(): Set<string> {
    return this.vertices;
  }

  getNeighbors(vertex: string): { vertex: string; weight: number }[] {
    // проверка на наличие вершины в графе
    if (!this.adjacencyList[vertex]) {
      throw new Error('Vertex does not exist');
    }

    // возвращаем соседей для данной вершины
    return this.adjacencyList[vertex];
  }
}
