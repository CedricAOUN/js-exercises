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

function displayArticles() {
  const container = document.querySelector('#blogSection');
  container.innerHTML = '';

  for (let [index, article] of Object.entries(articles)) { 
    container.appendChild(articleCard(article.title, article.url, article.desc, index))
  }
}


function articleCard(title, url, desc, id) {
  const article = document.createElement('article');
  article.id = `article#${id}`;

  const h3 = document.createElement('h3');
  h3.textContext = title;

  const img = document.createElement('img');
  img.src = url;

  const p = document.createElement('p');
  p.textContent = desc;


  const deleteBtn = document.createElement('button');
  const editBtn = document.createElement('button');
  editBtn.addEventListener('click', () => editArticle(id));
  deleteBtn.addEventListener('click', () => deleteArticle(id));

  article.appendChild(h3);
  article.appendChild(img);
  article.appendChild(p);
  article.appendChild(editBtn);
  article.appendChild(deleteBtn);

}

