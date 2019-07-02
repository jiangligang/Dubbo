package com.jiang.resourcetry.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Application {
    @RequestMapping(value = "/index")//输出字符串
    public String hello(){
        return "index";
    }
}
