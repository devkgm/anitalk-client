import { apiClient } from '@/util/apiClient';

export const joinUser = async (user: User): Promise<User> => {
    try {
        const response = await apiClient.post(`users`, JSON.stringify(user));
        const data: User = response.data;
        return data;
    } catch (err) {
        throw new Error('회원가입 실패');
    }
};
export const signInWithEmailAndPassword = async (user: User) => {
    try {
        const response = await apiClient.post(`login`, JSON.stringify(user));
        const data: User = response.data;
        return data;
    } catch (err) {
        throw new Error('회원가입 실패');
    }
};
export const logout = async (user: User) => {
    try {
        const response = await apiClient.post(`logout`, JSON.stringify(user));
    } catch (err) {
        throw new Error('로그아웃 실패');
    }
};

export const checkEmail = async (user: User) => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + `api/users/email/${user.email}`);
    const result = await res.json();
    if (!res.ok) throw new Error(res.statusText);
    return result.exist;
};

export const changePassword = async (user: User, token) => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + `api/users/password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token.replace('"', '')}`,
        },
        body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error(res.statusText);
    const result = await res.json();
    return result;
};
export const changeNickname = async (user: User, token) => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + `api/users`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token.replace('"', '')}`,
        },
        body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error(res.statusText);
    const result = await res.json();
    return result;
};
