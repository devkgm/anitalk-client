import { apiClient } from '@/util/apiClient';
export const getHotSearch = async () => {
    try {
        const response = await apiClient.get('searches');
        return response.data.data;
    } catch (err) {
        console.error(err);
        throw new Error('실시간 검색어 순위 불러오기 실패');
    }
};
