import React from 'react';
import { Modal } from '../modal';
import styles from "./confirm-modal.module.scss";
import BaseButton from "../../base-button/base-button";

interface IConfirmModal {
    title: string;
    onClose: () => void;
    okCallback: () => void;
}

const ConfirmModal: React.FC<IConfirmModal> = ({title, onClose, okCallback}) => {

    return (
        <Modal
            width={450}
            height="fit-content"
            onClose={onClose}
            background="#2a2a2a"
        >
            <div className={styles.innerWrapper}>
                {title}
                <div className={styles.buttons}>
                    <BaseButton name="Да" type="button" onClick={okCallback}/>
                    <BaseButton name="Отмена" type="button" onClick={onClose} />
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;