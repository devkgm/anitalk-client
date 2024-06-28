import { ReducerStateWithoutAction, ReducerWithoutAction, useEffect, useMemo, useReducer, useState } from 'react';
import styles from './Board.module.scss';
import { getBoards } from '@/api/BoardAPI';
import { useNavigate } from 'react-router-dom';
import Pagination from '@/components/Pagination/Pagination';

interface Board {
    id: number;
    title: string;
    hit: number;
    nickname: string;
    writeDate: string;
}

interface Prop {
    animationId: string;
}

const PER_PAGE = 10;
function Board({ animationId }: Prop) {
    const navigate = useNavigate();
    const [boards, setBoards] = useState<Board[]>([]);
    const [page, setPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [type, setType] = useState<'ALL' | 'RECOMMENDED'>('ALL');

    useEffect(() => {
        loadBoards();
    }, [currentPage, type]);
    const loadBoards = async () => {
        try {
            const data: WithPageResponse<Board> = await getBoards(animationId, currentPage, PER_PAGE, type);
            setPage(data.page);
            console.log(data.page);
            setBoards(data.content);
        } catch (e) {
            console.error(e);
        }
    };
    const handleClickBoard = (boardId) => {
        navigate(`/animations/${animationId}/boards/${boardId}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.boards}>
                <div className={styles.boards__nav}>
                    <div className={styles.boards__nav__list}>
                        <div className={styles.boards__nav__list__text} onClick={() => setType('ALL')}>
                            게시판
                        </div>
                        <div className={styles.boards__nav__list__subtext} onClick={() => setType('RECOMMENDED')}>
                            개념글
                        </div>
                    </div>

                    <div className={styles.boards__nav__button}>
                        <button
                            className={styles.boards__nav__button__create}
                            onClick={() => navigate(`/animations/${animationId}/write`)}
                        >
                            글쓰기
                        </button>
                    </div>
                </div>
                <ul className={styles.boards__list}>
                    {boards.length ? (
                        boards.map((board) => {
                            return (
                                <li
                                    className={styles.boards__list__item}
                                    key={board.id}
                                    onClick={() => handleClickBoard(board.id)}
                                >
                                    <div className={styles.boards__list__item__title}>{board.title}</div>
                                    <div className={styles.boards__list__item__hit}>{board.hit}</div>
                                    <div className={styles.boards__list__item__nickname}>{board.nickname}</div>
                                    <div className={styles.boards__list__item__writedate}>{board.write_date}</div>
                                </li>
                            );
                        })
                    ) : (
                        <div className={styles.emptyMessage}>
                            <h3>🎉 첫 게시물을 작성해보세요 🥳</h3>
                        </div>
                    )}
                </ul>
                {page && (
                    <div className={styles.pagination}>
                        <Pagination page={page} perBlock={10} onPageChange={setCurrentPage} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Board;
