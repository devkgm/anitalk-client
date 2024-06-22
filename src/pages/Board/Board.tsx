import Header from '@/components/Header/Header';
import styles from './Board.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBoard } from '@/api/BoardAPI';
function Board() {
    const { animationId, boardId } = useParams();
    const [board, setBoard] = useState<board>(null);
    useEffect(() => {
        const loadData = async () => {
            const data = await getBoard(Number(animationId), boardId);
            console.log(data);
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
