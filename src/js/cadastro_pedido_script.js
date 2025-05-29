"use strict";

const url = localStorage.getItem('url');
const funcaoId = localStorage.getItem('funcaoId');
document.getElementById('btnHome').setAttribute('href', localStorage.getItem(funcaoId));

let carrinho = [];
let clienteSelecionado = null;

function adicionarAoCarrinho(idProduto, nome, preco) {
    const itemNoCarrinho = carrinho.find((item) => item.idProduto === idProduto);
    if (itemNoCarrinho) {
        itemNoCarrinho.quantidade++;
    } else {
        carrinho.push({ idProduto, nome, preco, quantidade: 1 });
    }
    atualizarCarrinho();
}


function atualizarCarrinho() {
    const listaCarrinho = document.getElementById("listaCarrinho");
    const totalCarrinho = document.getElementById("totalCarrinho");
    listaCarrinho.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.nome}, ${item.quantidade} unidade${
            item.quantidade > 1 ? "s" : ""
        }, ${item.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })}`;

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.onclick = () => removerDoCarrinho(index);
        listItem.appendChild(botaoRemover);

        listaCarrinho.appendChild(listItem);
        total += item.preco * item.quantidade;
    });

    totalCarrinho.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}


function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}




function pesquisarProdutos() {
    const filtro = document.getElementById("pesquisarProduto").value.toUpperCase();
    const linhas = document
        .getElementById("corpoTabelaProdutos")
        .getElementsByTagName("tr");

    for (let i = 0; i < linhas.length; i++) {
        const nomeProduto = linhas[i].getElementsByTagName("td")[0];
        if (nomeProduto) {
            const texto = nomeProduto.textContent || nomeProduto.innerText;
            linhas[i].style.display = texto.toUpperCase().indexOf(filtro) > -1 ? "" : "none";
        }
    }
}

async function carregarProdutos() {
    try {
        let token = localStorage.getItem("token");
        const response = await fetch(url+"/produtos", {
            headers: { authorization: "bearer " + token },
        });
        const data = await response.json();

        if (data.success) {
            const corpoTabela = document.getElementById("corpoTabelaProdutos");
            corpoTabela.innerHTML = "";

            data.values.forEach((produto) => {
                const linha = document.createElement("tr");

                const tdNome = document.createElement("td");
                tdNome.textContent = produto.descricao;

                const tdPreco = document.createElement("td");
                const preco = parseFloat(produto.valorUnitario);
                tdPreco.textContent = preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                });

                const tdAcao = document.createElement("td");
                const botao = document.createElement("button");
                botao.textContent = "Adicionar";
                botao.title = `Adicionar ${produto.descricao} ao carrinho`;
                botao.onclick = () => adicionarAoCarrinho(produto.idProduto, produto.descricao, preco);
                tdAcao.appendChild(botao);

                linha.appendChild(tdNome);
                linha.appendChild(tdPreco);
                linha.appendChild(tdAcao);
                corpoTabela.appendChild(linha);
            });
        } else {
            console.error("Erro ao buscar produtos:", data.message);
        }
    } catch (error) {
        console.error("Erro de rede ao buscar produtos:", error);
    }
}

function pesquisarClientes() {
    const filtro = document.getElementById("pesquisarCliente").value.toUpperCase();
    const linhas = document
        .getElementById("corpoTabelaClientes")
        .getElementsByTagName("tr");

    for (let i = 0; i < linhas.length; i++) {
        const nomeCliente = linhas[i].getElementsByTagName("td")[0];
        if (nomeCliente) {
            const texto = nomeCliente.textContent || nomeCliente.innerText;
            linhas[i].style.display = texto.toUpperCase().indexOf(filtro) > -1 ? "" : "none";
        }
    }
}


function selecionarCliente(idCliente, event) {
    clienteSelecionado = idCliente;
    const nome = event.target.parentNode.parentNode.querySelector('td').textContent;
    document.getElementById('clienteSelecionado').value = nome;
}



async function carregarClientes() {
    try {
        let token = localStorage.getItem("token");
        const response = await fetch(url+"/clientes", {
            headers: { authorization: "bearer " + token },
        });
        const data = await response.json();

        if (data.success) {
            const corpoTabela = document.getElementById("corpoTabelaClientes");
            corpoTabela.innerHTML = "";

            data.values.forEach((cliente) => {
                const linha = document.createElement("tr");

                const tdNome = document.createElement("td");
                tdNome.textContent = cliente.nome;

                const tdCNPJ = document.createElement("td");
                tdCNPJ.textContent = cliente.CNPJ;

                const tdCEP = document.createElement("td");
                tdCEP.textContent = cliente.CEP;

                const tdTelefone = document.createElement("td");
                tdTelefone.textContent = cliente.telefone;

                const tdAcao = document.createElement("td");
                const botao = document.createElement("button");
                botao.textContent = "Selecionar";
                botao.onclick = (event) => selecionarCliente(cliente.idCliente, event);
                // Removido o segundo botao.onclick que sobrescrevia o primeiro
                tdAcao.appendChild(botao);

                linha.appendChild(tdNome);
                linha.appendChild(tdCNPJ);
                linha.appendChild(tdCEP);
                linha.appendChild(tdTelefone);
                linha.appendChild(tdAcao);
                corpoTabela.appendChild(linha);
            });
        } else {
            console.error("Erro ao buscar clientes:", data.message);
        }
    } catch (error) {
        console.error("Erro de rede ao buscar clientes:", error);
    }
}


async function criarPedido() {
    if (!clienteSelecionado) {
        alert("Selecione um cliente antes de criar o pedido.");
        return;
    }

    if (carrinho.length === 0) {
        alert("Adicione pelo menos um produto ao carrinho.");
        return;
    }

    const dataSelecionada = document.getElementById("dataPedido").value;
    if (!dataSelecionada) {
        alert("Por favor, selecione uma data.");
        return;
    }

    const token = localStorage.getItem("token");
    const idusuario = localStorage.getItem("userId");
    const pedido = {
        idUsuario: idusuario,
        idCliente: clienteSelecionado,
        dataPedido: dataSelecionada,
        itens: carrinho.map(({ idProduto, quantidade, preco }) => ({
            idProduto,
            quantidade,
            valorCombinado: quantidade * preco
        })),
    };

    await fetch(url+"/pedidos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + token
        },
        body: JSON.stringify(pedido)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Pedido criado com sucesso!");
            clienteSelecionado = null;
            carrinho = [];
            atualizarCarrinho();
            carregarClientes();
            carregarProdutos();
            document.getElementById("dataPedido").value = "";
        } else {
            alert("Erro ao criar pedido: " + data.message);
        }

    })
    .catch(error => {
        alert("Erro ao criar pedido: " + error);
    });
}        

carregarProdutos();
carregarClientes();