const queensPossibleMatrix = (numbers) => {
    const result = [];

    const findMatrix = (queens, xyDif, xySum) => {
        const queensLength = queens.length;

        if (queensLength == numbers) {
            // Generate result matrix with queens
            const queensSetup = [];
            queens.map(queenIndex => {
                queensSetup.push([].concat(
                    [...new Array(queenIndex)].fill(0),
                    [1],
                    [...new Array(numbers - queenIndex - 1)].fill(0)
                ));
            });
            // Add matrix to result list
            result.push(queensSetup);
        } else {
            [...new Array(numbers)].map((val, index) => {
                if (
                    !queens.includes(index) 
                    && !xyDif.includes(queensLength - index)
                    && !xySum.includes(queensLength + index)
                ) {
                    findMatrix(queens.concat(index), xyDif.concat(queensLength - index), xySum.concat(queensLength + index))
                }
            });
        }
    }

    // Start recursive function to find all possible matrixes
    findMatrix([], [], []);

    return result;
};

console.log(queensPossibleMatrix(8));