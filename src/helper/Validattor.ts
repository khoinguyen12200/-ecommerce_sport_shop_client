import React from 'react'

export function validatePhone(phone: string): boolean {
    //Viet Nam Phone
    const regex = /^((09|03|07|08|05)+([0-9]{8})\b)$/
    return regex.test(phone)
}