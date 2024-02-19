# example-demo

一些开源的 demo

# demo

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 提交代码命令

git push --set-upstream origin main

### 拉取远程代码

git pull --rebase origin main


### 在使用Git将本地仓库推送到远程仓库的时候，发生了如下错误：“fatal: Could not read from remote repository.”

### 首先输入以下命令检查SSH是否能够连接成功（ssh后面有空格）

ssh -T git@github.com

发现报错：端口连接超时。

ssh: connect to host github.com port 22: Connection timed out

在C盘——用户——你的主机名文件夹中找到.ssh文件夹；（此前配置SSH时会生成该文件夹）
在.ssh文件夹中新建文件 config,不带后缀（可以新建文本文档，去掉.txt后缀）
使用notepad++（或其他方式）打开config文件，输入以下内容，保存后即可

Host github.com
User 1723362475qq.com
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
Port 443