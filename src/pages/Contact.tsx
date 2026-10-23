import { Phone, Mail, MapPin } from 'lucide-preact'
import { Social } from '@/components/landing/Social'
import { Button } from '@/ui/Button'
import { usePageMeta } from '@/shared/meta'

export function Contact() {
  usePageMeta({
    title: 'Contacto | Frank Joyería',
    description:
      'Visítanos en Matanzas o Habana, llámanos al +5353444690, escríbenos por WhatsApp o email. Conoce nuestros horarios de atención.',
    path: '/contact'
  })
  return (
    <main class="min-h-dvh bg-surface">
      <section class="border-b border-line bg-gradient-to-b from-surface-2 to-bg px-4 py-14 md:py-18">
        <div class="mx-auto max-w-2xl text-center">
          <h1 class="font-display text-[2rem] font-semibold uppercase tracking-[0.05em] text-ink sm:text-[2.5rem]">
            Contáctanos
          </h1>
          <p class="mt-4 text-lg leading-relaxed text-ink-soft">
            Estamos aquí para ayudarte a encontrar la joya perfecta o responder cualquier consulta que tengas.
          </p>
        </div>
      </section>

      <div class="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
        <section class="flex flex-col gap-6">
          <h2 class="font-display text-2xl font-semibold tracking-[0.05em] text-ink">Información de contacto</h2>

          <div class="flex items-start gap-4 border-b border-line pb-6">
            <div class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-soft text-gold-deep">
              <Phone size={18} aria-hidden="true" />
            </div>
            <div class="flex flex-col gap-0.5">
              <h3 class="text-xs font-medium uppercase tracking-[0.06em] text-ink-muted">Teléfono</h3>
              <a
                href="tel:+5353444690"
                class="text-[0.95rem] font-medium text-ink underline-offset-4 hover:text-gold-deep hover:underline"
                aria-label="Llamar al teléfono +5353444690"
              >
                +5353444690
              </a>
            </div>
          </div>

          <div class="flex items-start gap-4 border-b border-line pb-6">
            <div class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-soft text-gold-deep">
              <Mail size={18} aria-hidden="true" />
            </div>
            <div class="flex flex-col gap-0.5">
              <h3 class="text-xs font-medium uppercase tracking-[0.06em] text-ink-muted">Email</h3>
              <a
                href="mailto:frankjoyeriacuba@gmail.com"
                class="break-all text-[0.95rem] font-medium text-ink underline-offset-4 hover:text-gold-deep hover:underline"
                aria-label="Enviar correo a frankjoyeriacuba@gmail.com"
              >
                frankjoyeriacuba@gmail.com
              </a>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-soft text-gold-deep">
              <MapPin size={18} aria-hidden="true" />
            </div>
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-0.5">
                <h3 class="text-xs font-medium uppercase tracking-[0.06em] text-ink-muted">Ubicación</h3>
                <address class="text-[0.95rem] not-italic leading-relaxed text-ink-soft">
                  <strong class="font-semibold text-ink">Calle Medio</strong> entre <strong class="font-semibold text-ink">2 de Mayo</strong> y <strong class="font-semibold text-ink">América</strong>
                  <br />
                  Matanzas, Cuba
                </address>
              </div>
              <address class="text-[0.95rem] not-italic leading-relaxed text-ink-soft">
                <strong class="font-semibold text-ink">Calle San Benigno #169</strong> entre <strong class="font-semibold text-ink">Vía Blanca</strong> y <strong class="font-semibold text-ink">Serafines</strong>
                <br />
                Cerro, Habana, Cuba
              </address>
            </div>
          </div>
        </section>

        <section class="flex flex-col gap-4">
          <h3 class="font-display text-lg text-ink">Síguenos en redes sociales</h3>
          <Social />
        </section>
      </div>

      <section class="border-y border-line bg-gradient-to-b from-surface-2 to-bg px-4 py-14">
        <div class="mx-auto max-w-6xl">
          <div class="mb-8 text-center">
            <h2 class="font-display text-2xl font-semibold tracking-[0.05em] text-ink sm:text-3xl">
              Horarios de atención
            </h2>
            <p class="mt-2 text-ink-muted">Estamos disponibles para atenderte en los siguientes horarios</p>
          </div>
          <div class="grid gap-4 sm:grid-cols-3">
            <div class="flex flex-col gap-1 rounded-lg border border-line p-5 text-center">
              <h3 class="font-display text-lg text-ink">Lunes - Sábado</h3>
              <p class="text-sm text-ink-soft">9:00 AM - 4:00 PM</p>
            </div>
            <div class="flex flex-col gap-1 rounded-lg border border-line p-5 text-center">
              <h3 class="font-display text-lg text-ink">Domingos</h3>
              <p class="text-sm text-ink-soft">Cerrado</p>
            </div>
            <div class="flex flex-col gap-1 rounded-lg border border-line p-5 text-center">
              <h3 class="font-display text-lg text-ink">WhatsApp</h3>
              <p class="text-sm text-ink-soft">24/7 Disponible</p>
            </div>
          </div>
        </div>
      </section>

      <section class="px-4 py-16 md:py-20">
        <div class="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <h2 class="font-display text-2xl font-semibold tracking-[0.05em] text-ink sm:text-3xl">
            ¿Listo para crear algo especial?
          </h2>
          <p class="leading-relaxed text-ink-soft">
            Contáctanos hoy mismo y descubre cómo podemos ayudarte a crear la joya perfecta para ti o tus seres
            queridos.
          </p>
          <Button
            variant="gold"
            href="https://api.whatsapp.com/send?phone=5353444690"
            size="lg"
            aria-label="Chatear por WhatsApp"
          >
            Chatear por WhatsApp
          </Button>
        </div>
      </section>
    </main>
  )
}
