import { atom } from 'recoil';

export const animationState = atom({
    key: 'animationState',
    default: null,
});

export const hotAnimationState = atom({
    key: 'hotAnimationState',
    default: [],
});

export const hotBoardState = atom({
    key: 'hotBoardState',
    default: [],
});
