package com.jiang.resourcetry.test;



/*@SpringBootApplication(scanBasePackages = "com.jiang.test")// 由于StartApp类位于基础包的自包中，因此需要设置scanBasePackage
@MapperScan(basePackages = "com.jiang.dao")//设置Mapper接口所在的包
@RestController*/
public class StringTest {


    public static void mains(String[] args) {
        String a = "abc";
        String b= "abc";
        String c = new String("abc");
        String d = new String("abc");
        String e = "ab"+"c";
        System.out.println(a==b);
        System.out.println(a==c);
        System.out.println(a==e);
        System.out.println(c==d);
        String str = "dvfsubvhjsnvuiegrubjkvabuvbivivddf";
        String str1 = "";
        for(int i=0;i<str.length();i++){
        }
    }
}

