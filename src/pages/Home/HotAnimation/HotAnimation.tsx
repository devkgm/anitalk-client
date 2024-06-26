import { useEffect, useState } from 'react';
import styles from './HotAnimaion.module.scss';
import { getHotBoard } from '@/api/BoardAPI';
import { useNavigate } from 'react-router-dom';
import { getHotAnimation } from '@/api/AnimationAPI';
import { useRecoilState } from 'recoil';
import { hotAnimationState } from '@/recoil/home';
function HotAnimation() {
    const navigate = useNavigate();
    const [animations, setAnimations] = useRecoilState<AnimationResponse[] | null>(hotAnimationState);
    const loadBoards = async () => {
        try {
            const data = await getHotAnimation(1, 10);
            console.log(data);
            setAnimations(data.content);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        loadBoards();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <span className={styles.title__text}>실시간 🔥Hot 애니</span>
            </div>
            <ul className={styles.hotList}>
                {animations &&
                    animations.map((animation, index) => (
                        <li
                            className={styles.hotItem}
                            key={animation.id + index}
                            onClick={() => navigate(`/animations/${animation.id}`)}
                        >
                            <div className={styles.hotItem__title}>
                                {index + 1} {animation.name}
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
export default HotAnimation;
