import { apiClient } from '@/util/apiClient';

export const getAnimations = async (page: number, size: number): Promise<Animation[]> => {
    try {
        const response = await apiClient.get(`/animations?page=${page}&size=${size}`);
        const data: Animation[] = response.data.data.content;
        return data;
    } catch (error) {
        throw new Error('애니메이션 리스트 가져오기 에러');
    }
};

export const getAnimation = async (id: string): Promise<Animation> => {
    try {
        const response = await apiClient.get(`/animations/${id}`);
        const data: Animation = response.data.data;

        return data;
    } catch (error) {
        throw new Error('애니메이션 가져오기 에러');
    }
};
