import { useState, useEffect } from 'preact/hooks'
import type { ProductType } from '@/types'
import noImage from '@/assets/no-image.svg'
import shop from '@/assets/shop.svg'
import right from '@/assets/right.svg'
import left from '@/assets/left.svg'
import styles from '@/styles/Carousel.module.css'
import { Link } from 'wouter'
import { optimizeImage, buildSrcSet } from '@/shared/utils'

interface Props {
  title: string
  items: ProductType[]
}

export function Carousel({ title, items }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const products = items.map((i) => {
    let pictures = noImage
    if (i.pictures && i.pictures.length > 0) {
      if (i.pictures.length > 1) pictures = i.pictures[1]
      else pictures = i.pictures[0]
    }
    return { ...i, pictures }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [items.length])

  const navigate = (direction: 'prev' | 'next') => {
    setCurrentIndex((prev) => (direction === 'next' ? (prev + 1) % items.length : (prev - 1 + items.length) % items.length))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <main className={styles.carousel}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.wrapper}>
        <div className={styles.view}>
          <div className={styles.track} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {products.map((p) => (
              <div key={p.id} className={styles.slide}>
                <img
                  src={optimizeImage(p.pictures, 1200)}
                  srcSet={buildSrcSet(p.pictures, [480, 800, 1200, 1600])}
                  sizes="(min-width: 1024px) 1200px, 90vw"
                  alt={p.productId}
                  className={styles.image}
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.overlay} />
                <div className={styles.content}>
                  <Link to={`/products/${p.category?.toLowerCase().replace(/\s+/g, '-')}`} className={styles.button}>
                    <img src={shop} alt="Ver" />
                    Ver
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className={styles.prev} onClick={() => navigate('prev')}>
          <img src={left} alt="prev" />
        </button>
        <button className={styles.next} onClick={() => navigate('next')}>
          <img src={right} alt="next" />
        </button>
      </div>

      <div className={styles.pagination}>
        {products.map((_, index) => (
          <div
            key={index}
            className={index === currentIndex ? styles.dotActive : styles.dot}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </main>
  )
}
