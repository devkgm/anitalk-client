import { useRecoilState } from 'recoil';
import styles from './MyPage.module.scss';
import { isLoggedInState, userState } from '@/recoil/auth';
import { useNavigate } from 'react-router-dom';
function MyPage() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const [user, setUser] = useRecoilState(userState);
    //로그아웃 처리
    const handleLogOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser({ email: '', nickname: '' });
        setIsLoggedIn(false);
        navigate('/');
    };
    return (
        <div className={styles.container}>
            <button type="button" onClick={handleLogOut} className={styles.logout__button}>
                로그아웃
            </button>
        </div>
    );
}

export default MyPage;
