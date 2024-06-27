import { atom } from 'recoil';

export const selectedArticleState = atom<'board' | 'comment' | 'favorite'>({
    key: 'selectedArticleState',
    default: 'board',
});
