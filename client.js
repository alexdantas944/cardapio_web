const lista = document.getElementById('lista');
const carrinho = {};
const atualizarCarrinho = () => {
  const el = document.getElementById('carrinho');
  const total = Object.values(carrinho).reduce((t, i) => t + i.qtd * i.preco, 0);
  el.querySelector('.total').textContent = 'R$ ' + total.toFixed(2);
};
fetch('/api/cardapio')
  .then(r => r.json())
  .then(data => {
    lista.innerHTML = '';
    const porCategoria = {};
    data.forEach(p => {
      if (!porCategoria[p.categoria]) porCategoria[p.categoria] = [];
      porCategoria[p.categoria].push(p);
    });
    for (const [cat, produtos] of Object.entries(porCategoria)) {
      const catEl = document.createElement('h2');
      catEl.className = 'text-xl font-bold mt-6';
      catEl.textContent = cat;
      lista.appendChild(catEl);
      const grid = document.createElement('div');
      grid.className = 'grid grid-cols-2 gap-4 mt-2';
      produtos.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow overflow-hidden';
        card.innerHTML = `
          <img src="${prod.imagem}" class="w-full h-32 object-cover">
          <div class="p-2">
            <div class="font-bold">${prod.nome}</div>
            <div class="text-sm text-gray-500">${prod.descricao || ''}</div>
            <div class="text-green-700 font-bold">R$ ${prod.preco.toFixed(2)}</div>
            <button class="mt-1 bg-emerald-600 text-white text-sm px-3 py-1 rounded add">Adicionar</button>
          </div>
        `;
        card.querySelector('.add').onclick = () => {
          if (!carrinho[prod.id]) {
            carrinho[prod.id] = { ...prod, qtd: 1 };
          } else {
            carrinho[prod.id].qtd++;
          }
          atualizarCarrinho();
        };
        grid.appendChild(card);
      });
      lista.appendChild(grid);
    }
  });
