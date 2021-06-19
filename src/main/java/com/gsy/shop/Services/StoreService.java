package com.gsy.shop.Services;

import com.gsy.shop.DAO.*;
import com.gsy.shop.Exception.ResourceNotFoundException;
import com.gsy.shop.Models.Store;
import com.gsy.shop.Models.StoreItem;
import com.gsy.shop.Models.StoreItemDetailView;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Transactional
@Service
public class StoreService {

    private final IStoreDAO storeDAO;
    private final IStoreItemDAO storeItemDAO;
    private final IProductDAO productDAO;
    private final IStoreTypeDAO storeTypeDAO;
    private final ITypeDAO typeDAO;
    private final IStoreItemDetailViewDAO storeItemDetailViewDAO;

    @Autowired
    public StoreService(IStoreDAO storeDAO,
                        IStoreItemDAO storeItemDAO,
                        IStoreTypeDAO storeTypeDAO,
                        ITypeDAO typeDAO,
                        IProductDAO productDAO,
                        IStoreItemDetailViewDAO storeItemDetailViewDAO) {

        this.storeDAO = storeDAO;
        this.storeItemDAO = storeItemDAO;
        this.storeTypeDAO = storeTypeDAO;
        this.typeDAO = typeDAO;
        this.productDAO = productDAO;
        this.storeItemDetailViewDAO = storeItemDetailViewDAO;
    }


    public void deleteStore(@NonNull Integer id) {

        Store store = storeDAO.findById(id).orElseThrow(() -> new ResourceNotFoundException("Store", "id", id));
        storeDAO.delete(store);
    }

    public Store updateStore(@NonNull Integer id, @NonNull Store newStore) {

        Store store = storeDAO.findById(id).orElseThrow(() -> new ResourceNotFoundException("Store", "id", id));
        store.setName(newStore.getName());
        store.setDescription(newStore.getDescription());
        store.setOwnerId(newStore.getOwnerId());
        return storeDAO.save(store);
    }

    public Store getStore(@NonNull Integer id) {

        return storeDAO.findById(id).orElseThrow(() -> new ResourceNotFoundException("Store", "id", id));
    }

    public Store addStore(@NonNull Store store) {

       return storeDAO.save(store);
    }

    public List<Store> getStoreByType(@NonNull String name) {

        Integer typeId = typeDAO.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Type", "name", name))
                .getId();
        List<Integer> storeIds = storeTypeDAO.findAllByTypeId(typeId);
        List<Store> stores = new ArrayList<>();
        storeIds.forEach(storeId -> {
            Store store = storeDAO.findById(storeId)
                    .orElseThrow(() -> new ResourceNotFoundException("Store", "id", storeId));
            stores.add(store);
        });
        return stores;
    }

    public List<Store> getStoreOrdered(@NonNull String columnName, @NonNull Boolean isAsc) {

        List<Store> stores = storeDAO.findByOrderByIdAsc();
        switch (columnName) {
            case "name":
                stores = storeDAO.findByOrderByNameAsc();
            case "id":
            default:
                break;
        }
        if (!isAsc) {
            Collections.reverse(stores);
        }
        return stores;
    }

    public StoreItem addItem(@NonNull StoreItem storeItem) {

        Integer productId = storeItem.getProductId();
        productDAO.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));
        return storeItemDAO.save(storeItem);
    }

    public List<StoreItemDetailView> getItems(@NonNull Integer id) {

        return storeItemDetailViewDAO.findAllByStoreId(id);
    }
}
