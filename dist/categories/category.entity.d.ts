import { Product } from '../products/product.entity';
export declare class Category {
    id: string;
    name: string;
    description: string;
    image: string;
    products: Product[];
    created_at: Date;
    updated_at: Date;
}
