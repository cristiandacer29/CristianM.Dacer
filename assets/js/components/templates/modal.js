class xModal extends HTMLElement{
    connectedCallback(){
        const modalStatus = this.dataset.modalStatus;
        const modalType = this.dataset.modalType;


        const modalStatusClass = (modalStatusValue)=>{
            switch (modalStatusValue) {
                case "success":
                    return "fa-check-circle success-text";
                case "error":
                    return "fa-exclamation-circle error-text";
                case "warning":
                    return "fa fa-exclamation-triangle warning-text";
                case "info":
                    return "fa-info-circle info-text";
            
                default:
                    return "fa-info-circle info-text";
            }
        }
        this.innerHTML =`
            <dialog id="popupModal" class="popup-modal  padding-medium radius-medium">
                <article class="flex">
                    <header class="flex">
                        <i class='fa ${modalStatusClass(modalStatus)}'>${this.dataset.modalStatus}</i>
                        <button class="close radius-full center image-hover center" id="popupCloseButton">
                            <i class="fa fa-close error-text"></i>
                        </button>
                    </header>
                    <section>
                        <div class="title" >
                            <h1 class="${this.dataset.modalStatus}-text" id="popupTitle">
                                title
                            </h1>
                        </div>
                        <div class="paragraph">
                            <p id="popupDescription">lorem</p>
                        </div>
                    </section>
                    <footer class="flex">
                        <button class="radius-full center success-text image-hover" id="popupOkButton">
                            <i class="fa fa-check success-text"></i>
                            <span>Ok</span>
                        </button>
                        <button class="radius-full center error-text image-hover" id="popupOkButton">
                            <i class="fa fa-ban error-text"></i>
                            <span>Cancel</span>
                        </button>
                    </footer>
                </article>
            </dialog>`;
    }

}
customElements.define("x-modal", xModal);