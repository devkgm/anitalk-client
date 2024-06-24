import Header from '@/components/Header/Header';
import styles from './Home.module.scss';
import Popular from './components/Popular/Popular';
import { useEffect, useState } from 'react';
import { getAnimations } from '@/api/AnimationAPI';
import AnimationCard from './components/AnimationCard/AnimationCard';
import Footer from '@/components/Footer/Footer';
import Loading from '@/components/Loading/Loading';
import HotBoard from './components/HotBoard/HotBoard';
import HotAnimation from './HotAnimation/HotAnimation';

function Home() {
    const [animations, setAnimations] = useState([]);
    const [page, setPage] = useState(0);
    const SIZE = 100;
    useEffect(() => {
        loadAnimations();
    }, []);
    const loadAnimations = async () => {
        //애니메이션 데이터 가져오기
        try {
            const data = await getAnimations(page, SIZE);
            setAnimations(data);
        } catch (e) {
            console.error(e);
        }
    };
    const cards = animations.map((ani) => {
        return <AnimationCard data={ani} key={ani.name + ani.id} />;
    });
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.section}>
                <div className={styles.article}>
                    <div className={styles.article__cards}>{cards.length != 0 ? cards : <Loading />}</div>
                </div>
                <div className={styles.aside}>
                    <div className={styles.hotBoard}>
                        <HotAnimation />
                    </div>
                    <div className={styles.hotBoard}>
                        <HotBoard />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Home;
