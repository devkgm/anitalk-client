import { apiClient } from '@/util/apiClient';

export const uploadFile = async (category: string, form: FormData) => {
    try {
        console.log(form);
        const response = await apiClient.post(`attaches/${category}`, form);
        console.log(response);
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('파일 업로드 실패');
    }
};

export const uploadFileWithParent = async (category: string, form: FormData, parentId: string) => {
    try {
        const response = await apiClient.post(`attaches/${category}/parent/${parentId}`, form);
        console.log(response);
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('파일 업로드 실패');
    }
};
