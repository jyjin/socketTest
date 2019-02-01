# Node net.socket

测试node自带的socket, 使用例子证明和socket.io的区别

- net.socket 只允许每个建立的socket两端通信
- net.socket 不同的socket之间无法直接通信，需要构建额外的框架逻辑来支持
- socket.io 自身就维护了不同socket之间的通讯，所以可有诸如广播事件的特性


## How to start

1. run server 
> node server.js

2. run client
> node app.js

## 技术亮点
- net socket原理
- node 控制台输入读取


