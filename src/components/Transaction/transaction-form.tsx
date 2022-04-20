import React, {FormEvent, memo} from 'react';
import classes from "./transaction.module.css";

import {Button, Textarea} from "../UI";

interface TransactionFormProps {
    value: string;
    setMessage: (message: string) => void;
    whenSubmit: () => void;
}

const TransactionForm = memo<TransactionFormProps>(({value = "", setMessage, whenSubmit}) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        whenSubmit();
    }

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <h2>Message text <span className="material-icons">create</span> :</h2>
            <Textarea whenChange={(e) => setMessage(e.target.value)} value={value}/>
            <Button type={"submit"}>Save</Button>
        </form>
    );
})

export default TransactionForm;