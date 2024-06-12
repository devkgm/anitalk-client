import styles from './SignUp.module.scss';
import { CiUser, CiLock } from 'react-icons/ci';
import { useState } from 'react';
import { joinUser } from '@/services/user';
import { useNavigate } from 'react-router-dom';
function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();
    const handleInputEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleInputPassword = (e) => {
        setPassword(e.target.value);
    };
    const handleInputPasswordCheck = (e) => {
        setPasswordCheck(e.target.value);
    };
    const handleInputNickname = (e) => {
        setNickname(e.target.value);
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        const result = await joinUser({ nickname, email, password });
        // 회원가입 성공 로직
        if (result) {
            navigate('/login');
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div className={styles.logo}>회원가입</div>
                <div className={styles.form__container}>
                    <CiUser className={styles.icon} />
                    <input
                        value={nickname}
                        onChange={handleInputNickname}
                        type="text"
                        className={styles.idInput}
                        name="nickname"
                        placeholder="닉네임을 입력하세요."
                    ></input>
                </div>
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
                <div className={styles.form__container}>
                    <CiLock className={styles.icon} />
                    <input
                        value={passwordCheck}
                        onChange={handleInputPasswordCheck}
                        type="password"
                        className={styles.pwdInput}
                        name="passwordCheck"
                        placeholder="비밀번호 확인"
                    ></input>
                </div>

                <button className={styles.loginBtn} onClick={handleSignUp}>
                    회원가입
                </button>
            </form>
        </div>
    );
}

export default SignUp;
