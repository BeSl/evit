export interface Product {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number,
    price_action: number;
    wishlist_user: boolean;
    hotsale: boolean;
    min_ost: boolean; 
}
