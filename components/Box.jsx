import React from 'react';

import styles from "../styles/box.module.css";

const Box = ({index, cells, onBoxClick}) => {
  const textstyle = cells[index] === "X" ? `${styles.X}` : `${styles.O}`
  return (
    <div className={styles.box} onClick={onBoxClick}>
      <h1 className={textstyle}>{cells[index]}</h1>
    </div>
  )
}

export default Box;