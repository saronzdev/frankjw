import fb from '@/assets/fb.svg'
import ws from '@/assets/ws.svg'
import ig from '@/assets/ig.svg'
import mail from '@/assets/mail.svg'

const socialLinks = [
  {
    icon: fb,
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100093441805320',
    color: 'hover:bg-blue-50 hover:text-blue-600'
  },
  {
    icon: ws,
    name: 'WhatsApp',
    href: 'https://api.whatsapp.com/send?phone=5353444690',
    color: 'hover:bg-green-50 hover:text-green-600'
  },
  {
    icon: ig,
    name: 'Instagram',
    href: 'https://instagram.com/frank_joyeria_cuba',
    color: 'hover:bg-pink-50 hover:text-pink-600'
  },
  {
    icon: mail,
    name: 'Email',
    href: 'mailto:frankjoyeriacuba@gmail.com',
    color: 'hover:bg-gray-50 hover:text-gray-700'
  }
]

export function ContactMe() {
  return (
    <nav className="flex space-x-4">
      {socialLinks.map(({ icon, name, href, color }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-4 bg-white/80 backdrop-blur-sm ${color} rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 border border-gray-200/50`}
          aria-label={name}
        >
          <img className="w-6 h-6" src={icon} />
        </a>
      ))}
    </nav>
  )
}
