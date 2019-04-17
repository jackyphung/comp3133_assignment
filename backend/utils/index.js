const crypto = require('crypto');

class Auth {
  constructor() {
    this.header = {
      "alg": "HS256",
      "typ": "JWT"
    };
    this.secret_key = "comp3133_assignment";
  }

  verify(token) {
    if (token) {
      token = token.split(".");
      return (token && token[2] === this.hash(`${token[0]}.${token[1]}`, this.secret_key));
    }
    return false;
  }

  generateToken(payload) {
    let data = `${this.base64(JSON.stringify(this.header))}.${this.base64(JSON.stringify(payload))}`;
    let hashedData = this.hash(data, this.secret_key);
    return `${data}.${hashedData}`;
  }

  base64(string) {
    return Buffer.from(string).toString("base64");
  }

  hash(message, key) {
    return crypto.createHmac("sha256", Buffer.from(key, "utf8")).update(message).digest().toString('base64');
  }
}

module.exports = {
  Auth: new Auth()
}