import bcrypt from 'bcrypt'

export class Encrypt {

  constructor() { }
  async encrypt(password: string): Promise<string> {

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    const validPin = regex.test(password)
    if(validPin === false) throw new Error('Invalid Password')
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword
  }
  async compare(passworldPlain: string, hashPassword: string) {
    return await bcrypt.compare(passworldPlain, hashPassword)
  }

}


