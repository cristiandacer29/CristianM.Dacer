// for mobile nav
export const navbar = ()=>{
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavContainer = document.getElementById('mobileNavContainer');
    if(mobileNavContainer && mobileNav){
            mobileNavContainer.addEventListener('click', ()=>{
                mobileNav.classList.toggle('hide');
            })
    }
}