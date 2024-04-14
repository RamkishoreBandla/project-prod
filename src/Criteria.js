import React from 'react';
import { Form } from 'react-bootstrap';

function Criteria({ selectedOption, setSelectedOption }) {

console.log(selectedOption);
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <Form>
            <Form.Check
                type="radio"
                label="Edge Pair Coverage Initial to Final"
                name="radioGroup"
                value="edgepairif"
                checked={selectedOption === 'edgepairif'}
                onChange={handleOptionChange}
            />
            <Form.Check
                type="radio"
                label="All Edge Pairs"
                name="radioGroup"
                value="allep"
                checked={selectedOption === 'allep'}
                onChange={handleOptionChange}
            />
            <Form.Check
                type="radio"
                label="Node Coverage Initial to Final"
                name="radioGroup"
                value="nc"
                checked={selectedOption === 'nc'}
                onChange={handleOptionChange}
            />
            <Form.Check
                type="radio"
                label="Edge Coverage Initial to Final"
                name="radioGroup"
                value="ec"
                checked={selectedOption === 'ec'}
                onChange={handleOptionChange}
            />
        </Form>
    );
}

export default Criteria;
