export const getTwoDecimalOfPrice = (price) => {
    if (!price) {
        console.error('Please provide product price to get price in decimal')
        return "-"
    }
     const newPrice = parseFloat(price)

    return newPrice.toFixed(2)
}

export const getAfterPayPrice = (price) => {
    if (!price) {
        console.log(price)
        console.error('Please provide product price to get afterPay value')
        return "-"
    }

    const afterPayPrice = (parseFloat(price) * 1.1) / 4

    return afterPayPrice.toFixed(2)
}