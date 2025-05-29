"use strict";

function fazerLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('psw').value;
    localStorage.setItem('url', 'http://3.148.112.54:4040')
    fetch(localStorage.getItem('url')+'/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('funcaoId', data.funcaoId);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('1', './index_adm.html');
            localStorage.setItem('2', './index_ven.html');
            
            window.location.href = localStorage.getItem(data.funcaoId);

        } else {
            alert(data.message || 'Erro ao fazer login.');
        }
    })
    .catch(error => {
        console.error(error);
        alert('Erro de conexão com o servidor.');
    });
}