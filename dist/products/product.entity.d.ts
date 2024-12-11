import { Category } from '../categories/category.entity';
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category_id: string;
    category: Category;
    created_at: Date;
    updated_at: Date;
}
