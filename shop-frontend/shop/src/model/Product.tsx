class Product {
  id: number;
  name: string;
  description: string;
  type: string;
  picture: string;
  price: number;
  discount: number;
  num: number;
  stack: number;

  constructor() {
    this.id = -1;
    this.name = "";
    this.description = "";
    this.type = "";
    this.picture = "";
    this.price = -1;
    this.discount = -1;
    this.num = -1;
    this.stack = -1;
  }
}

export default Product;