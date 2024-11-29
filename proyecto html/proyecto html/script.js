let isAuthenticated = false;
//se utiliza el localstorage para almacenar los nuevos registros (asi pueden iniciar sesion los nuevos usuarios)
const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];
const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const users = getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
        isAuthenticated = true;
        alert(`Inicio de sesión exitoso. ¡Bienvenido, ${user.name}!`);
        window.location.href = 'loggeado.html';
    } else {
        alert('Correo o contraseña incorrectos');
    }
});

//se registra los nuevos usuarios (del forms que se encuentra en register)
document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const users = getUsers();
    if (users.some((u) => u.email === email)) {
        alert('Este correo ya está registrado. Por favor, inicia sesión.');
        return;
    }
    users.push({ name, email, password });
    saveUsers(users);

    alert(`Usuario registrado con éxito: ${name}`);
    window.location.href = 'login.html';
});

// Manejar el cierre de sesión
document.getElementById('logout')?.addEventListener('click', () => {
    isAuthenticated = false;
    alert('Sesión cerrada');
    window.location.href = 'no_loggeado.html';
});

