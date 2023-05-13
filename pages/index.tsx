import { Inter } from 'next/font/google'
import { useSession,signOut } from "next-auth/react"
import HomeLayout from '@/components/layouts/homeLayout'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { status,data } = useSession()
  return (
    <>
      Home
      {data?.user?.email&&<div>Logged in With {data?.user?.email}</div>}
    </>
  )
}
Home.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};
