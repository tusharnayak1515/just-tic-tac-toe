const validate = (squares, winner, setWinner)=> {
    let combos = {
        across: [
            [0,1,2],
            [3,4,5],
            [6,7,8]
        ],
        down: [
            [0,3,6],
            [1,4,7],
            [2,5,8]
        ],
        diagnol: [
            [0,4,8],
            [2,4,6]
        ],
    }

    for(let combo in combos) {
        for(let i=0; i<combos[combo].length; i++) {
            if(squares[combos[combo][i][0]] === "" || squares[combos[combo][i][1]] === "" || squares[combos[combo][i][2]] === "") {
                // Nothing to do here
            }
            else if(squares[combos[combo][i][0]] === squares[combos[combo][i][1]] && squares[combos[combo][i][1]] === squares[combos[combo][i][2]]) {
                setWinner(squares[combos[combo][i][0]]);
                return;
            }
            else {
                if(squares.every((square)=> square !== "") && !winner) {
                    setWinner("draw");
                }
            }
        }
    }
}

export default validate