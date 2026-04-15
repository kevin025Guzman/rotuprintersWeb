import './style.css'
import headerHTML from './src/components/header.html?raw'
import bannerHTML from './src/components/banner.html?raw'
import nosotrosHTML from './src/components/nosotros.html?raw'
import productosHTML from './src/components/productos.html?raw'
import galeriaHTML from './src/components/galeria.html?raw'
import cotizacionHTML from './src/components/cotizacion.html?raw'
import contactoHTML from './src/components/contacto.html?raw'
import footerHTML from './src/components/footer.html?raw'

document.querySelector('#app').innerHTML = `
  ${headerHTML}
  <main>
    ${bannerHTML}
    ${nosotrosHTML}
    ${productosHTML}
    ${galeriaHTML}
    ${cotizacionHTML}
    ${contactoHTML}
  </main>
  ${footerHTML}
`;

function init() {
  // Tema (modo oscuro)
  const THEME_KEY = 'rp_theme'
  const themeToggle = document.querySelector('.theme-toggle')

  const getPreferredTheme = () => {
    const stored = window.localStorage.getItem(THEME_KEY)
    if (stored === 'dark' || stored === 'light') return stored
    return 'light'
  }

  const applyTheme = (theme) => {
    const next = theme === 'dark' ? 'dark' : 'light'
    document.documentElement.dataset.theme = next
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', next === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro')
      themeToggle.setAttribute('title', next === 'dark' ? 'Modo claro' : 'Modo oscuro')
    }
  }

  applyTheme(getPreferredTheme())

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
      const next = current === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem(THEME_KEY, next)
      applyTheme(next)
    })
  }

  // Menú móvil
  const menuToggle = document.querySelector('.menu-toggle')
  const nav = document.querySelector('.nav')

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active')
      nav.classList.toggle('active')
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : ''
    })

    // Cerrar menú al hacer clic en un enlace
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active')
        nav.classList.remove('active')
        document.body.style.overflow = ''
      })
    })
  }

  // Header con scroll (opcional: agregar sombra al hacer scroll)
  const header = document.querySelector('.header')
  if (header) {
    const handleScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
  }

  // Carruseles de galería
  const carousels = document.querySelectorAll('.carousel')
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track')
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'))
    const prevBtn = carousel.querySelector('.carousel-btn.prev')
    const nextBtn = carousel.querySelector('.carousel-btn.next')
    const dots = Array.from(carousel.querySelectorAll('.carousel-dots .dot'))
    const viewport = carousel.querySelector('.carousel-viewport')
    const isReverse = carousel.dataset.reverse === 'true'

    if (track && slides.length > 0) {
      let index = 0
      let autoplayTimer = null

      const setActiveDot = (i) => {
        dots.forEach((d, di) => d.classList.toggle('active', di === i))
      }

      const goTo = (i, { wrap = true } = {}) => {
        const max = slides.length - 1
        let next = i
        if (wrap) {
          if (next < 0) next = max
          if (next > max) next = 0
        } else {
          next = Math.max(0, Math.min(max, next))
        }
        index = next
        track.style.transform = `translateX(${-index * 100}%)`
        setActiveDot(index)
      }

      const startAutoplay = () => {
        stopAutoplay()
        autoplayTimer = window.setInterval(() => goTo(isReverse ? index - 1 : index + 1), 3000)
      }

      const stopAutoplay = () => {
        if (autoplayTimer) window.clearInterval(autoplayTimer)
        autoplayTimer = null
      }

      prevBtn?.addEventListener('click', () => goTo(index - 1))
      nextBtn?.addEventListener('click', () => goTo(index + 1))

      dots.forEach((dot, di) => {
        dot.addEventListener('click', () => goTo(di, { wrap: false }))
      })

      viewport?.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goTo(index - 1)
        if (e.key === 'ArrowRight') goTo(index + 1)
      })

      carousel.addEventListener('mouseenter', stopAutoplay)
      carousel.addEventListener('mouseleave', startAutoplay)
      carousel.addEventListener('focusin', stopAutoplay)
      carousel.addEventListener('focusout', startAutoplay)

      // Inicializar
      goTo(0, { wrap: false })
      startAutoplay()
    }
  })
}

// Ejecutar inicialización luego de inyectar los componentes
init()
