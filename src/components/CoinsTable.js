import { createTheme, ThemeProvider, Container, Typography, TextField, TableContainer, LinearProgress, Table, TableHead, TableCell, TableRow, makeStyles, TableBody } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './Banner/Carousel';


const darkTheme = createTheme({
  palette: {
    main: '#fff',
  },
  type: 'dark',

});

const useStyles = makeStyles({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
})

const CoinsTable = () => {
  const classes = useStyles();
  const history = useHistory();
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const { currency, symbol } = CryptoState();
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)


  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true)
      const { data } = await axios.get(CoinList(currency))
      setCoins(data)
      setLoading(false)
    }
    fetchCoins();
  }, [currency])
  console.log(coins)

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };


  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{
        textAlign: 'center'
      }}>
        <Typography variant="h4" style={{ margin: 18, fontFamily: 'Montserrat' }}>Cryptocurrency Prices by Market Cap</Typography>

        <TextField
          label="Search For a Crypto Currency..."
          variant="outlined"
          style={{
            marginBottom: 20, width: '100%'
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: 'gold' }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: '#eebc1d' }}>
                <TableRow>
                  {['Coin', 'Price', '24hr Change', 'Market Cap'].map((head) => (
                    <TableCell
                      style={{
                        color: 'black',
                        fontWeight: '700',
                        fontFamily: 'Montserrat'
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>

              </TableHead>
              <TableBody>
                {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => history.push(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        styles={{
                          display: 'flex',
                          gap: 15
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: "10" }} />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 22
                            }}
                          >{row.symbol}</span>
                          <span
                            style={{
                              color: "darkGrey"
                            }}
                          >{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{ color: 'white' }}
                      >
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                        {profit && "+"}

                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}

                      </TableCell>
                      <TableCell
                        align="right"
                        style={{ color: 'white' }}
                      >
                        {symbol}{" "}
                        {numberWithCommas(row.market_cap.toString().slice(0, -6))} {" "}
                        M
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: 'flex',
            justifyContent: 'center',
          }}
          classes={{ ul: classes.pagination }}
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450)
          }}
        />
      </Container>
    </ThemeProvider >
  )
}

export default CoinsTable
