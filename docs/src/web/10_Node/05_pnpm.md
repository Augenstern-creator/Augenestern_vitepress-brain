# 1、新一代包管理工具

pnpm 内部使用**基于内容寻址**的文件系统来存储磁盘上所有的文件，这个文件系统出色的地方在于：

1. 不会重复安装同一个包。用 `npm` / `yarn` 的时候，如果 100 个项目都依赖 `lodash`，那么 `lodash` 很可能就被安装了 100 次，磁盘中就有 100 个地方写入了这部分代码。但使用 `pnpm` 只会安装一次，磁盘中只有一个地方写入，后面再次使用都会直接使用 hardlink 硬链接
2. 即使一个包的不同版本，`pnpm` 也会极大程度地复用之前版本的代码。举个例子，比如`lodash` 有 100 个文件，更新版本之后多了一个文件，那么磁盘当中并不会重新写入 101 个文件，而是保留原来的 100 个文件的 hardlink，仅仅写入那一个新增的文件。



> pnpm中文网：https://www.pnpm.cn/installation

## 1.1、通过npm安装

1. 安装

```bash
npm install -g pnpm
```

2. 配置镜像

```bash
# 获取当前配置的镜像地址
pnpm get registry

# 配置镜像
pnpm config set registry https://registry.npmmirror.com
```

3. 验证

```bash
pnpm -v
```

> 参考：
>
> - https://blog.csdn.net/m0_52827996/article/details/138163237

4. 升级版本

```bash
pnpm add -g pnpm to update
```





## 1.2、使用

| npm命令              | pnpm等价命令                  |
| -------------------- | ----------------------------- |
| `npm install `       | `pnpm install`                |
| `npm install 包名`   | `pnpm add (-D) 包名`          |
| `npm uninstall 包名` | `pnpm remove 包名` 移除指定包 |
| `npm run 脚本`       | `pnpm 脚本` 运行脚本          |



```bash
# 安装 axios
pnpm install axios
# 安装 axios 并将 axios 添加至 devDependencies
pnpm install axios -D
# 安装 axios 并将 axios 添加至 dependencies
pnpm install axios -S
```

查看pnpm的包安装位置：

```bash
pnpm root -g
```

修改默认安装包的仓库位置

```bash
pnpm config set store-dir D:\Develop\nodejs\node_modules\pnpm\node_modules
```



























