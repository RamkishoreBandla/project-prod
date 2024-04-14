function findAllPaths(graph, start, end) {
    const visitedEdges = new Set();
    let edgPairCov=[];
    function dfs(node, path) {
      if (node === end) {
        console.log('Path:', path.join(' -> '));
        edgPairCov.push(path);
        console.log(edgPairCov);
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
  }

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

  findAllPaths(graph, initialNode, finalNode);