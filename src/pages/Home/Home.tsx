import Header from '@/components/Header/Header';
import styles from './Home.module.scss';
import Popular from './components/Popular/Popular';

function Home() {
    return (
        <div className={styles.container}>
            <Header />
            <section className={styles.article}>
                <Popular />
            </section>
        </div>
    );
}

export default Home;
