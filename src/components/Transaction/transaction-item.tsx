import React, {useContext, memo} from 'react';
import classes from "./transaction.module.css";
import {TransactionContext} from "../../contexts/transaction.context";

import {formattedTransactionInterface} from "../../types/transaction.interface";

interface TransactionProps {
    transaction: formattedTransactionInterface
}

const TransactionItem = memo<TransactionProps>(({transaction}) => {
    const {handleOpenModal, getMessageFromStorage} = useContext(TransactionContext);

    const storedTransactionMessage = getMessageFromStorage(transaction.hash);

    const isReceived = !transaction.amount.isNeg();

    const address = isReceived ? transaction.from_address : transaction.to_address;

    return (
        <div className={classes.item} onClick={(e) => handleOpenModal(
            transaction.hash,
            storedTransactionMessage,
            transaction.message
        )}>
            <div className={`material-icons ${isReceived ? classes.icon : classes.iconReverse}`}>
                download_for_offline
            </div>
            <div className={classes.inner}>
                {(isReceived)
                    ? (<>
                        <div className={classes.section}>
                            <div className={classes.status}>Received</div>
                            <div className={classes.valueGreen}>+{transaction.amountFormatted} TON</div>
                        </div>
                        <div className={classes.section}>
                            <div className={classes.path}>from</div>
                            <div className={classes.path}>{address}</div>
                        </div>
                    </>)
                    : (<>
                        <div className={classes.section}>
                            <div className={classes.status}>Sent</div>
                            <div className={classes.valueWhite}>{transaction.amountFormatted} TON</div>
                        </div>
                        <div className={classes.section}>
                            <div className={classes.path}>to</div>
                            <div className={classes.path}>{address}</div>
                        </div>
                        <div className={classes.section}>
                            <div className={classes.path}>Fee</div>
                            <div className={classes.path}>{transaction.feeFormatted}</div>
                        </div>
                    </>)}
                {storedTransactionMessage
                    ? (
                        <div className={classes.message}>{storedTransactionMessage}</div>
                    )
                    : (
                        <>{transaction.message && <div className={classes.message}>{transaction.message}</div>}</>
                    )
                }
            </div>
        </div>

    )
})

export default TransactionItem;