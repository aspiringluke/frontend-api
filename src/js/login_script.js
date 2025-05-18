"use strict";

function fazerLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('psw').value;
    
    fetch('http://localhost:4040/login', {
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
            
            if(data.funcaoId === 2){
                window.location.href = './index_ven.html';
                return;
            }else{
                window.location.href = './index_adm.html';
                return;
            }
        } else {
            alert(data.message || 'Erro ao fazer login.');
        }
    })
    .catch(error => {
        console.error(err);
        alert('Erro de conexão com o servidor.');
    });
}