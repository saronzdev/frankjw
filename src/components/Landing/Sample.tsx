interface Props {
  text: string
  src: string
}

export function Sample(data: Props) {
  return (
    <div class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
      <img
        src={data.src}
        alt={`Prducto ${data.text}`}
        width={200}
        height={200}
        class="mb-4 w-full h-auto max-w-[200px] rounded-md"
      />
      <h4 class="text-center text-lg mb-2">{data.text}</h4>
    </div>
  )
}
