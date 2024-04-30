import {render,screen} from '@testing-library/react';
import {displayAllEdges,edgePathCoverageIF,findAllPaths,findEdgePairs,getAllNodes,nodeCoverageLogic} from './Logic';

describe('Graph Logic functions',()=>{
    it('Test for returning all nodes in the input graph',()=>{
        let sampleGraph={
            'A':['B','C'],
            'C':['D']
        }
        expect(getAllNodes(sampleGraph)).toEqual(['A','B','C','D']);
    });

    it('Test for returning all edge pairs from the input graph',()=>{
        let sampleGraph={
            'A':['B','C'],
            'C':['D']
        }
        expect(findEdgePairs(sampleGraph)).toEqual([['A','C','D']]);
    });

    it('Test for returning node coverage test path from initial to final',async()=>{
        let sampleGraph={
            'A':['B','C'],
            'C':['D']
        }
        let initial='A'
        let final='D'
        expect(await nodeCoverageLogic(sampleGraph,initial,final)).toEqual([['A','C','D']])
    });

    it('Test for returning edge overage test path from initial to final',async()=>{
        let sampleGraph={
            'A':['B','C'],
            'C':['D']
        }
        let initial='A'
        let final='D'
        expect(await edgePathCoverageIF(sampleGraph,initial,final)).toEqual([['A','C','D']])
    })

    it('Test for returning edge pair coverage test path from initial to final',async()=>{
        let sampleGraph={
            'A':['B','C'],
            'B':['C','D'],
            'D':['E']
        }
        let initial='A'
        let final='E'
        expect(await findAllPaths(sampleGraph,initial,final)).toEqual([['A','B','D','E']])
    });

    it('Test for returning all edges in a input graph',()=>{
        let sampleGraph={
            'A':['B','C'],
            'B':['C','D'],
            'D':['E']
        }
        expect(displayAllEdges(sampleGraph)).toEqual([['A','B'],['A','C'],['B','C'],['B','D'],['D','E']]);

    });


    it("Test for input graph to be object type",()=>{

        let sampleGraph={
            'A':['B','C']
        }

        expect(typeof(sampleGraph)).toEqual('object')

    });

    it("Test for data inside graph to be string key and array value type",()=>{
        let sampleGraph={
            'A':['B','C']
        }
        
        for(let [k,v] of Object.entries(sampleGraph)){
            console.log(typeof(v),v);
            expect(typeof(k)).toEqual("string");
            expect(typeof(v)).toEqual("object");
        }
    });


    it('Test for returning empty [] when no nodes in the input graph',()=>{
        let sampleGraph={
            
        }
        expect(getAllNodes(sampleGraph)).toEqual([]);
    });

    it('Test for returning empty [] when no connection in the input graph',()=>{
        let sampleGraph={
            'A':[],
            'C':[]
        }
        expect(findEdgePairs(sampleGraph)).toEqual([]);
    });

    it('Test for returning node coverage test path empty [] when start and end not in graph from initial to final',async()=>{
        let sampleGraph={
            'A':['B'],
            'C':['D']
        }
        let initial='Z'
        let final='X'
        expect(await nodeCoverageLogic(sampleGraph,initial,final)).toEqual([])
    });

    it('Test for returning edge coverage test path to return [] from initial to final when no edges are connected and initial and final not in graph',async()=>{
        let sampleGraph={
            'A':['B'],
            'C':['D']
        }
        let initial='Z'
        let final='X'
        expect(await edgePathCoverageIF(sampleGraph,initial,final)).toEqual([])
    })

    it('Test for returning edge pair coverage test path from initial to final to be empty [] when there are no edge pairs and initial and final not in input graph',async()=>{
        let sampleGraph={
            'A':['B',],
            'B':[],
            'D':['E']
        }
        let initial='A'
        let final='E'
        expect(await findAllPaths(sampleGraph,initial,final)).toEqual([])
    });

    it('Test for returning all edges in a input graph to be empty [] when input is incomplete',()=>{
        let sampleGraph={
            'A':[],
            'B':[],
            'D':[]
        }
        expect(displayAllEdges(sampleGraph)).toEqual([]);

    });



})

//todo
//testcases for when input returns empty [] -- done
//testcases for error messages display
