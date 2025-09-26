import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-afacad font-bold text-blue-600">/</h1>
    </div>
  )
}
