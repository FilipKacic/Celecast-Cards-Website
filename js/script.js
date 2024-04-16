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

    // hides header based on scroll direction with fade effect when scrolling down
    let lastScrollPosition = 0;
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight; // gets the height of the header in pixels
    const transitionTime = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--heartbeat')) * 1000; // convert seconds to milliseconds
    
    window.addEventListener('scroll', function () {
        const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;

        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > headerHeight) { // scroll down
            header.style.transition = `opacity ${transitionTime}ms ease-in-out`; // sets transition time
            header.style.opacity = '0';
            header.style.visibility = 'hidden';
        } else { // scroll up
            header.style.transition = `opacity ${transitionTime}ms ease-in-out`; // sets transition time
            header.style.opacity = '0.9';
            header.style.visibility = 'visible';
        }
        lastScrollPosition = currentScrollPosition <= 0 ? 0 : currentScrollPosition;
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
