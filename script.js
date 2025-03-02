document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const password = document.getElementById("password").value;

    const response = await fetch("functions/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem("token", data.token); // Сохраняем токен
      window.location.href = "stranicapass.html"; // Перенаправляем
    } else {
      alert("Ошибка: " + data);
    }
  });
