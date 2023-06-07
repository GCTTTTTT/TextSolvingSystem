package com.example.demo2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * @projectName: demo1
 * @package: com.example.controller
 * @className: ViewController
 * @author: GCT
 * @description: TODO
 * @date: 2023/3/23 17:04
 * @version: 1.0
 */
@Controller
@RequestMapping("view")
public class ViewController {
    @GetMapping("login")
    public String login() {
        return "login";
    }

    @GetMapping("register")
    public String register() {
        return "register";
    }

    @GetMapping("demo1")
    public String demo1() throws UnknownHostException {
        System.out.println("11111");
        InetAddress addr = InetAddress.getLocalHost();
        System.out.println("Local HostAddress: "+addr.getHostAddress());
        String hostname = addr.getHostName();
        System.out.println("Local host name: "+hostname);

        return "demo1";
    }

    @GetMapping("demo2")
    public String demo2() throws UnknownHostException {
        System.out.println("22222");
        InetAddress addr = InetAddress.getLocalHost();
        System.out.println("Local HostAddress: "+addr.getHostAddress());
        String hostname = addr.getHostName();
        System.out.println("Local host name: "+hostname);
        return "demo2";
    }

    @GetMapping("demo3")
    public String demo3() throws UnknownHostException {
        System.out.println("33333");
        InetAddress addr = InetAddress.getLocalHost();
        System.out.println("Local HostAddress: "+addr.getHostAddress());
        String hostname = addr.getHostName();
        System.out.println("Local host name: "+hostname);
        return "demo3";
    }

    @GetMapping("index")
    public String index() throws UnknownHostException {
        System.out.println("index");
        InetAddress addr = InetAddress.getLocalHost();
        System.out.println("Local HostAddress: "+addr.getHostAddress());
        String hostname = addr.getHostName();
        System.out.println("Local host name: "+hostname);
        return "index";
    }

    @GetMapping("index1")
    public String index1() throws UnknownHostException {
        System.out.println("index1");
        InetAddress addr = InetAddress.getLocalHost();
        System.out.println("Local HostAddress: "+addr.getHostAddress());
        String hostname = addr.getHostName();
        System.out.println("Local host name: "+hostname);
        return "index1";
    }

    @GetMapping("testCodeHTML")
    public String testCodeHTML() throws UnknownHostException {
        System.out.println("testCodeHTML");
        InetAddress addr = InetAddress.getLocalHost();
        System.out.println("Local HostAddress: "+addr.getHostAddress());
        String hostname = addr.getHostName();
        System.out.println("Local host name: "+hostname);
        return "testCodeHTML";
    }

}
