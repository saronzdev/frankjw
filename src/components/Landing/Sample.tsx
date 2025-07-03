interface SampleProps {
  text: string
  src: string
}

export function Sample({ text, src }: SampleProps) {
  return (
    <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="overflow-hidden rounded-xl mb-4">
        <img
          src={src}
          alt={`Producto ${text}`}
          className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h4 className="text-center text-lg font-medium text-gray-800 group-hover:text-yellow-600 transition-colors">{text}</h4>
    </div>
  )
}
