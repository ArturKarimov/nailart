import React from 'react';
import {useHistory} from "react-router-dom";
import { Modal } from '../modal';
import img from '../../../images/nails/2.JPG';
import BigImage from "../../album/big-image/big-image";

const BigImageModal = () => {
    const history = useHistory();

    const onClose = () => {
        history.replace("/works")
    }

    return (
        <Modal width={450} height={450} onClose={onClose}>
            <BigImage src={img} />
        </Modal>
    );
};

export default BigImageModal;