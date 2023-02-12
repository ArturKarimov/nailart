import React from 'react';
import styles from "./album.module.scss";
import Image from "../image/image";
import {Link, useLocation} from 'react-router-dom';

interface IAlbum {
    images: {src: string; id: string | number}[]
}

const Album: React.FC<IAlbum> = ({ images }) => {
    const location = useLocation();

    return (
        <div className={styles.album}>
            {images.map(img => <Link
                to={{
                    pathname: `/works/${img.id}`,
                    state: { background: location }
                }}
                key={img.id}
            >
                <Image src={img.src} />
                </Link>)}
        </div>
    );
};

export default Album;