package com.jiang.resourcetry.entity;



/*@Entity//实体类与数据库表有映射关系
@Table(name = "department")//设置数据库表名*/
public class Department {
   /* @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)*/
    private Long id;
    private String name;

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

    public Department() {

    }

    @Override
    public String toString() {
        return "Department{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
