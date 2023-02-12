import React from "react";
import ReactDOM from "react-dom";
import modal from "./modal.module.scss";
import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";
import {inspect} from "util";

const modalRoot = document.getElementById("modals") as Element;

interface IModal {
    title?: string;
    width?: number;
    height?: number | string;
    background?: string;
    onClose: () => void;
    children?: React.ReactNode;
}

export const Modal: React.FC<IModal> = (
    {
        title = "",
        children,
        width,
        height,
        background = "#1C1C21",
        onClose
    }
) => {

    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        setActive(true)
    }, [])

    React.useEffect(() => {
        const escHandler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (active) {
            document.addEventListener("keydown", escHandler);
        }
        return () => {
            document.removeEventListener("keydown", escHandler);
        };
    }, [active]);

    return ReactDOM.createPortal(
        <ModalOverlay active={active} onClose={onClose}>
            {active &&
                <div className={modal.modalContent} style={{width, height, background}} onClick={e => e.stopPropagation()} data-testid="modal-content">
                    {title && <div className={modal.header}>
                        <div className={modal.title}>{title}</div>
                        <div className={`${modal.closeModal} ${modal.withTitle}`} onClick={onClose}/>
                    </div>}
                    {!title && <div className={modal.closeModal} onClick={onClose}/>}
                    {children}
                </div>
            }
        </ModalOverlay>,
        modalRoot
    );
}