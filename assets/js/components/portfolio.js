const disableDownload = (tag) =>{
    tag.removeAttribute('href');
    tag.removeAttribute('download');
    tag.style.opacity = '0.5';
    tag.style.cursor = 'not-allowed';
    tag.textContent ="Already downloaded";
}
const saveAndNavigate = (name, description, category) =>{
    console.log(name, description, category);
    localStorage.setItem("currentProject", JSON.stringify({name, description, category}));
    window.location.href = "../../../pages/image/gallery.html";
}
export const portfolio = ()=>{
    const hasDownloadedBefore = sessionStorage.getItem('downloaded');
    if (hasDownloadedBefore === 'true'){
        const downloadTag = document.querySelector('a[data-down="download"]');
        disableDownload(downloadTag);
    }
    if (document.getElementById("portfolioContainer")) {
        const portfolioContainer = document.getElementById("portfolioContainer");
        portfolioContainer.addEventListener('click', (event) => {
            const clickedButton = event.target.closest('button');
            if (clickedButton && clickedButton.classList.contains('view-to-gallery')) {
                const category = clickedButton.dataset.category;
                let name;
                let description;

                const projectDescription = clickedButton.closest('.project-description');
                if (projectDescription) {
                    name = projectDescription.querySelector("h2")?.textContent.trim();
                    description = projectDescription.querySelector("p")?.textContent.trim();
                    
                }
                if (category === 'exercise') {
                        name = 'Photoshop, Illustrator, and Blender Exercises';
                        description = 'A collection of advanced digital image compositions created using Adobe Photoshop. This project showcases technical expertise in multi-image compositing, seamless background manipulation, color correction, and lighting integration to merge multiple visual elements into a single cohesive asset.';
                }
                saveAndNavigate(name, description, category);
            }
            if (event.target.closest('a[data-down="download"]')) {
                const downloadButton = event.target.closest('a[data-down="download"]');
                if (sessionStorage.getItem('downloaded') === 'true') {
                    event.preventDefault();
                    disableDownload(downloadButton);
                    return;
                }
                sessionStorage.setItem('downloaded', 'true');
                setTimeout(() => {
                    disableDownload(downloadButton);
                }, 100);
            }
        });
    }
}