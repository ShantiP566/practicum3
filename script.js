const API_URL = 'http://localhost:4001';
let token = '';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'http://localhost:8000'
            },
            credentials: 'omit',
            body: JSON.stringify({ 
                username: username,
                password: password 
            })
        });

        if (response.ok) {
            token = await response.text();
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('primeSection').style.display = 'block';
        } else {
            alert('Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
});

document.getElementById('primeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const number = document.getElementById('numberInput').value;

    try {
        const response = await fetch(`${API_URL}/prime/${number}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const isPrime = await response.json();
            document.getElementById('result').textContent = 
                isPrime ? `${number} is prime!` : `${number} is not prime.`;
        } else {
            alert('Failed to check number. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while checking the number.');
    }
});

document.getElementById('logoutButton').addEventListener('click', () => {
    token = '';
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('primeSection').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('numberInput').value = '';
    document.getElementById('result').textContent = '';
}); 