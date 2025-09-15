---
title: "FFRI × NFLabs. Cybersecurity Challenge 2025 Writeup & Upsolve"
date: "2025/01/28"
---

# FFRI × NFLabs. Cybersecurity Challenge 2025 Writeup & Upsolve

FFRI × NFLabs. Cybersecurity Challenge 2025に参加しており、13位でした。
Top10にはせめて入りたいなと思いながらやっていました。悔しいです。
![ranking](/src/content/image/FFRI_NFLabs_ranking.png)

## Welcome [ 1/1 ]
### Welcome [175pt / 66 solves]
提出のみ<br>
```
flag{Good_Luck_and_Have_Fun!}
```

## Pentest [ 3/7 ]
### HiddenService[255pt / 50 solves]
nmapのコマンドを実行すると、22番ポートでsshと31337番ポートでApacheのサービスが動いていることが分かりました。
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
31337番ポートにアクセスすると、Shellにアクセスすることができます。<br>
catコマンドやlsコマンドが実行できるため、flag.txtがあるディレクトリを探索するとflagをGETできました。
![Hidden_result](/src/content/image/Hidden_result.png)
```
flag{Ch4nging_th3_p0rt_is_p0intl3ss}
```
### Shell4Solr [455pt / 16 solves]

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
