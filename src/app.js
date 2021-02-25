// Leer los datos desde el Json para poder pintarlos pero una vez que carga todo el HTML
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const cards = document.getElementById('cards')
const fragment = document.createDocumentFragment()
const template = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
  fetchData()
})
// el Div escucha cuando se esta tocando algun elemnto hijo y se lo pasa a la funcion addtoCart
cards.addEventListener('click', (e) => {
  addToCart(e)
})

const fetchData = async () => {
  try {
    const res = await fetch('bdd.json')
    const data = await res.json()
    pintarCards(data)

  } catch (error) {
    console.log(error)
  }
}

//Funcion para extraer datos de bdd.json y pintarlos en el HTML
const pintarCards = data => {
//  console.log(data);
  data.forEach(item => {
    template.querySelector('img').setAttribute('src', item.thumbnailUrl)
    template.querySelector('h5').textContent = item.title
    template.querySelector('p').textContent = item.precio
    template.querySelector('.btn-dark').dataset.id = item.id
    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
  });

  cards.appendChild(fragment)
}

// Capturar cuando se clickea el boton con la clase btn-dark
const addToCart = e => {
  // console.log(e.target.classList.contains('btn-dark'))
  if (e.target.classList.contains('btn-dark')) {
    setCarrito(e.target.parentElement)
  }
  e.stopPropagation()
}


const setCarrito = objeto => {
  
  const producto = {
    id: objeto.querySelector('.btn-dark').dataset.id,
    titulo: objeto.querySelector('h5').textContent,
    precio: objeto.querySelector('p').textContent,
    cantidad: 1
  }
  
  if(carrito.hasOwnProperty(producto.id)){
    producto.cantidad = carrito[producto.id].cantidad + 1
  }
  carrito[producto.id] = {...producto}
  pintarCarrito()
}

const pintarCarrito = () => {
  items.innerHTML = ''
  // console.log(carrito)
  Object.values(carrito).forEach(producto => {
    templateCarrito.querySelector('th').textContent = producto.id
    templateCarrito.querySelectorAll('td')[0].textContent = producto.title
    templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
    templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad
    templateCarrito.querySelector('.font-weight-bold')
    // Botones
    templateCarrito.querySelector('.btn-info').dataset.id = producto.id
    templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
    //Clone
    const clone = templateCarrito.cloneNode(true)
    fragment.appendChild(clone)
  })
  items.appendChild(fragment)
  pintarFooter()
}

//Funciones de los botones para aumentar la cantidad de productos
const addButton = templateCarrito.querySelector('.btn-info').dataset.id
addButton.Object.values(carrio).reduce(({cantidad}) => cantidad + 1 ,0)


const pintarFooter = () => {

  footer.innerHTML = ''
  if(Object.keys(carrito).length === 0){
    footer.innerHTML =`
      <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
    `
    return
  }

  const nCantidad = Object.values(carrito).reduce((count, {cantidad}) => count + cantidad,0)
  const nPrecio = Object.values(carrito).reduce((count, {precio, cantidad}) => count + precio * cantidad, 0)
  
  templateFooter.querySelectorAll('td')[0].textContent = nCantidad
  templateFooter.querySelector('span').textContent = nPrecio
  const clone = templateFooter.cloneNode(true)
  fragment.appendChild(clone)
  footer.appendChild(fragment)
  // Boton para vaciar carrito y a la vez pintarlo
  const vaciarCarrito = document.querySelector('#vaciar-carrito')
  vaciarCarrito.addEventListener('click', () => {
    carrito = {}
    pintarCarrito()
  })
}
