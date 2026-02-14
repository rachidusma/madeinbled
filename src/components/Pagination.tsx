'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-dark bg-neutral-dark text-white hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1
        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
              currentPage === page
                ? 'border-primary bg-primary text-white font-bold'
                : 'border-border-dark bg-neutral-dark text-white hover:border-primary'
            }`}
          >
            {page}
          </button>
        )
      })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-dark bg-neutral-dark text-white hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  )
}
