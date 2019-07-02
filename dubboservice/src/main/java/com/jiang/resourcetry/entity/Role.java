package com.jiang.resourcetry.entity;


/*@Entity//实体类与数据库表有映射关系
@Table(name = "role")//设置数据库表名*/
public class Role {
/*    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)*/
    private Long id;
    private String name;

    public Role() {
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

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
