import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import styles from './ReviewCard.module.scss';

// Chart.js 구성 요소 등록
Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const ReviewCard = ({ review }) => {
    const scores = [
        review.rate.enjoy,
        review.rate.story,
        review.rate.quality,
        review.rate.originality,
        review.rate.music,
        review.rate.directing,
    ];
    const data = {
        labels: ['재미', '스토리', '퀄리티', '원작성', '음악성', '연출'],
        datasets: [
            {
                label: '평점',
                data: scores,
                backgroundColor: 'rgba(34, 202, 236, 0.2)',
                borderColor: 'rgba(34, 202, 236, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            r: {
                ticks: {
                    beginAtZero: true,
                    max: 5,
                    stepSize: 1,
                },
                min: 0,
                max: 5,
            },
        },
        maintainAspectRatio: false,
        // maintainAspectRatio: false,
    };

    const totalScore = (scores.reduce((acc, score) => acc + score, 0) / scores.length).toFixed(1);

    return (
        <div className={styles.reviewCard}>
            {/* <div className={styles.reviewHeader}>
                <span className={styles.reviewTitle}>리뷰</span>
            </div> */}
            <div className={styles.reviewBody}>
                <div className={styles.chartContainer}>
                    <div className={styles.chartWrapper}>
                        <Radar data={data} options={options} />
                    </div>
                    <div className={styles.totalScore}>종합 점수: {totalScore}</div>
                </div>
                <div className={styles.reviewText}>{review.content}</div>
                <div className={styles.reviewUser}>
                    <span className={styles.reviewUserNickname}>작성: {review.nickname}</span>
                    <span className={styles.reviewUserDate}>{review.write_date}</span>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
