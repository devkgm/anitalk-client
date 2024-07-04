import { useEffect, useState } from 'react';
import styles from './Review.module.scss';
import { getReviews } from '@/api/ReviewAPI';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Info from '../Animation/components/Info/Info';
import Chatting from '@/components/Chatting/Chatting';
import Footer from '@/components/Footer/Footer';
import Pagination from '@/components/Pagination/Pagination';
import ReviewInput from './ReviewInput/ReviewInput';
import { Rating } from '@mui/material';
import ReviewCard from './ReviewCard/ReviewCard';
function Review({ animationId }) {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState<ReviewResponse[]>();
    const [page, setPage] = useState<Page>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const PAGE_SIZE = 5;
    const loadReviews = async () => {
        try {
            console.log(animationId);
            const data = await getReviews(Number(animationId), currentPage, PAGE_SIZE);
            console.log(data);
            setReviews(data.content);
            setPage(data.page);
        } catch (err) {
            console.error(err);
        }
    };
    const handleSubmit = () => {};
    useEffect(() => {
        loadReviews();
    }, [currentPage]);
    return (
        <div className={styles.container}>
            <div className={styles.boards}>
                <div className={styles.boards__nav}>
                    <div className={styles.boards__nav__list__text}>리뷰</div>
                </div>
                <ul className={styles.boards__list}>
                    {reviews?.length ? (
                        reviews.map((review) => <ReviewCard key={review.id} review={review} />)
                    ) : (
                        <div className={styles.emptyMessage}>
                            <h3>🎉 첫 리뷰를 작성해보세요 🥳</h3>
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
export default Review;
