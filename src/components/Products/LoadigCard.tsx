export function LoadingCard() {
  return (
    <div className="min-h-screen flex items-center justify-center m-4">
      <div className="p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-light">Cargando...</p>
        </div>
      </div>
    </div>
  )
}
