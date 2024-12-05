let articles = [
  {
    title: 'test',
    url: 'https://picsum.photos/536/354',
    descripiton: 'desc test',
    id: 0,
  },
  {
    title: 'test',
    url: 'https://picsum.photos/536/354',
    descripiton: 'desc test',
    id: 1,
  }
]

function init() {
  displayArticles();
}
init();

function displayArticles() {
  const container = document.querySelector('#blogSection');
  container.innerHTML = '';

  for (let [index, article] of Object.entries(articles)) { 
    container.appendChild(articleCard(article.title, article.url, article.descripiton, index))
  }
}


function articleCard(title, url, desc, id) {
  const article = document.createElement('article');
  article.id = `article#${id}`;

  const h3 = document.createElement('h3');
  h3.innerText = title;

  const img = document.createElement('img');
  img.src = url;

  const p = document.createElement('p');
  p.innerText = desc;

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  const editBtn = document.createElement('button');
  editBtn.innerText = 'Edit';
  editBtn.addEventListener('click', () => openEditArticle(id));
  deleteBtn.addEventListener('click', () => deleteArticle(id));

  article.appendChild(h3);
  article.appendChild(img);
  article.appendChild(p);
  article.appendChild(editBtn);
  article.appendChild(deleteBtn);

  return article;
}


function deleteArticle(id) {
  const articleToDelete = articles.find((article) => article.id == id);
  articles.pop(articleToDelete);

  displayArticles();
}

function openEditArticle(id) {
  const editSection = document.querySelector('#editSection');
  editSection.classList.remove('d-none');
  editSection.classList.add('d-flex');

  const inputs = document.querySelectorAll('#editSection input');

  confirmBtn = document.createElement('button');
  confirmBtn.innerText = 'Confirm';
  confirmBtn.addEventListener('click', () => {
    confirmChanges(id, inputs[0].value, inputs[1].value, inputs[2].value);
    editSection.classList.remove('d-flex');
    editSection.classList.add('d-none');
    confirmBtn.remove();
  });

  editSection.appendChild(confirmBtn);

}

function confirmChanges(id, title, url, desc) {
  const articleToEdit = articles.find((article) => article.id == id);

  articleToEdit.title = title;
  articleToEdit.descripiton = desc;
  articleToEdit.url = url;

  displayArticles();
}
