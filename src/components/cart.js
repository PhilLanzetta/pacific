import React from 'react'
import useStore from '../context/StoreContext'
import ProductRow from './productRow'
import { HiOutlineXMark } from 'react-icons/hi2'

const Cart = ({ toggleCart }) => {
  const { cart, checkout } = useStore()
  const formattedNum = (num) =>
    Number(num)
      .toFixed(2)
      .replace(/[.,]00$/, '')

  return (
    <section>
      <article>
        <p>CART</p>
        <button onClick={toggleCart}>
          <HiOutlineXMark></HiOutlineXMark>
        </button>
      </article>
      <article>
        {cart.length > 0 ? (
          cart.map((item, index) => <ProductRow key={index} item={item} />)
        ) : (
          <p>Your cart is empty.</p>
        )}
      </article>
      <article>
        <div>
          <div>SUBTOTAL</div>
          <div>
            $
            {checkout.subtotalPrice
              ? formattedNum(checkout.subtotalPrice?.amount)
              : 0}
          </div>
        </div>
        <div>
          <div>TAX</div>
          <div>
            ${checkout.totalTax ? formattedNum(checkout.totalTax?.amount) : 0}
          </div>
        </div>
        <div>
          <div>TOTAL</div>
          <div>
            $
            {checkout.totalPrice
              ? formattedNum(checkout.totalPrice?.amount)
              : 0}
          </div>
        </div>
        <button
          disabled={cart.length === 0}
          onClick={() => window.open(checkout.webUrl)}
        >
          CHECK OUT
        </button>
      </article>
    </section>
  )
}

export default Cart
