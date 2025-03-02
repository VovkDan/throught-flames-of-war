const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passwordHash = bcrypt.hashSync("password123", 10); // Только пароль

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { password } = JSON.parse(event.body);

  const valid = bcrypt.compareSync(password, passwordHash);
  if (!valid) {
    return { statusCode: 401, body: "Invalid password" };
  }

  const token = jwt.sign({ user: "admin" }, "your-secret-key", { expiresIn: "1h" });

  return {
    statusCode: 200,
    body: JSON.stringify({ token }),
  };
};