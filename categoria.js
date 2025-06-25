let descricaoCategoria = document.getElementById('descricao')
let btnSalvar = document.getElementById('btnSalvar')

let categorias = []
let indexEditado = null

window.onload = () => {
const dadosSalvos = localStorage.getItem('categoriaStorage')

    if (dadosSalvos) {
        categorias = JSON.parse(dadosSalvos)
        renderizarTabela()
    }
}

function salvarCategoria() {
    localStorage.setItem('categoriaStorage', JSON.stringify(categorias))
}


function renderizarTabela() {
  let linha = ''
  categorias.forEach((c, index) => {
    linha += `
      <tr>
        <td>${c.codigo}</td>
        <td>${c.descricao}</td>
        <td>
          <button onclick="editarCategoria(${index})" class="btn btn-md bg-warning">Editar</button>
          <button onclick="removerCategoria(${index})" class="btn btn-md bg-danger text-light">Remover</button>
        </td>
      </tr>
    `
  })
  document.getElementById('categorias').innerHTML = linha
}



function validarCampos() {
  if (descricaoCategoria.value.trim() === '') {
    alert('A descrição da categoria não pode ficar vazia.')
    descricaoCategoria.focus()
    return false
  }
  return true
}

function addCategoria() {
  if (!validarCampos()) return
  categorias.push({
    codigo: categorias.length + 1,
    descricao: descricaoCategoria.value
  })
  limparCampos()
  renderizarTabela()
}

function editarCategoria(index) {
  const categoria = categorias[index]
  descricaoCategoria.value = categoria.descricao
  indexEditado = index
  btnSalvar.innerText = 'Editar Categoria'
  btnSalvar.onclick = atualizarCategoria
}

function atualizarCategoria() {
  if (!validarCampos()) return
  categorias[indexEditado].descricao = descricaoCategoria.value
  indexEditado = null
  btnSalvar.innerText = 'Adicionar Categoria'
  btnSalvar.onclick = addCategoria
  limparCampos()
  renderizarTabela()
}

function removerCategoria(index) {
  categorias.splice(index, 1)
  categorias.forEach((c, i) => c.codigo = i + 1)
  renderizarTabela()
}

function limparCampos() {
  descricaoCategoria.value = ''
  descricaoCategoria.focus()
}

salvarCategoria()
btnSalvar.onclick = addCategoria

renderizarTabela()