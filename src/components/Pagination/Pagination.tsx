import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Pagination.module.scss';
import { Dispatch, SetStateAction } from 'react';

interface Page {
    totalElements: number;
    size: number;
    nowPage: number;
}

interface Props {
    page: Page;
    perBlock: number;
    onPageChange: Dispatch<SetStateAction<number>>;
}

function Pagination({ page, perBlock, onPageChange }: Props) {
    const navigate = useNavigate();
    const totalPages = Math.ceil(page.totalElements / page.size);
    const currentPage = page.nowPage;

    const handleChangePage = (pageIndex: number) => {
        onPageChange(pageIndex);
        navigate(`?page=${pageIndex}`);
    };

    const startPage = Math.floor(currentPage / perBlock) * perBlock;
    const endPage = Math.min(startPage + perBlock, totalPages);

    const isFirstBlock = startPage === 0;
    const isLastBlock = endPage === totalPages;

    return (
        <div className={styles.container}>
            <button
                className={styles.prevButton}
                onClick={() => handleChangePage(startPage - 1)}
                disabled={isFirstBlock}
            >
                이전
            </button>
            <ul className={styles.pageList}>
                {Array.from({ length: endPage - startPage }, (_, index) => startPage + index).map((pageIndex) => (
                    <li
                        className={`${styles.pageList__item} ${currentPage === pageIndex ? styles.active : ''}`}
                        key={pageIndex}
                        onClick={() => handleChangePage(pageIndex)}
                    >
                        {pageIndex + 1}
                    </li>
                ))}
            </ul>
            <button className={styles.nextButton} onClick={() => handleChangePage(endPage)} disabled={isLastBlock}>
                다음
            </button>
        </div>
    );
}

export default Pagination;
