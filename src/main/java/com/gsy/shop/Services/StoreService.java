package com.gsy.shop.Services;

import com.gsy.shop.DAO.IStoreDAO;
import com.gsy.shop.Models.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoreService {

    private final IStoreDAO storeDAO;

    @Autowired
    public StoreService(IStoreDAO storeDAO) {

        this.storeDAO = storeDAO;
    }

    public void addStore(Store store) {

        storeDAO.save(store);
    }
}
