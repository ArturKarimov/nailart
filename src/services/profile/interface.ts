export interface IStaffRequest {
    name: string;
    specialization: string;
    weight: number;
    information: string;
    api_id: string;
    hidden: number;
    fired: number;
    user_id: number;
}

export interface IStaffResponse {
    id: number;
    api_id: string;
    name: string;
    specialization: string;
    position: unknown;
    show_rating: number;
    rating: number;
    votes_count: number;
    user_id: number;
    avatar: string;
    avatar_big: string;
    comments_count: number;
    weight: number;
    information: string;
    hidden: number;
    fired: number;
    status: number;
}