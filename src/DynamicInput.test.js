import { fireEvent, render, screen } from '@testing-library/react';

import DynamicInputFields from './DynamicInput';


describe(DynamicInputFields, () => {

    it("Should contain the title Graph Edge Pair Coverage", () => {
         render(<DynamicInputFields />);

        const linkElement = screen.getByText(/Graph Edge Pair Coverage/i);
        expect(linkElement).toBeInTheDocument();

    })

    it("Test When all the inputs are missing and submit is pressed it should display criteria error message",()=>{
        render(<DynamicInputFields />);
        const errorTextele= screen.getByText('Submit');
        fireEvent.click(errorTextele);
        expect(screen.getByText(/Please choose Criteria/)).toBeInTheDocument()
        //only criteria error is diplayed first because hierarchy of validation takes criteria check first.
    })

    it("Test When criteria is selected and all other inputs are missing error should be shown",()=>{
        render(<DynamicInputFields/>);
        fireEvent.click(screen.getByLabelText('Node Coverage Initial to Final'));
        expect(screen.getByLabelText('Node Coverage Initial to Final').checked).toBe(true);
        const errorTextele= screen.getByText('Submit');
        fireEvent.click(errorTextele);
        expect(screen.getByText(/Input shouldn't contain empty node/)).toBeInTheDocument();

    })

    it("Test when input graph is given and criteria is selected as Node Coverage initial to final but initial and final are not entered",()=>{
        render(<DynamicInputFields/>);
        fireEvent.click(screen.getByLabelText('Node Coverage Initial to Final'));
        const nodeInput = screen.getByPlaceholderText('eg: A');
        const neighborInput = screen.getByPlaceholderText('eg: B,C,D');
    
        fireEvent.change(nodeInput, { target: { value: 'A' } });
        fireEvent.change(neighborInput, { target: { value: 'B,C,D' } });
        const errorTextele= screen.getByText('Submit');
        fireEvent.click(errorTextele);

        //input error no initial node
        expect(screen.getByText(/Initial node doesn't exist in the input graph/)).toBeInTheDocument();
        //input error no final node
        expect(screen.getByText(/Final node doesn't exist in the input graph/)).toBeInTheDocument();

    })

    it("Test when everything entered correctly output result to appear on screen",()=>{

        render(<DynamicInputFields/>)

        fireEvent.click(screen.getByLabelText('Node Coverage Initial to Final'));
        const nodeInput = screen.getByPlaceholderText('eg: A');
        const neighborInput = screen.getByPlaceholderText('eg: B,C,D');
    
        fireEvent.change(nodeInput, { target: { value: 'A' } });
        fireEvent.change(neighborInput, { target: { value: 'B,C,D' } });


        const initialNode = screen.getByPlaceholderText('A');
        const finalNode = screen.getByPlaceholderText('F');

        fireEvent.change(initialNode, { target: { value: 'A' } });
        fireEvent.change(finalNode, { target: { value: 'D' } });

        const errorTextele= screen.getByText('Submit');
        fireEvent.click(errorTextele);

        expect(screen.getByTestId('totalResultsTable')).toBeInTheDocument();

    })

})