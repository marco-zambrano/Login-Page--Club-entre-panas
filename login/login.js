document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch('https://zezenta.shop/ruta/secreta/secretisima/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include' // Important for the cookies
        });

        if (response.redirected) {
            errorMessage.classList.remove('.show');
            window.location.href = response.url;
        } else if (!response.ok) {
            errorMessage.textContent = 'Usuario o contraseña incorrectos';
            errorMessage.classList.add('.show');
        }
    } catch (error) {
        console.error('Error de red:', error);
        alert('Ocurrió un error de red al intentar iniciar sesión.');
    }
});