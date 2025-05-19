const apiUrl = "http://localhost:4040/users";
const userId = localStorage.getItem('userId');

async function carregarPerfil() {
    const token = localStorage.getItem('token');
    fetch(apiUrl+"/"+userId, {
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
    const token = localStorage.getItem('token');
    await fetch(apiUrl+"/"+userId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer "+token
        },
        body: JSON.stringify({
            name: "Novo Nome",
            email: "novoemail@email.com"
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Perfil atualizado:", data);
        document.getElementById("nome").textContent = data.name;
        document.getElementById("email").textContent = data.email;
    })
    .catch (error => {
        console.log("Erro ao atualizar o perfil:", error);
    });
}

carregarPerfil();