'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

interface ConfirmationModalProps {
  modalOpen: boolean
  setModalOpen: any
  checked: boolean
  setChecked: any
  cep: string
  setCep: any
}

function ConfirmationModal({
  modalOpen,
  setModalOpen,
  checked,
  setChecked,
  cep,
  setCep,
}: ConfirmationModalProps) {
  const [address, setAddress] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAddress = async () => {
      setLoading(true)
      if (modalOpen) {
        try {
          const { data } = await axios.get(
            `https://viacep.com.br/ws/${cep}/json/`,
          )
          if (data.erro) throw new Error()
          setAddress(data)
          setLoading(false)
        } catch (error) {
          setModalOpen(false)
          alert('Invalid')
          setCep('')
          setLoading(false)
        }
      }
    }
    getAddress()
  }, [modalOpen])

  return (
    <div>
      {modalOpen && !loading && (
        <div className='absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-center z-50'>
          {' '}
          {/* when blur comes will not override this div because it will go up in this because z-50 it's like bring to first plan. */}
          <div className='flex flex-col gap-2 justify-center p-5 rounded-md bg-slate-800 text-white text-xl shadow-lg shadow-gray-800'>
            <p>
              <strong>Street:</strong>
              {` ${address?.logradouro}`}
            </p>
            <p>
              <strong>Neighbourhood:</strong>
              {` ${address?.bairro}`}
            </p>
            <p>
              <strong>City:</strong>
              {` ${address?.localidade}`}
            </p>
            <p>
              <strong>Cep:</strong>
              {` ${address?.cep}`}
            </p>
            <div className='flex gap-5 self-center mt-2'>
              <button
                onClick={() => {
                  setChecked(false), setModalOpen(false)
                }}
                className='px-4 py-1 bg-red-500 text-white rounded-md'
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setChecked(true), setModalOpen(false)
                }}
                className='px-4 py-1 bg-emerald-500 text-white rounded-md'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConfirmationModal
