document.addEventListener("DOMContentLoaded", function () {
    // loads default content
    loadHTMLContent('html/home.html');

    // set "active" id on the Home link initially
    const homeLink = document.querySelector('a[href="html/home.html"]');
    if (homeLink) {
        console.log('Home link found:', homeLink);
        homeLink.setAttribute('id', 'active');
    } else {
        console.log('Home link not found.');
    }

    // handles navigation clicks
    const links = document.querySelectorAll('header ul a');
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            // removes "active" id from all links
            links.forEach(link => link.removeAttribute('id'));

            // adds "active" id to the clicked link
            this.setAttribute('id', 'active');

            const targetPage = this.getAttribute('href');
            loadHTMLContent(targetPage);
        });
    });
});

function loadHTMLContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}
