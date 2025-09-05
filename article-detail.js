document.addEventListener('DOMContentLoaded', () => {
    // الحصول على رقم المقال من عنوان URL
    const params = new URLSearchParams(window.location.search);
    const articleIndex = params.get('id');
    const articleTitleElement = document.getElementById('article-title');
    const articleContentElement = document.getElementById('article-content');
    
    // الحصول على المقالات من الذاكرة المحلية
    const articles = JSON.parse(localStorage.getItem('articles')) || [];

    // التحقق من وجود المقال ورقم المقال
    if (articleIndex !== null && articles[articleIndex]) {
        const article = articles[articleIndex];
        articleTitleElement.textContent = article.title;
        articleContentElement.textContent = article.description;
    } else {
        // عرض رسالة خطأ في حالة عدم العثور على المقال
        articleTitleElement.textContent = 'المقال غير موجود.';
        articleContentElement.textContent = 'عذراً، لم نتمكن من العثور على المقال الذي تبحث عنه.';
    }
});