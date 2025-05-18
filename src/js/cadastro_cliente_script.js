"use strict";

document.getElementById('cadastroCliente').addEventListener('submit', (e)=>{
    e.preventDefault();
    document.getElementById('submitBtn').setAttribute('disabled', 'disabled');

    const token = localStorage.getItem('token');
    const nome = document.getElementById('nome').value;
    const cep = document.getElementById('cep').value;
    const cnpj = document.getElementById('cnpj').value;
    const telefone = document.getElementById('telefone').value;

    const url = "http://localhost:4040";
    fetch(url+"/clientes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + token
        },
        body: JSON.stringify({
            nome: nome,
            cep: cep,
            cnpj: cnpj,
            telefone: telefone
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        document.getElementById('submitBtn').removeAttribute('disabled');
    })
    .catch(error => {
        console.error(error);
        alert("Houve um erro ao tentar cadastrar o cliente.")
    })
})