const Results = ({ finalResults  }) => {
    return (
        <>
            <div className="row">
                <div className="col">
                    {finalResults && <table data-testid='currentResultsTable' id="currentResultsTable" className="table table-hover">
                        <thead  className="" style={{backgroundColor:'#1565c0'}}>
                            <tr>
                                <th  style={{backgroundColor:'#1565c0',color:'white'}} scope="col">#</th>
                                <th  style={{backgroundColor:'#1565c0',color:'white'}} scope="col">Input Graph</th>
                                <th  style={{backgroundColor:'#1565c0',color:'white'}} scope="col">Criteria</th>
                                <th  style={{backgroundColor:'#1565c0',color:'white'}} scope="col">Initial Node</th>
                                <th  style={{backgroundColor:'#1565c0',color:'white'}} scope="col">Final Node</th>
                                <th  style={{backgroundColor:'#1565c0',color:'white'}} scope="col">Output</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>{JSON.stringify(finalResults.input_graph)}</td>
                                <td>{finalResults.criteria_method}</td>
                                <td>{finalResults?.initial_node}</td>
                                <td>{finalResults?.final_node}</td>
                                <td><ul>{finalResults.output.map((e,i)=><li key={i}>{e.join(', ')}</li>)}</ul></td>
                            </tr>
                        </tbody>
                    </table>}

                </div>

            </div>
        </>
    )
}

export default Results;