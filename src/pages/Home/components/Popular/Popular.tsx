import { url } from 'inspector';
import styles from './Popular.module.scss';
import image from '@assets/images/sample.webp';
function Popular() {
    return (
        <div className={styles.container}>
            <div className={styles.one}>
                <img src={image} alt="썸네일"></img>
                <span className={styles.story}></span>
            </div>
            <div className={styles.other}>
                <img src={image} alt="썸네일"></img>
                <img src={image} alt="썸네일"></img>
                <img src={image} alt="썸네일"></img>
                <img src={image} alt="썸네일"></img>
                <img src={image} alt="썸네일"></img>
                <img src={image} alt="썸네일"></img>
                <img src={image} alt="썸네일"></img>
                <img src={image} alt="썸네일"></img>
            </div>
        </div>
    );
}

export default Popular;
