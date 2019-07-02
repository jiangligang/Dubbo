package com.jiang.resourcetry.listener;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;

public class ApplicationConstants {
    public static  Date START_DATE = new Date() ;
    public static  HashMap<String, HttpSession> SESSION_MAP = new HashMap<>(10);
    public static int CURRENT_LOGIN_COUNT = 10;
    public static Date MAX_ONLINE_COUNT_DATE = new Date();
    public static int TOTAL_HISTORY_COUNT = 0;
    public static int MAX_ONLINE_COUNT = 12;
}
