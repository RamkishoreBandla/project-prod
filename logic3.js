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


function containsArray(mainArray, subArray) {
  for (const arr of mainArray) {
      if (arr.length === subArray.length && arr.every((value, index) => value === subArray[index])) {
          return true;
      }
  }
  return false;
}

const graph = {
  '1': ['2', '3'],
  '2': ['3'],
  '3': ['4', '5'],
  '4': ['7'],
  '5': ['6', '7'],
  '6': ['5']
};
let initialNode = '1'
let finalNode = '7'
let allEdgePairs = findEdgePairs(graph);
console.log('All edge pairs in the graph:', allEdgePairs);

// take out all initial nodes

//format to a-b object
let edgepathObj = {}
for (let path of allEdgePairs) {
  if (edgepathObj[path[0] + '-' + path[1]]) {
    let tmp = edgepathObj[path[0] + '-' + path[1]];
    tmp.push(path[1] + '-' + path[2]);
    edgepathObj[path[0] + '-' + path[1]] = tmp;

  }
  else {
    edgepathObj[path[0] + '-' + path[1]] = [path[1] + '-' + path[2]]
  }
}

// console.log(edgepathObj," edgepathObjmapper");

let epairs= [
  [ '1', '2', '3' ],
  [ '1', '3', '4' ],
  [ '1', '3', '5' ],
  [ '2', '3', '4' ],
  [ '2', '3', '5' ],
  [ '3', '4', '7' ],
  [ '3', '5', '6' ],
  [ '3', '5', '7' ],
  [ '5', '6', '5' ],
  [ '6', '5', '6' ],
  [ '6', '5', '7' ]
]

let allInitialPaths=[]
for(let path of epairs){
  if(path[0]===initialNode){
    allInitialPaths.push(path);
  }
}

console.log(allInitialPaths);




let finalPaths=[]
for(let ipath of allInitialPaths){

  let buildpath=[]
  let lastnode=null
  let visitedStuff=[]
  buildpath.push(ipath[0])
  buildpath.push(ipath[1])
  lastnode=ipath[2]
    for(let ip of epairs){
      // console.log(lastnode);
      // console.log(ip);
      // add already visited edge pair stuff
      if(ip[0]===lastnode){
        // console.log(ip);
        buildpath.push(ip[1])
        buildpath.push(ip[2])
        lastnode=ip[2]
      }
      
      if(lastnode===finalNode && containsArray(visitedStuff,ip)===false ){
        
        finalPaths.push(buildpath);
        console.log(buildpath," in final");
        visitedStuff.push(ip)

        buildpath=[]
        buildpath.push(ipath[0])
        buildpath.push(ipath[1])

      }
 
    }
    // console.log(buildpath,"builpath");
}

console.log(finalPaths,"finalpaths");







