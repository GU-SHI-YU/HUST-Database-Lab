package com.gsy.shop.Controllers;

import com.gsy.shop.Models.Store;
import com.gsy.shop.Services.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoreController {

    private final StoreService storeService;

    @Autowired
    public StoreController(StoreService storeService) {

        this.storeService = storeService;
    }

    @RequestMapping("/test/store")
    public String saveStore() {

        Store store = new Store();
        store.setName("test");

        storeService.addStore(store);
        return "store add success";
    }
}
