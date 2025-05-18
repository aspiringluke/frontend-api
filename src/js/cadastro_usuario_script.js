"use strict";
const URL = 'http://127.0.0.1:4040';

document.getElementById('cadastroUsuario').addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const fnome = document.getElementById('nome').value;
    const femail = document.getElementById('email').value;
    const fsenha = document.getElementById('senha').value;
    let ffuncao;
    let radios = document.getElementsByName('funcao');
    for(const rad of radios){
        if(rad.checked == true){
            ffuncao = rad.value;
            break
        }
    }

    const token = localStorage.getItem('token');
    
    fetch(URL+'/users',{
        method: "post",
        headers: {
            "Content-Type": "application/json",
            'authorization':'bearer ' + token
        },
        body: JSON.stringify({
            nome: fnome,
            email: femail,
            senha: fsenha,
            funcao: parseInt(ffuncao)
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(JSON.stringify(data.message));
    })
    .catch(error => console.log(error));
});