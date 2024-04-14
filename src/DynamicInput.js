import React, { useState } from 'react';
import Criteria from './Criteria';
import { Button } from 'react-bootstrap';
import Results from './Results';
import { findAllPaths, findEdgePairs, getAllNodes } from './Logic';
import TotalResults from './TotalResults';

function DynamicInputFields() {
  const [inputs, setInputs] = useState([{ id: 1, value1: '', value2: '' }]);
  const [selectedOption, setSelectedOption] = useState(null); // for criteria
  const [firstNode, setFirstNode] = useState(""); //initial
  const [lastNode, setLastNode] = useState(""); //final
  const [finalResults, setFinalResults] = useState(null); //final results
  const [totalResults, setTotalResults] = useState([]);

  //Error handler states
  const [initialError, setInitialError] = useState(false);
  const [finalError, setFinalError] = useState(false);
  const [inputErr, setInputErr] = useState(false);
  const [criteriaErr, setCriteriaErr] = useState(false);

  const handleAddInput = () => {
    const newInput = {
      id: inputs.length + 1,
      value1: '',
      value2: ''
    };
    setInputs([...inputs, newInput]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newInputs = [...inputs];
    newInputs[index][name] = value;
    setInputs(newInputs);
  };

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const graphValidator = (finalGraph) => {
    let flag = false;
    //missing nodes
    for (let [k, ] of Object.entries(finalGraph)) {
      if (k === '' || k === ' ') {
        setInputErr(true);
        flag = true;
        break;
      }
    }

    return flag === false;
  }

  const nodesValidator = (nodes, initial, final, finalGraph) => {

    let flag = false;
    // incorrect initial node
    if (!nodes.find(e => e === initial)) {
      setInitialError(true);
      flag = true;
    }
    //incorrect final node
    if (!nodes.find(e => e === final)) {
      setFinalError(true);

      flag = true;
    }

    //missing nodes
    for (let [k, ] of Object.entries(finalGraph)) {
      if (k === '' || k === ' ') {
        setInputErr(true);
        flag = true;
        break;
      }
    }

    return flag === false;

  }

  const handleSubmission = (e) => {
    //reset error values for new submission
    setInitialError(false);
    setFinalError(false);
    setInputErr(false);
    setCriteriaErr(false);
    setFinalResults(null);

    let finalGraph = constructGraph(inputs);
    console.log(finalGraph);

    if (selectedOption === 'edgepairif') {
      let criteria_method = 'Test Path for Edge Pair Coverage Initial to Final'

      let nodes = getAllNodes(finalGraph);
      //validations check
      if (nodesValidator(nodes, firstNode, lastNode, finalGraph)) {
        let allEdgePairsInitialtoFinal = findAllPaths(finalGraph, firstNode, lastNode);
        let outputObj = {
          input_graph: finalGraph,
          initial_node: firstNode,
          final_node: lastNode,
          criteria_method,
          output: allEdgePairsInitialtoFinal
        }
        console.log(outputObj);
        setFinalResults(outputObj, "test path edge pair path initial to final");
        setTotalResults([...totalResults, outputObj]);
      }
    }
    else if (selectedOption === 'allep') {
      let criteria_method = 'All Edge Pairs';
      //validations check
      if (graphValidator(finalGraph)) {
        let allEdgePairs = findEdgePairs(finalGraph);
        let outputObj = {
          input_graph: finalGraph,
          initial_node: null,
          final_node: null,
          criteria_method,
          output: allEdgePairs
        }
        console.log(outputObj, " all edge pairs");
        setFinalResults(outputObj);
        setTotalResults([...totalResults, outputObj]);
      }
    }
    else if (selectedOption === 'nc') {
      let criteria_method = 'Test Path for Node Coverage Initial to Final';
      let nodes = getAllNodes(finalGraph);
      //validations check
      if (nodesValidator(nodes, firstNode, lastNode, finalGraph)) {
        let node_coverage_result = findAllPaths(finalGraph, firstNode, lastNode);
        console.log(node_coverage_result, " node coverage from function");
        let outputObj = {
          input_graph: finalGraph,
          initial_node: firstNode,
          final_node: lastNode,
          criteria_method,
          output: node_coverage_result
        }
        console.log(outputObj);
        setFinalResults(outputObj, "Test Path for Node Coverage Initial to Final");
        setTotalResults([...totalResults, outputObj]);
      }
    }
    else if (selectedOption === 'ec') {
      let criteria_method = 'Test Path for Edge Coverage Initial to Final';
      let nodes = getAllNodes(finalGraph);
      //validations check
      if (nodesValidator(nodes, firstNode, lastNode, finalGraph)) {
        let node_coverage_result = findAllPaths(finalGraph, firstNode, lastNode);

        let outputObj = {
          input_graph: finalGraph,
          initial_node: firstNode,
          final_node: lastNode,
          criteria_method,
          output: node_coverage_result
        }
        console.log(outputObj);
        setFinalResults(outputObj, "Test Path for Edge Coverage Initial to Final");
        setTotalResults([...totalResults, outputObj]);
      }
    }
    else { //no criteria selected
      setCriteriaErr(true);
    }

  }

  const constructGraph = (inputs) => {
    let graph = {}
    for (let i of inputs) {
      graph[i['value1']] = i['value2'].split(",").map(e => e.trim());
    }
    return graph;
  }

  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col'>
            <h2>Graph Edge Pair Coverage</h2>
          </div>
        </div>
      </div>

      <div className='container mt-5'>

        {inputs.map((input, index) => (
          <div key={input.id} className='row mt-1'>
            <div className='col'>
              Enter Node: &nbsp;
              <input
                type="text"
                name="value1"
                value={input.value1}
                placeholder='eg: A'
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <div className='col'>
              Enter Neighbors: &nbsp;
              <input
                type="text"
                name="value2"
                value={input.value2}
                placeholder='eg: B,C,D'
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <div className='col-md-2'>
              <button onClick={() => handleRemoveInput(index)}>Remove</button>

            </div>
          </div>
        ))}


        <div className='row mt-2'>
          <div className='col'>
            <button onClick={handleAddInput}>Add</button>
          </div>
        </div>

        {/* criteria comp */}
        <div className='row mt-2'>
          <div className='col'>
            <Criteria selectedOption={selectedOption} setSelectedOption={(val) => { setSelectedOption(val) }} />
          </div>

        </div>


        {/* initail final node appearance logic */}
        {selectedOption && selectedOption !== 'allep' ?
          <div className='row mt-2'>
            <div className='col'>
              Enter Initial node
              <input type='text' value={firstNode} onChange={(e) => { setFirstNode(e.target.value) }}></input>
              {initialError && <div><br /><span style={{ color: 'red' }}>Initial node doesn't exist in the input graph</span></div>}
            </div>
            <div className='col'>
              Enter Final Node
              <input type='text' value={lastNode} onChange={(e) => { setLastNode(e.target.value) }}></input>
              {finalError && <div><br /><span style={{ color: 'red' }}>Final node doesn't exist in the input graph</span></div>}
            </div>
          </div>
          :
          null
        }

        <div className='row mt-2'>
          <div className='col'>
            <Button className='primary' onClick={(e) => { handleSubmission(e) }}>Submit</Button>
          </div>
        </div>
        {inputErr && <div className='row mt-2'>
          <div className='col'>
            <span style={{ color: 'red' }}>Input shouldn't contain empty node</span>
          </div>
        </div>}
        {criteriaErr && <div className='row mt-2'>
          <div className='col'>
            <span style={{ color: 'red' }}>Please choose Criteria</span>
          </div>
        </div>}
      </div >
      <div className='container mt-5'>
        <h3>Result</h3>
        <Results finalResults={finalResults} />
      </div>
      <div className='container mt-5'>
        <h3>History</h3>
        {totalResults.length > 0 ? <TotalResults totalResults={totalResults} /> : null}
      </div>

    </>
  );
}

export default DynamicInputFields;
