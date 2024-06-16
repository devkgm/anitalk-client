import { useEffect, useState } from 'react';
import styles from './Board.module.scss';
import { getBoards } from '@/services/board';
import { useNavigate } from 'react-router-dom';

interface Board {
    id: number;
    title: string;
    hit: number;
    nickname: string;
    write_date: string;
}

interface Prop {
    animationId: number;
}

function Board({ animationId }: Prop) {
    const navigate = useNavigate();
    const [boards, setBoards] = useState<board[]>([]);

    useEffect(() => {
        const loadBoards = async () => {
            try {
                const data: board[] = await getBoards(animationId);
                console.log(data);
                setBoards(data);
            } catch (e) {
                console.error(e);
            }
        };
        loadBoards();
    }, [animationId]);

    const handleClickBoard = (boardId) => {
        navigate(`/animations/${animationId}/boards/${boardId}`);
    };
    const boardItems = boards.map((board) => {
        return (
            <li className={styles.boards__list__item} key={board.id} onClick={() => handleClickBoard(board.id)}>
                <div className={styles.boards__list__item__title}>{board.title}</div>
                <div className={styles.boards__list__item__hit}>{board.hit}</div>
                <div className={styles.boards__list__item__nickname}>{board.nickname}</div>
                <div className={styles.boards__list__item__writedate}>{board.write_date}</div>
            </li>
        );
    });

    return (
        <div className={styles.container}>
            <div className={styles.boards}>
                <ul className={styles.boards__list}>{boardItems}</ul>
            </div>
        </div>
    );
}

export default Board;
