import { apiClient } from '@/util/apiClient';

export const getComments = async (boardId: string): Promise<Comment[]> => {
    try {
        const response = await apiClient.get(`boards/${boardId}/comments`);
        const data: Comment[] = response.data.data.content;
        return data;
    } catch (error) {
        throw new Error('댓글 목록 읽어오기 오류');
    }
};

export const getUserComments = async (userId: string): Promise<Comment[]> => {
    try {
        const response = await apiClient.get(`comments/users/${userId}`);
        const data: Comment[] = response.data.data.content;
        return data;
    } catch (error) {
        throw new Error('사용자 작성 댓글 읽어오기 오류');
    }
};
