
//displays all the paths from start to end
//edge pair coverage (initial to final)
export const findAllPaths = (graph, start, end) => {
    const visitedEdges = new Set();
    let edgPairCov=[];
    function dfs(node, path) {
      if (node === end) {
        console.log('Path:', path.join(' -> '));
        edgPairCov.push(path);
        return;
      }
  
      if (!graph[node]) return;
  
      for (const neighbor of graph[node]) {
        const edge = [node, neighbor].join('-');
        
        if (!visitedEdges.has(edge)) {
          visitedEdges.add(edge);
          dfs(neighbor, [...path, neighbor]);
          visitedEdges.delete(edge); // Backtrack: remove the edge from visited
        }
      }
    }
  
    dfs(start, [start]);
    return edgPairCov;
}

//display all pair of edges
//edge-pair coverage (all pairs of edges)
export const findEdgePairs = (graph) => {
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

//displays all edges
//edge coverage initial to final
export function displayAllEdges(graph) {
    for (const node in graph) {
        for (const adjacentNode of graph[node]) {
            console.log(`Edge: ${node} -> ${adjacentNode}`);
        }
    }
  }



//displays all nodes  
//node coverage initial to final
export function getAllNodes(graph) {
    const nodes = new Set();

    
    for (const node in graph) {
        nodes.add(node); // Add the current node to the set

        for (const adjacentNode of graph[node]) {
            nodes.add(adjacentNode); // Add adjacent nodes to the set
        }
    }

    return Array.from(nodes); // Convert the set to an array and return
}