import ts from "typescript";
import { PUBLIC_PATH } from "../config/config";

export function getProductImagePath(image: string) {
    return PUBLIC_PATH+'uploads/product_images/'+image;
}

export function getProductGalleryPath(image: string) {
    return  PUBLIC_PATH+'uploads/product_gallery/'+image;
}

export function getLinkToPage(page: number) {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('page', page.toString());
    return urlParams.toString();
}