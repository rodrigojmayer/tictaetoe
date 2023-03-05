import React, { useEffect, useState } from 'react'
import {   Grid, makeStyles, Typography } from '@material-ui/core';
import {  Button, createTheme, ThemeProvider } from '@mui/material'
import { blue, grey, red } from '@material-ui/core/colors';


const theme = createTheme({
  palette: {
    primary: {
      main: grey[400],
    },
    secondary: {
      main: '#111336',
    },
  },
});

const useStyles = makeStyles({
  btn: {
    height: "10vw",
    minHeight: "85px",
    width: "10vw",
    minWidth: "85px !important",
    // height: "15vw",
    // heightMin: "5vw",
    // widthMin: "5vw",
    fontSize: "300% !important",
    color: "rgba(255, 255, 255, .7) !important",
  },
  grid: {
    margin: "auto" ,
    // margin: "10px" ,
    width: "33.5vw",
    minWidth: "300px",
  },
  restart:{
    margin: "30px auto !important" ,
    width: "30vw",
  }
})

export default function Game() {

  let gameOff = false;
  
  let nextTurn;
  const [ turn, setTurn ] = useState("X")
  const [ buttonsState, setButtonsState ] = useState([ "", "", "", "", "", "", "", "", ""]);

  const classes = useStyles()

  const handleButton = async (button, iButton) => {
    if(button=== ""){
      let newArr = [...buttonsState]; 
      newArr[iButton] = turn; 
      nextTurn = turn==="X"?"O":"X";
      setTurn(nextTurn)
      setButtonsState(newArr);

      await fetch(`${process.env.REACT_APP_URL_API}`, {
        method: 'PATCH',
        headers: {"Content-type": "application/json"},
        body: `{ 
                "turn": "`+ nextTurn +`",
                "buttonsState.` + iButton + `" : "` + turn + `" 
              }`
      }).then(
      )
    }
  }

  // Finish conditionals
  if((buttonsState[0]!=="" && buttonsState[0] === buttonsState[1] && buttonsState[0] === buttonsState[2]) || 
     (buttonsState[3]!=="" && buttonsState[3] === buttonsState[4] && buttonsState[3] === buttonsState[5]) ||
     (buttonsState[6]!=="" && buttonsState[6] === buttonsState[7] && buttonsState[6] === buttonsState[8]) ||
     (buttonsState[0]!=="" && buttonsState[0] === buttonsState[3] && buttonsState[0] === buttonsState[6]) ||
     (buttonsState[1]!=="" && buttonsState[1] === buttonsState[4] && buttonsState[1] === buttonsState[7]) ||
     (buttonsState[2]!=="" && buttonsState[2] === buttonsState[5] && buttonsState[2] === buttonsState[8]) ||
     (buttonsState[0]!=="" && buttonsState[0] === buttonsState[4] && buttonsState[0] === buttonsState[8]) ||
     (buttonsState[2]!=="" && buttonsState[2] === buttonsState[4] && buttonsState[2] === buttonsState[6])){
      gameOff = true;
      alert(`Winner ${turn==="X"?"O":"X"}`)
  }

  const restart = async () => {
    const restartButtons = [ "", "", "", "", "", "", "", "", ""];
    setButtonsState(restartButtons);
    await fetch(`${process.env.REACT_APP_URL_API}`, {
      method: 'PATCH',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({"buttonsState": restartButtons, "turn" : turn})
    }).then(
        gameOff = false
    )
  }

  function buttonColor(button){
    if(button === "X")
      return red[600];
    if(button === "O")
      return blue[600]
  } 

  const [number, setNumber] = useState(0)
  useEffect(() => {
    if(!gameOff){
      const interval = setInterval(async () => {
        setNumber(prev=>prev+1);
        await fetch(`${process.env.REACT_APP_URL_API}`)
        .then(res => res.json())
        .then(data => {
          setButtonsState(data.buttonsState)
          setTurn(data.turn)
        })
        .catch((err) => {
         console.log(err.message);
        });

      }, 1000);
    return () => {
      clearInterval(interval);
    }
  }
  },[gameOff]);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.div}>
        <Typography variant='h6'>
          TicTacToe
        </Typography>
        <Typography variant='h6'>
          It's turn of {turn} {number}
        </Typography>

        <Grid container  spacing={2} className={classes.grid} >
            {buttonsState.map((button, index) => (
              <Grid key={index} item xs={4} >
                <Button 
                  variant="contained" 
                  className={classes.btn} 
                  disabled={gameOff}
                  sx={{
                    backgroundColor: buttonColor(button),
                  }}
                  onClick={() => handleButton(button, index)}  
                >{button}</Button>
              </Grid>
            ))}
            <Button
              className={classes.restart} 
              variant="contained"
              color="secondary"
              onClick={() => restart()}  
              >Restart</Button>
        </Grid>
      </div>
    </ThemeProvider>
  )
}
