document.getElementById('task-form').addEventListener('submit', function (event) {
  // Previnir o envio do formulário
  event.preventDefault();

  // Obter o valor do campo de texto
  const task = document.getElementById('task-input').value;

  // Verificar se o campo de texto está vazio
  if (task.trim() === '') {
    alert('Por favor, insira uma tarefa válida');
    return;
  }

  // Adicionar uma nova tarefa à lista
  const taskList = document.getElementById('task-list');
  const newTask = document.createElement('li');
  newTask.setAttribute('class', 'flex items-center justify-between p-4 bg-gray-200 rounded-lg shadow-md');
  
  const span = document.createElement('span');
  span.innerText = task;
  span.setAttribute('class', 'text-lg font-bold text-gray-800');


  newTask.appendChild(span);
  taskList.appendChild(newTask);


  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Excluir';
  deleteButton.setAttribute('class', 'px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full focus:outline-none focus:shadow-outline');

  deleteButton.addEventListener('click', function () {
    newTask.remove();
  });
  newTask.appendChild(deleteButton);
});

/**
<ul id="task-list" class="mt-8 list-none">
  <li class="flex items-center justify-between p-4 bg-gray-200 rounded-lg shadow-md">
    <span class="text-lg font-bold text-gray-800">Andar de bike</span>
    <button class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full focus:outline-none focus:shadow-outline">Excluir</button>
  </li>
</ul>
 */
