document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('article-manager-form');
    const articleList = document.getElementById('article-list');
    const addBtn = document.getElementById('add-article-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const logoutBtn = document.getElementById('logout-btn');

    let articles = JSON.parse(localStorage.getItem('articles')) || [];
    let editingArticleIndex = null;

    const user = JSON.parse(localStorage.getItem('current_demo'));
    if (!user || user.role !== 'admin') {
        alert('ليس لديك صلاحية للوصول إلى هذه الصفحة.');
        window.location.href = 'index.html';
        return;
    }

    function saveArticles() {
        localStorage.setItem('articles', JSON.stringify(articles));
        renderArticles();
    }

    function renderArticles() {
        articleList.innerHTML = '';
        articles.forEach((article, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="article-info">
                    <h4>${article.title}</h4>
                    <div class="meta">
                        <span>#${article.id}</span> | <span>التاريخ: ${article.date}</span> | <span>التصنيف: ${article.category}</span>
                    </div>
                </div>
                <div class="actions">
                    <button class="btn btn-secondary" onclick="editArticle(${index})">تعديل</button>
                    ${article.isArchived ? 
                        `<button class="btn btn-unarchive" onclick="archiveArticle(${index}, false)">إلغاء أرشفة</button>` :
                        `<button class="btn btn-archive" onclick="archiveArticle(${index}, true)">أرشفة</button>`
                    }
                    <button class="btn btn-danger" onclick="deleteArticle(${index})">حذف</button>
                </div>
            `;
            articleList.appendChild(li);
        });
    }

    window.editArticle = (index) => {
        editingArticleIndex = index;
        const article = articles[index];
        document.getElementById('title').value = article.title;
        document.getElementById('date').value = article.date;
        document.getElementById('category').value = article.category;
        document.getElementById('image').value = article.image;
        document.getElementById('description').value = article.description;
        form.style.display = 'block';
        addBtn.style.display = 'none';
    };

    window.deleteArticle = (index) => {
        if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
            articles.splice(index, 1);
            saveArticles();
        }
    };
    
    window.archiveArticle = (index, status) => {
        articles[index].isArchived = status;
        saveArticles();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const category = document.getElementById('category').value;
        const image = document.getElementById('image').value;
        const description = document.getElementById('description').value;
        
        const newArticle = { 
            id: articles.length > 0 ? articles[articles.length - 1].id + 1 : 1,
            title, 
            date,
            category,
            image,
            description,
            isArchived: false
        };

        if (editingArticleIndex !== null) {
            newArticle.id = articles[editingArticleIndex].id;
            articles[editingArticleIndex] = newArticle;
            editingArticleIndex = null;
        } else {
            articles.push(newArticle);
        }

        saveArticles();
        form.reset();
        form.style.display = 'none';
        addBtn.style.display = 'block';
    });

    addBtn.addEventListener('click', () => {
        form.style.display = 'block';
        addBtn.style.display = 'none';
        editingArticleIndex = null;
        form.reset();
    });

    cancelBtn.addEventListener('click', () => {
        form.style.display = 'none';
        addBtn.style.display = 'block';
        editingArticleIndex = null;
        form.reset();
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('current_demo');
        window.location.href = 'index.html';
    });
    
    renderArticles();
});