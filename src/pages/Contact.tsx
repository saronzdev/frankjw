import { Social } from '@/components/Landing/Social'
import styles from '@/styles/Contact.module.css'

export function Contact() {
  return (
    <>
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Contáctanos</h1>
            <p className={styles.heroDescription}>
              Estamos aquí para ayudarte a encontrar la joya perfecta o responder cualquier consulta que tengas.
            </p>
          </div>
        </section>

        <div className={styles.contactSection}>
          <div className={styles.contactInfo}>
            <h2 className={styles.contactTitle}>Información de contacto</h2>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <span>📞</span>
                </div>
                <div className={styles.contactDetails}>
                  <h3>Teléfono</h3>
                  <a
                    href="tel:+5353444690"
                    className={styles.contactLink}
                    aria-label="Llamar al teléfono +5353444690"
                    title="Llamar al teléfono"
                  >
                    +5353444690
                  </a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <span>✉️</span>
                </div>
                <div className={styles.contactDetails}>
                  <h3>Email</h3>
                  <a
                    href="mailto:frankjoyeriacuba@gmail.com"
                    className={styles.contactLink}
                    aria-label="Enviar correo a frankjoyeriacuba@gmail.com"
                    title="Enviar correo"
                  >
                    frankjoyeriacuba@gmail.com
                  </a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <span>📍</span>
                </div>
                <div className={styles.contactDetails}>
                  <h3>Ubicación</h3>
                  <div className={styles.contactAddress}>
                    <p>
                      <strong>Calle Medio</strong> entre <strong>2 de Mayo</strong> y <strong>América</strong>
                    </p>
                    <p>Matanzas, Cuba</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className={styles.socialTitle}>Síguenos en redes sociales</h3>
            <Social />
          </div>
        </div>
      </div>

      <section className={styles.scheduleSection}>
        <div className={styles.scheduleHeader}>
          <h2 className={styles.scheduleTitle}>Horarios de atención</h2>
          <p className={styles.scheduleDescription}>Estamos disponibles para atenderte en los siguientes horarios</p>
        </div>

        <div className={styles.scheduleGrid}>
          <div className={styles.scheduleItem}>
            <h3>Lunes - Viernes</h3>
            <p>9:00 AM - 6:00 PM</p>
          </div>
          <div className={styles.scheduleItem}>
            <h3>Sábados</h3>
            <p>9:00 AM - 4:00 PM</p>
          </div>
          <div className={styles.scheduleItem}>
            <h3>Domingos</h3>
            <p>Cerrado</p>
          </div>
          <div className={styles.scheduleItem}>
            <h3>WhatsApp</h3>
            <p>24/7 Disponible</p>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>¿Listo para crear algo especial?</h2>
        <p className={styles.ctaDescription}>
          Contáctanos hoy mismo y descubre cómo podemos ayudarte a crear la joya perfecta para ti o tus seres queridos.
        </p>
        <div>
          <a
            href="https://api.whatsapp.com/send?phone=5353444690"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
            aria-label="Chatear por WhatsApp"
            title="Chatear por WhatsApp"
          >
            Chatear por WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
