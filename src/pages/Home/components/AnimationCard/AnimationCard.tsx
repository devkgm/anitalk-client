import styles from './AnimationCard.module.scss';
import { useNavigate } from 'react-router-dom';
interface Props {
    data: animation;
}
function AnimationCard({ data }: Props) {
    const navigate = useNavigate();
    const handleClickCard = () => {
        navigate(`/animations/${data.id}`);
    };
    return (
        <div className={styles.container} onClick={handleClickCard}>
            <div className={styles.thumbnail__container}>
                <img className={styles.thumbnail} src={data.thumbnailUrl} alt={data.name + '_썸네일'} />
            </div>
            <div className={styles.info}>
                <div className={styles.title}>{data.name}</div>
            </div>
        </div>
    );
}

export default AnimationCard;
