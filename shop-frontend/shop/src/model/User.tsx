class User {
  id: number;
  email: string;
  password: string;
  profile: string;
  name: string;
  telephone: string;

  constructor() {
    this.id = -1;
    this.email = '';
    this.password = '';
    this.profile = '';
    this.name = '';
    this.telephone ='';
  }
}

export default User;