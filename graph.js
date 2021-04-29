class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const toVisitStack = [start];
    const visited = new Set(toVisitStack);
    const out = [];

    while (toVisitStack.length) {
      const currNode = toVisitStack.pop();
      out.push(currNode.value);
      for (let neighbor of currNode.adjacent) {
        if (!visited.has(neighbor)) {
          toVisitStack.push(neighbor);
          visited.add(neighbor);
        }
      }
    }
    return out;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const toVisitQueue = [start];
    const visited = new Set(toVisitQueue);
    const out = [];

    while (toVisitQueue.length) {
      const currNode = toVisitQueue.shift();
      out.push(currNode.value);
      for (let neighbor of currNode.adjacent) {
        if (!visited.has(neighbor)) {
          toVisitQueue.push(neighbor);
          visited.add(neighbor);
        }
      }
    }
    return out;
  }

  // this function finds the shortest path from a source node to a target node
  shortestPath(source, target) {
    for (let node of this.nodes) {
      node.path = [];
    }
    source.path = [source.value];

    const toVisitQueue = [source];
    const visited = new Set(toVisitQueue);

    while (toVisitQueue.length) {
      const currNode = toVisitQueue.shift();
      if (currNode == target) {
        return currNode.path;
      }
      for (let neighbor of currNode.adjacent) {
        if (!visited.has(neighbor)) {
          neighbor.path = [...currNode.path, neighbor.value];
          toVisitQueue.push(neighbor);
          visited.add(neighbor);
        }
      }
    }
  }

  // this function determines how many edges in graph
  getNumOfEdges() {
    let numOfRelations = 0;
    for (let node of this.nodes) {
      numOfRelations += node.adjacent.size;
    }
    return numOfRelations / 2;
  }

  // this function determines how many connected components in graph
  getNumOfConnectedComponents() {
    let numOfConnectedComponents = 0;

    const notVisited = new Set(this.nodes);
    while (notVisited.size) {
      const notVisitedArr = Array.from(notVisited);
      const source = notVisitedArr[0];
      const toVisitStack = [source];
      notVisited.delete(source);
      while (toVisitStack.length) {
        const currNode = toVisitStack.pop();
        for (let neighbor of currNode.adjacent) {
          if (notVisited.has(neighbor)) {
            toVisitStack.push(neighbor);
            notVisited.delete(neighbor);
          }
        }
      }
      numOfConnectedComponents++;
    }
    return numOfConnectedComponents;
  }

  // this function determines if graph has a cycle
  hasCycle() {
    const numOfNodes = this.nodes.size;
    const numOfEdges = this.getNumOfEdges();
    const numOfConnectedComponents = this.getNumOfConnectedComponents();
    return numOfEdges > numOfNodes - numOfConnectedComponents;
  }
}

module.exports = {Graph, Node}