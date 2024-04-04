import { getServerSession } from "next-auth";
import Orders from "./page";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";


export default async function OrdersLayout() {
  const session = await getServerSession(nextAuthOptions)
  return (
    <Orders user={session?.user} />
  )
}