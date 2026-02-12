// Smooth scroll to Projects
document.getElementById("viewWorkBtn").addEventListener("click", () => {
    document.getElementById("Projects").scrollIntoView({ behavior: "smooth" });
});


// Mobile menu toggle
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// Fade in on scroll
const faders = document.querySelectorAll(".fade");

const appearOptions = {
    threshold: 0.3
};

const appearOnScroll = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            return;
        }else{
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});


// Active Navbar Highlight
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if(pageYOffset >= sectionTop){
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(a => {
        a.classList.remove("active");
        if(a.getAttribute("href") === "#" + current){
            a.classList.add("active");
        }
    });
});
