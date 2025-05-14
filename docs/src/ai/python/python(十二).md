# 1、网络爬虫

网络爬虫，又称为网络机器人，网路蜘蛛，是按照一定规则，自动地抓取万维网信息的程序或脚本。

比如百度搜索引擎的所有检索内容，都是百度的很多蜘蛛去万维网上去抓取，以及进行持久化存储，用户通过百度搜索框，输入想要搜索的内容，百度服务器再通过算法检索出最相关，最佳的内容显示给搜索结果页面给用户展示。

## 1.1、网络爬虫的用途

1. **搜索引擎抓取网页信息**

   以百度蜘蛛为例，一旦有网站的页面更新了，百度蜘蛛就会出动，然后把爬取的页面信息搬回百度，再进行多次的筛选和整理。最终在大家搜索相关信息的时候，通过排名呈现给大家。可以说，没有网络爬虫，我们使用搜索引擎查询资料的时候，就不会那么便捷、全面和高效。

2. **爬取需要的数据进行统计**

   冷数据启动时丰富数据的主要工具，新业务开始时，由于刚起步，所以没有多少数据，此时就需要爬取其他平台的数据来填充我们的业务数据。比如说，如果我们想做一个类似大众点评这样的平台，一开始没有商户等信息，就需要去爬取大众，美团等商家的信息来填充数据，比如天眼查，企查查，西瓜数据等等。

3. **出行类软件通过爬虫抢票**

   如果问网络爬虫技术应用最多的领域是什么？那一定是出行行业。相信每逢春运或是节假日，大家都用过一些抢票的软件，就为了获得一张机票或者是一张火车票，而这种出行类软件正是运用网络爬虫技术来达到抢票的目的。像抢票软件这样的网络爬虫，会不停地爬取交通出行的售票网站，一旦有票就会点击拍下来，放到自己的网站售卖。如果一定时间内没有人购买，就又会自动退票。然后又通过网站爬虫把票拍下来，到时间又继续退票，如此反复循环。

4. **聚合平台整合信息进行比较**

   如今，出现了很多比价平台、聚合电商还有返利平台等等给，这类聚合平台的本质都是提供横向数据比较，聚合服。比如说电商中经常需要有一种比价系统，从各大电商平台，如拼多多，淘宝，京东等抓取同一个商品的价格信息，以给用户提供最实惠的商品价格，这样就需要利用网络爬虫从各大电商平台爬取信息。



## 1.2、Python的爬虫技术

在爬取数据过程中所需参考工具如下：

- 请求库：urllib、requests、selenium
- 解析库：正则、xpath、jsonpath、beautifulsoup、pyquery
- 存储库：文件、MySQL、Mongodb、Redis
- 爬虫框架：Scrapy



# 2、requests网络请求模块

Requests是一个优秀的Http开发库，支持HTTP连接保持和连接池，支持使用cookie保持会话，支持文件上传，支持自动确定响应内容的编码，支持国际化的 URL 和 POST 数据自动编码等。

> 官方中文文档：https://requests.readthedocs.io/projects/cn/zh-cn/latest/



## 2.1、安装

```bash
# 安装requests网络请求模块
pip install requests -i https://pypi.tuna.tsinghua.edu.cn/simple
```

测试：

```python
import requests

r = requests.get("http://www.baidu.com")
# 设置返回对象的编码(200)
r.encoding = "utf-8"
# 返回响应状态码
print(r.status_code)
# 获取网页内容
print(r.text)
# 查看返回对象类型 <class 'requests.models.Response'>
print(type(r))
```

![](python(十二).assets/1.png)





## 2.2、百度搜索

百度搜索请求地址：`https://www.baidu.com/s?wd=宝马`

![](python(十二).assets/2.png)

如果我们直接用`requests.get()`进行访问，发现没有返回内容，因为百度服务器通过headers头信息做了反爬手段，所以我们请求的时候，要带上headers头信息，以及requests支持请求参数`key:value`格式传递，我们可以通过url打印看结果。

![](python(十二).assets/3.png)

```python
import requests

url = "http://www.baidu.com/s"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
}

data = {
    "wd": "宝马"
}

r = requests.get(url=url, params=data, headers=headers)
print(r.url)
print(r.status_code)
```

![](python(十二).assets/4.png)





## 2.3、百度翻译









## 2.4、代理

很多网站和应用都有反爬虫策略，我们频繁的访问，一旦触发反爬虫策略，我们的IP就会被封掉。我们为了应对反爬虫，可以使用代理。

代理IP能划分成高度匿名代理（以下简称：高匿）、普通匿名代理（以下简称：普匿）和透明代理三类，通过名字相信大家也猜出了每个级别的匿名程度是：高匿 > 普匿 > 透明。

1. 透明代理IP：顾名思义，服务器知道你在使用代理IP，并且也知道你的真实IP
2. 普匿代理IP：普匿代理IP要比透明代理IP好一些，但是对方服务器仍然会知道你使用了代理
3. 高匿代理IP：高匿代理IP不仅可以保护你的IP地址，并且不会改变你的访问请求，让对方服务器毫无察觉，不知道你使用了代理。因此，高匿代理的效果是最好的

所以我们使用代理IP，建议用高匿代理IP，效果好。

> 快代理：https://www.kuaidaili.com/free/inha/

![](python(十二).assets/5.png)



```python
import requests

url = "http://www.cip.cc/"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
}

# 设置代理,从快代理的免费代理IP中拿
proxy = {
    "http": "47.114.101.57:8888"
}

r = requests.get(url=url, headers=headers, proxies=proxy)
print(r.url)
print(r.status_code)

# 将网页内容写入到文件
with open("proxy.html", "w", encoding='utf-8') as fp:
    fp.write(r.text)

```

![](python(十二).assets/6.png)



生成的proxy.html里会显示代理IP地址。







## 2.4、Cookie

在某些需要登录的网站或者或者应用，假如我们需要抓取登录后的内容，技术上本质通过session会话实现。服务器端存会话信息，浏览器通过Cookie携带客户端访问用户信息，来实现会话机制。









































