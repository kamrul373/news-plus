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
        // destructuring 
        const { author, details, others_info, thumbnail_url, title, total_view, _id } = news;

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
                                <span class="badge text-bg-primary">${others_info.is_todays_pick == true ? "Today Picked" : ``}</span>
                                <span class="badge text-bg-success">${others_info.is_trending == true ? "Trending" : ""}</span>
                                <span>${others_info.is_todays_pick == false && others_info.is_trending == false ? `${stars()}` : ""}</span>
                            </div>
                            <div class="col-md-2">
                                <a href="#" onclick="displayNewsDetails('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-arrow-right fs-2 text-primary"></i></a>
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

// displaying single news details 
const displayNewsDetails = async (news_id) => {
    // loading news details
    const newsDetails = await loadNewsDetails(news_id);
    console.log(newsDetails);
    // object destructuring
    const { author, details, image_url: largeImage, others_info, rating, title, total_view } = newsDetails;
    // news Details Container
    const newsDetailsContainer = document.getElementById("news-details");
    // cleaning
    newsDetailsContainer.innerHTML = ""
    // displaying news details on modal
    newsDetailsContainer.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="d-flex gap-3 align-items-center pb-3" id="author">
                <div class="modal-author-avatar">
                    <img src="${author.img}" class="img-fluid" alt="author">
                </div>
                <div class="author-info d-flex flex-column">
                    <strong>${author.name ? author.name : "n/a"}</strong>
                    <span class="text-muted">${formatDate(author.published_date)}</span>
                </div>
                <div class="total-view px-3">
                   <span><strong>Views : </strong>${total_view ? total_view : "n/a"}</span>
                </div>
                <div class="px-3">
                    <span><strong>Ratting : </strong> ${rating.number}</span>
                </div>
                <div class="tags px-3">
                    <span class="badge text-bg-primary">${others_info.is_todays_pick == true ? "Today Picked" : ""}</span>
                    <span class="badge text-bg-success">${others_info.is_trending == true ? "Trending" : ""}</span>
                </div>
            </div>
            
            <div class="text-center mb-2">
                <img src="${largeImage}" class="img-fluid"/>
            </div>
            <p>${details}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    `

}





