import { useRecoilState } from 'recoil';
import styles from './MyPage.module.scss';
import { isLoggedInState, userState } from '@/recoil/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserBoards } from '@/services/board';
import Header from '@/components/Header/Header';
import { getUserComments } from '@/services/comment';

function MyPage() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const [user, setUser] = useRecoilState(userState);
    const [boards, setBoards] = useState<board[]>([]);
    const [comments, setComments] = useState<comment[]>([]);

    useEffect(() => {
        const loadBoards = async () => {
            try {
                const data = await getUserBoards(user.id);
                console.log(data);
                setBoards(data);
            } catch (e) {
                console.error(e);
            }
        };
        const loadComments = async () => {
            try {
                const data = await getUserComments(user.id);
                console.log(data);
                setComments(data);
            } catch (e) {
                console.error(e);
            }
        };
        if (user.id) {
            loadBoards();
            loadComments();
        }
    }, [user]);

    const handleLogOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser({ id: null, email: '', nickname: '' });
        setIsLoggedIn(false);
        navigate('/');
    };
    const handlePasswordChange = () => {};
    const handleNickNameChange = () => {};
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.section}>
                <div className={styles.article}>
                    <div className={styles.title}>마이페이지</div>
                    <div className={styles.userInfo}>
                        <div>{user.nickname}님 안녕하세요!</div>
                    </div>
                    <div className={styles.articleTitle}>작성한 게시글</div>
                    <ul className={styles.list}>
                        {boards.map((board) => (
                            <li
                                className={styles.listItem}
                                key={board.id}
                                onClick={() => navigate(`/animations/${board.animationId}/boards/${board.id}`)}
                            >
                                <div className={styles.listItemTitle}>{board.title}</div>
                                <div className={styles.listItemDetail}>{board.hit} 조회</div>
                                <div className={styles.listItemDetail}>{board.nickname}</div>
                                <div className={styles.listItemDetail}>{board.writeDate}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.article}>
                    <div className={styles.articleTitle}>작성한 댓글</div>
                    <ul className={styles.list}>
                        {comments.map((comment) => (
                            <li
                                className={styles.listItem}
                                key={comment.id}
                                onClick={() => navigate(`/boards/${comment.boardId}`)}
                            >
                                <div className={styles.listItemDetail}>{comment.nickname}</div>
                                <div className={styles.listItemContent}>{comment.content}</div>
                                <div className={styles.listItemDetail}>{comment.writeDate}</div>
                            </li>
                        ))}
                    </ul>
                    <button type="button" onClick={handleLogOut} className={styles.logoutButton}>
                        로그아웃
                    </button>
                    <button type="button" onClick={handlePasswordChange} className={styles.pwdChangeButton}>
                        비밀번호 변경
                    </button>
                    <button type="button" onClick={handleNickNameChange} className={styles.nicknameChangeButton}>
                        닉네임 변경
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyPage;
