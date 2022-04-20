import React, {useState, memo} from 'react';
import classes from "./transaction.module.css";

import Transaction from "./transaction-item";
import {Loader} from "../UI";
import {formattedTransactionInterface} from "../../types/transaction.interface";
import TransactionApiService from "../../services/api/transaction-api.service";
import useIntersecting from "../../hooks/useIntersecting";
import {AxiosError} from "axios";

const TransactionList = memo(() => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isDone, setIsDone] = useState<boolean>(false);

    const [transactions, setTransactions] = useState<formattedTransactionInterface[]>([]);

    const loadData = () => {
        setTimeout(async () => {
            try {
                setIsLoading(true)
                const {length} = transactions;
                let loadedTransactions: formattedTransactionInterface[];
                if (length) {
                    const {hash, lt} = transactions[length - 1];
                    loadedTransactions = (await TransactionApiService.getTransactions(20, lt, hash));
                } else {
                    loadedTransactions = (await TransactionApiService.getTransactions(20));
                }
                setTransactions(prevState => prevState.concat(loadedTransactions));
            } catch (e: AxiosError | unknown) {
                const {response} = e as AxiosError;
                if (response?.data.error.includes(TransactionApiService.isDoneMessage)) {
                    setIsDone(true);
                }
            } finally {
                setIsLoading(false);
            }
        }, 500)
    }

    const [lastElement] = useIntersecting(loadData);

    return (
        <div className={classes.list}>
            {transactions.map(transaction => (
                <Transaction
                    key={transaction.hash + Math.random()}
                    transaction={transaction}
                />
            ))}
            <span hidden={(isLoading || isDone)} ref={lastElement}/>
            {!isDone && <Loader hidden={!isLoading}/>}
        </div>
    );
})

export default TransactionList;
