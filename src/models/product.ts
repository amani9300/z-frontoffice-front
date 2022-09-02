import { User } from "./user";

export type Product = {
    id?: string;
    user?: User;
    barcode: string;
    reference: string;
    name: string;
    purchasePrice: number;
    price: number;
    includesTax: boolean;
    qty: number;
    measure: string;
    category: string;
    vat: number;
    brand: string;
    supplier: string;
    color: string;
}