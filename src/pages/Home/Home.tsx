import Header from '@/components/Header/Header';
import styles from './Home.module.scss';
import Popular from './components/Popular/Popular';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getAnimations } from '@/api/AnimationAPI';
import AnimationCard from './components/AnimationCard/AnimationCard';
import Footer from '@/components/Footer/Footer';
import Loading from '@/components/Loading/Loading';
import HotBoard from './components/HotBoard/HotBoard';
import HotAnimation from './HotAnimation/HotAnimation';
import { useRecoilState } from 'recoil';
import { animationState } from '@/recoil/home';

function Home() {
    const [animations, setAnimations] = useRecoilState<AnimationResponse[] | null>(animationState);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const aniCardRef = useRef(null);
    const observer = useRef(null);
    const SIZE = 20;

    const loadAnimations = async () => {
        try {
            setIsLoading(true);
            const data = await getAnimations(page, SIZE);
            setAnimations((prev) => (prev ? [...prev, ...data] : data));
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (!observer.current) {
            observer.current = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !isLoading) {
                            console.log('Observed');
                            setPage((prev) => prev + 1);
                        }
                    });
                },
                { threshold: 1 }
            );
        }
        if (aniCardRef) {
            observer.current.observe(aniCardRef.current);
        }
    }, []);
    useEffect(() => {
        loadAnimations();
    }, [page]);
    const cards = animations?.map((ani, index) => {
        return (
            <div key={ani.name + '' + ani.id}>
                <AnimationCard data={ani} />
            </div>
        );
    });
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.section}>
                <div className={styles.article}>
                    <div className={styles.article__cards}>{animations ? cards : <Loading />}</div>
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
            <div className={styles.commonComponent} ref={aniCardRef}>
                <Footer />
            </div>
        </div>
    );
}

export default Home;
