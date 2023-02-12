import React from 'react';
import styles from "./image.module.scss";

interface IImage {
    src: string;
}

const Image: React.FC<IImage> = ({ src}) => {
    return (
        <div className={styles.imgContainer}>
            <img src={src} alt="Маникюр"/>
        </div>
    );
};

export default Image;