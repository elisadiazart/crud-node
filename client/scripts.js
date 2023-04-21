

const main = document.getElementById('main')
const createUserButton = document.getElementById('createUserButton')
const formCreateUser = document.getElementById('formCreateUser')

const fetchData = async (url, ...options) => {
    const response = await fetch(url, ...options);
    const data = await response.json();
    return data;
    
  };

const printUsers = async () => {
    const data = await fetchData('http://localhost:3000/api/users');
    const fragment = document.createDocumentFragment ()
    data.forEach( user => {
        const userContainer = document.createElement('div')
        const userName = document.createElement('h2');
        userName.textContent = user.name
        const button = document.createElement('button')
        button.textContent= 'Mas Información'
        button.dataset.type = 'button'
        button.dataset.userId = user.userId
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Borrar'
        deleteButton.dataset.userId = user.userId
        deleteButton.dataset.type = 'delete-button'
        const editButton = document.createElement('button')
        editButton.textContent= 'Editar'
        editButton.dataset.type = 'edit-button'
        userContainer.append(userName, button,deleteButton, editButton)
        userContainer.id = user.userId
        fragment.append(userContainer)
    })
    main.append(fragment)
}

const printUserDetails = async (userId) => {
    const data = await fetchData(`http://localhost:3000/api/users/${userId}`, {
        method:'GET',
    });
    const userEmail = document.createElement('p');
    userEmail.textContent = data.email;
    document.getElementById(userId).append(userEmail);
}

const deleteUserDetails = async (userId) => {
    const data = await fetchData(`http://localhost:3000/api/users/${userId}`, {
        method:'DELETE',
    })
}

const printSearchInput = (container) => {
    const form = document.createElement('form')
    const searchInput = document.createElement('input')
    const name = container.firstChild
    searchInput.placeholder = name.textContent
    const submitButton = document.createElement('input')
    form.dataset.userId = name.nextSibling.dataset.userId
    form.id='form'
    submitButton.type ='submit'
    submitButton.dataset.type ='submit'
    form.append(searchInput, submitButton)
    container.append(form)
    
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        changeName(form.dataset.userId,searchInput.value )
        name.textContent == searchInput.value
    })
}

const changeName = async (userId, newName)  => {            
    const data = await fetchData(`http://localhost:3000/api/users/${userId}`, {
        method:'PATCH',
        body: JSON.stringify({name: newName}),
        headers: {
            Accept: 'application/json',

            'Content-Type': 'application/json'
}
    })
}

const createUser = async (form) => {
    console.log(form.name.value);
    const data = await fetchData(`http://localhost:3000/api/users/`, {
        method:'POST',
        body: JSON.stringify({name: form.name.value,
        email: form.email.value
    }),
        headers: {
            Accept: 'application/json',

            'Content-Type': 'application/json'
}
    })
}

document.body.addEventListener('click', (e) => {
    if(e.target.dataset.type === 'button') printUserDetails(e.target.dataset.userId)
    if(e.target.dataset.type === 'delete-button') deleteUserDetails(e.target.dataset.userId)
    if(e.target.dataset.type === 'edit-button') printSearchInput(e.target.parentElement)
    
})

formCreateUser.addEventListener('submit', (e) => {
    e.preventDefault()
    createUser(e.target)
})



printUsers()