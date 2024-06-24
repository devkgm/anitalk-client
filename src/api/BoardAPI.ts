import { apiClient } from '@/util/apiClient';

export const getBoards = async (animationId: string): Promise<Board[]> => {
    try {
        const response = await apiClient.get(`animations/${animationId}/boards`);
        const data: Board[] = response.data.data.content;
        return data;
    } catch (err) {
        console.error(err);
        throw new Error('게시글 목록 가져오기 에러');
    }
};

export const getBoard = async (animationId: string, id: string): Promise<BoardResponse> => {
    try {
        const response = await apiClient.get(`animations/${animationId}/boards/${id}`);
        const data: BoardResponse = response.data.data;
        return data;
    } catch (err) {
        console.error(err);
        throw new Error('게시글 가져오기 에러');
    }
};

export const getUserBoards = async (userId: string): Promise<Board[]> => {
    try {
        const response = await apiClient.get(`boards/users/${userId}`);
        const data: Board[] = response.data.data.content;
        return data;
    } catch (err) {
        console.error(err);
        throw new Error('사용자 작성 게시글 목록 가져오기 에러');
    }
};

export const uploadBoard = async (animationId: string, data: BoardAdd): Promise<Board> => {
    try {
        const response = await apiClient.post(`animations/${animationId}/boards`, data);
        return response.data.data;
    } catch (err) {
        console.error(err);
        throw new Error('게시글 업로드 실패');
    }
};

export const likeBoard = async (animationId: string, boardId: string) => {
    try {
        const response = await apiClient.post(`animations/${animationId}/boards/${boardId}/like`);
        console.log(response);
        return response.data.data;
    } catch (err) {
        console.error(err);
        throw new Error('게시글 좋아요 실패');
    }
};

export const unLikeBoard = async (animationId: string, boardId: string) => {
    try {
        const response = await apiClient.delete(`animations/${animationId}/boards/${boardId}/like`);
        console.log(response);
        return response.data.data;
    } catch (err) {
        console.error(err);
        throw new Error('게시글 좋아요 실패');
    }
};

export const getHotBoard = async (page: number, size: number) => {
    try {
        const response = await apiClient.get(`boards?page=${page}&size=${size}`);
        console.log(response);
        const data: WithPageResponse<Board> = response.data.data;
        return data;
    } catch (err) {
        console.error(err);
        throw new Error('인기 게시글 가져오기 실패');
    }
};
