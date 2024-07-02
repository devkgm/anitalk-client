import styles from './Review.module.scss';
function Review() {
    return (
        <div className={styles.container}>
            <span className={styles.title}>리뷰</span>
            <span className={styles.content}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod diam ac urna semper, vel convallis
                metus tristique. Nulla facilisi.
            </span>
            <span className={styles.author}>작성자: John Doe</span>
        </div>
    );
}
export default Review;
