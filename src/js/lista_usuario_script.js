async function carregarUsuarios() {
  const token = localStorage.getItem('token');
  const corpo = document.getElementById('corpoTabelaUsuarios');
  const erro = document.getElementById('mensagemErro');

  try {
    const res = await fetch('http://localhost:4040/users', {
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'bearer ' + token
      }
    });
    const data = await res.json();

    corpo.innerHTML = '';
    erro.textContent = '';

    if (data.success) {
      data.values.forEach(usuario => {
        const linha = document.createElement('tr');

        const idColuna = document.createElement('td');
        idColuna.textContent = usuario.idUsuario;

        const nomeColuna = document.createElement('td');
        nomeColuna.textContent = usuario.nome;

        const emailColuna = document.createElement('td');
        emailColuna.textContent = usuario.email;

        const funcaoColuna = document.createElement('td');
        funcaoColuna.textContent = usuario.Funcao_idFuncao;

        const acoesColuna = document.createElement('td');
        const btnDeletar = document.createElement('button');
        btnDeletar.textContent = 'Deletar';
        btnDeletar.classList.add('btn', 'btn-delete');
        btnDeletar.onclick = () => confirmarExclusao(usuario.idUsuario, usuario.nome);

        acoesColuna.appendChild(btnDeletar);

        linha.appendChild(idColuna);
        linha.appendChild(nomeColuna);
        linha.appendChild(emailColuna);
        linha.appendChild(funcaoColuna);
        linha.appendChild(acoesColuna);

        corpo.appendChild(linha);
      });
    } else {
      erro.textContent = 'Erro ao carregar usuários: ' + (data.message || 'Erro desconhecido');
    }
  } catch (error) {
    erro.textContent = 'Erro de rede: ' + error.message;
  }
}

function confirmarExclusao(idUsuario, nome) {
  const confirmacao = confirm(`Tem certeza que deseja deletar o usuário "${nome}"?`);
  if (confirmacao) {
    deletarUsuario(idUsuario);
  }
}

async function deletarUsuario(idUsuario) {
  const token = localStorage.getItem('token');
  const erro = document.getElementById('mensagemErro');

  try {
    const res = await fetch(`http://localhost:4040/users/${idUsuario}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'bearer ' + token
      }
    });
    const data = await res.json();

    if (data.success) {
      carregarUsuarios();
    } else {
      erro.textContent = 'Erro ao deletar usuário: ' + (data.message || 'Erro desconhecido');
    }
  } catch (error) {
    erro.textContent = 'Erro de rede ao deletar: ' + error.message;
  }
}

window.onload = carregarUsuarios;


