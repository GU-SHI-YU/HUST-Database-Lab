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
          newS.ownerName = store.ownerName;
        })
      return newS;
    }));
  }).catch(error => {
    console.error(error);
  });
}

export async function updateItem(body: any) {
  return await fetch(SERVER_ADDR + `/store/item/update`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  }).then(response => {
    if (response.ok) {
      return true;
    } else {
      throw new Error('请求错误');
    }
  }).catch(error => {
    console.log(error);
  });
}

export async function addItem(s_index: number, t_id: number, body: any) {
  return await fetch(SERVER_ADDR + `/store/item/add/${s_index}/type/${t_id}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  }).then(response => {
    if (response.ok) {
      return true;
    } else {
      throw new Error('请求错误');
    }
  }).catch(error => {
    console.log(error);
  });
}

export async function deleteItem(body: any) {
  return await fetch(SERVER_ADDR + `/store/item`, {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  }).then(response => {
    if (response.ok) {
      return true;
    } else {
      throw new Error('请求错误');
    }
  }).catch(error => {
    console.log(error);
  });
}

export async function fetchTypes() {
  return await fetch(SERVER_ADDR + `/types`, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('请求错误');
    }
  }).then(json => {
    return Promise.all(json.map((item: any) => {
      return item.name;
    })).catch(error => {
      console.error(error);
    })
  })
}

export async function updateStore(s_id: number, body: any) {
  return await fetch(SERVER_ADDR + `/store/${s_id}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  }).then(response => {
    if (response.ok) {
      return true;
    } else {
      throw new Error('请求错误');
    }
  }).catch(error => {
    console.error(error);
  })
}

export async function deleteStore(s_id: number) {
  return await fetch(SERVER_ADDR + `/store/${s_id}`, {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'appication/json',
    }),
  }).then(response => {
    if (response.ok) {
      return true;
    } else {
      throw new Error('请求错误');
    }
  }).catch(error => {
    console.error(error);
  })
}