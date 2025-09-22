---
title: "irisctf 2025 Web upsolve Upsolve"
date: 2025-09-16
---

# irisctf 2025 Web upsolve

## Password Manager [ 50 points ]
main.goのみの配布<br>
ログインフォームのみ与えられるので、ログインできれば勝ち<br>
ソースコードを読むと、./users.jsonがあるのでここに情報が書いてありそうだが、`../`は` `になる
```go
	file, err := os.Open("./users.json")
	if err != nil {
		fmt.Printf("Error reading users.json: %v\n", err)
		return
	}

    var PathReplacer = strings.NewReplacer(
	"../", "",
)
```
`..../users.json`を見ればログイン情報を取得できた<br>
flag : `irisctf{l00k5_l1k3_w3_h4v3_70_t34ch_sk47_h0w_70_r3m3mb3r_s7uff}`

### 参考ソース
[LFI-Technic](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Directory%20Traversal/README.md#double-url-encoding)

### 感想
実装不備に注目したらすぐ行けたので簡単だった

## Political [ 50 points ]
tokenがvalid_tokenに含まれている、もしくは`valid_token[valid]=True`であればflagが返ってくる
```PY
@app.route("/redeem", methods=["POST"])
def redeem():
    if "token" not in request.form:
        return "Give me token"

    token = request.form["token"]
    if token not in valid_tokens or valid_tokens[token] != True:
        return "Nice try."

    return FLAG
```
tokenはsecureに作成されているので改ざんは難しそう<br>
`/giveflag`を使って、`valid_tokens[token] = True`を付与することは可能なのでここから攻めていく
```PY
@app.route("/giveflag")
def hello_world():
    if "token" not in request.args or "admin" not in request.cookies:
        return "Who are you?"

    token = request.args["token"]
    admin = request.cookies["admin"]
    if token not in valid_tokens or admin != ADMIN:
        return "Why are you?"

    valid_tokens[token] = True
    return "GG"
```
このチャレンジではbot.jsが動いておりREADME.mdにある通り、`https://political-web.chal.irisc.tf`にアクセスしてcookieを生成している<br>
bot.jsはadminのcookieを使って与えられたURLにアクセスしてくれるので、`https://political-web.chal.irisc.tf/giveflag?token=TOKEN`を渡せば良さそう<br>
policy.jsonで以下のようになっているので、注意。
```JSON
{
	"URLBlocklist": ["*/giveflag", "*?token=*"]
}
```
`https://political-web.chal.irisc.tf%2Fgiveflag%3Ftoken=TOKEN`を送れば行けるはず<br>
ここでbotの立ち上げがうまくいかなかったので他の人のwriteupを見ましたが、これでいけるっぽいのであってた<br>
flag : `irisctf{flag_blocked_by_admin}`

### 感想
ただのブロックリストで判断しており、それにマッチしなければいいだけなのでパターン問題。簡単