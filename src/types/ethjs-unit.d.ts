declare module "ethjs-unit" {
    import BN from "bn.js";

    export function fromWei(amount: BN, units: string): string;

    export function toWei(amount: BN, units: string): string;
}