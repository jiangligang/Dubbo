package com.jiang.common.listener;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.*;

/**
 * Session监听类的方法实现 要加@ComponentScan(basePackages={"com.jiang.listener"}) 扫面到包
 */
@WebListener
public class ListenerSession implements HttpSessionListener, HttpSessionAttributeListener,
        HttpSessionBindingListener, HttpSessionActivationListener, HttpSessionIdListener {
    @Override
    public void sessionWillPassivate(HttpSessionEvent se) {
//ccgfxmjrsssssssssssk
    }

    @Override
    public void sessionDidActivate(HttpSessionEvent se) {
///然后EHRHEJTJ
    }

    @Override
    public void attributeAdded(HttpSessionBindingEvent se) {

        //在文件中 git 》compare with branch
    }

    @Override
    public void attributeRemoved(HttpSessionBindingEvent se) {

    }

    @Override
    public void attributeReplaced(HttpSessionBindingEvent se) {

    }

    @Override
    public void valueBound(HttpSessionBindingEvent event) {

    }

    @Override
    public void valueUnbound(HttpSessionBindingEvent event) {

    }

    @Override
    public void sessionIdChanged(HttpSessionEvent se, String oldSessionId) {

    }

    @Override
    public void sessionCreated(HttpSessionEvent se) {

    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {

    }
}
