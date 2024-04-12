import CheckoutClient from "@/components/CheckoutClient"
import nextAuthOptions from "@/lib/nextAuthOptions"
import { getServerSession } from "next-auth"

async function Checkout() {
  const session = await getServerSession(nextAuthOptions)
  return (
    <CheckoutClient user={session?.user} />
  )
}

export default Checkout
