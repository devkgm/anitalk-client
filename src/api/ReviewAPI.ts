import { apiClient } from '@/util/apiClient';
export const getReviews = async (
    animationId: number,
    page: number = 0,
    size: number = 10
): Promise<WithPageResponse<ReviewResponse>> => {
    try {
        const response = await apiClient.get(`animations/${animationId}/reviews?page=${page}&size=${size}`);
        return response.data.data;
    } catch (err) {
        console.error(err);
        throw new Error('리뷰 가져오기 실패');
    }
};

export const submitReview = async (animationId, data) => {
    try {
        const response = await apiClient.post(`animations/${animationId}/reviews`, data);
        return response.data.data;
    } catch (err) {
        console.error(err);
        throw new Error('리뷰 등록 실패');
    }
};

export const getUserReview = async () => {
    try {
        const response = await apiClient.get(`reviews/users`);
        return response.data.data;
    } catch (err) {
        console.error(err);
        throw new Error('유저 리뷰 가져오기 실패');
    }
};
