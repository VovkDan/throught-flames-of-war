const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const SECRET_KEY = "your-secret-key";
const PASSWORD = "123"; 

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { password } = JSON.parse(event.body);

    // Просто сравниваем пароль с заранее заданным значением
    if (password !== PASSWORD) {
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
    return { statusCode: 500, body: JSON.stringify({ message: "Server error" }) };
  }
};
