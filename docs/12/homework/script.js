const Omikuji = {
  data() {
    return {
      name: 'Vue.js',
      resultList: ['大吉', '吉', '中吉', '小吉', '末吉', '凶', '大凶'],
      result: ''
    }
  },
  computed: {
    message() {
      return this.result === "大吉" ? "＼( 'ω')／大吉ウオオオオオアアアーーーッ！" : this.result
    }
  },
  methods: {
    drawAFortune() {
      let index = Math.floor(Math.random(0, 6) * 10)
      index = index > 6 ? 3 : index

      this.result = this.resultList[index]
    }
  }
}

Vue.createApp(Omikuji).mount('#app')
