import BN from "bn.js";
import {InMsgInterface, OutMsgInterface} from "./transaction.interface";

export interface ICryptoService {
    fromNano(amount: BN | string | number): string;

    toNano(amount: BN | string | number): string;

    decodeTextMessage(msg: InMsgInterface | OutMsgInterface): string;
}