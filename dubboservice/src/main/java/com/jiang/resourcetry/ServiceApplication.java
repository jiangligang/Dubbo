package com.jiang.resourcetry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


/**
 * springBoot 要有主程序入口
 * 默认程序是springboot应用，main首先启用，游览器访问根目录，访问main方法
 */
@SpringBootApplication
//@RestController代表是一个控制器类同@Controller,并且视图解析器无作用，返回内容就是return 的内容
//等效于@Controller+@ResponseBody

//@ComponentScan 要扫描到有次注解的包@WebListener  @WebFilter  @WebServlet  才不报红
@ComponentScan(basePackages={"com.jiang.resourcetry.listener"})
public class ServiceApplication {
    public static void main(String[] args) {
        //调用其它module的方法common
        SpringApplication.run(ServiceApplication.class,args);
    }
}
