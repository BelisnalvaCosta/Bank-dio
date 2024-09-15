const userForm = document.getElementById('userForm');
const deleteForm = document.getElementById('deleteForm');
const userList = document.getElementById('userList');

// Função para buscar usuários
const fetchUsers = async () => {
  const response = await fetch('/user');
  const users = await response.json();

  userList.innerHTML = '<h2>Lista de Usuários</h2>';
  users.forEach(user => {
    userList.innerHTML += `<p>${user.name} - ${user.email}</p>`;
  });
};

// Função para criar usuário
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  await fetch('/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  });

  fetchUsers();
});

// Função para deletar usuário
deleteForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('deleteEmail').value;

  await fetch('/user', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  fetchUsers();
});

// Carregar usuários ao abrir a página
fetchUsers();
