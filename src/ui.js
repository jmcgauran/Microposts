class UI {
    constructor(){
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.formState = 'add';

    }

    // Methods
    // show posts in ui
    showPosts(posts) {
        // loop through posts data and insert to ui
        let output = '';

        posts.forEach((x) => {
            output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${x.title}</h4>
                    <p class="card-text">${x.body}</p>
                    <a href="#" class="edit card-link" data-id="${x.id}"><i class="fas fa-pencil-alt"></i></a>
                    <a href="#" class="delete card-link" data-id="${x.id}"><i class="far fa-trash-alt"></i></a>
                </div>
            </div>
            `
        })

        this.post.innerHTML = output ;
    }

    // fill form to edit
    fillForm(data){
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }

    // change form state
    changeFormState(type){
        if (type === 'edit') {
            this.postSubmit.textContent = 'Update Post'
            this.postSubmit.className = 'post-submit btn btn-block btn-warning text-dark'

            const button = document.createElement('button')
            button.className = 'btn btn-block post-cancel btn-light'
            button.appendChild(document.createTextNode('Cancel Edit'))

            const cardForm = document.querySelector('.card-form')
            const span = document.querySelector('.form-end')

            cardForm.insertBefore(button, span)

        } else {
            this.postSubmit.textContent = 'Post It'
            this.postSubmit.className = 'post-submit btn btn-dark btn-block'

            // Remove cancel button if showing
            if (document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove()
            }

            // Clear ID from hidden field
            this.clearIdInput()
            this.clearFields()
        }
    }

    // show ui alert
    showAlert(message, className){
        this.clearAlert();
        const div = document.createElement('div')
        div.className = `alert-${className} alert-dismissible alert`
        div.appendChild(document.createTextNode(message))

        const container = document.querySelector('.postsContainer')
        const posts = document.querySelector('#posts')

        container.insertBefore(div, posts)

        setTimeout(() => {
            this.clearAlert()
        }, 3000)
    }
    // clear ui alert
    clearAlert(){
        const currentAlert = document.querySelector('.alert')

        if (currentAlert) {
            currentAlert.remove()
    }}
    // clear input fields
    clearFields(){
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    clearIdInput() {
        this.idInput.value = ''
    }
}

export const ui = new UI();