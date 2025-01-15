package org.deva;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App
{
    public static void main( String[] args )
    {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        Dev dev = ctx.getBean(Dev.class);
        dev.code();
    }
}
