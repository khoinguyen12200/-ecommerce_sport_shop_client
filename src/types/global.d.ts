export { };

declare global {
    /**
     * Now declare things that go in the global namespace,
     * or augment existing declarations in the global namespace.
     */
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
        parent?: number;
        variantName: string;
    }

    interface ProductCartInterface {
        id?: string;
        productId: string;
        quantity: number;
        product?: ProductInterface;
        checked?: boolean;
    }
}

