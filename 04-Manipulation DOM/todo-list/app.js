const tasks = [
  {
    title: 'Do X',
    status: 'Done',
    category: 'Work',
    description: 'To do X you need to ...',
    assignedTo: 'John Doe'
  },
  {
    title: 'Do X',
    status: 'Done',
    category: 'Work',
    description: 'To do X you need to ...',
    assignedTo: 'John Doe'
  },
]


const contentDiv = document.getElementById('content');
const form = document.querySelector('form');


display();

form.addEventListener('submit', (e) => { 
  e.preventDefault();

  const title = document.getElementById('title').value;
  const status = document.getElementById('status').value;
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;
  const assignTo = document.getElementById('assignTo').value;

  if (title && status && category && description && assignTo) {
    addTask(title, status, category, description, assignTo);
    console.log(tasks);
    display();
  } else {
    alert('not all fields are filled');
  }

  
})


function display() {
  contentDiv.innerHTML = '';
  for (let t of tasks) {
    let task =
    `<div class='task'>
      <h1>Title : ${t.title}<h1>
      <label>Status : ${t.status}</label>
      <label>Category : ${t.category}</label>
      <p>Description : ${t.description}</p>
      <p>Assigned To : ${t.assignedTo}</p>
    </div>`
    
    contentDiv.innerHTML += task;
  }
}

function addTask(title, status, category, description, assignedTo) {
  const task = {
    title,
    status,
    category,
    description,
    assignedTo
  }

  tasks.push(task);
  display();
}