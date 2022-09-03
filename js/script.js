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
    // showing spinner
    spinner("show");
    // loading single category news
    const categoryNews = await loadCategoryNews(category_id)
    // category news container
    const categoryNewsContainer = document.getElementById("category-news");
    // cleaning
    categoryNewsContainer.innerHTML = "";

    // displaying number of result found 
    displayNumberOfResultFound('mumberOfNewsfound', category_name, categoryNews.length);

    // sorting news based on view 
    let categoryNewsSortedByView = sortNewsByView(categoryNews);

    // processing category news

    categoryNewsSortedByView.forEach(news => {
        console.log(news);
        // destructuring 
        const { author, details, image_url: largeImage, others_info, rating, thumbnail_url, title, total_view, _id } = news;

        // formating details : slicing upto 500 and then show ...
        let formatedDetails = formatingDetails(details);

        // Formating date to match design 
        const publisheddate = formatDate(author.published_date);

        // creating new element where each news will appear

        const singleNewsContainer = document.createElement("div");
        singleNewsContainer.classList.add("card", "mb-3", "shadow-lg");

        singleNewsContainer.innerHTML = `
            <div class="row g-1 p-3">
                <div class="col-md-3">
                    <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="${title}">
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${formatedDetails}</p>
                        <div class="row d-flex align-items-center justify-content-between">
                            <div class="col-md-4 d-flex gap-3 align-items-center" id="author">
                                <div class="author-avatar">
                                    <img src="${author.img}" class="img-fluid" alt="author">
                                </div>
                                <div class="author-info d-flex flex-column">
                                    <span>${author.name ? author.name : "n/a"}</span>
                                    <span class="text-muted">${publisheddate}</span>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <i class="bi bi-eye"></i>
                                <strong>${total_view ? total_view : "n/a"}</strong>
                            </div>
                            <div class="col-md-4">
                                <i class="bi bi-star-half"></i>
                                <i class="bi bi-star"></i>
                                <i class="bi bi-star"></i>
                                <i class="bi bi-star"></i>
                                <i class="bi bi-star"></i>
                            </div>
                            <div class="col-md-2">
                                <a onclick="displayNewsDetails('${_id}')"><i class="bi bi-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        categoryNewsContainer.appendChild(singleNewsContainer);

    });
    // hiding spinner
    spinner("hide");
}





