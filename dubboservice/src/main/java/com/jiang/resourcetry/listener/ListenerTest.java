package com.jiang.resourcetry.listener;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.util.logging.Logger;

/**
 17. *
 18. * ListenerTest.java
 19. *
 20. * @title 监听对象的创建与销毁
 21. * @description
 22. * @author SAM-SHO
 23. * @Date 2014-12-10
 24. */
public class ListenerTest implements HttpSessionListener, ServletContextListener, ServletRequestListener {
            Logger log =  Logger.getLogger("ListenerTest");
         // 创建 session
         @Override
         public void sessionCreated(HttpSessionEvent se) {
           HttpSession session = se.getSession();
            log.info("新创建一个session, ID为: " + session.getId());
           }

            // 销毁 session
            @Override
            public void sessionDestroyed(HttpSessionEvent se) {
                HttpSession session = se.getSession();
                log.info("销毁一个session, ID为: " + session.getId());
            }

            // 加载 context
            @Override
            public void contextInitialized(ServletContextEvent sce) {
                ServletContext servletContext = sce.getServletContext();
                log.info("即将启动" + servletContext.getContextPath());
            }
            // 卸载 context
            public void contextDestroyed(ServletContextEvent sce) {
                ServletContext servletContext = sce.getServletContext();
                log.info("即将关闭" + servletContext.getContextPath());
            }

            // 创建 request
            @Override
            public void requestInitialized(ServletRequestEvent sre) {

                HttpServletRequest request = (HttpServletRequest) sre.getServletRequest();

                String uri = request.getRequestURI();
                uri = request.getQueryString() == null ? uri : (uri + "?" + request.getQueryString());

                request.setAttribute("dateCreated", System.currentTimeMillis());

             log.info("IP " + request.getRemoteAddr() + " 请求 " + uri);
           }

           // 销毁 request
           @Override
           public void requestDestroyed(ServletRequestEvent sre) {

                HttpServletRequest request = (HttpServletRequest) sre.getServletRequest();

              long time = System.currentTimeMillis() - (Long) request.getAttribute("dateCreated");

                log.info(request.getRemoteAddr() + "请求处理结束, 用时" + time + "毫秒. ");
            }
}

