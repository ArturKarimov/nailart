import React from "react";
import modal from "./modal-header.module.scss";

interface IModalHeader {
    title: string;
    onClose: () => void;
}

const ModalHeader: React.FC<IModalHeader> = ({onClose, title}) => {

    return (
        <span className={modal.header}>
            <p className="text text_type_main-large">{title}</p>
            <p onClick={onClose}>X</p>
        </span>
    );
};

export default ModalHeader;