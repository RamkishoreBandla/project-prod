const TotalResults = ({ totalResults }) => {

    return (
        <>

            <div className="row">
                <div className="col">
                    {totalResults && <table className="table table-hover">
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
                            {totalResults && totalResults.map(
                                (result, i) => <tr key={i}>
                                    <th scope="row">1</th>
                                    <td>{JSON.stringify(result.input_graph)}</td>
                                    <td>{result.criteria_method}</td>
                                    <td>{result?.initial_node}</td>
                                    <td>{result?.final_node}</td>
                                    <td><ul>{result.output.map((e, i) => <li key={i}>{e.join(', ')}</li>)}</ul></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    }
                </div>
            </div>
        </>
    )

}

export default TotalResults;