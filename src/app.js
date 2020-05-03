import { http } from './http' ;
import { ui } from './ui' ;

// invoke getPost function on load
document.addEventListener('DOMContentLoaded', getPosts);
// post submit event 
document.querySelector('.post-submit').addEventListener('click', submitPost);
// delete event
document.querySelector('#posts').addEventListener('click', deletePost);
// edit event
document.querySelector('#posts').addEventListener('click', enableEditState);
// cancel event
document.querySelector('.card-form').addEventListener('click', cancelEdit)


function getPosts() {

  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function submitPost() {
  // get data from forms
  const title = document.querySelector('#title').value ;
  const body = document.querySelector('#body').value ;
  const id = document.querySelector('#id').value;

  // make into object to pass to backend
  const data = {
    title : title,
    body : body
  }

  if (title === '' || body === '') {
    ui.showAlert('Please add in all fields', 'danger')
  } else {
    if (id === '') {
      // Create Post
      http
        .post('http://localhost:3000/posts', data)
        .then(post => {
          ui.showAlert('Post Added', 'success')
          ui.clearFields()
          getPosts()
        })
        .catch(err => console.log(err))
    } else {
      // Update the post
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then(post => {
          ui.showAlert('Post Updated', 'success')
          ui.changeFormState('add')
          getPosts()
        })
        .catch(err => console.log(err))
    }
}
}

// delete post function
function deletePost (e) {
  e.preventDefault();
  if(e.target.parentElement.classList.contains('delete')){

    // get id of post too be deleted 
    const id = e.target.parentElement.dataset.id ;

    // check if user is sure
    if(confirm('Are you sure')){

      // delete from backend
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          // show alert
          ui.showAlert('Post removed', 'alert alert-sucess');
          // get the posts again
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

// enable edit state
function enableEditState(e) {
  if(e.target.parentElement.classList.contains('edit')){

    // get id of post too be edited
    const id = e.target.parentElement.dataset.id ;

    // get post title
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent ;
    
    // get post body
    const body = e.target.parentElement.previousElementSibling.textContent ;

    // create data variable
    const data = {
      id : id,
      title : title,
      body : body
    }

    // send to ui module to fll form
    ui.fillForm(data);

    
  }
  e.preventDefault();
}

function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add')
  }
  e.preventDefault()
}
