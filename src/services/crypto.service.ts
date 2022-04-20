import eth_unit from "ethjs-unit";
import BN from "bn.js";
import {InMsgInterface} from "../types/transaction.interface";
import {ICryptoService} from "../types/crypto-service.interface";

class CryptoService implements ICryptoService {

    fromNano(amount: BN): string {
        return eth_unit.fromWei(amount, 'gwei');
    }

    toNano(amount: BN): string {
        return eth_unit.toWei(amount, 'gwei');
    }

    decodeTextMessage(inMsg: InMsgInterface): string {
        if (!inMsg.msg_data || inMsg.msg_data['@type'] !== 'msg.dataText') return '';
        return new TextDecoder().decode(this.base64ToBytes(inMsg.msg_data.text));
    }

    base64ToBytes(base64: string) {
        const binaryString = atob(base64), {length} = binaryString;
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }

}

export default new CryptoService();


