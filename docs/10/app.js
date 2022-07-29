const newYears = `1 Jan ${new Date().getFullYear() + 1}`
const newYearsDate = new Date(newYears)

// 「日」表示部分
let days = document.getElementById('days');
// 「時」表示部分
let hours = document.getElementById('hours');
// 「分」表示部分
let minutes = document.getElementById('minites');
// 「秒」表示部分
let seconds = document.getElementById('seconds');

/**
 * 時間のフォーマット処理
 * 数字が一桁の場合「0」で埋める
 */
const formatTime = (time) => {
  return time < 10
              ? `0${time}`
              : time
}

/**
 * カウントダウン処理本体
 */
const countdown = () => {
  const currentDate = new Date()
  const totalSeconds = (newYearsDate - currentDate) / 1000

  this.days.innerText = formatTime(Math.floor(totalSeconds / 3600 / 24))
  this.hours.innerText = formatTime(Math.floor(totalSeconds / 3600) % 24)
  this.minutes.innerText = formatTime(Math.floor(totalSeconds / 60) % 60)
  this.seconds.innerText = formatTime(Math.floor(totalSeconds) % 60)
}

/**
 * カウントダウン実行
 */
 setInterval(countdown, 1000);