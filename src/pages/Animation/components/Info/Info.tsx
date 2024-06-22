import styles from './Info.module.scss';

interface Prop {
    data: Animation;
}
function Info({ data }: Prop) {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.thumbnail__container}>
                    <img className={styles.thumbnail} src={data.thumbnailUrl} alt={data.name + '_썸네일'} />
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>{data.name}</div>
                    <div className={styles.info__detail}>
                        <div className={styles.info__detail__item}>
                            <span>상태: </span>
                            <span>{data.condition}</span>
                        </div>
                        <div className={styles.info__detail__item}>
                            <span>에피소드: </span>
                            <span>{data.episode}</span>
                        </div>
                        <div className={styles.info__detail__item}>
                            <span>제작사: </span>
                            <span>{data.productCompany}</span>
                        </div>
                        <div className={styles.info__detail__item}>
                            <span>감독: </span>
                            <span>{data.producer}</span>
                        </div>
                        <div className={styles.info__detail__item}>
                            <span>시즌: </span>
                            <span>{data.season}</span>
                        </div>
                        <div className={styles.info__detail__item}>
                            <span>방영일: </span>
                            <span>{data.onDate}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.plot}>
                <div className={styles.title}>줄거리</div>
                <div className={styles.content}>{data.plot}</div>
            </div>
        </div>
    );
}

export default Info;
