export { };

declare global {
    interface UserInterface {
        id: string;
        email: string;
        role: string;
        name: string;
        address: string;
        phone: string;
        city: string;
    }

    interface CategoryInterface {
        id: string;
        name: string;
        slug: string;
        uniqueId: string;
        

    }

    interface ProductGalleryInterface {
        id: string;
        path: string;
    }

    interface ProductInterface {
        id: string;
        name: string;
        slug: string;       
        price: number;
        description: string;
        image: string;
        quantity: number;
        categories: CategoryInterface[];
        productGalleries: ProductGalleryInterface[];
        unit: string;
        variants: ProductInterface[];
        parentId?: string;
        variantName: string;
    }

    interface ProductCartInterface {
        id?: string;
        productId: string;
        quantity: number;
        product?: ProductInterface;
        checked?: boolean;
    }

    interface OrderInformation {
        name: string;
        email: string;
        address: string;
        phone: string;
        city: string;
        note: string;
    }

    
}