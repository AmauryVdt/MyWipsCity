document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function changeIcon() {
    icon = document.getElementById("menu__icon");

    if (icon.className === "fas fa-bars") {
        icon.className = "fas fa-times"
    }
    else if (icon.className === "fas fa-times") {
        icon.className = "fas fa-bars"
    }
}