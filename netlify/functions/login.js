const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

exports.handler = async function(event, context) {
  try {
    const { email, password } = JSON.parse(event.body);

    // Логика аутентификации (например, проверка пароля)
    if (password === '123') {
      const token = jsonwebtoken.sign({ email }, 'your-secret-key', { expiresIn: '1h' });
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Login successful', token }),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Invalid credentials' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error' }),
    };
  }
};
