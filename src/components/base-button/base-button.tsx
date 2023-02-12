import React from 'react';
import styles from "./base-button.module.scss";

interface IBaseButton {
    name: string;
    type: "button" | "submit";
    onClick?: () => void;
}

const BaseButton: React.FC<IBaseButton> = ({name, type, onClick}) => {
    return (
        <button
            className={styles.baseButton}
            type={type}
            onClick={onClick}
        >
            {name}
        </button>
    );
};

export default BaseButton;