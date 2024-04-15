'use client'

interface DropDownProps {
  setName: any
  focus: boolean
  setFocus: any
  name: string
}

function DropDown({ setName, focus, setFocus, name }: DropDownProps) {
  return (
    <>
      {focus && (
        <div className='w-[85%] max-md:w-[70%] text-xl dropdown'>
          {['Air Max Plus Drift', 'Air Max 90', 'Liverpool 2022/23']
            .filter((e) => e.toLowerCase().includes(name.trim().toLowerCase()))
            .map((e) => (
              <p
                className='p-2 hover:bg-gray-300 cursor-pointer dropdown'
                key={e}
                onClick={() => {
                  setName(e), setFocus(false)
                }}
              >
                {e}
              </p>
            ))}
        </div>
      )}
    </>
  )
}

export default DropDown
