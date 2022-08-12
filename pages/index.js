import { useEffect, useState } from "react";
import Head from "next/head";
import Box from "../components/Box";
import validate from "../public/utils/validate";
import { FaTimes } from 'react-icons/fa';
import { MdOutlineCircle } from 'react-icons/md';
import { FaBalanceScale } from 'react-icons/fa';

import styles from "../styles/Home.module.css";

export default function Home() {
  const [winner, setWinner] = useState();
  const [player, setPlayer] = useState("X");
  const [score, setScore] = useState({X : 0, O : 0, draw: 0});
  const [cells, setCells] = useState(Array(9).fill(""));
  const indexes = [0,1,2,3,4,5,6,7,8];

  const onBoxClick = (index)=> {
    let squares = [...cells];

    if(squares[index] !== "") {
      return;
    }

    if(winner) {
      return;
    }

    if(player === "X") {
      squares[index] = "X";
      setPlayer("O");
    }
    else {
      squares[index] = "O";
      setPlayer("X");
    }

    validate(squares,winner,setWinner);
    setCells(squares);
  }

  const resetGame = (e)=> {
    e.preventDefault();
    setWinner();
    setPlayer("X");
    setCells(Array(9).fill(""));
  }

  useEffect(()=> {
    if(winner === "X") {
      setScore({...score, X: score.X+1});
    }
    else if(winner === "O") {
      setScore({...score, O: score.O+1});
    }
    else if(winner === "draw") {
      setScore({...score, draw: score.draw+1});
    }
  }, [winner]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Tic-Tac-Toe</title>
        <meta name="keywords" content="next.js, next, tic-tac-toe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.head}>TIC-TAC-TOE</h1>
        {score && <div className={styles.scoreDiv}>
          <div className={`${styles.card} ${styles.card_X}`}>
            <h1><FaTimes /></h1>
            <h3>{score.X} wins</h3>
          </div>

          <div className={`${styles.card} ${styles.card_O}`}>
            <h1><MdOutlineCircle /></h1>
            <h3>{score.O} wins</h3>
          </div>

          <div className={`${styles.card} ${styles.card_draw}`}>
            <h1><FaBalanceScale /></h1>
            <h3>{score.draw} draws</h3>
          </div>
        </div>}
        <div className={styles.board}>
          {indexes && indexes.map((index)=> {
            return <Box key={index} index={index} onBoxClick={()=> onBoxClick(index)} cells={cells} />
          })}
        </div>
        {!winner && <div className={styles.turn}>
          <h1>{player}&apos;s turn</h1>
        </div>}
        {winner && (
          <div className={styles.winnerDiv}>
            {winner && winner !== "draw" && <h1 style={{color: winner === "X" ? "red" : "blue"}}>{winner} wins!</h1>}
            {winner && winner === "draw" && <h1 style={{color: "purple"}}>Draw!</h1>}
            <button onClick={resetGame}>Play Again</button>
          </div>
        )}
      </main>

      {/* <footer className={styles.footer}>
        
      </footer> */}
    </div>
  );
}
