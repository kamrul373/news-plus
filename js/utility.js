// number of news found in a category displaying function 
const displayNumberOfResultFound = (containerId, name = '', result = '') => {
    const resultFoundContainer = document.getElementById(containerId);
    // removing default display none class
    resultFoundContainer.classList.remove("d-none");
    // if else conditon for no news found in a category
    if (result > 0) {
        resultFoundContainer.innerHTML = `
        <h5>${result} news found for category ${name}</h5>
    `;
    } else {
        resultFoundContainer.innerHTML = `
        <h5>No news found for category ${name}</h5>
    `;
    }
}
// spinner 
const spinner = logic => {
    const spinnerContainer = document.getElementById("custom-spinner");
    if (logic == "show") {
        spinnerContainer.classList.remove("d-none");
    } else if (logic == "hide") {
        spinnerContainer.classList.add("d-none");
    }
}

// change background color of categories-menu when scroll
window.addEventListener("scroll", function (e) {
    document.getElementById("categories-menu").style.backgroundColor = "#FFF";
});

// date formaat 
const formatDate = date => {
    let publisheddate = new Date(date);
    let options = { year: 'numeric', month: 'short', day: 'numeric' };
    publisheddate = new Intl.DateTimeFormat('en-US', options).format(publisheddate);
    return publisheddate;
}

// news sorting by view 
const sortNewsByView = newsArray => {
    let NewsSortedByView = newsArray.sort((a, b) => b.total_view - a.total_view);
    return NewsSortedByView;
}

// formating Details
const formatingDetails = details => {
    if (details.length > 500) {
        details = details.slice(0, 500);
        details = details + " ... ";
        return details
    } else {
        return details;
    }
}

// stars

const stars = () => {
    return ` <i class="bi bi-star-half"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>`
}