interface BoardResponse {
    id: string;
    title: string;
    content: string;
    hit: number;
    writeDate: string;
    modifyDate: string;
    ip: string;
    nickname: string;
    password: string;
    userId: string;
    category: string;
    animationId: string;
    like: {
        count: string;
        isLike: boolean;
    };
}
