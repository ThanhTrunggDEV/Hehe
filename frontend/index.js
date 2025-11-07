
let btnLogin = document.getElementById('btnLogin');
const API_BASE = 'http://127.0.0.1:8000';
btnLogin.addEventListener('click', async () => {
    let username = document.getElementById('txtUsername').value;
    let password = document.getElementById('txtPassword').value;
    

    const res = await fetch(`${API_BASE}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
    let result = await res.json();

    if (result.success) {
        Window.location.href = 'mainWindow.html';
    }
    else{
        alert("Login failed: " + result.message);
    }
});

let btnSignUp = document.getElementById('btnSignUp');
btnSignUp.addEventListener('click', () => {
    Window.location.href = 'signup.html';
});

       
    