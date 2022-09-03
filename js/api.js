// loading categories
const loadCategories = async () => {
    const url = "https://openapi.programming-hero.com/api/news/categories";
    // fetching
    try {
        const response = await fetch(url);
        const categories = await response.json();
        // passing data to a function to process
        displayCategories(categories.data.news_category);
    } catch (error) {
        console.log(error);
    }

}
// loading category news
const loadCategoryNews = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;

    // fetching 
    try {
        const response = await fetch(url);
        const categoryNews = await response.json();
        return categoryNews.data;
    } catch (error) {
        console.log(error)
    }

}

// loading news details
const loadNewsDetails = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;

    try {
        const response = await fetch(url);
        const newsDetails = await response.json();
        return newsDetails.data[0];
    } catch (error) {
        console.log(error);
    }
}