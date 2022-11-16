import ts from 'typescript';

export enum PaymentMethodInterface {
    CASH = "cash",
    VNPAY = "vnpay"
}

export enum InvoiceStateInterface {
    PENDING = "pending",
    SHIPPING = "shipping",
    CANCLED = "cancled",
    COMPLETED = "completed"
}

export enum InvoicePaymentStatusInterface {
    PENDING = "pending",
    COMPLETED = "completed"
}

export interface InvoiceItemInterface {
    id: string;
    cost: number;
    product: ProductInterface;
    quantity: number;
    productId?:string
}

export interface InvoiceInterface {
    id: string;
    name: string;
    email: string;
    userId?: string;
    user?: UserInterface;
    address: string;
    phone: string;
    city: string;
    note: string;
    paymentMethod: PaymentMethodInterface;
    state: InvoiceStateInterface;
    paymentState: InvoicePaymentStatusInterface;
    shippingFee: number;
    total: number;
    invoiceItems: InvoiceItemInterface[];
    coupons: CouponInterface[],
    createdAt: {
        date: string;
    };
}

export interface CouponInterface {
    code: string;
    discount: number;
    id: string;
    title: string;
}