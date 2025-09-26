import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/guardian')({
  component: Guardian,
})

function Guardian() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-afacad font-normal text-purple-600">/guardian</h1>
    </div>
  )
}