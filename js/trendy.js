const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}
const displayCategory = async (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        console.log(category);
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('d-inline-block', 'px-4', 'my-4')
        categoryDiv.innerHTML = `
        <p onclick="loadNews('https://openapi.programming-hero.com/api/news/category/${category.category_id}')" class="btn btn-white"> ${category.category_name}</p>
        `;
        categoryContainer.appendChild(categoryDiv);
    })

}

const loadNews = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
}

const displayNews = async (news) => {

}

loadCategory()