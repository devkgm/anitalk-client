import { useEffect, useState } from 'react';
import styles from './HotBoard.module.scss';
import { getHotBoard } from '@/api/BoardAPI';
import { useNavigate } from 'react-router-dom';
import { hotBoardState } from '@/recoil/home';
import { useRecoilState } from 'recoil';
function HotBoard() {
    const navigate = useNavigate();
    const [boards, setBoards] = useRecoilState<Board[] | null>(hotBoardState);
    const loadBoards = async () => {
        try {
            const data = await getHotBoard(1, 10);
            setBoards(data.content);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        if (!boards) loadBoards();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <span className={styles.title__text}>실시간 🔥Hot 게시글</span>
            </div>
            <ul className={styles.hotList}>
                {boards &&
                    boards.map((board, index) => (
                        <li
                            className={styles.hotItem}
                            key={board.id + '' + index + board.title}
                            onClick={() => navigate(`/animations/${board.animationId}/boards/${board.id}`)}
                        >
                            <div className={styles.hotItem__title}>
                                {index + 1} {board.title}
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
export default HotBoard;
