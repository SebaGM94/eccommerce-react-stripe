export const addItemtoCart = (cartItems, cartItemToAdd) => {
  console.log('cartItems is', cartItems)
  const existinCartItems = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  )

  if (existinCartItems) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}
