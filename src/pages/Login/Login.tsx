import styles from './Login.module.scss';
import { CiUser, CiLock } from 'react-icons/ci';
import { useState } from 'react';
import { signInWithEmailAndPassword } from '@/api/UserAPI';
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
        setEmail(e.target.value);
    };
    const handleInputPassword = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // 로그인 성공 로직
        try {
            const data = await signInWithEmailAndPassword({ email, password });
            setIsLoggedIn(true);
            console.log(data);
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('로그인에 실패했습니다.');
        }
    };
    const handleSignUp = () => {
        navigate('/signup');
    };
    return (
        <div className={styles.container}>
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
                <button className={styles.signupBtn} onClick={handleSignUp}>
                    회원가입
                </button>
            </form>
        </div>
    );
}

export default Login;
