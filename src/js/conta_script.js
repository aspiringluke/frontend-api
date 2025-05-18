const apiUrl = "https://jsonplaceholder.typicode.com/users/1";

async function carregarPerfil() {
    try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    document.getElementById("nome").textContent = data.name;
    document.getElementById("email").textContent = data.email;
    } catch (error) {
    console.log("Erro ao carregar os dados:", error);
    }
}

async function atualizarPerfil() {
    try {
    const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        name: "Novo Nome",
        email: "novoemail@email.com"
        })
    });

    const data = await response.json();
    console.log("Perfil atualizado:", data);

    document.getElementById("nome").textContent = data.name;
    document.getElementById("email").textContent = data.email;

    } catch (error) {
    console.log("Erro ao atualizar o perfil:", error);
    }
}

carregarPerfil();