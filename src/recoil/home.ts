import { atom } from 'recoil';

export const animationState = atom({
    key: 'animationState',
    default: null,
});

export const hotAnimationState = atom({
    key: 'hotAnimationState',
    default: null,
});

export const hotBoardState = atom({
    key: 'hotBoardState',
    default: null,
});

export const homePageState = atom({
    key: 'homePageState',
    default: 0,
});
