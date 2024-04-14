const Results = ({ finalResults  }) => {
    return (
        <>
            <div className="row">
                <div className="col">
                    {finalResults && <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Input Graph</th>
                                <th scope="col">Criteria</th>
                                <th scope="col">Initial Node</th>
                                <th scope="col">Final Node</th>
                                <th scope="col">Output</th>
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