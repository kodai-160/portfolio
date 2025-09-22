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
- 運用する場合はnを大きいbit数になるように設計する

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

### 参考
[Recommendation for
Key Management](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-57pt1r5.pdf)

## ctf4b 2024 Safe Prime
> Using a safe prime makes RSA secure, doesn't it?
```PY
import os
from Crypto.Util.number import getPrime, isPrime

FLAG = os.getenv("FLAG", "ctf4b{*** REDACTED ***}").encode()
m = int.from_bytes(FLAG, 'big')

while True:
    p = getPrime(512)
    q = 2 * p + 1
    if isPrime(q):
        break

n = p * q
e = 65537
c = pow(m, e, n)

print(f"{n = }")
print(f"{c = }")
```
```
n = 292927367433510948901751902057717800692038691293351366163009654796102787183601223853665784238601655926920628800436003079044921928983307813012149143680956641439800408783429996002829316421340550469318295239640149707659994033143360850517185860496309968947622345912323183329662031340775767654881876683235701491291
c = 40791470236110804733312817275921324892019927976655404478966109115157033048751614414177683787333122984170869148886461684367352872341935843163852393126653174874958667177632653833127408726094823976937236033974500273341920433616691535827765625224845089258529412235827313525710616060854484132337663369013424587861
```

### upsolve
- 本来のRSA : nを構成するp, qが非常に大きな素数かつ攻撃者はnしか知らないのでp, qのペアを見つけるのが大変
- 今回のRSA : q = (2p + 1) なので、n = p * (2p+1)となり方程式を解くだけでpが特定できてしまう
- 鍵を生成するときは独立した乱数素数を用いるべき
- 関連している素数を使わない

solver
```PY
from math import isqrt

n = 292927367433510948901751902057717800692038691293351366163009654796102787183601223853665784238601655926920628800436003079044921928983307813012149143680956641439800408783429996002829316421340550469318295239640149707659994033143360850517185860496309968947622345912323183329662031340775767654881876683235701491291
c = 40791470236110804733312817275921324892019927976655404478966109115157033048751614414177683787333122984170869148886461684367352872341935843163852393126653174874958667177632653833127408726094823976937236033974500273341920433616691535827765625224845089258529412235827313525710616060854484132337663369013424587861
e = 65537

s = isqrt(1 + 8*n)

p = (s - 1) // 4
q = 2*p + 1

phi = (p-1)*(q-1)
d = pow(e, -1, phi)
m = pow(c, d, n)

pt = m.to_bytes((m.bit_length()+7)//8, 'big')
print(pt.decode(errors="ignore"))
```
`flag : ctf4b{R3l4ted_pr1m3s_4re_vuLner4ble_n0_maTt3r_h0W_l4rGe_p_1s}`


## 関数の中身を調べて見る
### getPrime()
#### 使い方
getPrime()
> Crypto.Util.number.getPrime(N, randfunc=None)<br>
> Return a random N-bit prime number.<br>
> N must be an integer larger than 1. If randfunc is omitted, then Random.get_random_bytes() is used.
- Nbitのrandomな素数を返す
- Nは1以上で、randfuncが指定されてない時、get_random_bytes()が使われる

#### 関数の実装
> 抜粋 : https://github.com/Legrandin/pycryptodome/blob/master/lib/Crypto/Util/number.py

```PY
def getPrime(N, randfunc=None):
    """Return a random N-bit prime number.

    N must be an integer larger than 1.
    If randfunc is omitted, then :meth:`Random.get_random_bytes` is used.
    """
    if randfunc is None:
        randfunc = Random.get_random_bytes

    if N < 2:
        raise ValueError("N must be larger than 1")

    while True:
        number = getRandomNBitInteger(N, randfunc) | 1
        if isPrime(number, randfunc=randfunc):
            break
    return number
```

- randfuncが指定されてない場合は`randfunc = Random.get_random_bytes()`が指定される
- while文がTrueになるまで、 Nbitのランダム整数を作成してテスト
    - 末尾bitを1にすることで奇数にする
    - isPrime関数で生成したものが素数かどうかを判定

### isPrime()
#### 関数の実装
```PY
def isPrime(N, false_positive_prob=1e-6, randfunc=None):
    r"""Test if a number *N* is a prime.

    Args:
        false_positive_prob (float):
          The statistical probability for the result not to be actually a
          prime. It defaults to 10\ :sup:`-6`.
          Note that the real probability of a false-positive is far less.
          This is just the mathematically provable limit.
        randfunc (callable):
          A function that takes a parameter *N* and that returns
          a random byte string of such length.
          If omitted, :func:`Crypto.Random.get_random_bytes` is used.

    Return:
        `True` if the input is indeed prime.
    """

    if randfunc is None:
        randfunc = Random.get_random_bytes

    if _fastmath is not None:
        return _fastmath.isPrime(long(N), false_positive_prob, randfunc)

    if N < 3 or N & 1 == 0:
        return N == 2
    for p in sieve_base:
        if N == p:
            return True
        if N % p == 0:
            return False

    rounds = int(math.ceil(-math.log(false_positive_prob)/math.log(4)))
    return bool(_rabinMillerTest(N, rounds, randfunc))
```