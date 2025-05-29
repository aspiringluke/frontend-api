"use strict";

const url = localStorage.getItem('url');
const userId = localStorage.getItem('userId');
const funcaoId = localStorage.getItem('funcaoId');

document.getElementById('btnHome').setAttribute('href', localStorage.getItem(funcaoId));
document.getElementById('areaAtualizar').style.display="none";

async function carregarPerfil() {
    const token = localStorage.getItem('token');
    fetch(url+"/"+userId, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer "+token
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.getElementById("nome").textContent = data.values.nome;
        document.getElementById("email").textContent = data.values.email;
    })
    .catch(error => {
        console.error("Erro ao carregar os dados:", error);
    });
}

async function atualizarPerfil() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const token = localStorage.getItem('token');
    await fetch(url+"/"+userId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer "+token
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        }),
    })
    .then(res => res.json())
    .then(data => {
        console.log("Perfil atualizado.");
        alert("Perfil atualizado com sucesso!");
    })
    .catch (error => {
        console.log("Erro ao atualizar o perfil:", error);
    });
}

carregarPerfil();