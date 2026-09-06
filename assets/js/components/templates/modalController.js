export default class ModalController {
    constructor(){
            this.modalContainer = null;

            this.modalContent = null;
            this.modalCloseButton = null;

            this.modalHeaderText = null;
            this.modalBodyText = null;

            this.modalOkButton = null;
            this.modalCancelButton = null;
        this.init();
    }

    async init() {
        try{
            //call modal html template
            const templateUrl = new URL('./modal.html', import.meta.url);
            const modalHtml = await fetch(templateUrl);
            const modalContentText = await modalHtml.text();
            
            //put the modal content into the body of the document
            document.body.insertAdjacentHTML("afterend", modalContentText);

            //assign modal elements to variables
            this.modalContainer = document.getElementById("modalContainer");

            this.modalContent = document.getElementById("modalContent");
            this.modalCloseButton = document.getElementById("modalCloseButton");

            this.modalHeaderText = document.getElementById("modalHeaderText");
            this.modalBodyText = document.getElementById("modalBodyText");

            this.modalOkButton = document.getElementById("modalOkButton");
            this.modalCancelButton = document.getElementById("modalCancelButton");

            const closeButtons = [this.modalCloseButton, this.modalCancelButton, this.modalOkButton];
            closeButtons.forEach(button => {
                button.addEventListener("click", () => this.close());
            });
        } catch (error) {
            console.error("Error loading modal template:", error);
        }
    }
    open(modalPart) {
        if(!this.modalContainer) return console.warn("Modal not loaded yet.");

        if (modalPart.alertColor) {
            this.modalContent.style.borderColor = modalPart.alertColor;
        }

        modalHeaderText.innerText = modalPart.title || "Notification.";
        this.modalBodyText.innerText = modalPart.body || "No content available.";
        this.modalContainer.showModal(); 
    }
    close() {
        if (!this.modalContainer) return;
        this.modalContainer.close(); 
    }
}
