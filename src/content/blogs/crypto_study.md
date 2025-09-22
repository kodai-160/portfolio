---
title: "Crypto勉強会"
date: 2025-09-22
---

# Crypto勉強会
Crypto初心者すぎるので、upsolveする問題が簡単すぎてしまうかもしれません。ご容赦下さい。

## WaniCTF 2024 beginners_rsa [530 solves]
> Do you know RSA?
<details>
<summary><b>Chall.py</b></summary>

```PY
from Crypto.Util.number import *

p = getPrime(64)
q = getPrime(64)
r = getPrime(64)
s = getPrime(64)
a = getPrime(64)
n = p*q*r*s*a
e = 0x10001

FLAG = b'FLAG{This_is_a_fake_flag}'
m = bytes_to_long(FLAG)
enc = pow(m, e, n)
print(f'n = {n}')
print(f'e = {e}')
print(f'enc = {enc}')
```
</details>

```
n = 317903423385943473062528814030345176720578295695512495346444822768171649361480819163749494400347
e = 65537
enc = 127075137729897107295787718796341877071536678034322988535029776806418266591167534816788125330265
```

### upsolve
- getPrime(64) = 64bit長のランダムな素数を生成する<br>
- 64bitの素数 = 2<sup>64</sup>より小さい素数
- 64bitで表せる最大の整数 : 1.8 * 10<sup>19</sup> = 10進数で19桁前後の値
- n = p * q * r * s * a = 64bit * 5 = 320bitほど
- 安全なRSAの鍵は2048bit(p, qともに1024bit(約300桁)) >>>> 今回のn : 320
- nが非常に小さいので、素因数分解できてしまう

### 参考
[Recommendation for
Key Management](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-57pt1r5.pdf)

### 解法
nをsageMathで素因数分解<br>
solver
```PY
from Crypto.Util.number import *

n = 317903423385943473062528814030345176720578295695512495346444822768171649361480819163749494400347
e = 65537
enc = 127075137729897107295787718796341877071536678034322988535029776806418266591167534816788125330265

p = 9953162929836910171
q = 11771834931016130837
r = 12109985960354612149
s = 13079524394617385153
a = 17129880600534041513

phi = (p-1) * (q-1) * (r-1) * (s-1) * (a-1)
d = pow(e, -1, phi)
m = pow(enc, d, n)
print(long_to_bytes(m))
```
`flag : FLAG{S0_3a5y_1254!!}`