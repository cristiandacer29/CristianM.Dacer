import{navbar} from'./components/navbar.js';
import{gallery} from'./components/gallery.js';
import{modals} from'./components/modals.js';
import{portfolio} from'./components/portfolio.js';

const cookieExists = document.cookie.split(';').some((cookie) => cookie.trim().startsWith('cristianDacerPortfolioVisitorName='));
const currentPath = window.location.pathname;

const repoBase = currentPath.startsWith('/pages/') || currentPath === '/' || currentPath.endsWith('index.html') 
    ? '' 
    : '/' + currentPath.split('/')[1];

if (cookieExists) {
    // User has already submitted the form
    if (currentPath.includes("/pages/greetings")) {
        // window.location.replace(window.location.origin);
        window.location.replace(window.location.origin + repoBase + "/");
    }
}
else {
    // User has not submitted the form yet
    if (!currentPath.includes("/pages/greetings")) {
        // window.location.replace(window.location.origin + "/pages/greetings");
        window.location.replace(window.location.origin + repoBase + "/pages/greetings");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    navbar();
    gallery();
    modals();
    portfolio();
    if (document.querySelector('.hero-section')) {
        localStorage.removeItem('currentProject');
        localStorage.setItem("currentProject", JSON.stringify({
            name:'Biking, Bonds, and Balance',
            category: 'hobby',
            description:'One of my hobbies is biking. When I formerly worked in Manila as a production controller, almost every weekend we gathered to go for a ride. The cycling group I was a member of is called "Team Machinist," which consisted of my co-workers. We rode across Manila and nearby provinces. Through this hobby, I created more friends, improved my strength, and found a great stress reliever.'
        }));    
    }

})