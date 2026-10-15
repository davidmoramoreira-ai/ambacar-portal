import './style.css'

// Importación de imágenes desde src/assets/
import havalH6 from './assets/HAVAL H6.jpg'
import havalH9 from './assets/HAVAL H9.jpeg'
import tank300 from './assets/TANK 300.jpeg'
import tank500 from './assets/TANK 500.jpeg'
import wingle7 from './assets/WINGLE 7.jpeg'
import poerManual from './assets/POER MANUAL.jpeg'
import swmG01F from './assets/SWM G01F.jpeg'
import fotoDavid from './assets/DAVID MORA.jpeg'
import fotoJose from './assets/JOSE MALDONADO.jpeg'

// Datos de vehículos y sucursales
const vehiculos = [
  { id: 1, nombre: 'HAVAL H6', categoria: 'SUV', precio: 26990, imagen: havalH6, desc: 'SUV tecnológica, amplia y de alto confort.' },
  { id: 2, nombre: 'HAVAL H9', categoria: 'SUV 4x4', precio: 43990, imagen: havalH9, desc: 'Potencia todoterreno con lujo interior.' },
  { id: 3, nombre: 'TANK 300', categoria: '4x4', precio: 39990, imagen: tank300, desc: 'Diseño icónico todoterreno de gran rendimiento.' },
  { id: 4, nombre: 'TANK 500', categoria: '4x4 Lujo', precio: 58990, imagen: tank500, desc: 'El máximo nivel de seguridad y elegancia.' },
  { id: 5, nombre: 'WINGLE 7', categoria: 'Camioneta', precio: 21990, imagen: wingle7, desc: 'Resistencia y fuerza para el trabajo duro.' },
  { id: 6, nombre: 'POER MANUAL', categoria: 'Camioneta', precio: 28990, imagen: poerManual, desc: 'Equipamiento premium y capacidad de carga superior.' },
  { id: 7, nombre: 'SWM G01F', categoria: 'SUV Deportiva', precio: 22990, imagen: swmG01F, desc: 'Estilo deportivo y dinamismo para la ciudad.' }
]

const sucursales = [
  { ciudad: 'Quito (Matriz)', direccion: 'Av. 10 de Agosto y Galo Plaza Lasso', telefono: '(02) 247-8888' },
  { ciudad: 'Guayaquil', direccion: 'Km. 2.5 Vía a Daule', telefono: '(04) 259-3333' },
  { ciudad: 'Cuenca', direccion: 'Av. España y Sebastián de Benalcázar', telefono: '(07) 286-5555' },
  { ciudad: 'Ambato', direccion: 'Av. Cevallos y Lalama', telefono: '(03) 282-1111' }
]

// Estado de la sesión de usuario
let usuarioActual = JSON.parse(localStorage.getItem('ambacar_user')) || null

