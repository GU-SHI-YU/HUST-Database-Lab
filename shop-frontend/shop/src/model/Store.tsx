import Product from "./Product";

class Store {
  id: number;
  name: string;
  description: string;
  type: string;
  products: Product[];
  ownerName: string;

  constructor() {
    this.id = -1;
    this.name = "";
    this.description = "";
    this.type = "";
    this.products = [];
    this.ownerName = '';
  }
}

export default Store;