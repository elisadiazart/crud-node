const main = document.getElementById('main')


const fetchData = async (url, method) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
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
        userContainer.append(userName, button,deleteButton)
        fragment.append(userContainer)
    })
    main.append(fragment)
}

const printUserDetails = async (button) => {
    const data = await fetchData(`http://localhost:3000/api/users/${button.dataset.userId}`);
    const userEmail = document.createElement('p');
    userEmail.textContent = data.email;
    button.parentElement.append(userEmail);
}

const deleteUserDetails = async (button,) => {
    const data = await fetchData(`http://localhost:3000/api/users/${button.dataset.userId}`,'DELETE')
}

document.body.addEventListener('click', (e) => {
    if(e.target.dataset.type === 'button') printUserDetails(e.target)
    if(e.target.dataset.type === 'delete-button') deleteUserDetails(e.target)
    
})

printUsers()