import { useState } from 'react';
import styles from './ReviewInput.module.scss';
import { Rating } from '@mui/material';
import { submitReview } from '@/api/ReviewAPI';
function ReviewInput({ animationId }) {
    const [reviewInput, setReviewInput] = useState('');
    const [enjoy, setEnjoy] = useState(0);
    const [quality, setQuality] = useState(0);
    const [story, setStory] = useState(0);
    const [directing, setDirecting] = useState(0);
    const [music, setMusic] = useState(0);
    const [originality, setOriginality] = useState(0);
    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.nativeEvent.isComposing) return;
        if (e.key === 'Enter') {
            if (e.shiftKey) return;
            handleSubmitComment();
        }
    };
    const handleSubmitComment = async () => {
        if (reviewInput.trim() === '') return;
        reviewInput.trim();
        try {
            const data = {
                content: reviewInput,
                rate: {
                    enjoy: enjoy,
                    quality: quality,
                    story: story,
                    directing: directing,
                    music: music,
                    originality: originality,
                },
            };
            const response = await submitReview(animationId, data);
            alert('리뷰가 작성됐습니다🎉');
            location.reload();
        } catch (e) {
            alert('리뷰작성에 실패했습니다.');
            console.error(e);
        }
        setReviewInput('');
    };
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.cardBody}>
                    <div className={styles.title}>
                        <span className={styles.title__text}>리뷰 작성</span>
                    </div>

                    <div className={styles.inputContainer}>
                        <div className={styles.rating}>
                            <div className={styles.rating__items}>
                                <span className={styles.rating__items__title}>1. 재미</span>
                                <Rating
                                    name="simple-controlled"
                                    value={enjoy}
                                    onChange={(event, newValue) => {
                                        setEnjoy(newValue);
                                    }}
                                />
                            </div>
                            <div className={styles.rating__items}>
                                <span className={styles.rating__items__title}>2. 스토리</span>
                                <Rating
                                    name="simple-controlled"
                                    value={story}
                                    onChange={(event, newValue) => {
                                        setStory(newValue);
                                    }}
                                />
                            </div>
                            <div className={styles.rating__items}>
                                <span className={styles.rating__items__title}>3. 퀄리티</span>
                                <Rating
                                    name="simple-controlled"
                                    value={quality}
                                    onChange={(event, newValue) => {
                                        setQuality(newValue);
                                    }}
                                />
                            </div>
                            <div className={styles.rating__items}>
                                <span className={styles.rating__items__title}>4. 원작성</span>
                                <Rating
                                    name="simple-controlled"
                                    value={originality}
                                    onChange={(event, newValue) => {
                                        setOriginality(newValue);
                                    }}
                                />
                            </div>
                            <div className={styles.rating__items}>
                                <span className={styles.rating__items__title}>5. 음악성</span>
                                <Rating
                                    name="simple-controlled"
                                    value={music}
                                    onChange={(event, newValue) => {
                                        setMusic(newValue);
                                    }}
                                />
                            </div>
                            <div className={styles.rating__items}>
                                <span className={styles.rating__items__title}>6. 연출</span>
                                <Rating
                                    name="simple-controlled"
                                    value={directing}
                                    onChange={(event, newValue) => {
                                        setDirecting(newValue);
                                    }}
                                />
                            </div>
                        </div>
                        <textarea
                            className={styles.reviewInput}
                            placeholder="리뷰를 입력하세요"
                            value={reviewInput}
                            onChange={(e) => setReviewInput(e.target.value)}
                            onKeyUp={handleKeyUp}
                        />
                        <button className={styles.submitButton} onClick={handleSubmitComment}>
                            등록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewInput;
