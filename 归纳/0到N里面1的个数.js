// 解题思路：
// 首先分析题目，找到规律，采用归纳的办法写出每一层的数字
// 然后总结出通用的公式和逻辑，按照公式编写代码 => 推导出公式非常重要

// 给定一个十进制整数N，写下从1开始到N的所有正整数，然后数一数其中出现的所有的“1”的个数。

// 例如 ： N=2,写下1，2，这样只出现了一个1 N=12,写下1，2，3，4，5，6，7，8，9，10，11，12。这样1的个数是5

// 问题： 给出N，返回里面出现1的个数

// 来源：编程之美 2.4 章

/**
 * C(n) 是整数位上1的公式
 * 分析 234567
 * 对于个位数，C(1) = 1 * 10^0
 * 对于十位数，C(2) = 1 * 10^1 + 10 * C(1)
 * 对于百位数，C(3) = 1 * 10^2 + 10 * C(2)
 * 对于n位数, C(n) = 1 * 10^(n-1) + 10 * C(n-1)
 * 从n + 1位 到 9999(n)的分割统计，
 * 若当前位数是k, 则其附属位数是 (k-1) * C(n-1) + 1
 * 则递归
 * C(n-1)
 */

// 做缓存
var cache = [];

// k 是位数
function C(k) {
    if (k<=0) {
        return 0;
    } else {
        const result = cache[k] ? cache[k] : 1 * Math.pow(10, k-1) + 10 * C(k-1);
        cache[k] = result;
        return result;
    }
}

// F(n) 余数的公式
/*分析456  ，k=3, 除掉首位的余数为56, 首位m=4
* 首位为4，所以为4种情况考虑
* 区间 0-99， 有C(2) 个1
* 为1 的情况，100 - 199 , 百位的位置上 有10^(k-1) 个1 => 100个1 ; 剩下 0-99， 有C(2) 个1
* 为2 的情况，200 - 299 ，剩下 0-99， 有C(2) 个1
* 为3 的情况，300 - 399 ，剩下 0-99， 有C(2) 个1
* 为4 的情况，400 - 456 ，剩下 0-56， 有F(56)个1
* 所以总共的和为 C(2) + 10^2 + C(2) + (4-2) * C(2) + F(56)
* 对于 k位数，首位为 m, F(n) = C(k-1) + 1*10^(k-1) + C(k-1) + (m-2)*C(k-1) + F(余数) = 1*10^(k-1) + m*C(k-1) + F(余数)
* 余数 = n - m * 10^(n-1)
*/
/* 分析156, k=3，除掉首位的余数为56
*首位为1
* 区间 0-99，有C(2) 个1
* 区间 100-156， 百位的位置上 出现了 56 + 1 个1
* 余数56，剩下0-56， 有F(56) 个1
* 所以公共的和为 1*（56+1）+ C(2) + F(56)
* 对于 K 位数，F(n) = 余数+1 + C(k-1) + F(余数)
*/
// 如果 首位为1，F(n) = 余数+1 + C(k-1) + F(余数)
// 如果 首位不为1， F(n) = 1*10^(k-1) + C(k-1) + (m-1)*C(k-1) + F(余数) = 1*10^(k-1) + m*C(k-1) + F(余数)
function F(n) {
    const k = String(n).length;
    const m = parseInt(String(n).charAt(0));

    if (k===1) {
        return n>=1 ? 1 : 0;
    }
    const remainder = n - m * Math.pow(10, k-1);

    if (m === 1) {
        return (remainder+1) + C(k-1) + F(remainder);
    } else {
        return Math.pow(10, k-1) + m*C(k-1) + F(remainder);
    }
}

console.log(F(9), 1);
console.log(F(99), 20);
console.log(F(999), 300);
