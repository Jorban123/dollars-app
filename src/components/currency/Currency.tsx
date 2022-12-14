import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Table from '@mui/material/Table';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './Currency.module.css';
import axios from 'axios';
import { changeCur, selectDefaultCur } from '../../store/slices/defaultCurSlice';

const Currency = () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const dispatch = useDispatch()
    const defaultCur = useSelector(selectDefaultCur)
    const [currencies, setCurrencies] = React.useState({
      RUB: 1,
      USD: 1,
      KZT: 1,
      EUR: 1,
    })

    const handleChange = (e: SelectChangeEvent) => {
        dispatch(changeCur(e.target.value))
    }
    
    React.useEffect(() => {
        axios.get(`https://api.apilayer.com/exchangerates_data/latest?symbols=RUB,USD,KZT,EUR&base=${defaultCur}`, {
            headers: {
                apiKey
            }
        }).then(res => {
            setCurrencies(res.data.rates)
        })
    }, [defaultCur, apiKey])

  return (
    <TableContainer component={Paper} className={styles.container}>
        <div className={styles.defaultCur}>
            <InputLabel id="demo-simple-select-label">Базовая валюта</InputLabel>
            <Select
                value={defaultCur}
                onChange={handleChange}
            >
                <MenuItem value={'RUB'}>RUB</MenuItem>
                <MenuItem value={'USD'}>USD</MenuItem>
                <MenuItem value={'EUR'}>EURO</MenuItem>
            </Select>
        </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Валюта</TableCell>
            <TableCell align="right">Стоимость</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(currencies).map((key: string) => (
            <TableRow
                key={key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {key}
                </TableCell>
                <TableCell align="right">{(1 / currencies[key as keyof typeof currencies]).toFixed(3)}</TableCell>
            </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Currency;