export const joinUser = async (user: User) => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + 'api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const result = await res.json();
    if (res.status === 200) return result;
    else return false;
};
export const signInWithEmailAndPassword = async (user: User) => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + 'api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const result = await res.json();
    console.log(res);
    console.log(result);
    if (res.status === 200) return result;
    else return false;
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
