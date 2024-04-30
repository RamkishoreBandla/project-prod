

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import graphImg from './graph.png';
import instructionImg from './Instructions.png';
import { Link } from 'react-router-dom';
export default function Home() {
    return (
        <div className='container mt-5 mb-5'>
            <Accordion defaultExpanded elevation={5}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                   
                        <b> <h2 style={{ color: 'blue' }}>  What is Graph coverage edge-pair? </h2></b>
                </AccordionSummary>
                <AccordionDetails>
                    
                        <h3> Graph coverage edge-pair (node coverage, edge coverage, and edge-pair coverage)</h3>
                        <p>
                            In software testing, graphs are often used to represent potential executions of programs. Individual methods or functions
                            can be represented with control-flow graphs, we can represent dependencies among methods in a class as graphs, and
                            designs can represent method calls and other execution flows with graphs. When designing tests, a graph is simply a graph
                            and we do not care what the graph represents.
                        </p>
                        <p>
                            A graph is a list of nodes and edges. It is convenient for humans to draw graphs with circles for nodes and arrows for edges,
                            and equally convenient for software to represent graphs as strings for nodes and pairs of strings for edges. For example, N
                            = (node1, node2, node3),  E =  (node1:node2, node1:node3, node2:node3) represents a graph with 3 nodes and 3 edges.
                            If you draw that graph, it looks a little like an if-then-else structure in a program.
                        </p>
                        <p>
                            <img src={graphImg} alt='graph'></img>
                        </p>
                        <p>
                            A very common goal of testing is to “cover a graph.” In your project, you will represent tests that cover the graph as “test
                            paths,” where a test path is a sequence of edges from the first node to one of the last nodes. Two test paths in the example
                            from the previous graph are: [node1, node3] and [node1, node2, node3]
                        </p>
                        <p>
                            Node coverage means we design test paths that reach every node at least once, and edge coverage means we design test
                            paths that reach every edge at least once. Edge-pair coverage means we design test paths to cover every sequential pair
                            of edges in the graph.
                        </p>

                    
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded elevation={5}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                   

                        <b> <h2 style={{ color: 'blue' }}>  How to use the tool? </h2></b>
                   
                </AccordionSummary>
                <AccordionDetails>
                    
                     
                        <p>
                            <img src={instructionImg} alt='instructions'></img>
                        </p>
                        
                            <ul>
                            
                                <li>Consider the above simple graph as input graph. To enter the graph </li>
                                <li>First enter the node, In the above case it's 1</li>
                                <li>Then enter the neighbors of 1, In the above case it's 2,3</li>
                                <li><b>Note each neighbor should be seperated by comma otherwise they will be treated as single node</b></li>
                                <li>Navigate to <Link to="/tool">tool</Link> page and experiment with different graphs</li>
                            </ul>
                        
                    
                </AccordionDetails>
            </Accordion>
        </div>
    );
}



