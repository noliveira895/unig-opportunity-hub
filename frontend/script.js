const API = "http://localhost:3000/oportunidades";

/* =========================
   LISTAR OPORTUNIDADES
========================= */
function carregar() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById("lista");
            lista.innerHTML = "";

            data.forEach(op => {
                const div = document.createElement("div");
                div.className = "card";

                div.innerHTML = `
                    <h3>${op.titulo}</h3>
                    <p>${op.descricao}</p>
                    <p><b>${op.empresa}</b> - ${op.categoria}</p>

                    <button onclick="deletar(${op.id})">
                        Excluir
                    </button>
                `;

                lista.appendChild(div);
            });
        })
        .catch(err => console.error("Erro ao carregar:", err));
}

/* =========================
   CRIAR OPORTUNIDADE
========================= */
function criar() {
    const dados = {
        titulo: document.getElementById("titulo").value,
        descricao: document.getElementById("descricao").value,
        empresa: document.getElementById("empresa").value,
        categoria: document.getElementById("categoria").value
    };

    fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(() => {
        limparCampos();
        carregar();
    })
    .catch(err => console.error("Erro ao criar:", err));
}

/* =========================
   DELETAR OPORTUNIDADE
========================= */
function deletar(id) {
    fetch(`${API}/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(() => {
        carregar();
    })
    .catch(err => console.error("Erro ao deletar:", err));
}

/* =========================
   LIMPAR FORMULÁRIO
========================= */
function limparCampos() {
    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("empresa").value = "";
    document.getElementById("categoria").value = "";
}

/* =========================
   INICIALIZAÇÃO
========================= */
window.onload = carregar;
