import {createContext} from 'react'

interface ITransactionContext {
    handleOpenModal: (transactionId: string, storageMessage: string | null, blockchainMessage: string) => void;
    getMessageFromStorage: (transactionId: string) => string | null;
}

export const TransactionContext = createContext<ITransactionContext>({} as ITransactionContext);