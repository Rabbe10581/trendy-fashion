const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}
const displayCategory = async (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        // console.log(category);
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('d-inline-block', 'px-4', 'my-4')
        categoryDiv.innerHTML = `
        <p onclick="loadNews('https://openapi.programming-hero.com/api/news/category/${category.category_id}')" class="btn btn-white"> ${category.category_name}</p>
        `;
        categoryContainer.appendChild(categoryDiv);
    })

}

const loadNews = async (url) => {
    toogleSpinner(true);
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}
// news.details.slice(0, 300)
const displayNews = async (newsAll) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    newsAll.forEach(news => {
        console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
            <div class="card flex-column flex-md-row align-items-center">
                <img class="card-img-top img-fluid w-25" src="${news.image_url}" alt="...">
                <div class="card-body flex-row">
                        <h5 class="card-title fs-4 fw-semibold">${news.title}</h5>
                        <p class="card-text">${news.details.slice(0, 250)}</p>
                        <div class="d-flex flex-row justify-content-between px-3">
                            <p class="fw-semibold">${news.author.name}</p>
                            <p class="fw-semibold">Views: ${news.total_view}</p>
                            <button onclick="loadPostDetails('${news._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsPostModal">Details</button>
                        </div>
                </div>
            </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
    //Stop Loader
    toogleSpinner(false);
}

const toogleSpinner = isLoading => {
    const loaderContainer = document.getElementById('loader');
    if (isLoading) {
        loaderContainer.classList.remove('d-none');
    }
    else {
        loaderContainer.classList.add('d-none');
    }
}

const loadPostDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPostDetails(data.data);
}

const displayPostDetails = post => {
    console.log(post);
    const modalTitle = document.getElementById('detailsPostModalLabel');
    modalTitle.innerText = post[0].author.name ? post[0].author.name : `No Author Available`;
    const modalBody = document.getElementById('viewsTotal');
    modalBody.innerText = `Views: ${post[0].total_view ? post[0].total_view : `Not Found`}`;
}

loadCategory()