import { SERVER_ADDR } from "../constant/Constants";
import Order from "../model/Order";
import Product from "../model/Product";

export async function fetchByOrder(o_id: number) {
  return await fetch(SERVER_ADDR + `/order/items/${o_id}`, {
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
      newP.name = product.productName;
      newP.picture = product.picture;
      newP.type = product.type;
      newP.num = 0;
      return newP;
    })
  }).catch(error => {
    console.error(error);
  });
}

export async function fetchAllOrders(u_id: number) {
  return await fetch(SERVER_ADDR + `/user/orders/${u_id}`, {
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
    let orders = json;
    return Promise.all(orders.map(async (order: any) => {
      let newO: Order = new Order(); 
      await fetchByOrder(order.id)
          .then(products => {
          console.log(order.id, products);
          newO.products = products;
          newO.id = order.id;
          newO.s_id = order.s_id;
          newO.s_name = order.s_name;
          newO.u_id = order.u_id;
          newO.amount = order.amount;
        })
      return newO;
    }));
  }).catch(error => {
    console.error(error);
  });
}