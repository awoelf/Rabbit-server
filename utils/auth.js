const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6ImJvYmJ5IiwibGFzdE5hbWUiOiJibG9iMiIsImVtYWlsIjoiYWxleGlzMzIxQGEuY29tIiwiX2lkIjoiNjQwOTBjZjc5M2YzZTQzYTMyZGQ3M2M5In0sImlhdCI6MTY3ODMyMDA5OSwiZXhwIjoxNjc4MzI3Mjk5fQ.xBtAX4TNPHSFQKV_8-DvUk9DufHT5h5iI0k-J3pGCkA', secret, { maxAge: expiration });
      req.user = data;
    } catch (error) {
      console.log(error);
    }

    return req;
  },
  signToken: function ({ firstName, lastName, email, _id }) {
    const payload = { firstName, lastName, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
