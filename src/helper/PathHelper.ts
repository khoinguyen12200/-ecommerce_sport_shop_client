import ts from "typescript";
import { PUBLIC_PATH } from "../config/config";

export function getProductImagePath(image: string) {
    return PUBLIC_PATH+'uploads/product_images/'+image;
}