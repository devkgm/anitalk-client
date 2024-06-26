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
export const signInWithEmailAndPassword = async (user: User): Promise<User> => {
    try {
        const response = await apiClient.post(`login`, JSON.stringify(user));
        const data: User = response.data.data.user;
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
    try {
        const response = await apiClient.get(`users/email/${user.email}`);
        const data = response.data.data.exist;
        return data;
    } catch (err) {
        console.error(err);
        throw new Error('이메일 조회 실패');
    }
};

export const changePassword = async (user: User) => {
    try {
        await apiClient.put(`users/password`, user);
    } catch (err) {
        console.error(err);
        throw new Error('비밀번호 변경 실패');
    }
};
export const changeNickname = async (user: User, token) => {
    try {
        const response = await apiClient.put(`users`, user);
        const data = response.data.data;
        return data;
    } catch (err) {
        console.error(err);
        throw new Error('비밀번호 변경 실패');
    }
};
