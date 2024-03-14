import { BaseModel } from './baseModel.mjs';
import { createBaseClassGettersAndSetters } from '../utils/baseClassSetter.mjs';
export class AccountModel extends BaseModel {
  constructor({ accountType, accountId, ...baseProps}) {
    super(baseProps); // Call to the base class constructor
    this.data.accountType = accountType
    this.data.accountId = accountId
    createBaseClassGettersAndSetters(this)
  }
}
// Derived class
export class UserModel extends BaseModel {
  constructor({ accounts, email, hashedPassword, isEmailValidated, ...baseProps}) {
    super(baseProps); // Call to the base class constructor
    this.data.accounts = accounts.map(account => new AccountModel(account))
    this.data.email = email
    this.data.hashedPassword = hashedPassword
    this.data.isEmailValidated = isEmailValidated ?? false
    createBaseClassGettersAndSetters(this)
  }
  
  async setPassword(password) {
    this.data.hashedPassword = await bcrypt.hash(password, 10)
  }

  async validatePassword(password) {
    return bcrypt.compare(password, this.data.hashedPassword)
  } 
}