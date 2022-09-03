const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    try {
        if (data === "") throw "empty";
    }
    catch (err) {
        console.log("error");
    }
    displayCategory(data.data.news_category);
}
const displayCategory = async (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        // console.log(category);
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('d-inline', 'px-3', 'my-2')
        categoryDiv.innerHTML = `
        <p onclick="loadNews('https://openapi.programming-hero.com/api/news/category/${category.category_id}')" class="btn btn-white category-text"> ${category.category_name}</p>
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

const displayNews = async (newsAll) => {
    // console.log(newsAll);
    const countPostString = newsAll.length;
    const countPost = parseInt(countPostString);
    totalPosts(countPost);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    newsAll.forEach(news => {
        // console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
            <div class="card flex-column flex-md-row align-items-center">
                <img class="card-img-top img-fluid w-25 post-image" src="${news.image_url}" alt="...">
                <div class="card-body flex-row">
                        <h5 class="card-title fs-4 pb-2 fw-semibold post-title">${news.title}</h5>
                        <p id="details" class="card-text fw-light post-details">${news.details}</p>
                        <div class="d-flex flex-row justify-content-between px-md-3">
                            <div class="d-flex flex-row author-name">
                                <img class="author-img rounded-circle" src="${news.author.img}" alt="">
                                <p class="fw-semibold ps-2 ">${news.author.name}</p>
                            </div>
                            <p class="fw-semibold post-views">Views: ${news.total_view}</p>
                            <button onclick="loadPostDetails('${news._id}')" class="btn btn-primary post-btn" data-bs-toggle="modal" data-bs-target="#detailsPostModal">Details</button>
                        </div>
                </div>
            </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
    //Stop Loader
    toogleSpinner(false);
}
const totalPosts = (sum) => {
    const countContainer = document.getElementById('count-container');
    countContainer.innerHTML = '';
    const countDiv = document.createElement('div');
    countDiv.innerHTML = `
    <h4 class="text-info px-3 py-3 rounded-3 bg-light">${sum} items found in this category.</h4>
    `;
    countContainer.appendChild(countDiv);
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
    // console.log(post);
    const modalTitle = document.getElementById('detailsPostModalLabel');
    modalTitle.innerText = post[0].author.name ? post[0].author.name : `No Author Available`;
    const modalBody = document.getElementById('viewsTotal');
    modalBody.innerText = `Views: ${post[0].total_view ? post[0].total_view : `Not Found`}`;
    const modalDetails = document.getElementById('modal-details');
    modalDetails.innerText = `${post[0].details.slice(0, 200)}`;
    const modalRating = document.getElementById('modal-rating');
    modalRating.innerText = `Rating: ${post[0].rating.number}`;

}
loadNews('https://openapi.programming-hero.com/api/news/category/08')
loadCategory()