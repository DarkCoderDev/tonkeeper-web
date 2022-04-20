import axios from 'axios';
import {TransactionInterface, formattedTransactionInterface} from "../../types/transaction.interface";
import BN from "bn.js";
import CryptoService from "../crypto.service";
import {ICryptoService} from "../../types/crypto-service.interface";
import {hashToHex} from "../../helpers/crypto.helpers";

class TransactionApiService {

    public readonly isDoneMessage: string = "Couldn't get next transactions chunk";

    constructor(protected baseUrl: string, protected address: string, protected cryptoService: ICryptoService) {};

    protected formattingTransactions(transactions: TransactionInterface[]): formattedTransactionInterface[] {
        const result: formattedTransactionInterface[] = [];

        for (let transaction of transactions) {
            let amount = new BN(transaction.in_msg.value);
            let from_address: string = "",
                to_address: string = "",
                message: string = "";

            for (const outMsg of transaction.out_msgs) {
                amount = amount.sub(new BN(outMsg.value));
            }

            if (transaction.in_msg.source) {
                from_address = transaction.in_msg.source;
                to_address = transaction.in_msg.destination;
                message = this.cryptoService.decodeTextMessage(transaction.in_msg);
            } else if (transaction.out_msgs.length) {
                from_address = transaction.out_msgs[0].source;
                to_address = transaction.out_msgs[0].destination;
                message = this.cryptoService.decodeTextMessage(transaction.out_msgs[0]);
            }

            if (to_address) {
                result.push({
                    amountFormatted: this.cryptoService.fromNano(amount),
                    feeFormatted: this.cryptoService.fromNano(transaction.fee),
                    lt: transaction.transaction_id.lt,
                    hash: hashToHex(transaction.transaction_id.hash),
                    amount,
                    from_address,
                    to_address,
                    fee: transaction.fee,
                    storageFee: transaction.storage_fee,
                    otherFee: transaction.other_fee,
                    message,
                    date: transaction.utime * 1000
                });
            }
        }

        return result;
    }

    async getTransactions(limit = 15, lt?: string, hash?:string, to_lt = '0'): Promise<formattedTransactionInterface[]> {
        hash = (hash) ? `&hash=${hash}` : ''; lt = (lt) ? `&lt=${lt}` : '';

        let url: string = `${this.baseUrl}getTransactions?address=${this.address}&limit=${limit}${lt}${hash}&to_lt=${to_lt}&archival=false`

        const response = (await axios.get(url));

        const {data: {result = []}} = response;

        return this.formattingTransactions(result);
    }
}

export default new TransactionApiService(
    'https://toncenter.com/api/v2/',
    'EQD2NmD_lH5f5u1Kj3KfGyTvhZSX0Eg6qp2a5IQUKXxOG21n',
    CryptoService
);

