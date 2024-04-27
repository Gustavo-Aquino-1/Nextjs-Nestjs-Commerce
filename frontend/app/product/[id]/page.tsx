import api from '@/app/api'
import Avaliations from '@/components/Avaliations'
import Favorite from '@/components/Favorite'
import ProductOptions from '@/components/ProductOptions'
import Products from '@/components/Products'
import nextAuthOptions from '@/lib/nextAuthOptions'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'
import { CiHeart } from 'react-icons/ci'

interface ProductProps {
  params: { id: number }
}

async function Product({ params: { id } }: ProductProps) {
  const session = await getServerSession(nextAuthOptions)
  const token = session?.user.acess_token
  const { data: product } = (await api.get('/product/' + id)) as any
  // console.log(product, id)
  return (
    <div className='pl-10 flex flex-col gap-10 pt-10 pb-10 max-md:p-1 max-md:pb-10 max-md:pt-5 bg-[#F6F6F6]'>
      <div className='flex justify-center gap-5'>
        <p className='text-2xl font-bold text-center'>{product.name}</p>
        <Favorite token={token} productId={id} />
      </div>
      <div className='flex justify-center min-w-[70%] max-w-[70%] max-md:max-w-[90%] m-auto text-xl mt-[-20px]'>
        <p className=''>
          {!product.rate._avg.rate
            ? "This product don't have avaliations yet"
            : `${product.rate._avg.rate} ${"★".padEnd(product.rate._avg.rate, "★")} (${product.rate._count.rate})
          `}
        </p>
      </div>
      <ProductOptions product={product} />
      <div className='flex flex-col gap-5 min-w-[70%] max-w-[70%] max-md:max-w-[90%] max-md:pl-4 m-auto'>
        <p className='font-bold text-xl'>{`${product.name} Description`}</p>
        <p className='first-letter:capitalize'>{product.description}</p>
      </div>
      {product.rate._count.rate >= 1 && <Avaliations productId={product.id} />}
      <div className='min-w-[70%] max-w-[70%] flex flex-col gap-5 max-md:max-w-[90%] max-md:pl-4 m-auto'>
        <p className='font-bold text-xl'>Is secure buy in GAX ?</p>
        In the digital realm where security concerns loom large, GAX stands as a
        bastion of trustworthiness and reliability. Here&apos;s why purchasing
        through GAX is akin to wrapping your transactions in an impenetrable
        shield: Uncompromising Seller Verification: Before a seller earns the
        privilege to list on GAX, they must undergo an exhaustive vetting
        process. This ensures that only reputable and trustworthy merchants
        populate our marketplace, giving you the confidence to transact without
        hesitation.
        <br /> <br />
        Bank-Grade Encryption: Every transaction conducted on GAX is enveloped
        in layers of sophisticated encryption. From the moment you hit
        &apos;checkout&apos; to the final confirmation, your financial data is
        transformed into an unreadable cipher, impervious to prying eyes and
        malicious intent.
        <br /> <br />
        Fortified Payment Gateways: Partnering with industry-leading payment
        gateways, GAX provides an additional fortress of security. These
        gateways are not just gatekeepers; they&apos;re vigilant sentinels,
        standing guard over your sensitive payment information, ensuring it
        remains under lock and key.
        <br /> <br />
        Responsive Customer Support: In the unlikely event of encountering a
        hiccup or having a query, GAX&apos;s dedicated support team is at your
        beck and call. Think of them as your personal security detail, swiftly
        addressing concerns and resolving issues, ensuring your shopping journey
        remains smooth and worry-free.
        <br /> <br />
        Escrow Services: Shielding Your Transactions: For transactions of
        substantial value, GAX offers escrow services, providing an added layer
        of protection. Funds are securely held in escrow until both parties
        fulfill their obligations, mitigating risks and fostering a fair and
        transparent exchange.
        <br /> <br />
        Vigilant Surveillance: GAX&apos;s watchful eyes are ever-present,
        scanning the digital landscape for any signs of suspicious activity. Our
        proactive approach to monitoring ensures that any potential threats are
        swiftly identified and neutralized, maintaining the integrity and
        security of our platform.
        <br /> <br />
        Transparent and Ethical Practices: Transparency isn&apos;t just a
        buzzword at GAX; it&apos;s a guiding principle. Our policies are crystal
        clear, designed to protect your rights as a buyer. We operate with the
        highest ethical standards, ensuring fairness and accountability in every
        transaction.
        <br /> <br />
        In a world fraught with uncertainties, GAX stands tall as your trusted
        ally in the realm of online shopping. With us, you&apos;re not just
        making a purchase; you&apos;re investing in peace of mind. So go ahead,
        shop with confidence, and experience the epitome of secure shopping.
      </div>
      <Products
        filters={{ line: product.line, take: 3 }}
        productId={product.id}
        title='More Products'
      />
    </div>
  )
}

export default Product
