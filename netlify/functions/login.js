const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const SECRET_KEY = "your-secret-key";
const HASHED_PASSWORD = "$2a$10$nOUIs5kJ7naTuTFkBy1veuEv1LKvaXurHj1tq2vTPWgL/Z4ZQXdpG"; // Захешированный пароль 'password123'

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { password } = JSON.parse(event.body);

    const isMatch = await bcrypt.compare(password, HASHED_PASSWORD);
    if (!isMatch) {
      return { statusCode: 401, body: JSON.stringify({ message: "Invalid password" }) };
    }

    const token = jsonwebtoken.sign({}, SECRET_KEY, { expiresIn: "1h" });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Разрешаем запросы со всех источников
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: "Login successful", token }),
    };
  } catch (error) {
    console.error('Error during login function:', error);  // Логирование ошибки для отладки
    return { statusCode: 500, body: JSON.stringify({ message: "Server error" }) };
  }
};
