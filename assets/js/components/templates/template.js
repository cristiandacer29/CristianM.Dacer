class xHeader extends HTMLElement {
    connectedCallback() {
        const currentPath = window.location.pathname;
        const urlIsLocal = currentPath.includes("/CristianM.Dacer/") ? "/CristianM.Dacer/" : "/";
        const currentPage = this.getAttribute('page');
        this.innerHTML = `<header class="page-header">
            <ul class="flex">
                <li>
                    <a href="${ urlIsLocal }" >
                        <img src="${ urlIsLocal }img/logo.ico" alt="logo" class="neumorphism-small padding-small radius-large image-hover" />
                    </a>
                </li>
                <li>
                    <a href="${ urlIsLocal }" class="center gap-extra-small link-hover  ${currentPage === 'home' ? 'active-nav': ''}">
                        <span>
                            <i class="icon fa fa-home fa-2x"></i>
                        </span>
                        <h2>Home</h2>
                    </a>
                </li>
                <li>
                    <a href="${ urlIsLocal }pages/portfolio/" class="center gap-extra-small link-hover ${currentPage === 'portfolio' ? 'active-nav': ''}">
                        <span>
                            <i class="icon fa fa-briefcase fa-2x"></i>
                        </span>
                        <h2>Portfolio</h2>
                    </a>
                </li>
                <li>
                    <a href="${ urlIsLocal }pages/contact/" class="center gap-extra-small link-hover ${currentPage === 'contact' ? 'active-nav': ''}">
                        <span>
                            <i class="icon fa fa-phone fa-2x"></i>
                        </span>
                        <h2>Contact</h2>
                    </a>
                </li>
                <li class="hamburger-button relative" id="mobileNavContainer">
                    <span>
                        <button class="neumorphism radius-small center image-hover">
                            <i class="info-text fa fa-bars fa-2x"></i>
                        </button>
                    </span>
                    <div class="absolute background glass-card radius-small hide" id="mobileNav">
                        <ul class="mobile-nav-button flex">
                            <li>
                                <a href="${ urlIsLocal }" class="center gap-extra-small padding-small-block link-hover ${currentPage === 'home' ? 'active-nav': ''}">
                                    <span>
                                        <i class="icon fa fa-home fa-2x"></i>
                                    </span>
                                    <h2>Home</h2>
                                </a>
                            </li>
                            <li>
                                <a href="${ urlIsLocal }pages/portfolio" class="center gap-extra-small padding-small-block link-hover ${currentPage === 'portfolio' ? 'active-nav': ''}">
                                    <span>
                                        <i class="icon fa fa-briefcase fa-2x"></i>
                                    </span>
                                    <h2>Portfolio</h2>
                                </a>
                            </li>
                            <li>
                                <a href="${ urlIsLocal }pages/contact/" class="center gap-extra-small padding-small-block link-hover ${currentPage === 'contact' ? 'active-nav': ''}">
                                    <span>
                                        <i class="icon fa fa-phone fa-2x"></i>
                                    </span>
                                    <h2>Contact</h2>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </header>`;
    }
}

class xFooter extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `<footer class="flex page-footer">
            <span class="flex icon">
                <span>
                    <i class="fa fa-github"></i>
                </span>
                    <p>GitHub : <a href="https://github.com/cristiandacer29" target="_blank" class="link-hover">cristiandacer29</a></p>
            </span>
            <span class="flex icon">
                <span>
                    <i class="fa fa-envelope"></i>
                </span>
                    <p>Gmail : <a href="https://mail.google.com/mail/u/1/?view=cm&fs=1&to=cristiandacer29@gmail.com&tf=1" target="_blank" class="link-hover">cristiandacer29@gmail.com</a></a></p>
            </span>
        </footer>`;
    }
}

customElements.define('x-header', xHeader);
customElements.define('x-footer', xFooter);