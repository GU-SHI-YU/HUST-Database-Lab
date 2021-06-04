package com.gsy.shop.Controllers;

import com.gsy.shop.Models.Product;
import com.gsy.shop.Models.Store;
import com.gsy.shop.Models.StoreItem;
import com.gsy.shop.Services.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StoreController {

    private final StoreService storeService;

    @Autowired
    public StoreController(StoreService storeService) {

        this.storeService = storeService;
    }

    @PutMapping("/store/item")
    public StoreItem addItem(@RequestBody StoreItem storeItem) {

        return storeService.addItem(storeItem);
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
}
