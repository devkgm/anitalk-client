import { useState } from 'react';
import styles from './PasswordChange.module.scss';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/auth';
import { changePassword } from '@/api/UserAPI';
function PasswordChange({ onClose }) {
    // const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const user = useRecoilValue(userState);

    const handleChangePassword = async () => {
        const token = await localStorage.getItem('token');
        // console.log(currentPassword);
        console.log(newPassword);
        console.log(confirmPassword);
        if (newPassword !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        const newUser: User = {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            password: newPassword,
        };
        try {
            await changePassword(newUser, token);
            alert('비밀번호가 변경되었습니다.');
            onClose();
        } catch (err) {
            console.error(err);
            alert('비밀번호 변경에 실패했습니다.');
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.title}>비밀번호 변경</div>
            <div className={styles.content}>
                {/* <input
                    value={currentPassword}
                    onChange={(e) => {
                        setCurrentPassword(e.target.value);
                    }}
                    type="password"
                    placeholder="현재 비밀번호"
                /> */}
                <input
                    value={newPassword}
                    onChange={(e) => {
                        setNewPassword(e.target.value);
                    }}
                    type="password"
                    placeholder="새 비밀번호"
                />
                <input
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                    type="password"
                    placeholder="새 비밀번호 확인"
                />
            </div>
            <button type="button" className={styles.button} onClick={handleChangePassword}>
                변경
            </button>
            <button type="button" className={styles.button}>
                취소
            </button>
        </div>
    );
}

export default PasswordChange;
