// Leer los datos desde el Json para poder pintarlos pero una vez que carga todo el HTML

const items = document.getElementById('items')
const template = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()


document.addEventListener('DOMContentLoaded', () => {
  fetchData()
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

  items.appendChild(fragment)
}
