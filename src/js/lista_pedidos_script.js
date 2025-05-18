"use strict";

async function carregarPedidos() {
    try {
    let token = localStorage.getItem('token');
    const response = await fetch('http://localhost:4040/pedidos', {
        headers: {
        "Content-Type": "application/json",
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
        idColuna.textContent = pedido.idpedidos;

        const statusColuna = document.createElement('td');
        statusColuna.textContent = pedido.status;

        const dataColuna = document.createElement('td');
        const dataFormatada = new Date(pedido.data).toLocaleDateString('pt-BR');
        dataColuna.textContent = dataFormatada;

        linha.appendChild(idColuna);
        linha.appendChild(statusColuna);
        linha.appendChild(dataColuna);

        corpo.appendChild(linha);
        });

    } else {
        document.getElementById('mensagemErro').textContent = 'Erro ao carregar pedidos: ' + data.message;
    }
    } catch (erro) {
    document.getElementById('mensagemErro').textContent = 'Erro de rede: ' + erro.message;
    }
}

carregarPedidos();