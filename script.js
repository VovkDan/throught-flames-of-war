document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/.netlify/functions/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password: password }) // Отправляем только пароль
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token); // Сохраняем токен
      window.location.href = "stranicapass.html"; // Перенаправляем
    } else {
      alert("Ошибка: " + data.message);
    }
  } catch (error) {
    alert("Ошибка при отправке запроса: " + error.message);
  }
});