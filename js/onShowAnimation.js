const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if (entry.isIntersecting) {
            entry.target.classList.add("show-animation");
        }
        else {
            entry.target.classList.remove("show-animation");
        }
    })
}, {})
const content = document.querySelectorAll(".to-animate");
content.forEach(show => observer.observe(show));