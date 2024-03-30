'use client'

import ConfirmationModal from '@/components/ConfirmationModal'
import { Context } from '@/context/Provider'
import { useContext, useState } from 'react'
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaPaypal } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";




function Checkout() {
  const [modalOpen, setModalOpen] = useState(false)
  const [checked, setChecked] = useState(false)
  const { total } = useContext(Context)
  const [cep, setCep] = useState('')
  const [number, setNumber] = useState('')

  const checkCep = () => {
    if (cep.length != 8) return alert('Should have 8 digits')
    for (let i = 0; i < cep.length; i++) {
      if (!'1234567890'.includes(cep[i])) return alert('Should be numbers')
    }
    setModalOpen(true)
  }

  return (
    <div>
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
        className={`pt-10 flex flex-col gap-5 pl-10 w-100% ${modalOpen && 'blur-lg'}`}
      >
        <div className='flex flex-col gap-5'>
          <h1 className='text-2xl font-semibold'>Find me</h1>
          <label
            className='flex gap-3 justify-between max-w-[20%]'
            htmlFor='cep'
          >
            <span className='font-bold'>Cep</span>
            <input
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              type='text'
              id='cep'
              className='border-2 border-gray-400 py-4 px-4'
            />
            {!checked && (
              <button
                onClick={checkCep}
                className='bg-black text-white px-4 py-1 opacity-90 hover:opacity-100'
              >
                Apply
              </button>
            )}
          </label>

          {checked && (
            <label
              htmlFor='number'
              className='flex gap-3 justify-between max-w-[20%]'
            >
              <span className='font-bold'>Number</span>
              <input
                type='text'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                id='number'
                className='border-2 border-gray-400'
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
              making purchases online. That's why we want to assure you that
              buying in GAX is a secure and trustworthy experience. Here's why:{' '}
              <br />
              <strong>Advanced Encryption</strong>: At GAX, we utilize
              state-of-the-art encryption technology to safeguard your personal
              and financial information. Every transaction you make is encrypted
              to ensure that your data remains private and secure.
              <br />
              <strong>Secure Payment Gateways</strong>: We partner with
              reputable payment gateways that adhere to stringent security
              standards. Whether you choose to pay by credit card, PayPal, or
              other methods, you can rest assured that your payment details are
              protected.
              <br />
              <strong>Fraud Prevention Measures</strong>: Our platform is
              equipped with robust fraud prevention measures to detect and
              prevent unauthorized activities. We continuously monitor
              transactions to identify any suspicious behavior and take
              immediate action to mitigate risks.
              <br />
              <strong>Trusted Sellers</strong>: We work with trusted sellers and
              vendors who meet our rigorous standards for reliability and
              authenticity. When you make a purchase on GAX, you can be
              confident that you're dealing with reputable sellers who deliver
              quality products.
              <br />
              <strong>Customer Support</strong>: Should you ever encounter any
              issues or have concerns about your purchase, our dedicated
              customer support team is here to assist you every step of the way.
              We are committed to providing prompt and effective support to
              ensure your satisfaction.
              <br />
              Your security and peace of mind are paramount to us at GAX. We are
              continuously enhancing our security measures to provide you with a
              safe and seamless shopping experience. Thank you for choosing GAX
              for your online purchases.
            </p>
          </details>

          <div className='flex flex-col gap-3'>
            <p className='text-xl '>Acceptable payments:</p>
            <ul className='flex gap-3'>
              <li><FaCcVisa size={45} /></li>
              <li><FaCcMastercard size={45} /></li>
              <li><FaPaypal size={45} /></li>
              <li><FaPix size={45} /></li>
            </ul>
          </div>
        </div>
        {/* ----- */}

        <button className='self-start bg-emerald-700 px-10 py-1 mt-4 rounded-lg text-white hover:bg-emerald-800'>Pay</button>
      </div>
    </div>
  )
}

export default Checkout
