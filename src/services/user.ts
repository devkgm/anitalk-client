export const joinUser = async (user: User) => {
    const result = await fetch(import.meta.env.VITE_BASE_URL + 'api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    console.log(result);
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
    if (res.status === 200) return result;
    else return false;
};
