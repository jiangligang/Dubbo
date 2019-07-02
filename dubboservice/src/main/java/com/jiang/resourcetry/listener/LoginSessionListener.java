package com.jiang.resourcetry.listener;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

/**
 14. *
 15. * LoginSessionListener.java
 16. *
 17. * @title 实现单态登录的监听器
 18. * @description
 19. * @author SAM-SHO
 20. * @Date 2014-12-10
 21. */

public class LoginSessionListener implements HttpSessionAttributeListener {

    Logger log =  Logger.getLogger("ListenerTest");

          Map<String, HttpSession> map = new HashMap<String, HttpSession>();

            public void attributeAdded(HttpSessionBindingEvent event) {

               String name = event.getName();

               // 登录
              if (name.equals("PersonInfos")) {

                       PersonInfos PersonInfos = (PersonInfos) event.getValue();

                      if (map.get(PersonInfos.getAccount()) != null) {

                              // map 中有记录，表明该帐号在其他机器上登录过，将以前的登录失效
                                HttpSession session = map.get(PersonInfos.getAccount());
                               PersonInfos oldPersonInfos = (PersonInfos) session.getAttribute("PersonInfos");//map已经存在的旧的信息

                               log.info("帐号" + oldPersonInfos.getAccount() + "在" + oldPersonInfos.getIp() + "已经登录，该登录将被迫下线。");

                                session.removeAttribute("PersonInfos");
                                session.setAttribute("msg", "您的帐号已经在其他机器上登录，您被迫下线。");
                            }

                       // 将session以用户名为索引，放入map中
                      map.put(PersonInfos.getAccount(), event.getSession());
                        log.info("帐号" + PersonInfos.getAccount() + "在" + PersonInfos.getIp() + "登录。");
                    }
           }

          public void attributeRemoved(HttpSessionBindingEvent event) {

                String name = event.getName();

              // 注销
              if (name.equals("PersonInfos")) {
                        // 将该session从map中移除
                        PersonInfos PersonInfos = (PersonInfos) event.getValue();
                      map.remove(PersonInfos.getAccount());
                       log.info("帐号" + PersonInfos.getAccount() + "注销。");
                   }
         }

            public void attributeReplaced(HttpSessionBindingEvent event) {

               String name = event.getName();

              // 没有注销的情况下，用另一个帐号登录
              if (name.equals("PersonInfos")) {

                        // 移除旧的的登录信息
                      PersonInfos oldPersonInfos = (PersonInfos) event.getValue();
                       map.remove(oldPersonInfos.getAccount());

                       // 新的登录信息
                      PersonInfos PersonInfos = (PersonInfos) event.getSession().getAttribute("PersonInfos");

                       // 也要检查新登录的帐号是否在别的机器上登录过
                       if (map.get(PersonInfos.getAccount()) != null) {
                               // map 中有记录，表明该帐号在其他机器上登录过，将以前的登录失效
                                HttpSession session = map.get(PersonInfos.getAccount());
                               session.removeAttribute("PersonInfos");
                                session.setAttribute("msg", "您的帐号已经在其他机器上登录，您被迫下线。");
                           }
                        map.put("PersonInfos", event.getSession());
                   }

           }

        }

