import { useState } from 'react';
import styles from './CommentInput.module.scss';
function CommentInput({ handleSubmit }) {
    const [commentInput, setCommentInput] = useState('');
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.nativeEvent.isComposing) return;
        if (e.key === 'Enter') {
            handleSubmitComment();
        }
    };
    const handleSubmitComment = () => {
        if (commentInput === '') return;
        handleSubmit(commentInput);
        setCommentInput('');
    };
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.cardBody}>
                    <div className={styles.title}>
                        <span className={styles.title__text}>댓글 작성</span>
                    </div>
                    <div className={styles.inputContainer}>
                        <textarea
                            className={styles.commentInput}
                            placeholder="댓글을 입력하세요"
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            onKeyDown={handleKeyDown}
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

export default CommentInput;
