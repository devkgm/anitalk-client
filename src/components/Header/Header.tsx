import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { useRecoilValue } from 'recoil';
import { isLoggedInState, userState } from '@/recoil/auth';
function Header() {
    const isLoggedIn = useRecoilValue(isLoggedInState);
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    return (
        <header className={styles.container}>
            <div className={styles.begin}>
                <span className={styles.logo} onClick={() => navigate('/')}>
                    AniTalk
                </span>
                <nav className={styles.nav}>
                    <button>커뮤니티</button>
                    <button>갤러리</button>
                </nav>
            </div>
            <div className={styles.end}>
                <div className={styles.search}>
                    <button className={`material-symbols-outlined`}>search</button>
                </div>
                <div className={styles.signin}>
                    {isLoggedIn ? (
                        <button onClick={() => navigate('/mypage')}>{user.nickname}</button>
                    ) : (
                        <button onClick={() => navigate('/login')}>로그인/가입</button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
