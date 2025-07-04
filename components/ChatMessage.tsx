'use client'

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user'
  return (
    <div
      className={`my-2 px-4 py-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${
        isUser
          ? 'bg-blue-500 text-white self-end ml-auto'
          : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white self-start mr-auto'
      }`}
    >
      {content}
    </div>
  )
}
