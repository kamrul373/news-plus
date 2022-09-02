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