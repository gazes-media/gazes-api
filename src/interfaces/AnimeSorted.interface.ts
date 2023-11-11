export interface AnimeSorted {
    id: number;
    episodes: {
        episode: number;
        duration: number;
        time: number;
        date: Date;
    }[];
}
