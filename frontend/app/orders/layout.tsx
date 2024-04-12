import { getServerSession } from "next-auth";
import Orders from "./page";
import nextAuthOptions from "@/lib/nextAuthOptions";


export default async function OrdersLayout() {
  const session = await getServerSession(nextAuthOptions)
  return (
    <Orders user={session?.user} />
  )
}