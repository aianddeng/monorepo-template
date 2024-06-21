import { Suspense } from 'react'
import { Button } from 'shadcn/ui/button'

export default function Home() {
  return (
    <Suspense>
      <div className="flex h-screen w-screen items-center justify-center">
        <Button>Hello World</Button>
      </div>
    </Suspense>
  )
}
