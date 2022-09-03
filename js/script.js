// displaying categories
const displayCategories = categories => {
    const categoryMenuItemContainer = document.getElementById("category-menu");
    categories.forEach(category => {
        // Object Destructuring 
        const { category_id, category_name } = category;

        // creating new element
        const li = document.createElement("li");
        li.classList.add("nav-item", "px-2");

        // innerHtml inside li
        li.innerHTML = `
            <a class="nav-link fw-semibold" aria-current="page" href="#${category_name.split(" ").join("")}" onclick="displayCategoryNews('${category_id}','${category_name}')">${category_name}</a>
        `
        categoryMenuItemContainer.appendChild(li);

    })

}
// calling categories function to show in frontend
loadCategories();

// displaying all news in a category 
const displayCategoryNews = async (category_id, category_name) => {
    const categoryNews = await loadCategoryNews(category_id)

    // displaying number of result found 
    displayNumberOfResultFound('mumberOfNewsfound', category_name, categoryNews.length);

    // showing spinner
    spinner("show");

    // processing category news

    categoryNews.forEach(news => {
        console.log(news);
        // destructuring 
        const { author, details, image_url: largeImage, others_info, rating, thumbnail_url, title, total_view } = news
    });
}

/*
<div class="card mb-3 shadow-lg">
                <div class="row g-2">
                    <div class="col-md-3">
                        <img src="" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.</p>
                            <div class="row d-flex align-items-center justify-content-between">
                                <div class="col-md-4 d-flex gap-3 align-items-center" id="author">
                                    <img src="images/author.png" class="img-fluid h-100" alt="author">
                                    <div class="author-info d-flex flex-column">
                                        <span>Jan Cooper</span>
                                        <span class="text-muted">Jan 10, 2022</span>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <i class="bi bi-eye"></i>
                                    <strong>1.5M</strong>
                                </div>
                                <div class="col-md-4">
                                    <i class="bi bi-star-half"></i>
                                    <i class="bi bi-star"></i>
                                    <i class="bi bi-star"></i>
                                    <i class="bi bi-star"></i>
                                    <i class="bi bi-star"></i>
                                </div>
                                <div class="col-md-2">
                                    <i class="bi bi-arrow-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
*/



