# 雪旅官网源码骨架

## 当前源码结构

```text
03_网站源码/
├── README.md
├── index.html
├── tcn/
│   └── Skischool/
│       └── index.html
├── assets/
│   ├── images/
│   ├── icons/
│   └── qrcode/
├── css/
│   └── style.css
└── js/
    └── calculator.js
```

## 本地预览

可以直接用浏览器打开：

```text
03_网站源码/index.html
03_网站源码/tcn/Skischool/index.html
```

也可以在 `03_网站源码/` 目录下启动本地静态服务：

```sh
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/
http://localhost:8080/tcn/Skischool/
```

## 当前状态

- 当前未接入真实素材。
- 当前未使用 `02_素材库/00_非公开原始资料/` 中的任何文件。
- 当前 Logo、二维码、教练照片均为文字或占位区。
- 当前未初始化 Git。
- 当前未部署 GitHub Pages。
- 当前价格、旺季规则、教练名单都需要用户确认。
- 课费计算器为第一版估算功能，不提交资料、不储存资料、不调用外部 API。
