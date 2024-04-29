import Products from '@/components/Products'
import Cart from './page'

export default async function CartLayout() {
  return (
    <div className='flex flex-col gap-10'>
      <Cart />
    </div>
  )
}
