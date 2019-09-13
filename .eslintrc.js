module.exports = {
    "env": {//指定代码运行的宿主环境
        "browser": true,
        "es6": true
    },
    "extends": ["standard", "standard-jsx"],//指定eslint规范
    "globals": { // 声明在代码中的自定义全局变量
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {// 设置解析器选项
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "plugins": [ //引用第三方的插件
        "react"
    ],
    "rules": {//启用额外的规则或覆盖默认的规则
        "no-console": "off",
    }
};
