import { apiClient } from '@/util/apiClient';

export const getComments = async (boardId: string, page = 0, size = 20): Promise<WithPageResponse<Comment>> => {
    try {
        const response = await apiClient.get(`boards/${boardId}/comments?page=${page}&size=${size}`);
        const data: WithPageResponse<Comment> = response.data.data;
        return data;
    } catch (error) {
        throw new Error('댓글 목록 읽어오기 오류');
    }
};

export const getUserComments = async (
    userId: string,
    page: number = 0,
    size: number = 10
): Promise<WithPageResponse<Comment>> => {
    try {
        const response = await apiClient.get(`comments/users/${userId}?page=${page}&size=${size}`);
        const data: WithPageResponse<Comment> = response.data.data;
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('사용자 작성 댓글 읽어오기 오류');
    }
};

export const deleteComment = async (boardId: string, comment: Comment): Promise<void> => {
    try {
        comment.content = '삭제된 댓글';
        const response = await apiClient.put(`boards/${boardId}/comments`, comment);
    } catch (error) {
        console.error(error);
        throw new Error('댓글 삭제 오류');
    }
};

export const uploadComment = async (boardId: string, comment: Comment) => {
    try {
        const response = await apiClient.post(`boards/${boardId}/comments`, comment);
        return response.data.data;
    } catch (err) {
        console.error(err);
        throw new Error('댓글 업로드 실패');
    }
};
