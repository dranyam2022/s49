//for showing the update list of posts
const showPosts = (posts) => {
    let postEntries = '';
    
    posts.forEach((post) => {
        postEntries += `
            <div id="post-${post.id}">
                <h3 id="post-title-${post.id}">${post.title}</h3>
                <p id="post-body-${post.id}">${post.body}</p>
                <button onclick="editPost('${post.id}')">Edit</button>
                <button onclick="deletePost('${post.id}')">Delete</button>
            </div>
        `;
    });

    document.querySelector('#div-post-entries').innerHTML = postEntries;
}


//get all posts
fetch("https://jsonplaceholder.typicode.com/posts")
.then((response)=>{
   return response.json()
}).then((posts)=>{
    showPosts(posts)
})

//adding a new post
document.querySelector("#form-add-posts").addEventListener("submit", (event)=>{
    event.preventDefault();

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
            title: document.querySelector("#txt-title").value,
            body:document.querySelector("#txt-body").value
        }),
        headers: {"Content-Type": "application/json"}
    })
    .then((response)=> response.json())
    .then((result)=>{
        alert("Post has been created successfully!")
        console.log(result)

        document.querySelector("#txt-title").value = null
        document.querySelector("#txt-body").value = null
    })
})

//Editing an existing post
const editPost = (id)=>{

let title = document.querySelector(`#post-title-${id}`).innerHTML;
    let body = document.querySelector(`#post-body-${id}`).innerHTML;

    document.querySelector('#txt-edit-id').value = id;
    document.querySelector('#txt-edit-title').value = title;
    document.querySelector('#txt-edit-body').value = body;
    document.querySelector('#btn-submit-update').removeAttribute('disabled');
}

//updating existing post from edit form
document.querySelector('#form-edit-post').addEventListener('submit', (e) => {
    e.preventDefault();

    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify({
            id: document.querySelector('#txt-edit-id').value,
            title: document.querySelector('#txt-edit-title').value,
            body: document.querySelector('#txt-edit-body').value,
            userId: 1
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        alert('Successfully updated.');

        document.querySelector('#txt-edit-id').value = null;
        document.querySelector('#txt-edit-title').value = null;
        document.querySelector('#txt-edit-body').value = null;
        document.querySelector('#btn-submit-update').setAttribute('disabled', true);
    });
});

//Deleting an existing post
const deletePost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' });
    document.querySelector(`#post-${id}`).remove();
}