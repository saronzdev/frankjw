import fb from '@/assets/fb.svg'
import ws from '@/assets/ws.svg'
import ig from '@/assets/ig.svg'
import mail from '@/assets/mail.svg'

const Links = [
  { icon: fb, name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100093441805320' },
  { icon: ws, name: 'WhatsApp', href: 'https://api.whatsapp.com/send?phone=5353444690' },
  { icon: ig, name: 'Instagram', href: 'https://instagram.com/frank_joyeria_cuba' },
  { icon: mail, name: 'Email', href: 'mailto:frankjoyeriacuba@gmail.com' }
]

export function ContactMe() {
  return (
    <nav className="flex space-x-4">
      {Links.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-yellow-100 hover:to-yellow-200 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          aria-label={item.name}
        >
          <img className="w-8 h-8" src={item.icon} alt={item.name} />
        </a>
      ))}
    </nav>
  )
}
