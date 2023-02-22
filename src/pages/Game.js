import React, { useEffect, useState } from 'react'
import {   Grid, makeStyles, Typography } from '@material-ui/core';
import {  Button, createTheme, ThemeProvider } from '@mui/material'
import { blue, grey, red } from '@material-ui/core/colors';

const URL_API = "https://my-json-server.typicode.com/rodrigojmayer/tictaetoeAPI/db";


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
    width: "10vw",
    fontSize: "300% !important",
    color: "rgba(255, 255, 255, .7) !important",
  },
  grid: {
    margin: "auto" ,
    width: "33.5vw",
  },
})

export default function Game() {
  let gameOff = false;
  let nextTurn;
  const [ turn, setTurn ] = useState("X")
  const [ buttonsState, setButtonsState ] = useState([ 
    {id: 0, free: 1, mark: ""},
    {id: 1, free: 1, mark: ""},
    {id: 2, free: 1, mark: ""},
    {id: 3, free: 1, mark: ""},
    {id: 4, free: 1, mark: ""},
    {id: 5, free: 1, mark: ""},
    {id: 6, free: 1, mark: ""},
    {id: 7, free: 1, mark: ""},
    {id: 8, free: 1, mark: ""},
  ]);

  const classes = useStyles()

  const handleButton =  (button) => {
    //  console.log(button);

     const updateButtons = buttonsState.map(buttonsState => {
      // console.log(buttonsState);
      // buttonsState.id === button.id ? ,
      let val = buttonsState.free;
      let selected = buttonsState.mark;
      if(button.id === buttonsState.id && buttonsState.free){
        val = 0;
        selected = turn;
        nextTurn = turn==="X"?"O":"X";
        setTurn(nextTurn)
      
      
      }
      return {id: buttonsState.id, free: val, mark: selected}

      })

      setButtonsState(updateButtons);
      // console.log("its entering here??=?")
      // console.log(updateButtons)
      // update0(0);   
      
      // fetch('http://localhost:8000/turns/1', {
      fetch(`${URL_API}/1`, {
        method: 'PATCH',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({"buttonsStates": updateButtons, "turn": nextTurn})
      })
      
  }
  // console.log(buttonsState[0].mark)
  // Finish conditionals
  if((buttonsState[0].mark!=="" && buttonsState[0].mark === buttonsState[1].mark && buttonsState[0].mark === buttonsState[2].mark) || 
    (buttonsState[3].mark!=="" && buttonsState[3].mark === buttonsState[4].mark && buttonsState[3].mark === buttonsState[5].mark) ||
    (buttonsState[6].mark!=="" && buttonsState[6].mark === buttonsState[7].mark && buttonsState[6].mark === buttonsState[8].mark) ||
    (buttonsState[0].mark!=="" && buttonsState[0].mark === buttonsState[3].mark && buttonsState[0].mark === buttonsState[6].mark) ||
    (buttonsState[1].mark!=="" && buttonsState[1].mark === buttonsState[4].mark && buttonsState[1].mark === buttonsState[7].mark) ||
    (buttonsState[2].mark!=="" && buttonsState[2].mark === buttonsState[5].mark && buttonsState[2].mark === buttonsState[8].mark) ||
    (buttonsState[0].mark!=="" && buttonsState[0].mark === buttonsState[4].mark && buttonsState[0].mark === buttonsState[8].mark) ||
    (buttonsState[2].mark!=="" && buttonsState[2].mark === buttonsState[4].mark && buttonsState[2].mark === buttonsState[6].mark)){
      gameOff = true;
      alert(`Winner ${turn==="X"?"O":"X"}`)
      
      // classes.grid
  }
  const restart = () => {
    const restartButtons = [ 
      {id: 0, free: 1, mark: ""},
      {id: 1, free: 1, mark: ""},
      {id: 2, free: 1, mark: ""},
      {id: 3, free: 1, mark: ""},
      {id: 4, free: 1, mark: ""},
      {id: 5, free: 1, mark: ""},
      {id: 6, free: 1, mark: ""},
      {id: 7, free: 1, mark: ""},
      {id: 8, free: 1, mark: ""},
    ]
    setButtonsState(restartButtons);
    
    
    // fetch('http://localhost:8000/turns/1', {
    fetch(`${URL_API}/1`, {
      method: 'PATCH',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({"buttonsStates": restartButtons, "turn": turn})
    })

  }

  function buttonColor(button){
    if(button.mark === "X")
      return red[600];
    if(button.mark === "O")
      return blue[600]
  } 



  const [number, setNumber] = useState(0)
  useEffect(() => {
    if(!gameOff){
      const interval = setInterval(() => {
        setNumber(prev=>prev+1);
        // console.log("UseEffect running");
        // fetch('http://localhost:8000/turns/')
        fetch(`${URL_API}/`)
        .then(res => res.json())
        .then(data => {
          console.log(data[0].buttonsStates)
          console.log(gameOff)
          setButtonsState(data[0].buttonsStates)
          setTurn(data[0].turn)
          // setButtonsState(data)
        })

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
            {buttonsState.map(button => (
              <Grid key={button.id} item xs={4} >
                <Button 
                  variant="contained" 
                  className={classes.btn} 
                  disabled={gameOff}
                  sx={{
                    backgroundColor: buttonColor(button),
                  }}
                  onClick={() => handleButton(button)}  
                >{button.mark}</Button>
              </Grid>
            ))}
            <Button
              className={classes.grid} 
              variant="contained"
              color="secondary"
              onClick={() => restart()}  
              >Restart</Button>
        </Grid>
      </div>
    </ThemeProvider>
  )
}
