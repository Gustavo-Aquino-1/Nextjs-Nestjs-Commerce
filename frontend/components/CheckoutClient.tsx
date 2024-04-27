'use client'

import ConfirmationModal from '@/components/ConfirmationModal'
import { Context } from '@/context/Provider'
import { useContext, useEffect, useState } from 'react'
import { FaCcVisa } from 'react-icons/fa'
import { FaCcMastercard } from 'react-icons/fa'
import { FaPaypal } from 'react-icons/fa'
import { FaPix } from 'react-icons/fa6'
import api from '@/app/api'
import { redirect } from 'next/navigation'
import { TbDiscountCheckFilled } from 'react-icons/tb'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

function CheckoutClient({ user }: { user: any }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [checked, setChecked] = useState(false)
  const { total, cart, setCart, setTotal, buyNow, setBuyNow } = useContext(
    Context,
  ) as any
  const [cep, setCep] = useState('')
  const [number, setNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (
      Object.keys(cart).length == 0 &&
      Object.keys(buyNow || {}).length == 0
    ) {
      redirect('/cart')
    }
  }, [])

  const checkCep = () => {
    if (cep.length != 8) return alert('Should have 8 digits')
    for (let i = 0; i < cep.length; i++) {
      if (!'1234567890'.includes(cep[i])) return alert('Should be numbers')
    }
    setModalOpen(true)
  }

  async function createOrder() {
    setLoading(true)
    try {
      await api.post(
        '/order',
        {
          cep,
          number: +number,
          paymentType: 'pix',
          total,
          products: Object.keys(buyNow || {}).length > 0
            ? [{
                productId: buyNow.id,
                size: buyNow.size,
                quantity: buyNow.quantity,
              }]
            : Object.keys(cart).map((e) => ({
                productId: cart[e].id,
                size: cart[e].size,
                quantity: cart[e].quantity,
              })),
        },
        { headers: { Authorization: user.acess_token } },
      )
      if(Object.keys(buyNow || {}).length > 0) setBuyNow({})
      else setCart({})
      setTotal(0)
      setFinished(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {finished ? (
        <div className='pt-20 flex flex-col justify-center items-center absolute top-1/2 transform -translate-y-1/2 left-0 right-0'>
          <h1 className='text-2xl'>Order made sucessfully, Thank you!</h1>
          <TbDiscountCheckFilled size={250} color='#1e293b' />
          <Link className='text-xl text-slate-700 underline' href='/orders'>
            See my orders
          </Link>
        </div>
      ) : (
        <div className='text-slate-900'>
          <ConfirmationModal
            cep={cep}
            setCep={setCep}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            checked={checked}
            setChecked={setChecked}
          />
          <div
            onClick={() => {
              if (modalOpen) {
                setModalOpen(false)
              }
            }}
            className={`pt-10 flex flex-col gap-5 pl-10 w-100% ${
              modalOpen && 'blur-lg'
            }`}
          >
            <div className='flex flex-col gap-5 max-md:w-[70%]'>
              <h1 className='text-2xl font-semibold'>Find me</h1>
              <label
                className='flex flex-col gap-3 justify-between max-w-[20%] max-md:max-w-[100%]'
                htmlFor='cep'
              >
                <span className='font-bold flex items-end text-xl'>Cep</span>
                <input
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  type='text'
                  id='cep'
                  className='border border-black py-3 px-2 w-full'
                />
              </label>
              {!checked && (
                <button
                  onClick={checkCep}
                  className='bg-slate-800 text-white px-10 py-1 opacity-90 hover:opacity-100 self-start rounded hover:font-semibold'
                >
                  Apply
                </button>
              )}

              {checked && (
                <label
                  htmlFor='number'
                  className='flex flex-col gap-3 justify-between max-w-[20%] max-md:max-w-[100%]'
                >
                  <span className='font-bold flex items-end text-xl'>
                    Number
                  </span>
                  <input
                    type='text'
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    id='number'
                    className='border border-black px-4 py-3'
                  />
                </label>
              )}
            </div>
            {/* ---- */}
            <div className='flex flex-col gap-5'>
              <h1 className='text-2xl font-semibold'>Payment</h1>
              <details>
                <summary className='text-lg font-light'>
                  Why Buy in Gax is Secure
                </summary>
                <p className='max-w-[80%] text-lg mt-2 ml-4'>
                  We understand that security is a top priority when it comes to
                  making purchases online. That&apos;s why we want to assure you
                  that buying in GAX is a secure and trustworthy experience.
                  Here&apos;s why: <br />
                  <strong>Advanced Encryption</strong>: At GAX, we utilize
                  state-of-the-art encryption technology to safeguard your
                  personal and financial information. Every transaction you make
                  is encrypted to ensure that your data remains private and
                  secure.
                  <br />
                  <strong>Secure Payment Gateways</strong>: We partner with
                  reputable payment gateways that adhere to stringent security
                  standards. Whether you choose to pay by credit card, PayPal,
                  or other methods, you can rest assured that your payment
                  details are protected.
                  <br />
                  <strong>Fraud Prevention Measures</strong>: Our platform is
                  equipped with robust fraud prevention measures to detect and
                  prevent unauthorized activities. We continuously monitor
                  transactions to identify any suspicious behavior and take
                  immediate action to mitigate risks.
                  <br />
                  <strong>Trusted Sellers</strong>: We work with trusted sellers
                  and vendors who meet our rigorous standards for reliability
                  and authenticity. When you make a purchase on GAX, you can be
                  confident that you&apos;re dealing with reputable sellers who
                  deliver quality products.
                  <br />
                  <strong>Customer Support</strong>: Should you ever encounter
                  any issues or have concerns about your purchase, our dedicated
                  customer support team is here to assist you every step of the
                  way. We are committed to providing prompt and effective
                  support to ensure your satisfaction.
                  <br />
                  Your security and peace of mind are paramount to us at GAX. We
                  are continuously enhancing our security measures to provide
                  you with a safe and seamless shopping experience. Thank you
                  for choosing GAX for your online purchases.
                </p>
              </details>

              <div className='flex flex-col gap-3'>
                <p className='text-xl '>Acceptable payments:</p>
                <ul className='flex gap-3'>
                  <li>
                    <FaCcVisa size={45} />
                  </li>
                  <li>
                    <FaCcMastercard size={45} />
                  </li>
                  <li>
                    <FaPaypal size={45} />
                  </li>
                  <li>
                    <FaPix size={45} />
                  </li>
                </ul>
              </div>
            </div>
            {/* ----- */}

            {number.length > 0 && (
              <button
                onClick={createOrder}
                disabled={loading}
                className='self-start bg-emerald-700 px-10 py-1 mt-4 rounded-lg text-white hover:bg-emerald-800 disabled:cursor-not-allowed'
              >
                Pay
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutClient
