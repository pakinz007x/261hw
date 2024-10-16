function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TUf0d25c778650983159c407176aacb8135c25f1c99fee3bb610cf3ed618d7ae09a54d156d6b30b62192347c658e403a6a'
        },
        body: JSON.stringify({"UserName" : username,"PassWord" : password})
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));
}
