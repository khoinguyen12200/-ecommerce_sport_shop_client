import ts from 'typescript'


export function mapInvoiceState (state: string) {
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

export function mapPaymentState(state: string) {
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