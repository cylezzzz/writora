'use client'

import { useEffect, useState } from 'react'

interface Page {
  id: string
  title: string
  content: string
  pageNumber: number
}

interface EditorViewProps {
  pages: Page[]
}

export function EditorView({ pages }: EditorViewProps) {
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)

  useEffect(() => {
    if (!selectedPage && pages.length > 0) {
      setSelectedPage(pages[0])
    }
  }, [pages])

  return (
    <div className="flex h-full">
      <aside className="w-1/4 border-r bg-gray-50 dark:bg-gray-800 p-4 overflow-y-auto">
        <h2 className="text-sm font-semibold mb-2">Seiten</h2>
        <ul className="space-y-1">
          {pages.map((page) => (
            <li key={page.id}>
              <button
                onClick={() => setSelectedPage(page)}
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedPage?.id === page.id
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {page.pageNumber}. {page.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        {selectedPage ? (
          <>
            <h1 className="text-xl font-bold mb-4">{selectedPage.title}</h1>
            <div className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
              {selectedPage.content}
            </div>
          </>
        ) : (
          <p className="text-gray-500">Keine Seite ausgewählt.</p>
        )}
      </main>
    </div>
  )
}
