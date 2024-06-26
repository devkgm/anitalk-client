interface AnimationResponse extends Animation {
    favorite: {
        count: number;
        isFavorite: boolean;
        userId: string;
    };
}
