document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const password = document.getElementById("password").value;
  try {
    const response = await fetch("/.netlify/functions/login", {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "stranicapass.html"; // Перенаправляем
    } else {
      alert("Ошибка: " + data.message);
    }
  } catch (error) {
    alert("Ошибка при отправке запроса: " + error.message);
  }
  window.addEventListener('scroll', () => {
        if(window.scrollY > 1500) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    })
   scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Плавная прокрутка
        });
});
