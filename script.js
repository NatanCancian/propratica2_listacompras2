let lista = [];
let filtroAtual = "todos";
function adicionarItem() {
  const entradaItem = document.getElementById("entradaItem");
  const entradaQuantidade = document.getElementById("entradaQuantidade");

  const nome = entradaItem.value.trim();
  const quantidade = parseInt(entradaQuantidade.value);

  if (nome && quantidade > 0) {
    lista.push({ nome, quantidade, comprado: false });
    entradaItem.value = "";
    entradaQuantidade.value = 1;
    atualizarLista();
  }
}

function marcarComprado(index) {
  lista[index].comprado = !lista[index].comprado;
  atualizarLista();
}
function removerItem(index) {
  lista.splice(index, 1);
  atualizarLista();
}
function editarItem(index, novoNome) {
  if (novoNome.trim()) {
    lista[index].nome = novoNome.trim();
    atualizarLista();
  }
}

function limparComprado(index){
  lista[index].comprado = null;
  atualizarLista();
}

function atualizarLista() {
  const listaElement = document.getElementById("lista");
  listaElement.innerHTML = "";

  const listaFiltrada = lista.filter((item) => {
    if (filtroAtual === "pendentes") return !item.comprado;
    if (filtroAtual === "comprados") return item.comprado;
    return true;
  });
  listaFiltrada.forEach((item, index) => {
    const itemElement = document.createElement("li");
    itemElement.className = `list-group-item d-flex justify-content-between align-items-center ${
      item.comprado ? "comprado" : ""
    }`;
    itemElement.innerHTML = `
      <div>
        <input type="text" class="editando" value="${
          item.nome
        }" onblur="editarItem(${index}, this.value)" ${
      item.comprado ? "readonly" : ""
    }>
        <span class="badge bg-primary rounded-pill">${item.quantidade}</span>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-success me-2" onclick="marcarComprado(${index})">${
      item.comprado ? "Desmarcar" : "Comprar"
    }</button>
        <button class="btn btn-sm btn-outline-danger" onclick="removerItem(${index})">Remover</button>
      </div>
    `;
    listaElement.appendChild(itemElement);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const ul = document.createElement("ul");
  ul.id = "lista";
  ul.className = "list-group";
  container.appendChild(ul);
  atualizarLista();
});