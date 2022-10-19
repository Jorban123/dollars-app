import { FormLabel, Input } from '@mui/material';
import Button from '@mui/material/Button';
import * as React from 'react';
import styles from './Window.module.css';

const Window = ({title}: any) => {

    const [query, setQuery] = React.useState('')
    const [fail, setFail] = React.useState(false)

    let queryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setQuery(event.target.value);
        setFail(false);
    }

    let onButtonClick = (): void => {
        console.log(query);
        if(!query) setFail(true);
    }

    return (
        <div className={styles.window}>
            <h1>{title}</h1>
            <FormLabel>Введите запрос: </FormLabel>
            <Input required value={query} onChange={queryChange} />
            {fail && <div><h3 className={styles.error}>Введите запрос!</h3></div>}
            <div className={styles.button}>
                <Button onClick={onButtonClick} variant="contained">Конвертировать</Button>
            </div>
        </div>
    )
}

export default Window;