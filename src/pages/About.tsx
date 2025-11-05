import ring from '@/assets/ring.svg'
import diamond from '@/assets/diamond.svg'
import sparkles from '@/assets/sparkles.svg'
import palette from '@/assets/palette.svg'
import rocket from '@/assets/rocket.svg'
import heart from '@/assets/heart.svg'
import tree from '@/assets/tree.svg'
import styles from '@/styles/About.module.css'

const logo = '/logo.webp'

export function About() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Nuestra Historia</h1>
          <p className={styles.heroDescription}>
            Creamos símbolos de emociones y momentos inolvidables, consolidándonos como una elección confiable y aspiracional
            en el mercado de la joyería.
          </p>
        </div>
      </section>

      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.companySection}>
            <div>
              <h2 className={styles.companyTitle}>Frank Joyería</h2>
              <p className={styles.companyText}>
                Somos una mediana empresa privada manufacturera especializada en el diseño, elaboración y comercialización de
                joyas de alta calidad.
              </p>
              <p className={styles.companyText}>
                Con años de experiencia en el sector, nos destacamos por fusionar la artesanía tradicional con innovadoras
                técnicas de producción, creando piezas únicas que reflejan elegancia, sofisticación y estilo.
              </p>
            </div>
            <div className={styles.imageContainer}>
              <img
                src={logo || '/placeholder.svg'}
                alt="Taller de joyería"
                className={styles.companyImage}
                width={375}
                height={250}
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Nuestros Productos</h2>
            <p className={styles.sectionDescription}>Ofrecemos una amplia gama de joyería fina para cada ocasión especial</p>
          </div>

          <div className={styles.productsGrid}>
            <div className={styles.productCard}>
              <div className={styles.productIcon}>
                <img src={ring || '/placeholder.svg'} alt="Anillo" className={styles.productIconImage} loading="lazy" />
              </div>
              <h3 className={styles.productTitle}>Anillos & Pulseras</h3>
              <p className={styles.productDescription}>En metales preciosos con acabados únicos</p>
            </div>

            <div className={styles.productCard}>
              <div className={styles.productIcon}>
                <img src={diamond || '/placeholder.svg'} alt="Diamante" className={styles.productIconImage} loading="lazy" />
              </div>
              <h3 className={styles.productTitle}>Piezas con Gemas</h3>
              <p className={styles.productDescription}>Diamantes, esmeraldas, rubíes y zafiros</p>
            </div>

            <div className={styles.productCard}>
              <div className={styles.productIcon}>
                <img
                  src={sparkles || '/placeholder.svg'}
                  alt="Sparkles"
                  className={styles.productIconImage}
                  loading="lazy"
                />
              </div>
              <h3 className={styles.productTitle}>Colecciones Exclusivas</h3>
              <p className={styles.productDescription}>Diseños para ocasiones especiales</p>
            </div>

            <div className={styles.productCard}>
              <div className={styles.productIcon}>
                <img src={palette || '/placeholder.svg'} alt="Palette" className={styles.productIconImage} loading="lazy" />
              </div>
              <h3 className={styles.productTitle}>Personalización</h3>
              <p className={styles.productDescription}>Joyas según tus preferencias únicas</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Nuestros Servicios</h2>
            <p className={styles.sectionDescription}>Actividades especializadas que garantizan calidad y satisfacción</p>
          </div>

          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>Comercialización</h3>
              <p className={styles.serviceDescription}>
                Especialistas en la venta de joyas de oro de diversos kilates y diseños, desde piezas clásicas hasta
                creaciones contemporáneas.
              </p>
              <ul className={styles.serviceList}>
                <li>• Materiales certificados</li>
                <li>• Garantías de autenticidad</li>
                <li>• Altos estándares de calidad</li>
              </ul>
            </div>

            <div className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>Compra de Metales</h3>
              <p className={styles.serviceDescription}>
                Adquirimos joyas, monedas y artículos de oro y plata con evaluación precisa y precios justos.
              </p>
              <ul className={styles.serviceList}>
                <li>• Evaluación transparente</li>
                <li>• Precios competitivos</li>
                <li>• Proceso confiable</li>
              </ul>
            </div>

            <div className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>Fabricación</h3>
              <p className={styles.serviceDescription}>
                Talleres especializados donde diseñamos y producimos joyas personalizadas con técnicas tradicionales y
                modernas.
              </p>
              <ul className={styles.serviceList}>
                <li>• Diseños únicos</li>
                <li>• Trabajo bajo pedido</li>
                <li>• Acabados impecables</li>
              </ul>
            </div>

            <div className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>Reparación</h3>
              <p className={styles.serviceDescription}>
                Servicios profesionales de reparación, limpieza y mantenimiento para preservar el valor de tus joyas.
              </p>
              <ul className={styles.serviceList}>
                <li>• Restauración completa</li>
                <li>• Limpieza profesional</li>
                <li>• Ajustes precisos</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Nuestros Valores</h2>
          </div>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <img src={rocket || '/placeholder.svg'} alt="Rocket" className={styles.valueIconImage} loading="lazy" />
              </div>
              <h3 className={styles.valueTitle}>Innovación</h3>
              <p className={styles.valueDescription}>Diseño vanguardista que marca tendencias</p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <img src={heart || '/placeholder.svg'} alt="Heart" className={styles.valueIconImage} loading="lazy" />
              </div>
              <h3 className={styles.valueTitle}>Compromiso</h3>
              <p className={styles.valueDescription}>Satisfacción total del cliente</p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <img src={tree || '/placeholder.svg'} alt="Tree" className={styles.valueIconImage} loading="lazy" />
              </div>
              <h3 className={styles.valueTitle}>Responsabilidad</h3>
              <p className={styles.valueDescription}>Procesos sociales y ambientalmente responsables</p>
            </div>
          </div>
        </section>

        <section className={styles.qualitySection}>
          <h2 className={styles.qualityTitle}>Compromiso de Calidad</h2>
          <p className={styles.qualityDescription}>
            En Frank Joyería, garantizamos excelencia en cada etapa del proceso: desde la selección de materias primas hasta
            el control de calidad final. Nuestro equipo de diseñadores y orfebres combina creatividad y precisión para
            asegurar que cada pieza cumpla con los más altos estándares.
          </p>
        </section>
      </div>
    </div>
  )
}
