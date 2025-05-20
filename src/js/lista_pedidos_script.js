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
			statusColuna.id = `status-${pedido.idPedido}`;
			statusColuna.className = pedido.status === 'concluído' ? 'concluido' : 'pendente';

			const dataColuna = document.createElement('td');
			dataColuna.textContent = new Date(pedido.data).toLocaleDateString('pt-BR');

			const valorColuna = document.createElement('td');
			valorColuna.textContent = `R$ ${parseFloat(pedido.valorTotal || 0).toFixed(2)}`;

			const acaoColuna = document.createElement('td');
			const botao = document.createElement('button');
			botao.textContent = pedido.status === 'pendente' ? 'Marcar como Concluído' : 'Marcar como Pendente';
			botao.className = "btnAlternarStatus";
			botao.onclick = () => alterarStatus(pedido.idPedido, pedido.status);

			acaoColuna.appendChild(botao);

			linha.appendChild(idColuna);
			linha.appendChild(nomeColuna);
			linha.appendChild(statusColuna);
			linha.appendChild(dataColuna);
			linha.appendChild(valorColuna);
			linha.appendChild(acaoColuna);

			corpo.appendChild(linha);
		});

    } else {
		document.getElementById('mensagemErro').textContent = 'Erro ao carregar pedidos: ' + data.message;
    }

  } catch (erro) {
		document.getElementById('mensagemErro').textContent = 'Erro de rede: ' + erro.message;
  }
}

async function alterarStatus(idPedido, statusAtual) {
	const statusNormalizado = statusAtual.toLowerCase();
	const novoStatus = statusNormalizado === 'pendente' ? 'Concluído' : 'Pendente';
	console.log(`Alterando status do pedido ${idPedido} de "${statusAtual}" para "${novoStatus}"`);
	
	const token = localStorage.getItem('token');

	try {
		const response = await fetch(`http://localhost:4040/pedidos/${idPedido}/status`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'authorization': 'bearer ' + token
			},
			body: JSON.stringify({ status: novoStatus })
		});

		const result = await response.json();

		if (result.success) {
			carregarPedidos();
		} else {
			alert('Erro ao alterar status: ' + result.message);
		}
	} catch (erro) {
		alert('Erro ao conectar com o servidor: ' + erro.message);
	}
}



window.onload = carregarPedidos;
