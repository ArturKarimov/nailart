export interface IServicesResponse {
    id: number;
    title: string;
    category_id: string;
    price_min: string;
    price_max: string;
    discount: string;
    comment: string;
    weight: string;
    active: string;
    api_id: string;
    staff: {
        id: string;
        seance_length: string;
    }[];
}