import { SERVER_ADDR } from "../constant/Constants";
import Store from "../model/Store";
import { fetchByStore } from "./ProductList";

export async function fetchStoreByUser(u_id: number) {
  return await fetch(SERVER_ADDR + `/user/manage/${u_id}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('请求错误');
    }
  }).then(async json => {
    let stores = json;
    return Promise.all(stores.map(async (store: any) => {
      let newS:Store = new Store(); 
      await fetchByStore(store.id)
          .then(products => {
          newS.products = products;
          newS.id = store.id;
          newS.name = store.name;
          newS.description = store.description;
          newS.type = newS.products[0].type;
          newS.ownerName = json.ownerName;
        })
      return newS;
    }));
  }).catch(error => {
    console.error(error);
  });
}