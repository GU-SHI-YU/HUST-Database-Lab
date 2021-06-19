import Product from "./Product";

class Order {
  id: number;
  s_id: number;
  u_id: number;
  amount: number;
  s_name: string;
  products: Product[];

  constructor() {
    this.id = -1;
    this.amount = -1;
    this.s_id = -1;
    this.s_name = '';
    this.u_id = -1;
    this.products = []; 
  }
}

export default Order;