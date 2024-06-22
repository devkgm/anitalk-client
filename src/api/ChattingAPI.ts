import { apiClient } from '@/util/apiClient';

export const getChattings = async (animationId: string): Promise<ChatMessage[]> => {
    try {
        const response = await apiClient.get(`animations/${animationId}/chattings`);
        const data: ChatMessage[] = response.data.data;
        return data;
    } catch (err) {
        throw new Error('채팅 목록 가져오기 에러');
    }
};
