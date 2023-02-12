export interface ILocationState {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    from: string;
    state: {
        background: ILocationState | null;
    };
}

export interface IMainResponse<T> {
    success: boolean;
    data: T;
    meta: [];
}

export interface IBookStaff {
    id: number;
    name: string;
    bookable: boolean;
    specialization: string;
    position: object;
    show_rating: number;
    rating: number;
    votes_count: number;
    avatar: string;
    comments_count: number;
    weight: string;
    information: string;
    seance_date: string;
    seances: [];
}

export interface IBookServices {
    categories: IBookServicesCategories[];
    services: IBookServicesServices[];
}

interface IBookServicesCategories {
    id: number;
    title: string;
    sex: number;
    weight: number;
    api_id: string;
}

export interface IBookServicesServices {
    id: number;
    title: string;
    category_id: number;
    weight: number;
    price_min: number;
    price_max: number;
    discount: number;
    comment: string;
    active: number;
    prepaid: string;
    sex: number;
    seance_length: number;
    image: string;
}

export interface IBookSeances {
    time: string;
    seance_length: number;
    datetime: string;
}

export interface IBookRecordResponse {
    id: number;
    record_id: number;
    record_hash: string;
}

export interface IBookRecordRequest {
    phone: string;
    fullname: string;
    email?: string;
    comment?: string;
    appointments: IBookRecordAppointments[]
}

interface IBookRecordAppointments {
    id: number;
    services: number[];
    staff_id: number;
    datetime: number | string;
}
