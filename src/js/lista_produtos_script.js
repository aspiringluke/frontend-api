"use strict";

async function carregarProdutos() {
    let token = localStorage.getItem('token');

    await fetch('http://localhost:4040/produtos', {
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'bearer ' + token
      }
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
          const corpo = document.getElementById('corpoTabelaProdutos');
          corpo.innerHTML = '';
    
          data.values.forEach(produto => {
            const linha = document.createElement('tr');
    
            const idColuna = document.createElement('td');
            idColuna.textContent = produto.idProduto;
    
            const descricaoColuna = document.createElement('td');
            descricaoColuna.textContent = produto.descricao;
    
            const unidadeColuna = document.createElement('td');
            unidadeColuna.textContent = produto.unidade;
    
            const valorColuna = document.createElement('td');
            valorColuna.textContent = `R$ ${parseFloat(produto.valorUnitario || 0).toFixed(2)}`;
    
            linha.appendChild(idColuna);
            linha.appendChild(descricaoColuna);
            linha.appendChild(unidadeColuna);
            linha.appendChild(valorColuna);
    
            corpo.appendChild(linha);
          });
    
        } else {
          document.getElementById('mensagemErro').textContent = 'Erro ao carregar produtos: ' + data.message;
        }
    })
    .catch(error => {
        document.getElementById('mensagemErro').textContent = 'Erro de rede: ' + error.message;
    });
}

window.onload = carregarProdutos;