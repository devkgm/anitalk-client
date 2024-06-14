export const getAnimations = async (page: number, size: number): Promise<animation[]> => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + 'api/animations?page=' + page + '&size=' + size, {
        method: 'GET',
    });
    if (!res.ok) throw new Error(res.statusText);
    const result = await res.json();
    const data: animation[] = result.content;
    return data;
};

export const getAnimation = async (id: string): Promise<animation> => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + 'api/animations/' + id, {
        method: 'GET',
    });
    if (!res.ok) throw new Error(res.statusText);
    const result = await res.json();
    const data: animation = result;
    return data;
};
