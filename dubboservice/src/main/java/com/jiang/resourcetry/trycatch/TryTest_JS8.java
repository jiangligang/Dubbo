package com.jiang.resourcetry.trycatch;

import java.util.Scanner;

public class TryTest_JS8 {
    /**
     * mavn项目无法直接运行main 因为mwb的tomcat 有程序入口 要添加架包 junit
     * @param args
     */
    public static void main(String[] args) {
        System.out.println("sd");
        try(Scanner in = new Scanner(System.in)){
            int  str = in.nextInt();
        }catch (Exception e){
            System.out.println("异常");
        }

    }
}
