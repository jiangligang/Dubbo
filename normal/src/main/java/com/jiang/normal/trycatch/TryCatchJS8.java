package com.jiang.normal.trycatch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.util.Scanner;
@SpringBootApplication
public class TryCatchJS8 {
    /**
     * mavn项目无法直接运行main 因为mwb的tomcat 有程序入口 要添加架包 junit
     * @param args
     */
    public static void main(String[] args) {
        System.out.println("sd");
        SpringApplication.run(TryCatchJS8.class);
        try(Scanner in = new Scanner(System.in)){
            int  str = in.nextInt();
        }catch (Exception e){
            System.out.println("异常");
        }

    }
}
class  ListenerSession implements HttpSessionListener{

    @Override
    public void sessionCreated(HttpSessionEvent se) {

    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {

    }
}
