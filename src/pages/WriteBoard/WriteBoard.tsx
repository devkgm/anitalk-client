import Editor from '@/components/Editor/Editor';
import styles from './WriteBoard.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useState } from 'react';
import { uploadBoard } from '@/api/BoardAPI';
import { useRecoilValue } from 'recoil';
import { isLoggedInState, userState } from '@/recoil/auth';

function WriteBoard() {
    const navigatge = useNavigate();
    const user = useRecoilValue(userState);
    const isLoggedIn = useRecoilValue(isLoggedInState);
    const { animationId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [attaches, setAttaches] = useState<string[]>([]);
    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleAttach = (attachId) => {
        setAttaches((prev) => {
            return [...prev, attachId];
        });
    };
    console.log(attaches);
    const submit = async () => {
        try {
            const boardData: BoardAdd = {};
            boardData.title = title;
            boardData.content = content;
            boardData.category = 'BOARD';
            boardData.attaches = attaches;
            if (isLoggedIn) {
                boardData.userId = user.id;
                boardData.nickname = user.nickname;
            } else {
                boardData.nickname = nickname ? nickname : '덕후';
                boardData.password = password;
            }
            const data = await uploadBoard(animationId, boardData);
            navigatge(`/animations/${data.animationId}/boards/${data.id}`);
        } catch (error) {
            console.error(error);
            alert('게시글 작성에 실패했습니다.');
        }
    };
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.section}>
                <div className={styles.head}>
                    <input
                        type="text"
                        placeholder="제목을 입력하세요."
                        value={title}
                        onChange={handleChangeTitle}
                        className={styles.title}
                    />
                    {!isLoggedIn && (
                        <>
                            <input
                                type="text"
                                placeholder="덕후"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className={styles.nickname}
                            />
                            <input
                                type="text"
                                placeholder="비밀변호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.password}
                            />
                        </>
                    )}
                </div>
                <div className={styles.editor}>
                    <Editor uploadUrl="boards" handleChange={setContent} handleAttach={handleAttach} />
                </div>
                <div className={styles.submit}>
                    <button className={styles.submit__button} onClick={submit}>
                        작성 완료
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}
export default WriteBoard;
