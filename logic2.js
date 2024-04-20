function findAllPaths(graph, start, end) {
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
    console.log(edgPairCov);
    return edgPairCov;
  }


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
  
  
  


  const graph = {
    '1': ['2', '3'],
    '2': ['3'],
    '3': ['4', '5'],
    '4': ['7'],
    '5': ['6', '7'],
    '6': ['5']
  };

  // const graph={
  //   '1':['2'],
  //   '3':['2'],
  //   '2':['4','5']
  // }

  const initialNode = '1';
  const finalNode = '7';

  let allpaths=findAllPaths(graph, initialNode, finalNode);
  console.log(allpaths," all paths");
  const allNodes = getAllNodes(graph);
console.log(allNodes);
let obj={}

  let unqNodesPaths=[]
  let intialNodesVisited=[]
  let flag=false;

  for(let path of allpaths){
    // console.log(path,'--');
    flag=false;
    for(let node of path){
      if(!(node in obj)){
        flag=true;
        console.log(path,node,"inside cond");
        obj[node]=true;
      }
    }
    console.log(intialNodesVisited);
    if(flag===true){
      unqNodesPaths.push(path);
    }
  }

  console.log(unqNodesPaths,"node coverage unqNodepaths");


//edge path stuff starts ----------------
let edgeObj={}
let edgeflag=false
let edgepathCov=[]
for(let path of allpaths){
  edgeflag=false
  for(let i=0;i<path.length-1;i++){
    let edge=path[i]+'-'+path[i+1]
    if(!(edge in edgeObj)){
      edgeflag=true;
      edgeObj[edge]=true;
    }
  }
  if(edgeflag===true){
    edgepathCov.push(path)
  }
}

console.log(edgepathCov," tet path of edgepath");