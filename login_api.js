const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const allowedUser = {
  username: 'vedan',
  password: 'vedan'
};

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === allowedUser.username && password === allowedUser.password) {
    res.json({ token: 'jwt_token_example' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
