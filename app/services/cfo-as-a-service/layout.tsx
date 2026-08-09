import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Virtual CFO Services for Growing Businesses | Finsaar',
  description: "Finsaar's CFO as a Service brings senior finance leadership into your business — AI-enabled, led by experienced finance professionals.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
