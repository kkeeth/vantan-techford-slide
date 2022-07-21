const item1 = { name: 'Apple', price: '200' }
const item2 = { name: 'Orange', price: '100' }
const item3 = { name: 'Lemon', price: '800' }

//レジ袋の値段を定義（5円）
const bagPrice = 5;

// 3つのアイテムの合計を求める
let okaikei = Number(item1.price) + Number(item2.price) + Number(item3.price);
// 以下でも OK
// let okaikei = (+item1.price) + (+item2.price) + (+item3.price);

// 袋代を足す
okaikei += bagPrice;

// 消費税を計算する（軽減税率で8パー）
// 税を計算するので今回は外税
okaikei *= 1.08;
console.log(okaikei)

// 1000円超えてたらキャンペーンで10パーセントオフ
// if 文はまた今度やるけど細かいことは気にしないでください
if (okaikei >= 1000) {
  okaikei *= 0.9;
}

console.log(okaikei);