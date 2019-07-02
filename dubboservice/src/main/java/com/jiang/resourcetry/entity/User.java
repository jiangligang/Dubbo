package com.jiang.resourcetry.entity;

import org.springframework.format.annotation.DateTimeFormat;


import java.util.Date;
import java.util.List;

/*@Entity//实体类与数据库表有映射关系
@Table(name = "user")//设置数据库表名*/
public class User {
   /* @Id//定义数据库主键
    @GeneratedValue(strategy = GenerationType.IDENTITY)//主键值生成方式*/
    private Long id;
    private String name;

   // @ManyToMany(cascade = {},fetch = FetchType.EAGER)//cascade 设置级联 fetch设置是否启用懒加载
    //@JoinTable是用来对 保存多对多关联关系表 信息的设置
    //name 关联关系表名
    //joinColumns 当前对象User在关联关系表的外键名
    //inverseJoinColumns 关联的另一个多方在关联关系表的外键名
   // @JoinTable(name = "user_role",joinColumns ={@JoinColumn(name = "user_id")} ,
   //         inverseJoinColumns={ @JoinColumn(name = "role_id")})
    private List<Role> roles;
    //@ManyToOne//多对一
    //@JoinColumn(name = "did")//设置关联对象（department）的外键列
    private Department department;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")//自己定义日期格式MVC未定义日期
    private Date date;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", date=" + date +
                '}';
    }
}
