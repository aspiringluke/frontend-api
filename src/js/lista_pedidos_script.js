"use strict";

async function carregarPedidos() {
  try {
    let token = localStorage.getItem('token');

    const response = await fetch('http://localhost:4040/pedidos/detalhados', {
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'bearer ' + token
      }
    });

    const data = await response.json();

    if (data.success) {
      const corpo = document.getElementById('corpoTabelaPedidos');
      corpo.innerHTML = '';

      data.values.forEach(pedido => {
        const linha = document.createElement('tr');

        const idColuna = document.createElement('td');
        idColuna.textContent = pedido.idPedido;

        const nomeColuna = document.createElement('td');
        nomeColuna.textContent = pedido.nomeCliente;

        const statusColuna = document.createElement('td');
        statusColuna.textContent = pedido.status;

        const dataColuna = document.createElement('td');
        dataColuna.textContent = new Date(pedido.data).toLocaleDateString('pt-BR');

        const valorColuna = document.createElement('td');
        valorColuna.textContent = `R$ ${parseFloat(pedido.valorTotal || 0).toFixed(2)}`;

        linha.appendChild(idColuna);
        linha.appendChild(nomeColuna);
        linha.appendChild(statusColuna);
        linha.appendChild(dataColuna);
        linha.appendChild(valorColuna);

        corpo.appendChild(linha);
      });

    } else {
      document.getElementById('mensagemErro').textContent = 'Erro ao carregar pedidos: ' + data.message;
    }

  } catch (erro) {
    document.getElementById('mensagemErro').textContent = 'Erro de rede: ' + erro.message;
  }
}

window.onload = carregarPedidos;




