import Header from '@/components/Header/Header';
import styles from './Animation.module.scss';
import { useEffect, useState } from 'react';
import { getAnimation } from '@/services/animation';
import { useParams } from 'react-router-dom';
import Loading from '@/components/Loading/Loading';
import Info from './components/Info/Info';
function Animation() {
    const { animationId } = useParams();
    const [animation, setAnimation] = useState<animation>(null);
    //애니메이션 데이터 가져오기
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getAnimation(animationId);
                setAnimation(data);
            } catch (e) {
                console.error(e);
            }
        };
        getData();
    }, []);
    if (!animation) return <Loading />;
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.article}>
                <div className={styles.info}>
                    <Info data={animation} />
                </div>
            </div>
        </div>
    );
}

export default Animation;
