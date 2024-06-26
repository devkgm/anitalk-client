import { useRecoilValue } from 'recoil';
import styles from './Info.module.scss';
import { userState } from '@/recoil/auth';
import { likeAnimation, unLikeAnimation } from '@/api/AnimationAPI';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface Prop {
    data: AnimationResponse;
}
function Info({ data }: Prop) {
    const [favorite, setFavorite] = useState(data.favorite);
    const handleLike = async () => {
        try {
            if (favorite.isFavorite) {
                await unLikeAnimation(data.id);
                setFavorite({ ...favorite, isFavorite: false });
                toast('좋아요를 취소했습니다😢');
            } else {
                await likeAnimation(data.id);
                setFavorite({ ...favorite, isFavorite: true });
                toast('북마크에 저장🥰');
            }
        } catch (e) {
            console.error(e);
        }
    };
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

                <div className={`${styles.favorite} ${favorite.isFavorite && styles.liked}`} onClick={handleLike}>
                    <span className="material-symbols-outlined">favorite</span>
                </div>
            </div>

            <div className={styles.plot}>
                <div className={styles.title}>줄거리</div>
                <div className={styles.content}>{data.plot}</div>
            </div>

            <div>
                <Toaster />
            </div>
        </div>
    );
}

export default Info;
