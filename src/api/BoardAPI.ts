import { apiClient } from '@/util/apiClient';

export const getBoards = async (animationId: string): Promise<Board[]> => {
    try {
        const response = await apiClient.get(`animations/${animationId}/boards`);
        const data: Board[] = response.data.data.content;
        return data;
    } catch (err) {
        throw new Error('게시글 목록 가져오기 에러');
    }
};

export const getBoard = async (animationId: string, id: string): Promise<Board> => {
    try {
        const response = await apiClient.get(`animations/${animationId}/boards/${id}`);
        const data: Board = response.data.data.content;
        return data;
    } catch (err) {
        throw new Error('게시글 가져오기 에러');
    }
};

export const getUserBoards = async (userId: string): Promise<Board[]> => {
    try {
        const response = await apiClient.get(`boards/users/${userId}`);
        const data: Board[] = response.data.data.content;
        return data;
    } catch (err) {
        throw new Error('사용자 작성 게시글 목록 가져오기 에러');
    }
};
