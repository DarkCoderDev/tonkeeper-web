import BN from "bn.js";

export interface InMsgInterface {
    "@type": string,
    "source": string,
    "destination": string,
    "value": string,
    "fwd_fee": string,
    "ihr_fee": string,
    "created_lt": string,
    "body_hash": string,
    "msg_data": {
        "@type": string,
        "body": string,
        "text": string,
        "init_state": string
    },
    "message": string
}

export interface OutMsgInterface {
    "@type": string,
    "source": string,
    "destination": string,
    "value": string,
    "fwd_fee": string,
    "ihr_fee": string,
    "created_lt": string,
    "body_hash": string,
    "msg_data": {
        "@type": string,
        "body": string,
        "init_state": string,
    },
    "message": string,
}

export interface TransactionInterface {
    "@type": string,
    "utime": number,
    "data": string,
    "transaction_id": {
        "@type": string,
        "lt": string,
        "hash": string
    },
    "fee": string,
    "storage_fee": string,
    "other_fee": string,
    "in_msg": InMsgInterface,
    "out_msgs": OutMsgInterface[]
}

export interface formattedTransactionInterface {
    lt: string;
    hash: string,
    from_address: string,
    to_address: string,
    amount: BN,
    fee: string,
    storageFee: string,
    otherFee: string,
    date: number
    message: string,
    feeFormatted: string,
    amountFormatted: string,
}