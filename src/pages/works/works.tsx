import React from 'react';
import styles from './works.module.scss';
import Album from "../../components/album/album/album";
import {manicureImages} from "../../components/album/constants";

enum WorkType {
    manicure = "manicure",
    coating = "coating",
    extension = "extension"
}

interface IActiveWorkType {
    manicure?: boolean;
    coating?: boolean;
    extension?: boolean;
}

const Works = () => {
    const [workType, setWorkType] = React.useState<WorkType>(WorkType.manicure)

    const selectWorkType = (type: WorkType) => setWorkType(type)

    const getALbum = (type: WorkType) => {
        switch (type) {
            case WorkType.manicure:
                return <Album images={manicureImages} />
            case WorkType.coating:
                return <Album images={manicureImages} />
            case WorkType.extension:
                return <Album images={manicureImages} />
        }
    }

    return (
        <section>
            <blockquote className={styles.citate}>
                <p>Вы будете удивлены, что люди говорят за маникюрным столом</p>
                <cite>Лиза Клейпас</cite>
            </blockquote>
            <div className={styles.buttons}>
                <p onClick={() => selectWorkType(WorkType.manicure)}
                   className={workType === WorkType.manicure ? styles.activeButton : ""}>Маникюр</p>
                <p onClick={() => selectWorkType(WorkType.coating)}
                   className={workType === WorkType.coating ? styles.activeButton : ""}>Покрытие</p>
                <p onClick={() => selectWorkType(WorkType.extension)}
                   className={workType === WorkType.extension ? styles.activeButton : ""}>Наращивание</p>
            </div>

            {getALbum(workType)}
        </section>
    );
};

export default Works;