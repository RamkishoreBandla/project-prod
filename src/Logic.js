
//displays all the paths from start to end

import { callHealth } from "./TestLogic";

function convertToStrings(arr) {
    let result = [];
    // Iterate through the array of arrays
    for (let i = 0; i < arr.length; i++) {
        let subArray = arr[i];
        let stringSubArray = [];
        // Iterate through the sub-array
        for (let j = 0; j < subArray.length; j++) {
            // Convert each element to string and push to stringSubArray
            stringSubArray.push(String(subArray[j])); // Or use template literals `${subArray[j]}`
        }
        // Push the stringified sub-array to the result array
        result.push(stringSubArray);
    }
    return result;
}

function removeDuplicateArrays(arr) {
    // Create an empty object to store unique arrays
    let uniqueArrays = {};

    // Iterate through the array of arrays
    arr.forEach(function(subArray) {
        // Sort the elements of the sub-array
        let sortedSubArray = subArray.slice().sort();
        // Convert the sorted sub-array to a string
        let subArrayString = JSON.stringify(sortedSubArray);
        // Store the string representation of the sorted sub-array as a key in the object
        uniqueArrays[subArrayString] = sortedSubArray;
    });

    // Convert the object back to an array
    let result = Object.values(uniqueArrays);

    return result;
}

function insertMissingElements(array1, arrayB) {
    // Iterate through arrayB
    for (let i = 0; i < arrayB.length; i++) {
        let found = false;
        // Iterate through array1
        for (let j = 0; j < array1.length; j++) {
            // Check if the arrays are equal
            if (array1[j].length === arrayB[i].length && array1[j].every((value, index) => value === arrayB[i][index])) {
                found = true;
                break;
            }
        }
        // If not found, add it to array1
        if (!found) {
            array1.push(arrayB[i]);
        }
    }
    return array1;
}

//edge pair coverage (initial to final)
export const findAllPaths =async (graph, start, end) => {

    let checker= await callHealth({edges:displayAllEdges(graph),start,end})
    const visitedEdges = new Set();
    let edgPairCov = [];
    function dfs(node, path) {
        if (node === end) {
            // console.log('Path:', path.join(' -> '));
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
    
    console.log(edgPairCov,"org output");
    console.log(checker,'checker');
    if(checker.length>0){

        checker=checker.filter(e=>e.length>2)

        checker=convertToStrings(checker);
        edgPairCov = insertMissingElements(edgPairCov,checker)
        // console.log(edgPairCov.length,"before unq");
    }
    return edgPairCov;
}

//node coverage initial to final

export const nodeCoverageLogic =async (graph, start, end) => {
    let allpaths = await findAllPaths(graph, start, end);
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
                // console.log(path, node, "inside cond");
                obj[node] = true;
            }
        }
        // console.log(intialNodesVisited);
        if (flag === true) {
            unqNodesPaths.push(path);
        }
    }

    // console.log(unqNodesPaths, "node coverage unqNodepaths");
    return unqNodesPaths;
}


//edge path coverage initial to final

export const edgePathCoverageIF = async (graph, start, end) => {
    let allpaths = await findAllPaths(graph, start, end);
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
            // console.log(`Edge: ${node} -> ${adjacentNode}`);
            allEdges.push([node,adjacentNode])
        }
    }
    // console.log(allEdges,"all edges");
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