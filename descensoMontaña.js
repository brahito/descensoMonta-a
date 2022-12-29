const fs = require("fs");
const data = fs.readFileSync("./map.txt", "utf-8");
const dataByLines = data.split("\n");
const firstLine = dataByLines[0];
const dataWithoutFirstLine = dataByLines.slice(1);
const sizes = firstLine.split(" ").map(Number);
const xSize = sizes[0];
const ySize = sizes[1];
let matrix = [];

for (let i = 0; i < dataWithoutFirstLine.length; i++) {
    matrix[i] = dataWithoutFirstLine[i].split(" ").map(Number);
}

const descenso = (matrix) => {
    let results = []
    const descenso_data_treatment = (x, y) => {
        let xAxis = [1, -1, 0];
        let yAxis = [0, 0, -1];
        let steps = 0;
        let path = [];
        for (let i = 0; i < xAxis.length; i++) {
            let iteracionX = x + xAxis[i];
            let iteracionY = y + yAxis[i];
            if (iteracionX >= 0 && iteracionX < matrix[0].length && iteracionY >= 0 && iteracionY < matrix.length && matrix[iteracionX][iteracionY] < matrix[x][y]) {
                let currentPath = descenso_data_treatment(iteracionX, iteracionY);
                if (currentPath.steps > steps) {
                    steps = currentPath.steps;
                    path = currentPath.path;
                }
            }
        }
        return {
            steps: steps + 1,
            path: [matrix[x][y], ...path],
        };
    }


    for (let x = 0; x < xSize; x++) {
        for (let y = 0; y < ySize; y++) {
            results.push(descenso_data_treatment(x, y));
        }
    }
    results.sort((a, b) => {
        return a.steps - b.steps;
    });
    return results;
}

answers = descenso(matrix);

let respuestaFinal = []
let finalSteps = 0;
let longDrop = 0;
for (let i = 0; i < answers.length; i++) {
    let lastMinusFirst = answers[i].path[0] - answers[i].path[answers[i].path.length - 1];
    if (answers[i].steps >= answers[answers.length - 1].steps && lastMinusFirst > longDrop) {
        longDrop = lastMinusFirst;
        respuestaFinal = answers[i].path;
        finalSteps = answers[i].steps;
    }
}

console.log(`La mayor caida es de ${longDrop}. que tiene una cantidad de pasos igual a: ${finalSteps} y su camino corresponde a la siguiente ruta: ${respuestaFinal}`);
