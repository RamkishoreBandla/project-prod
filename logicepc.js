function findSequences(inputMatrix) {
    const validSequences = [];

    function exploreSequence(currentSequence, currentIndex) {
        if (currentSequence[currentSequence.length - 1] === '7') {
            validSequences.push([...currentSequence]);
            return;
        }

        const lastNumber = currentSequence[currentSequence.length - 1];
        const nextRows = inputMatrix.filter(row => row[0] === lastNumber);

        for (const nextRow of nextRows) {
            exploreSequence([...currentSequence, ...nextRow.slice(1)], currentIndex + 1);
        }
    }

    exploreSequence(['1'], 0);

    return validSequences;
}

const inputMatrix = [
    ['1', '2', '3'],
    ['1', '3', '4'],
    ['1', '3', '5'],
    ['2', '3', '4'],
    ['2', '3', '5'],
    ['3', '4', '7'],
    ['3', '5', '6'],
    ['3', '5', '7'],
    ['5', '6', '5'],
    ['6', '5', '6'],
    ['6', '5', '7']
];

const allSequences = findSequences(inputMatrix);
for (const sequence of allSequences) {
    console.log(sequence.join(', '));
}
