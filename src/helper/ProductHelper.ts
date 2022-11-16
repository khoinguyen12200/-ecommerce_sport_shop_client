import ts from 'typescript';
import { PaymentMethodInterface } from '../types/InvoiceInterfaces';

export function getProductName(product: ProductInterface) {
    let name = product.name;
    if(product.parentId) {
        name += ' - '+product.variantName;
    }
    return name;
}

export function getPaymentMethod(paymentMethod: PaymentMethodInterface) {
    switch(paymentMethod) {
        case PaymentMethodInterface.CASH:
            return 'Tiền mặt';
        case PaymentMethodInterface.VNPAY:
            return 'VNPAY';
        default:
            return 'Không xác định';
    }
}
