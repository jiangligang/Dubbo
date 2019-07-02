package com.jiang.resourcetry.listener;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import java.util.logging.Logger;

/**
 10. *
 11. * SessionAttributeListenerTest.java
 12. *
 13. * @title 监听Session对象的属性
 14. * @description
 15. * @author SAM-SHO
 16. * @Date 2014-12-10
 17. */
public class SessionAttributeListenerTest implements HttpSessionAttributeListener {

    Logger log =  Logger.getLogger("ListenerTest");
           // 添加属性
            public void attributeAdded(HttpSessionBindingEvent se) {
                HttpSession session = se.getSession();
               String name = se.getName();
                log.info("新建session属性：" + name + ", 值为：" + se.getValue());
          }

            // 删除属性
           public void attributeRemoved(HttpSessionBindingEvent se) {
                HttpSession session = se.getSession();
               String name = se.getName();
                log.info("删除session属性：" + name + ", 值为：" + se.getValue());
            }

           // 修改属性
            public void attributeReplaced(HttpSessionBindingEvent se) {
                HttpSession session = se.getSession();
                String name = se.getName();
               Object oldValue = se.getValue();
               log.info("修改session属性：" + name + ", 原值：" + oldValue + ", 新值：" + session.getAttribute(name));
           }
}

