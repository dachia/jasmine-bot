import jwt from 'jsonwebtoken';
import config from '../config.mjs';

export class AuthService {
  constructor() {
    this.jwt = jwt;
  }

  async sign(payload, opts = {}) {
    return this.jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1d', ...opts });
  }
  
  async verify(token) {
    return this.jwt.verify(token, config.JWT_SECRET);
  }
}