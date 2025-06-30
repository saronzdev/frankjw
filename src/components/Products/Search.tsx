interface Props {
  searchTerm: string
  setSearchTerm: (value: string) => void
  handlerSearch: (term: string) => void
  placeholder: string
}

export function Search({ searchTerm, setSearchTerm, handlerSearch, placeholder }: Props) {
  return (
    <div className="flex justify-center">
      <div className="relative">
        <input
          className="w-72 px-4 py-2 rounded-lg border border-gray-500 focus:outline-none focus:border-black"
          type="text"
          placeholder={placeholder}
          onChange={(e) => handlerSearch((e.target as HTMLInputElement).value)}
          value={searchTerm}
        />
        {searchTerm && (
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setSearchTerm('')}
          >
            <svg className="cursor-pointer w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
