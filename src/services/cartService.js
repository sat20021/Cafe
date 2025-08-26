// Cart Service for syncing cart data between guest and logged-in users

class CartService {
  constructor() {
    this.CART_KEY = 'miniCafeCart';
    this.USER_CART_KEY = 'miniCafeUserCart';
  }

  // Get cart from localStorage
  getCart() {
    try {
      const cart = localStorage.getItem(this.CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error getting cart:', error);
      return [];
    }
  }

  // Save cart to localStorage
  saveCart(cart) {
    try {
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  // Get user-specific cart
  getUserCart(userId) {
    try {
      const userCart = localStorage.getItem(`${this.USER_CART_KEY}_${userId}`);
      return userCart ? JSON.parse(userCart) : [];
    } catch (error) {
      console.error('Error getting user cart:', error);
      return [];
    }
  }

  // Save user-specific cart
  saveUserCart(userId, cart) {
    try {
      localStorage.setItem(`${this.USER_CART_KEY}_${userId}`, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving user cart:', error);
    }
  }

  // Add item to cart
  addToCart(item, userId = null) {
    const cart = userId ? this.getUserCart(userId) : this.getCart();
    
    // Check if item already exists
    const existingItemIndex = cart.findIndex(cartItem => 
      cartItem.id === item.id && cartItem.variant === item.variant
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart[existingItemIndex].quantity += item.quantity || 1;
    } else {
      // Add new item
      cart.push({
        ...item,
        quantity: item.quantity || 1,
        addedAt: new Date().toISOString()
      });
    }

    if (userId) {
      this.saveUserCart(userId, cart);
    } else {
      this.saveCart(cart);
    }

    return cart;
  }

  // Remove item from cart
  removeFromCart(itemId, variant = null, userId = null) {
    const cart = userId ? this.getUserCart(userId) : this.getCart();
    
    const filteredCart = cart.filter(item => 
      !(item.id === itemId && (!variant || item.variant === variant))
    );

    if (userId) {
      this.saveUserCart(userId, filteredCart);
    } else {
      this.saveCart(filteredCart);
    }

    return filteredCart;
  }

  // Update item quantity
  updateQuantity(itemId, quantity, variant = null, userId = null) {
    const cart = userId ? this.getUserCart(userId) : this.getCart();
    
    const updatedCart = cart.map(item => {
      if (item.id === itemId && (!variant || item.variant === variant)) {
        return { ...item, quantity: Math.max(0, quantity) };
      }
      return item;
    }).filter(item => item.quantity > 0);

    if (userId) {
      this.saveUserCart(userId, updatedCart);
    } else {
      this.saveCart(updatedCart);
    }

    return updatedCart;
  }

  // Clear cart
  clearCart(userId = null) {
    if (userId) {
      this.saveUserCart(userId, []);
    } else {
      this.saveCart([]);
    }
  }

  // Get cart count
  getCartCount(userId = null) {
    const cart = userId ? this.getUserCart(userId) : this.getCart();
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  }

  // Get cart total
  getCartTotal(userId = null) {
    const cart = userId ? this.getUserCart(userId) : this.getCart();
    return cart.reduce((total, item) => {
      const price = item.price || item.originalPrice || 0;
      return total + (price * (item.quantity || 0));
    }, 0);
  }

  // Merge guest cart with user cart on login
  mergeCartOnLogin(userId) {
    const guestCart = this.getCart();
    const userCart = this.getUserCart(userId);
    
    if (guestCart.length === 0) {
      return userCart;
    }

    // Merge items, combining quantities for same items
    const mergedCart = [...userCart];
    
    guestCart.forEach(guestItem => {
      const existingItemIndex = mergedCart.findIndex(userItem => 
        userItem.id === guestItem.id && userItem.variant === guestItem.variant
      );

      if (existingItemIndex > -1) {
        // Combine quantities
        mergedCart[existingItemIndex].quantity += guestItem.quantity || 0;
      } else {
        // Add new item
        mergedCart.push(guestItem);
      }
    });

    // Save merged cart to user cart and clear guest cart
    this.saveUserCart(userId, mergedCart);
    this.clearCart(); // Clear guest cart

    return mergedCart;
  }

  // Sync cart across devices (for logged-in users)
  async syncCartToServer(userId, cart) {
    try {
      // In a real app, you would send the cart to your backend
      // For now, we'll just save it locally
      this.saveUserCart(userId, cart);
      
      // Mock API call
      // await fetch('/api/cart/sync', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId, cart })
      // });
      
      return true;
    } catch (error) {
      console.error('Error syncing cart to server:', error);
      return false;
    }
  }

  // Load cart from server (for logged-in users)
  async loadCartFromServer(userId) {
    try {
      // In a real app, you would fetch the cart from your backend
      // For now, we'll just return the local cart
      
      // Mock API call
      // const response = await fetch(`/api/cart/${userId}`);
      // const serverCart = await response.json();
      // this.saveUserCart(userId, serverCart);
      // return serverCart;
      
      return this.getUserCart(userId);
    } catch (error) {
      console.error('Error loading cart from server:', error);
      return this.getUserCart(userId);
    }
  }
}

export const cartService = new CartService();
export default cartService;

