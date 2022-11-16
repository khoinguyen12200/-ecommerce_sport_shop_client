import ts from 'typescript'

export enum InvoiceState {
    PENDING = 'pending',
    SHIPPING = 'shipping',
    CANCLED = 'cancled',
    COMPLETED = 'completed'
}

export function mapInvoiceState (state?: string) {
    switch (state) {
        case 'pending':
            return 'Chờ xử lý'
        case 'shipping':
            return 'Đang giao hàng'
        case 'cancled':
            return 'Đã hủy'
        case 'completed':
            return 'Đã hoàn thành'
        default:
            return 'Chờ xử lý'
    }
}

export enum PaymentState {
    PENDING = 'pending',
    COMPLETED = 'completed'
}

export function mapPaymentState(state?: string) {
    switch (state) {
        case 'pending':
            return 'Chưa thanh toán'
        case 'completed':
            return 'Đã thanh toán'
        default:
            return 'Chưa thanh toán'
    }
}

export const DEFAULT_COUPONS = [
    'FREE_SHIPPING_1M'
];

export const ROLES = {
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER'
}

export const formatVND = (number: number) => {
    return number.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}