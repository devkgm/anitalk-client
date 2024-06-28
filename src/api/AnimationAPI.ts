import { apiClient } from '@/util/apiClient';

export const getAnimations = async (page: number, size: number): Promise<AnimationResponse> => {
    try {
        const response = await apiClient.get(`/animations?page=${page}&size=${size}`);
        const data: AnimationResponse = response.data.data.content;
        return data;
    } catch (error) {
        throw new Error('애니메이션 리스트 가져오기 에러');
    }
};

export const getAnimation = async (id: string): Promise<AnimationResponse> => {
    try {
        const response = await apiClient.get(`/animations/${id}`);
        const data: AnimationResponse = response.data.data;

        return data;
    } catch (error) {
        throw new Error('애니메이션 가져오기 에러');
    }
};

export const getHotAnimation = async (page: number, size: number): Promise<WithPageResponse<AnimationResponse>> => {
    try {
        const response = await apiClient.get(`animations/ranking?page=${page}&size=${size}&rankBy=HOT`);
        const data: WithPageResponse<AnimationResponse> = response.data.data;
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('인기 애니메이션 가져오기 실패');
    }
};

export const likeAnimation = async (animationId: string) => {
    try {
        const response = await apiClient.post(`animations/${animationId}/favorite`);
        console.log(response);
        return response.data.data;
    } catch (err) {
        console.error(err);
        throw new Error('애니 좋아요 실패');
    }
};

export const unLikeAnimation = async (animationId: string) => {
    try {
        const response = await apiClient.delete(`animations/${animationId}/favorite`);
        console.log(response);
        return response.data.data;
    } catch (err) {
        console.error(err);
        throw new Error('애니 좋아요 실패');
    }
};

export const getUserLikeAnimation = async () => {
    try {
        const response = await apiClient.get(`animations/users`);
        console.log(response);
        return response.data.data;
    } catch (err) {
        console.error(err);
        throw new Error('좋아요한 애니메이션 불러오기 실패');
    }
};

export const updateAnimation = async (data: Animation) => {
    try {
        const response = await apiClient.put(`animations/${data.id}`, data);
        console.log(response);
        return response.data.data;
    } catch (err) {
        console.error(err);
        throw new Error('애니메이션 업데이트 실패');
    }
};
