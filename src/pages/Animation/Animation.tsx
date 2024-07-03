import Header from '@/components/Header/Header';
import styles from './Animation.module.scss';
import { useEffect, useState } from 'react';
import { getAnimation } from '@/api/AnimationAPI';
import { useParams } from 'react-router-dom';
import Loading from '@/components/Loading/Loading';
import Info from './components/Info/Info';
import Board from './components/Board/Board';
import Chatting from '@/components/Chatting/Chatting';
import Footer from '@/components/Footer/Footer';
import Review from '../Review/Review';
function Animation() {
    const { animationId } = useParams();
    const [animation, setAnimation] = useState<AnimationResponse>(null);
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
                <div className={styles.section}>
                    <div className={styles.main}>
                        <Review animationId={animation.id} />
                        {/* <Board animationId={animation.id} /> */}
                    </div>
                    <div className={styles.sub}>
                        <Chatting roomId={animation.id} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Animation;
