import * as moment from "moment";

export class User {
  email: string = '';
  token: string = '';
  localId: string = '';
  expirationDate: Date = moment().add(1, 'days').toDate();
  authGoogle: string = '';
  name: string = '';
  lastName: string = '';
  photoUrl: string = '';
  isAuthByGoolge: boolean = false;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }

  get expireDate() {
    return this.expirationDate;
  }

  get userToken() {
    return this.token;
  }
}
