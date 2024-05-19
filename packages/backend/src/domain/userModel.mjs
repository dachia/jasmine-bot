import { BaseModel } from './baseModel.mjs';
import bcrypt from 'bcrypt';
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
  constructor({ accounts, email, hashedPassword, isEmailValidated, timezone, isTrial, subscriptionEndAt, isNotifiedAboutTrialEnd, ...baseProps}) {
    super(baseProps); // Call to the base class constructor
    this.data.userId = this.data.id
    this.data.accounts = accounts?.map(account => new AccountModel(account)) ?? []
    this.data.email = email?.toLowerCase()
    this.data.hashedPassword = hashedPassword
    this.data.isEmailValidated = isEmailValidated ?? false
    this.data.timezone = timezone
    this.data.isTrial = !!isTrial
    this.data.subscriptionEndAt = subscriptionEndAt
    this.data.isNotifiedAboutTrialEnd = isNotifiedAboutTrialEnd ?? false
    createBaseClassGettersAndSetters(this)
  }
  
  addAccount(account) {
    this.accounts.push(new AccountModel({ ...this.data, ...account }))
    this.isUpdated = true
  }
  
  async setPassword(password) {
    this.hashedPassword = await bcrypt.hash(password, 10)
  }
  
  async validatePassword(password) {
    return bcrypt.compare(password, this.data.hashedPassword)
  } 
}