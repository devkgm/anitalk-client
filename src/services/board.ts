export const getBoards = async (animationId: number): Promise<board[]> => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + `api/animations/${animationId}/boards`, {
        method: 'GET',
    });
    if (!res.ok) throw new Error(res.statusText);
    const result = await res.json();
    const data: board[] = result.data.content;
    return data;
};

export const getBoard = async (animationId: number, id: string): Promise<board> => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + `api/animations/${animationId}/boards/${id}`, {
        method: 'GET',
    });
    if (!res.ok) throw new Error(res.statusText);
    const result = await res.json();
    const data: board = result;
    return data;
};

export const getUserBoards = async (userId: number): Promise<board[]> => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + `api/boards/users/${userId}`, {
        method: 'GET',
    });
    if (!res.ok) throw new Error(res.statusText);
    const result = await res.json();
    const data: board[] = result.data.content;
    return data;
};
