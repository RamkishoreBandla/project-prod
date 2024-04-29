import React, { useState } from 'react';
import Criteria from './Criteria';

import Results from './Results';
import { edgePathCoverageIF, findAllPaths, findEdgePairs, getAllNodes, nodeCoverageLogic } from './Logic';
import { Alert, Box, Card, Fab, TextField, ThemeProvider, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import CustomPaginationActionsTable from './PaginationTable';
import AddIcon from '@mui/icons-material/Add';
import AlertDialogSlide from './Dialog';

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

  //dialog box
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    for (let [k,] of Object.entries(finalGraph)) {
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
    for (let [k,] of Object.entries(finalGraph)) {
      if (k === '' || k === ' ') {
        setInputErr(true);
        flag = true;
        break;
      }
    }

    return flag === false;

  }

  const handleSubmission = async(e) => {
    //reset error values for new submission
    setInitialError(false);
    setFinalError(false);
    setInputErr(false);
    setCriteriaErr(false);
    setFinalResults(null);

    let finalGraph = constructGraph(inputs);
    console.log(finalGraph,"finalgraph");

    if (selectedOption === 'edgepairif') {
      let criteria_method = 'Test Path for Edge Pair Coverage Initial to Final'

      let nodes = getAllNodes(finalGraph);
      //validations check
      if (nodesValidator(nodes, firstNode, lastNode, finalGraph)) {
        let allEdgePairsInitialtoFinal = await findAllPaths(finalGraph, firstNode, lastNode);
        let outputObj = {
          input_graph: finalGraph,
          initial_node: firstNode,
          final_node: lastNode,
          criteria_method,
          output: allEdgePairsInitialtoFinal
        }
        console.log(outputObj);
        setFinalResults(outputObj, "test path edge pair path initial to final");

        setTotalResults([outputObj,...totalResults]);
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
        let node_coverage_result = await nodeCoverageLogic(finalGraph, firstNode, lastNode);
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
        let node_coverage_result =await edgePathCoverageIF(finalGraph, firstNode, lastNode);

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
      if((i['value1']==='' || i['value1']===' ') && (i['value2']==='' || i['value2']==='')){

      }
      else{
      graph[i['value1']] = i['value2'].split(",").map(e => e.trim()).filter(e=>e!=='');
      }
    }

    // console.log(Object.keys(graph),"keys");
    // single empty entry
  if(Object.keys(graph).length===1 && 
      (Object.keys(graph)[0]==='' || Object.keys(graph)[0]===' ') ){
        return {}
    }

    return graph;
  }

  return (
    <>
    <div className='outerContainer'>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col text-center'>
            <h2>Graph Edge Pair Coverage</h2>
          </div>
        </div>
      </div>


      <div className='container mt-5'>

        <Card sx={{ padding: 5 }} elevation={'5'}>
          {inputs.map((input, index) => (
            <div key={index} className='row mt-1'>
              <div className='col'>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

                  <TextField name="value1" fullWidth
                    value={input.value1}
                    placeholder='eg: A'
                    onChange={(e) => handleInputChange(index, e)} id="input-with-sx" label="Enter Node" variant="standard" />
                  <LiveHelpOutlinedIcon onClick={handleClickOpen} sx={{ color: 'action.active', mr: 1, my: 0.5, cursor: 'pointer' }} />
                </Box>

              </div>
              <div className='col'>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

                  <TextField name="value2" fullWidth
                    value={input.value2}
                    placeholder='eg: B,C,D'
                    onChange={(e) => handleInputChange(index, e)} id="input-with-sx" label="Enter Neighbors" variant="standard" />
                  <LiveHelpOutlinedIcon onClick={handleClickOpen} sx={{ color: 'primary', mr: 1, my: 0.5, cursor: 'pointer' }} />
                </Box>

              </div>
              <div className='col-md-2'>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
                  <Tooltip title="Delete node" placement='right'>
                    <DeleteOutlinedIcon sx={{ width: '2em', height: '2.10em', color: 'red', cursor: 'pointer' }}
                      onClick={() => handleRemoveInput(index)} />
                  </Tooltip>
                </Box>


              </div>
            </div>
          ))}

{/* Add new button */}
          <div className='row mt-2'>
            <div className='col'>

              <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Tooltip title='Add new node' placement='right'>
                  <Fab color="primary" aria-label="add" onClick={handleAddInput}>
                    <AddIcon />
                  </Fab>
                </Tooltip>
              </Box>
            </div>
          </div>

          {/* criteria comp */}
          <div className='row mt-3'>
            <div className='col'>
              <h4>Select Criteria </h4>
              <Criteria selectedOption={selectedOption} setSelectedOption={(val) => { setSelectedOption(val) }} />
            </div>

          </div>


          {/* initail final node appearance logic */}
          {selectedOption && selectedOption !== 'allep' ?
            <div className='row mt-2'>
              <div className='col'>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

                  <TextField name="value3" fullWidth
                    placeholder='A' value={firstNode} onChange={(e) => { setFirstNode(e.target.value) }} id="input-with-sx" label="Enter Initial node" variant="standard" />
                  <LiveHelpOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5, cursor: 'pointer' }} />
                </Box>

                {initialError && <div><br /><span id='initialNodeError' data-testid='initialNodeError' style={{ color: 'red' }}>
                  <Alert variant="filled" severity="error">Initial node doesn't exist in the input graph</Alert></span></div>}
              </div>
              <div className='col'>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

                  <TextField name="value3" fullWidth
                    placeholder='F' value={lastNode} onChange={(e) => { setLastNode(e.target.value) }} id="input-with-sx" label="Enter Final Node" variant="standard" />
                  <LiveHelpOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5, cursor: 'pointer' }} />
                </Box>

                {finalError && <div><br /><span id='finalNodeError' data-testid='finalNodeError' style={{ color: 'red' }}>
                  <Alert variant="filled" severity="error">Final node doesn't exist in the input graph</Alert>
                </span></div>}
              </div>
            </div>
            :
            null
          }

          <div className='row mt-2'>
            <div className='col'>
              <Button variant="contained" size="medium" onClick={(e) => { handleSubmission(e) }}>
                Submit
              </Button>

            </div>
          </div>
          {inputErr && <div className='row mt-2'>
            <div className='col-lg-6'>
              <span id='inputNodeError' data-testid='inputNodeError' style={{ color: 'red' }}>
                <Alert variant="filled" severity="error">
                  Input shouldn't contain empty node
                </Alert>

              </span>
            </div>
          </div>}
          {criteriaErr && <div className='row mt-2'>
            <div className='col-lg-6'>
              <span id='criteriaError' data-testid='criteriaError' style={{ color: 'red' }}>
                <Alert variant="filled" severity="error">
                  Please choose Criteria
                </Alert></span>
            </div>
          </div>}
        </Card>
      </div >

      <div className='container mt-5'>
        <Card sx={{ padding: 3 }} elevation={'5'}>
          <h3>Result</h3>
          <Results finalResults={finalResults} />
        </Card>
      </div>
      <div className='container mt-5 mb-5'>
        <Card sx={{ padding: 3 }} elevation={'5'}>
          <h3 variant='primary'>History</h3>
          {totalResults.length > 0 ? <CustomPaginationActionsTable totalResults={totalResults} /> : null}
        </Card>
      </div>
      </div>
      <AlertDialogSlide open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} />
    </>
  );
}

export default DynamicInputFields;
