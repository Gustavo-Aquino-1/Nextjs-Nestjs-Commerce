'use client'

import { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'

function Modal({ modalOpen, setModalOpen, message }) {
  useEffect(() => {
    if (modalOpen) {
      setTimeout(() => {
        setModalOpen(false)
      }, [3000])
    }
  }, [modalOpen])

  return (
    <>
      <div
        id='default-modal'
        // tabIndex='-1'
        // aria-hidden={!modalOpen}
        className={`${
          modalOpen ? '' : 'hidden' // showing modal when modalOpen is true
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className='relative p-4 w-full max-w-2xl max-h-full'>
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 gap-5'>
              <h1 className='text-xl text-white'>
                {message}
              </h1>
              <FaCheckCircle size={30} color='green' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
