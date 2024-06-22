import Header from '@/components/Header/Header';
import styles from './Board.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBoard } from '@/api/BoardAPI';
function Board() {
    const { animationId, boardId } = useParams();
    const [board, setBoard] = useState<Board>(null);
    useEffect(() => {
        const loadData = async () => {
            const data = await getBoard(animationId, boardId);
        };
        loadData();
    }, []);
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.article}></div>
        </div>
    );
}

export default Board;
