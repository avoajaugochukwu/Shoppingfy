import { getTwoDecimalOfPrice } from './productUtils'

export const getCartTotalAmount = (cartItems) => {
    if (cartItems.length > 0) {
        const prices = cartItems.map(item => parseFloat(item.price))

        const totalPrice = prices.reduce((a, b) => a + b)
        return getTwoDecimalOfPrice(totalPrice)
    }

    return 0

}