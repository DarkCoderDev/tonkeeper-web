import React, {useCallback, useState} from 'react';
import './transaction-page.styles.css';

import Modal from "../../components/Modal/modal";
import TransactionForm from "../../components/Transaction/transaction-form";
import TransactionList from "../../components/Transaction/transaction-list";
import {TransactionContext} from "../../contexts/transaction.context";

const TransactionPage = () => {
    const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);

    const [editableTransactionId, setEditableTransactionId] = useState<string>('');

    const [message, setMessage] = useState('');

    const handleOpenModal = useCallback((transactionId: string, storageMessage: string | null, blockchainMessage: string): void => {
        setEditableTransactionId(transactionId);
        setIsVisibleModal(true);
        setMessage(storageMessage ? storageMessage : blockchainMessage);
    }, [])

    const handleCloseModal = useCallback((): void => {
        setIsVisibleModal(false);
    }, []);

    const setMessageToStorage = useCallback((): void => {
        localStorage.setItem(editableTransactionId, message);
        handleCloseModal();
    }, [editableTransactionId, message, handleCloseModal]);

    const getMessageFromStorage = useCallback((transactionId: string): string | null => localStorage.getItem(transactionId), []);

    return (
        <div className="transaction-page">
            <div className="transaction-container">
                <Modal isVisible={isVisibleModal} whenClose={handleCloseModal}>
                    <TransactionForm value={message} setMessage={setMessage} whenSubmit={setMessageToStorage}/>
                </Modal>

                <TransactionContext.Provider value={{handleOpenModal, getMessageFromStorage}}>
                    <TransactionList/>
                </TransactionContext.Provider>
            </div>
        </div>
    );
};

export default TransactionPage;