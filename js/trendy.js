const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}
const displayCategory = async (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerText = `Home`;
    categories.forEach(category => {
        console.log(category);
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('d-inline-block', 'px-4', 'my-4')
        categoryDiv.innerHTML = `
        <p> ${category.category_name}</p>
        `;
        categoryContainer.appendChild(categoryDiv);
    })

}

loadCategory()