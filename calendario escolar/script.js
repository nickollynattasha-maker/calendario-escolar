const form = document.getElementById('formEvento');
const lista = document.getElementById('listaEventos');

// Recupera eventos salvos ou cria lista vazia
let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

// Exibe eventos logo que a página carrega
mostrarEventos();

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const data = document.getElementById('data').value;
  const responsavel = document.getElementById('responsavel').value;
  const tarefa = document.getElementById('tarefa').value;
  const recursos = document.getElementById('recursos').value;

  if (!data || !responsavel || !tarefa) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }

  eventos.push({ data, responsavel, tarefa, recursos });
  salvarEventos();
  mostrarEventos();
  form.reset();
});

function mostrarEventos() {
  lista.innerHTML = '';
  eventos.forEach((ev, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>Data:</strong> ${ev.data}<br>
                    <strong>Responsável:</strong> ${ev.responsavel}<br>
                    <strong>Tarefa:</strong> ${ev.tarefa}<br>
                    <strong>Recursos:</strong> ${ev.recursos}<br>`;

    // Botão de excluir
    const btn = document.createElement('button');
    btn.textContent = "Excluir";
    btn.onclick = () => {
      eventos.splice(index, 1);
      salvarEventos();
      mostrarEventos();
    };
    li.appendChild(btn);

    lista.appendChild(li);
  });
}

function salvarEventos() {
  localStorage.setItem("eventos", JSON.stringify(eventos));
}
