package com.gsy.shop.Controllers;

import com.gsy.shop.Models.Type;
import com.gsy.shop.Services.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TypeController {

    private final TypeService typeService;

    @Autowired
    public TypeController(TypeService typeService) {

        this.typeService = typeService;
    }

    @RequestMapping("/test/type")
    public String saveType() {

        Type type = new Type();
        type.setName("test");

        typeService.addType(type);
        return "type add success";
    }
}
