package com.gsy.shop.Controllers;

import com.gsy.shop.Models.Product;
import com.gsy.shop.Models.Store;
import com.gsy.shop.Models.StoreItem;
import com.gsy.shop.Models.StoreItemDetailView;
import com.gsy.shop.Services.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class StoreController {

    private final StoreService storeService;

    @Autowired
    public StoreController(StoreService storeService) {

        this.storeService = storeService;
    }

    @PutMapping("/store/item/add/{storeId}/type/{typeId}")
    public StoreItem addItem(@PathVariable("storeId") Integer storeId,
                             @PathVariable("typeId") Integer typeId,
                             @RequestBody Product product) {

        return storeService.addItem(storeId, typeId, product);
    }

    @GetMapping("/stores/type/{type}")
    public List<Store> getStoreByType(@PathVariable("type") String type) {

        return storeService.getStoreByType(type);
    }

    @GetMapping("/stores/mode/{mode}/order/{order}")
    public List<Store> getStoreOrdered(@PathVariable("mode") String mode, @PathVariable("order") String order) {

        Boolean isAsc = Boolean.TRUE;
        if (order.equals("Desc")) {
            isAsc = Boolean.FALSE;
        }
       return storeService.getStoreOrdered(mode, isAsc);
    }

    @PutMapping("/store/add")
    public Store addStore(@RequestBody Store store) {

        return storeService.addStore(store);
    }

    @DeleteMapping("/store/{id}")
    public ResponseEntity<?> deleteStore(@PathVariable("id") Integer id) {

        storeService.deleteStore(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/store/{id}")
    public Store getStore(@PathVariable("id") Integer id) {

        return storeService.getStore(id);
    }

    @PutMapping("/store/{id}")
    public Store updateStore(@PathVariable("id") Integer id, @RequestBody Store newStore) {

        return storeService.updateStore(id, newStore);
    }

    @RequestMapping("/test/store")
    public String saveStore() {

        Store store = new Store();
        store.setName("test");

        storeService.addStore(store);
        return "store add success";
    }

    @GetMapping("/store/items/{id}")
    public List<StoreItemDetailView> getItem(@PathVariable("id") Integer id) {

        return storeService.getItems(id);
    }

    @PutMapping("/store/item/update")
    public ResponseEntity<?> updateItem(@RequestBody Product newProduct) {

        Product product = storeService.updateItem(newProduct);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/store/item")
    public ResponseEntity<?> deleteItem(@RequestBody StoreItem delStoreItem) {

        storeService.deleteItem(delStoreItem);
        return ResponseEntity.ok().build();
    }
}
