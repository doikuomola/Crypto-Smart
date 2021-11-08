import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { AppBar, Container, Toolbar, Typography, makeStyles, createTheme, ThemeProvider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title: {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
}));


const darkTheme = createTheme({
  palette: {
    main: '#fff',
  },
  type: 'dark',

});

const Header = () => {
  const history = useHistory();

  const { currency, setCurrency } = CryptoState()

  console.log(currency)
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>

      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography className={classes.title} variant="h4" onClick={() => history.push('/')}>Crypto Smart</Typography>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">Currency</InputLabel>
              <Select
                variant="outlined"
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{
                  color: "white"
                }}
              >
                <MenuItem value={'USD'}>USD</MenuItem>
                <MenuItem value={'NGN'}>NGN</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>

  )
}

export default Header
