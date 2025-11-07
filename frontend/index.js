
let btnLogin = document.getElementById('btnLogin');
const API_BASE = 'http://127.0.0.1:8000';
btnLogin.addEventListener('click', async () => {
    let username = document.getElementById('txtUsername').value;
    let password = document.getElementById('txtPassword').value;
    
    try {
        const res = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
        const result = await res.json().catch(() => ({}));

        const success = res.ok && (result.message === 'Login successful');
        if (success) {
            window.location.href = 'mainWindow.html';
        } else {
            alert("Login failed: " + (result.message || 'Unknown error'));
        }
    } catch (e) {
        console.error(e);
        alert('Login failed: network error');
    }
});

let btnSignUp = document.getElementById('btnSignUp');
btnSignUp.addEventListener('click', () => {
    window.location.href = 'signup.html';
});

       
    