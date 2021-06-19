import { SERVER_ADDR } from "../constant/Constants";
import Product from "../model/Product";
import Store from "../model/Store";

export async function fetchByStore(s_id: number) {
  console.log('fetchByStore called', s_id);
  return await fetch(SERVER_ADDR + `/store/items/${s_id}`, {
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('请求错误');
    }
  }).then(json => {
    let ret = json;
    return ret.map((product: any) => {
      let newP: Product = new Product();
      newP.id = product.productId;
      newP.description = product.description;
      newP.discount = product.discount;
      newP.name = product.name;
      newP.picture = product.picture;
      newP.price = product.price;
      newP.type = product.type;
      newP.stack = product.stack;
      newP.num = 0;
      return newP;
    })
  }).catch(error => {
    console.error(error);
  });
}

export async function fetchAllStores() {
  console.log('fetchAllStores called');
  return await fetch(SERVER_ADDR + `/stores/mode/id/order/Asc`, {
    headers: new Headers({
      'Content-Type': 'application/json'
    })
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
        })
      return newS;
    }));
  }).catch(error => {
    console.error(error);
  });
}

export async function putOrder(u_id: number, s_id: number, body: any) {
  return await fetch(SERVER_ADDR + `/order/add/${u_id}/${s_id}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return new Error('请求错误');
    }
  }).catch(error => {
    console.error(error);
  })
}