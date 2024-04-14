// Example usage:

const graph = {
  '1': ['2', '3'],
  '2': ['3'],
  '3': ['4', '5'],
  '4': ['7'],
  '5': ['6', '7'],
  '6': ['5']
};
const initialNode = '1';
const finalNode = '7';

function getAllNodes(graph) {
  const nodes = new Set();

  // Iterate through each key (node) in the graph
  for (const node in graph) {
    nodes.add(node); // Add the current node to the set

    // Iterate through the adjacent nodes of the current node
    for (const adjacentNode of graph[node]) {
      nodes.add(adjacentNode); // Add adjacent nodes to the set
    }
  }

  return Array.from(nodes); // Convert the set to an array and return
}

function displayAllEdges(graph) {
  for (const node in graph) {
    for (const adjacentNode of graph[node]) {
      console.log(`Edge: ${node} -> ${adjacentNode}`);
    }
  }
}



const allNodes = getAllNodes(graph);
console.log('All nodes in the graph:', allNodes);
displayAllEdges(graph)

function findEdgePairs(graph) {
  const edgePairs = [];

  for (let [pk, pv] of Object.entries(graph)) {

    for (let neighbor of pv) {
      if (graph[neighbor]) {
        for (let child of graph[neighbor]) {
          edgePairs.push([pk, neighbor, child])
        }
      }
    }
  }
  return edgePairs;

}

let allEdgePairs = findEdgePairs(graph);
console.log('All edge pairs in the graph:', allEdgePairs);




function findAllPaths(graph, start, end) {
  const visited = new Set();
  const path = [];

  function dfs(node) {
    visited.add(node);
    path.push(node);

    if (node === end) {
      console.log('Path:', path.join(' -> '));
    } else {
      if (graph[node]) {
        for (const neighbor of graph[node]) {
          if (!visited.has(neighbor)) {
            dfs(neighbor);
          }
        }
      }
    }

    path.pop();
    visited.delete(node);
  }

  dfs(start);
}

findAllPaths(graph, initialNode, finalNode);


function findAllPathsWithLoop(graph, start, end) {
  const visitedEdges = new Set();

  function dfs(node, path) {
    if (node === end) {
      console.log('Path:', path.join(' -> '));
      return;
    }

    if (!graph[node]) return;

    for (const neighbor of graph[node]) {
      const edge1 = [node, neighbor].join('-');
      const edge2 = [neighbor, node].join('-');

      if (!visitedEdges.has(edge1) && !visitedEdges.has(edge2)) {
        visitedEdges.add(edge1);
        visitedEdges.add(edge2);
        dfs(neighbor, [...path, neighbor]);
        visitedEdges.delete(edge1); // Backtrack: remove the edge from visited
        visitedEdges.delete(edge2); // Backtrack: remove the edge from visited
      }
    }
  }

  dfs(start, [start]);

}
console.log('#----------------------------------------------------#');
findAllPathsWithLoop(graph, initialNode, finalNode);