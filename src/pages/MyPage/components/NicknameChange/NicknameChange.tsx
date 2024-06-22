import { useState } from 'react';
import styles from './NicknameChange.module.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '@/recoil/auth';
import { changeNickname, changePassword } from '@/api/UserAPI';
function NicknameChange({ onClose }) {
    // const [currentPassword, setCurrentPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [user, setUser] = useRecoilState(userState);

    const handleChangeNickname = async () => {
        const token = await localStorage.getItem('token');
        const newUser: User = {
            id: user.id,
            email: user.email,
            nickname: nickname,
        };
        try {
            const result = await changeNickname(newUser, token);
            console.log(result);
            setUser(result);
            localStorage.setItem('user', JSON.stringify(result));
            alert('닉네임이 변경되었습니다.');
            onClose();
        } catch (err) {
            console.error(err);
            alert('닉네임 변경에 실패했습니다.');
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.title}>닉네임 변경</div>
            <div className={styles.content}>
                <input
                    value={nickname}
                    onChange={(e) => {
                        setNickname(e.target.value);
                    }}
                    type="text"
                    placeholder="새로운 닉네임"
                />
            </div>
            <button type="button" className={styles.button} onClick={handleChangeNickname}>
                변경
            </button>
            <button type="button" className={styles.button}>
                취소
            </button>
        </div>
    );
}

export default NicknameChange;
