import { FormLabel, Input } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import * as React from 'react';
import styles from './Converter.module.css';

const Converter = ({title}: any) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const [query, setQuery] = React.useState('');
    const [fail, setFail] = React.useState(false);
    const [output, setOutput] = React.useState({
        query: {
            from: '',
            to: '',
            amount: 0,
        },
        result: 0,
    })
    let queryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setQuery(event.target.value);
        setFail(false);
    }

    let onButtonClick = (e: any): void => {
        
        if(e.key !== 'Enter' && e.key !== undefined) return;
        if(!query) {
            setFail(true);
            return;
        }

        const amount = query.match(/\d+/);
        const queryWithoutAmount = query.match(/\D+/);

        if(!amount || !queryWithoutAmount){
            setFail(true);
            return;
        }

        const [from, to] = queryWithoutAmount[0].split(/\bin\b/i)
        
        from && to ?
        axios.get(`https://api.apilayer.com/exchangerates_data/convert?to=${to.trim()}&from=${from.trim()}&amount=${amount}`, {
            headers: {
                apiKey
            }
        }).then(res => {
            setOutput(res.data)
        }).catch(() => {
            setFail(true)
        })
        :
        setFail(true)
    }

    return (
        <div className={styles.window}  onKeyDown={onButtonClick}>
            <h1>{title}</h1>
            <FormLabel>Введите запрос: </FormLabel>
            <Input required value={query} onChange={queryChange} />
            {fail &&
            <div>
                <h3 className={styles.error}>Запрос должен быть в виде: 15 eur in rub</h3>
                <div>
                    <h3 className={styles.error}>Поддерживаемые валюты: RUB, EUR, USD, BTC, KZT.</h3>
                </div>
            </div>}
            <div className={styles.button}>
                <Button
                onClick={onButtonClick}
                variant="contained"
                >
                    Конвертировать
                </Button>
            </div>
            {output.query.from && <div><p>Amount: {output.query.amount} From: {output.query.from} To: {output.query.to} {' => '} {output?.result.toFixed(2)}</p></div>}
        </div>
    )
}

export default Converter;
