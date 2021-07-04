package com.gsy.shop.Controllers;

import com.gsy.shop.Models.Type;
import com.gsy.shop.Services.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class TypeController {

    private final TypeService typeService;

    @Autowired
    public TypeController(TypeService typeService) {

        this.typeService = typeService;
    }

    @GetMapping("/types")
    public List<Type> getAll() {

        return typeService.getAll();
    }

    @RequestMapping("/test/type")
    public String saveType() {

        Type type = new Type();
        type.setName("test");

        typeService.addType(type);
        return "type add success";
    }
}
