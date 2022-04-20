const to_hex_array: string[] = [];

const to_byte_map: any = {};

for (let ord = 0; ord <= 0xff; ord++) {
    let s = ord.toString(16);
    if (s.length < 2) {
        s = "0" + s;
    }
    to_hex_array.push(s);

    to_byte_map[s] = ord;
}

function bytesToHex(buffer: Uint8Array) {
    const hex_array = [];
    for (let i = 0; i < buffer.byteLength; i++) {
        hex_array.push(to_hex_array[buffer[i]]);
    }
    return hex_array.join("");
}


function hexToBytes(str: string) {
    str = str.toLowerCase();
    const length2 = str.length;
    if (length2 % 2 !== 0) {
        return "hex string must have length a multiple of 2";
    }
    const length = length2 / 2;
    const result = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        const i2 = i * 2;
        const b = str.substring(i2, i2 + 2);
        if (!to_byte_map.hasOwnProperty(b)) return ('invalid hex character ' + b);

        result[i] = to_byte_map[b];
    }
    return result;
}


function readNBytesUIntFromArray(n: number, ui8array: Uint8Array) {
    let res = 0;
    for (let c = 0; c < n; c++) {
        res *= 256;
        res += ui8array[c];
    }
    return res;
}

function base64toString(base64: string) {
    return atob(base64);
}

function base64ToBytes(base64: string): Uint8Array {
    const binary_string = base64toString(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}

function base64ToHex(base64: string): string {
    // base64 to bytes -> bytes to hex
    let bytes = base64ToBytes(base64),
        hex = bytesToHex(bytes);

    return hex;
}

function hashToHex(base64_or_hex_hash: string): string {
    if (base64_or_hex_hash.length === 44) {
        return base64ToHex(base64_or_hex_hash)
    }

    return base64_or_hex_hash;
}

export {
    hashToHex, base64ToHex, base64ToBytes, base64toString, readNBytesUIntFromArray, hexToBytes
}
