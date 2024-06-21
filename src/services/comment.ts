export const getComments = async (boardId: number): Promise<comment[]> => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + `api/boards/${boardId}/comments`, {
        method: 'GET',
    });
    if (!res.ok) throw new Error(res.statusText);
    const result = await res.json();
    const data: comment[] = result.data.content;
    return data;
};

export const getUserComments = async (userId: number): Promise<comment[]> => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + `api/comments/users/${userId}`, {
        method: 'GET',
    });
    if (!res.ok) throw new Error(res.statusText);
    const result = await res.json();
    console.log(result);
    const data: comment[] = result.data.content;
    return data;
};
