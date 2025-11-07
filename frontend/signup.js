const API_BASE = "http://127.0.0.1:8000";
let btnSignU = document.getElementById('btnSignU');
btnSignU.addEventListener('click', async () => {
    let username = document.getElementById('txtUsername').value;
    let password = document.getElementById('txtPassword').value; 
    let confirmPassword = document.getElementById('txtConfirmPassword').value;
    let name = document.getElementById('txtName').value;
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    try {
        const res = await fetch(`${API_BASE}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, name })
            });
        const result = await res.json().catch(() => ({}));
        if (res.ok && (result.message === 'User registered successfully' || result.message === 'Signup successful')) {
            alert("Sign up successful");

        } else {
            alert("Sign up failed: " + (result.message || 'Unknown error'));
        }
    } catch (e) {
        console.error(e);
        alert('Sign up failed: network error');
    }
}
);