function login() {
        var password = document.getElementById('password').value;

        // Tablica przechowująca poprawne hasła
        var correctPasswords = ["xV7&zHk8R#FGt2PwQwJJf9GtVV7!", "kaja", "polak"]; // Możesz dodać więcej haseł tutaj

        // Sprawdzenie, czy wprowadzone hasło znajduje się w tablicy
        if (password === "") {
            alert("Proszę wprowadzić hasło.");
        } else if (correctPasswords.includes(password)) {
            // Jeśli hasło jest poprawne, przekierowanie na stronę
            window.location.href = 'dashboard.html';
        } else {
            // Jeśli hasło jest niepoprawne
            alert("Niepoprawne hasło.");
        }
    }