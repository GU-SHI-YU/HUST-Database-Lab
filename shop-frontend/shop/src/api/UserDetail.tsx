import { SERVER_ADDR } from "../constant/Constants";
import User from "../model/User";

export async function updateUser(u_id: number, user: User) {
  return await fetch(SERVER_ADDR + `/user/${u_id}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(user),
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('请求错误');
    }
  }).then(json => {
    let user = new User();
    user.email = json.email;
    user.id = json.id;
    user.name = json.name;
    user.password = json.password;
    user.profile = json.profile;
    user.telephone = json.telephone;
    return user;
  }).catch((error) => {
    console.error(error);
  })
}