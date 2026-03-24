import './style.css'

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
