
//displays all the paths from start to end
//edge pair coverage (initial to final)
export const findAllPaths = (graph, start, end) => {
    const visitedEdges = new Set();
    let edgPairCov = [];
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

//node coverage initial to final

export const nodeCoverageLogic = (graph, start, end) => {
    let allpaths = findAllPaths(graph, start, end);
    let obj={}
    let unqNodesPaths = []
    let intialNodesVisited = []
    let flag = false;
    for (let path of allpaths) {
        // console.log(path,'--');
        flag = false;
        for (let node of path) {
            if (!(node in obj)) {
                flag = true;
                console.log(path, node, "inside cond");
                obj[node] = true;
            }
        }
        console.log(intialNodesVisited);
        if (flag === true) {
            unqNodesPaths.push(path);
        }
    }

    console.log(unqNodesPaths, "node coverage unqNodepaths");
    return unqNodesPaths;
}


//edge path coverage initial to final

export const edgePathCoverageIF = (graph, start, end) => {
    let allpaths = findAllPaths(graph, start, end);
    let edgeObj = {}
    let edgeflag = false
    let edgepathCov = []
    for (let path of allpaths) {
        edgeflag = false
        for (let i = 0; i < path.length - 1; i++) {
            let edge = path[i] + '-' + path[i + 1]
            if (!(edge in edgeObj)) {
                edgeflag = true;
                edgeObj[edge] = true;
            }
        }
        if (edgeflag === true) {
            edgepathCov.push(path)
        }
    }

    console.log(edgepathCov, " tet path of edgepath");
    return edgepathCov
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
    let allEdges=[]
    for (const node in graph) {
        for (const adjacentNode of graph[node]) {
            console.log(`Edge: ${node} -> ${adjacentNode}`);
            allEdges.push([node,adjacentNode])
        }
    }
    console.log(allEdges,"all edges");
return allEdges;
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