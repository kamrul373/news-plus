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
    console.log(categoryNews);

    // displaying number of result found 
    displayNumberOfResultFound('mumberOfNewsfound', category_name, categoryNews.length);
}



