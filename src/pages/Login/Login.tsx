import Header from '@/components/Header/Header';
import styles from './Login.module.scss';
import { CiUser, CiLock } from 'react-icons/ci';
import { useState } from 'react';
import { signInWithEmailAndPassword } from '@/services/user';
import { useRecoilState } from 'recoil';
import { isLoggedInState, userState } from '@/recoil/auth';
import { useNavigate } from 'react-router-dom';
function Login() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const [user, setUser] = useRecoilState(userState);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleInputEmail = (e) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    };
    const handleInputPassword = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signInWithEmailAndPassword({ email, password });
        // 로그인 성공 로직
        if (result) {
            setIsLoggedIn(true);
            setUser(result.user);
            console.log(result);
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.token.token));
            navigate(-1);
        }
    };
    return (
        <div className={styles.container}>
            <Header />
            <form className={styles.form}>
                <div className={styles.logo}>로그인</div>
                <div className={styles.form__container}>
                    <CiUser className={styles.icon} />
                    <input
                        value={email}
                        onChange={handleInputEmail}
                        type="email"
                        className={styles.idInput}
                        name="email"
                        placeholder="이메일을 입력하세요."
                    ></input>
                </div>
                <div className={styles.form__container}>
                    <CiLock className={styles.icon} />
                    <input
                        value={password}
                        onChange={handleInputPassword}
                        type="password"
                        className={styles.pwdInput}
                        name="password"
                        placeholder="비밀번호를 입력하세요."
                    ></input>
                </div>

                <button className={styles.loginBtn} onClick={handleSubmit}>
                    로그인
                </button>
            </form>
        </div>
    );
}

export default Login;
