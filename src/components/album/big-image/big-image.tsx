import React from 'react';
import styles from "./big-image.module.scss";
import {useParams} from "react-router-dom";
import {manicureImages} from "../constants";

interface IBigImage {
    src: string;
}

const BigImage: React.FC<IBigImage> = ({ src}) => {
    const params = useParams<{id: string}>()

    const getImage = () => {
        return manicureImages.find(img => img.id === +params.id)?.src || ""
    }

    return (
        <img className={styles.img} src={getImage()} alt="Маникюр"/>
    );
};

export default BigImage;