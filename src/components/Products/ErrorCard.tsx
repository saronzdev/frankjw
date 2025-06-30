interface Props {
  message: string
}

export function ErrorCard({ message }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center m-4">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
            <svg className="w-1/2 h-1/2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-black">Error</h3>
            <p className="text-gray-600 font-light max-w-sm">{message}</p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    </div>
  )
}
