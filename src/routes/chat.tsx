import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/chat')({
  component: Chat,
})

function Chat() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-afacad font-bold text-red-600">/chat</h1>
    </div>
  )
}