import fb from '@/assets/fb.svg'
import ws from '@/assets/ws.svg'
import ig from '@/assets/ig.svg'
import mail from '@/assets/mail.svg'

const Links = [
  { icon: fb, name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100093441805320' },
  { icon: ws, name: 'WhatsApp', href: 'https://api.whatsapp.com/send?phone=5352921813' },
  { icon: ig, name: 'Instagram', href: 'https://instagram.com/frank_joyeria_cuba' },
  { icon: mail, name: 'Email', href: 'mailto:frankjoyeria91@gmail.com' }
]

export function ContactMe() {
  return (
    <nav class="flex space-x-4">
      {Links.map((item) => (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          class="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
          aria-label={item.name}
        >
          <img src={item.icon} alt={item.name} width={26} height={26} />
        </a>
      ))}
    </nav>
  )
}
