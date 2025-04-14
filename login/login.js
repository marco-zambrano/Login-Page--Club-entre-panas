document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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
            window.location.href = response.url;
        } else if (!response.ok) {
            const errorText = await response.text();
            alert(errorText);
        }
    } catch (error) {
        console.error('Error de red:', error);
        alert('Ocurrió un error al intentar iniciar sesión.');
    }
});