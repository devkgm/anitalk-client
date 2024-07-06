import { atom } from 'recoil';

export const selectedArticleState = atom<'board' | 'comment' | 'favorite' | 'review'>({
    key: 'selectedArticleState',
    default: 'board',
});
