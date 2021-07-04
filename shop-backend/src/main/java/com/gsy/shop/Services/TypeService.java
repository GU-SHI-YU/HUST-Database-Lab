package com.gsy.shop.Services;

import com.gsy.shop.DAO.ITypeDAO;
import com.gsy.shop.Models.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeService {

    private final ITypeDAO typeDAO;

    @Autowired
    public TypeService(ITypeDAO typeDAO) {

        this.typeDAO = typeDAO;
    }

    public List<Type> getAll() {

        return typeDAO.findAll();
    }

    public void addType(Type type) {

        typeDAO.save(type);
    }
}
