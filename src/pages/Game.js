import React, { useState } from 'react'
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
        setTurn(turn==="X"?"O":"X")
      
      
      }
      return {id: buttonsState.id, free: val, mark: selected}

      })

      setButtonsState(updateButtons);
      
  }
  console.log(buttonsState[0].mark)
  if((buttonsState[0].mark!=="" && buttonsState[0].mark === buttonsState[1].mark && buttonsState[0].mark === buttonsState[2].mark) || 
    (buttonsState[3].mark!=="" && buttonsState[3].mark === buttonsState[4].mark && buttonsState[3].mark === buttonsState[5].mark) ||
    (buttonsState[6].mark!=="" && buttonsState[6].mark === buttonsState[7].mark && buttonsState[6].mark === buttonsState[8].mark) ||
    (buttonsState[0].mark!=="" && buttonsState[0].mark === buttonsState[3].mark && buttonsState[0].mark === buttonsState[6].mark) ||
    (buttonsState[1].mark!=="" && buttonsState[1].mark === buttonsState[4].mark && buttonsState[1].mark === buttonsState[7].mark) ||
    (buttonsState[2].mark!=="" && buttonsState[2].mark === buttonsState[5].mark && buttonsState[2].mark === buttonsState[8].mark) ||
    (buttonsState[0].mark!=="" && buttonsState[0].mark === buttonsState[4].mark && buttonsState[0].mark === buttonsState[8].mark) ||
    (buttonsState[2].mark!=="" && buttonsState[2].mark === buttonsState[4].mark && buttonsState[2].mark === buttonsState[6].mark)){
      alert(`Winner ${turn==="X"?"O":"X"}`)
      gameOff = true;
      
      // classes.grid
  }
  const restart = () => {
    setButtonsState([ 
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

  }

  function buttonColor(button){
    if(button.mark === "X")
      return red[600];
    if(button.mark === "O")
      return blue[600]
  } 

  return (

    <ThemeProvider theme={theme}>
      <div className={classes.div}>
        <Typography variant='h6'>
          TicTacToe
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