// Renderizado principal
function actualizarInterfaz() {
  document.querySelector('#app').innerHTML = `
    <!-- Navbar -->
    <header class="navbar">
      <div class="nav-brand">🚗 Ambacar Ecuador</div>
      <nav class="nav-links">
        <a href="#inicio">Inicio</a>
        <a href="#catalogo">Catálogo</a>
        <a href="#sucursales">Sucursales</a>
        <a href="#equipo">Desarrolladores</a>
      </nav>
      <div class="nav-auth" id="navAuth">
        ${usuarioActual ? `
          <span class="user-welcome">Hola, <strong>${usuarioActual.nombre}</strong></span>
          <button id="btnLogout" class="btn-logout">Cerrar Sesión</button>
        ` : `
          <button id="btnLoginOpen" class="btn-login-nav">Iniciar Sesión</button>
        `}
      </div>
    </header>

    <!-- Sección Inicio / Hero -->
    <section id="inicio" class="hero-section">
      <div class="hero-text">
        <h1>Pasión por el Camino y la Potencia</h1>
        <p>Encuentra tu próximo vehículo con respaldo total, tecnología de punta y el mejor financiamiento del país.</p>
        <a href="#catalogo" class="btn-primary">Ver Catálogo y Cotizar</a>
      </div>
    </section>

    <div class="container">
      <!-- Buscador y Catálogo -->
      <section id="catalogo" class="section-block">
        <div class="section-title">
          <h2>Catálogo Oficial de Vehículos</h2>
          <p>Busca tu modelo favorito y descúbrelo al instante</p>
        </div>

        <div class="search-section">
          <input type="text" id="searchInput" placeholder="🔍 Buscar por nombre o categoría (ej: Haval, SUV, Tank)..." />
        </div>

        <div class="catalog-grid" id="catalogGrid"></div>
      </section>

      <!-- Sucursales -->
      <section id="sucursales" class="section-block">
        <div class="section-title">
          <h2>Nuestras Sucursales en Ecuador</h2>
          <p>Visítanos en cualquiera de nuestros concesionarios oficiales</p>
        </div>

        <div class="sucursales-grid">
          ${sucursales.map(s => `
            <div class="sucursal-card">
              <h3>📍 ${s.ciudad}</h3>
              <p><strong>Dirección:</strong> ${s.direccion}</p>
              <p><strong>Teléfono:</strong> ${s.telefono}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Desarrolladores -->
      <section id="equipo" class="section-block">
        <div class="section-title">
          <h2>Equipo de Desarrollo</h2>
          <p>Estudiantes de Desarrollo de Software - Instituto Superior Tecnológico Quito</p>
        </div>

        <div class="team-grid">
          <div class="team-card">
            <img src="${fotoDavid}" alt="David Mora" />
            <h3>David Sebastián Mora</h3>
            <p class="role">Desarrollador Full Stack & UI/UX</p>
          </div>
          <div class="team-card">
            <img src="${fotoJose}" alt="Jose Maldonado" />
            <h3>Jose Maldonado</h3>
            <p class="role">Desarrollador Frontend & Base de Datos</p>
          </div>
        </div>
      </section>
    </div>

    <!-- Modal Cotizador -->
    <div id="cotizadorModal" class="modal hidden">
      <div class="modal-content">
        <span class="close-btn" id="closeModal">&times;</span>
        <h2>Cotizar Vehículo</h2>
        <h3 id="modalCarTitle"></h3>
        <p id="modalCarPrice" class="modal-price"></p>
        
        <form id="cotizadorForm">
          <div class="form-group">
            <label>Entrada ($ USD):</label>
            <input type="number" id="inputEntrada" placeholder="Ej: 5000" min="0" required />
          </div>
          <div class="form-group">
            <label>Plazo de Financiamiento:</label>
            <select id="selectPlazo">
              <option value="12">12 Meses</option>
              <option value="24">24 Meses</option>
              <option value="36" selected>36 Meses</option>
              <option value="48">48 Meses</option>
              <option value="60">60 Meses</option>
            </select>
          </div>
          <button type="submit" class="btn-calculate">Calcular Cuota Mensual</button>
        </form>

        <div id="resultadoCotizacion" class="result-box hidden"></div>
      </div>
    </div>

    <!-- Modal Login / Registro -->
    <div id="authModal" class="modal hidden">
      <div class="modal-content auth-box">
        <span class="close-btn" id="closeAuthModal">&times;</span>
        <h2 id="authTitle">Iniciar Sesión</h2>
        
        <form id="authForm">
          <div class="form-group" id="groupNombre" style="display: none;">
            <label>Nombre Completo:</label>
            <input type="text" id="authNombre" placeholder="Tu nombre" />
          </div>
          <div class="form-group">
            <label>Correo Electrónico:</label>
            <input type="email" id="authEmail" placeholder="correo@ejemplo.com" required />
          </div>
          <div class="form-group">
            <label>Contraseña:</label>
            <input type="password" id="authPassword" placeholder="********" required />
          </div>
          <button type="submit" class="btn-primary" id="btnAuthSubmit" style="width:100%; border:none; cursor:pointer;">Entrar</button>
        </form>

        <p class="auth-toggle-text">
          <span id="authToggleMsg">¿No tienes cuenta?</span> 
          <a href="#" id="linkSwitchAuth">Regístrate aquí</a>
        </p>
      </div>
    </div>

    <footer class="footer">
      <p>&copy; 2026 Portal Ambacar Ecuador. Todos los derechos reservados.</p>
    </footer>
  `

  configurarEventos()
  renderizarVehiculos(vehiculos)
}

let vehiculoSeleccionado = null
let esRegistro = false

function renderizarVehiculos(lista) {
  const grid = document.querySelector('#catalogGrid')
  if (!grid) return

  if (lista.length === 0) {
    grid.innerHTML = `<p class="no-results">No se encontraron vehículos.</p>`
    return
  }

  grid.innerHTML = lista.map(carro => `
    <div class="car-card">
      <img src="${carro.imagen}" alt="${carro.nombre}" />
      <div class="car-info">
        <span class="badge">${carro.categoria}</span>
        <h2>${carro.nombre}</h2>
        <p class="desc">${carro.desc}</p>
        <p class="price">Desde <strong>$${carro.precio.toLocaleString()} USD</strong></p>
        <button class="btn-cotizar" data-id="${carro.id}">Cotizar Ahora</button>
      </div>
    </div>
  `).join('')

  document.querySelectorAll('.btn-cotizar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!usuarioActual) {
        alert('⚠️ Debes iniciar sesión para realizar una cotización.')
        document.querySelector('#authModal').classList.remove('hidden')
        return
      }
      const id = parseInt(e.target.getAttribute('data-id'))
      abrirCotizador(id)
    })
  })
}

function configurarEventos() {
  // Buscador
  const searchInput = document.querySelector('#searchInput')
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const busqueda = e.target.value.toLowerCase().trim()
      const filtrados = vehiculos.filter(v => 
        v.nombre.toLowerCase().includes(busqueda) || 
        v.categoria.toLowerCase().includes(busqueda)
      )
      renderizarVehiculos(filtrados)
    })
  }

  // Modales
  const modalCotizador = document.querySelector('#cotizadorModal')
  document.querySelector('#closeModal')?.addEventListener('click', () => modalCotizador.classList.add('hidden'))

  const authModal = document.querySelector('#authModal')
  document.querySelector('#btnLoginOpen')?.addEventListener('click', () => {
    esRegistro = false
    actualizarFormAuth()
    authModal.classList.remove('hidden')
  })
  document.querySelector('#closeAuthModal')?.addEventListener('click', () => authModal.classList.add('hidden'))

  // Cerrar sesión
  document.querySelector('#btnLogout')?.addEventListener('click', () => {
    localStorage.removeItem('ambacar_user')
    usuarioActual = null
    actualizarInterfaz()
  })

  // Alternar entre Login y Registro
  document.querySelector('#linkSwitchAuth')?.addEventListener('click', (e) => {
    e.preventDefault()
    esRegistro = !esRegistro
    actualizarFormAuth()
  })

  // Enviar formulario de Login/Registro
  document.querySelector('#authForm')?.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.querySelector('#authEmail').value
    const nombre = document.querySelector('#authNombre').value || 'Cliente Ambacar'

    usuarioActual = { nombre, email }
    localStorage.setItem('ambacar_user', JSON.stringify(usuarioActual))
    authModal.classList.add('hidden')
    actualizarInterfaz()
  })

  // Cotizador Form
  document.querySelector('#cotizadorForm')?.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!vehiculoSeleccionado) return

    const entrada = parseFloat(document.querySelector('#inputEntrada').value) || 0
    const plazo = parseInt(document.querySelector('#selectPlazo').value)
    const saldoAFinanciar = vehiculoSeleccionado.precio - entrada

    if (entrada >= vehiculoSeleccionado.precio) {
      alert('La entrada no puede ser mayor o igual al precio del vehículo.')
      return
    }

    const cuotaMensual = (saldoAFinanciar * (1 + (0.12 * (plazo / 12)))) / plazo
    const resBox = document.querySelector('#resultadoCotizacion')
    resBox.innerHTML = `
      <h4>Resumen para ${usuarioActual.nombre}</h4>
      <p><strong>Vehículo:</strong> ${vehiculoSeleccionado.nombre}</p>
      <p><strong>A Financiar:</strong> $${saldoAFinanciar.toLocaleString()} USD (${plazo} meses)</p>
      <p class="final-monthly">Cuota Estimada: <strong>$${cuotaMensual.toFixed(2)} USD/mes</strong></p>
    `
    resBox.classList.remove('hidden')
  })
}

function abrirCotizador(id) {
  vehiculoSeleccionado = vehiculos.find(v => v.id === id)
  if (!vehiculoSeleccionado) return

  document.querySelector('#modalCarTitle').innerText = vehiculoSeleccionado.nombre
  document.querySelector('#modalCarPrice').innerText = `Precio Total: $${vehiculoSeleccionado.precio.toLocaleString()} USD`
  document.querySelector('#resultadoCotizacion').classList.add('hidden')
  document.querySelector('#cotizadorForm').reset()
  document.querySelector('#cotizadorModal').classList.remove('hidden')
}

function actualizarFormAuth() {
  const title = document.querySelector('#authTitle')
  const groupNombre = document.querySelector('#groupNombre')
  const btnSubmit = document.querySelector('#btnAuthSubmit')
  const toggleMsg = document.querySelector('#authToggleMsg')
  const linkSwitch = document.querySelector('#linkSwitchAuth')

  if (esRegistro) {
    title.innerText = 'Crear Cuenta'
    groupNombre.style.display = 'block'
    btnSubmit.innerText = 'Registrarse'
    toggleMsg.innerText = '¿Ya tienes cuenta?'
    linkSwitch.innerText = 'Inicia sesión'
  } else {
    title.innerText = 'Iniciar Sesión'
    groupNombre.style.display = 'none'
    btnSubmit.innerText = 'Entrar'
    toggleMsg.innerText = '¿No tienes cuenta?'
    linkSwitch.innerText = 'Regístrate aquí'
  }
}

// Inicializar app completa
actualizarInterfaz()