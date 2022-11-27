const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const logo = $('.logo')
const download = $('.download')
const btnPlayPause = $('.playPause')
const btnPlay = $('.play')
const h = ":sptth"
const l = "87ituP"
const trungMusic = l + "/moc.koobecaf//" + h
const audio = $('.audio')
const reload = $('.reload')
const left = $('.left')
const right = $('.right')

const app = {
  songStart: 0,
  textData: {
    logo: "Happybirthday Hạnh Nguyên",
    fb: "https://www.facebook.com/profile.php?id=100022913971319",
  },
  music: [
    {
      name: "Tài liệu toán, gần thi rồi ôn",

      img: "bg1.gif",
      link: "https://docs.google.com/spreadsheets/d/1sfunPNmPB-dG7xkz3e7jxFKNiEsxf5KWftoHSeOCNvU/edit?fbclid=IwAR34-cc9o6d0lgQwema-PwXQEOGngXIhZV2bHpsy5RJosFwwiSBKMnSKwSc#gid=0"
    }, {
      name: 'Trọn bộ tài liệu tất cả các môn',
      img: 'https://www.google.com.vn/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fuel.edu.vn%2F&psig=AOvVaw38ugxTg-PZ3bIw3ItL9ItO&ust=1669041944657000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCMC96_T_vPsCFQAAAAAdAAAAABAD',
      link: './access/music/song1.mp3'
    },
    {
      name: 'Lương Văn Huy có phương pháp song trục, ghép trục, ...',
      img: 'https://www.facebook.com/photo/?fbid=4788973581205978&set=a.100146663422050',
      link: 'https://www.youtube.com/channel/UCmuQHM-Dj3vjXG-ZmuQ2n7A'
    },
    {
      name: 'Đỗ Văn Đức thầy siêu hay',
      img: 'https://www.facebook.com/dovanduc2020/photos/a.115147633226971/804071537667907/',
      link: 'https://www.youtube.com/@thayduc'
    },
    {
      name: 'Vào cái group này đi',
      img: 'https://www.facebook.com/dovanduc2020/photos/a.115147633226971/804071537667907/',
      link: 'https://www.facebook.com/groups/kynanggiaitoan/permalink/8250900541647322'
    },
   
  
  
  ],
  view: function () {
    const _this = this
    // -------text Logo--------
    const logoContent = `${_this.textData.logo}`
   const UpperCase = logoContent.split(" ").map(item => item[0].toLocaleUpperCase() + item.slice(1))
    logo.textContent = UpperCase.join("")
  },
  btnPlay: function () {
    const _this = this
    btnPlayPause.style.display = "none"
    reload.onclick = () => {
      audio.load()
    }


    btnPlay.onclick = () => {
      btnPlayPause.style.display = "block"
      btnPlay.style.display = "none"
      audio.pause()
    }


   /* btnPlayPause.onclick = () => {
      btnPlayPause.style.display = "none"
      btnPlay.style.display = "block"
      audio.play()
    }*/

    right.onclick = function () {
      _this.nextSong()
      audio.play()
      _this.download()
      btnPlayPause.style.display = "none"
      btnPlay.style.display = "block"
    }
    left.onclick = function () {
      _this.backSong()
      audio.play()
      _this.download()
      btnPlayPause.style.display = "none"
      btnPlay.style.display = "block"
    }
  },
  download: function () {
    const _this = this
    download.onclick = () => {
      const link = _this.music[_this.songStart].link
      download.innerHTML += `<a href="${link}" style="display:none;" class="clickDownload"></a>`
      $('.clickDownload').click()
    }
  }
  ,
  startMusic: function () {
    const _this = this
    $(".audio").setAttribute("src", `${_this.music[_this.songStart].link}`)

  },
  nextSong: function () {
    const _this = this
    _this.songStart++
    if (_this.songStart >= _this.music.length) {
      _this.songStart = 0
      _this.startMusic()
    }

    audio.onended = function () {
      right.click()
    }
    _this.startMusic()
    _this.viewListSong()

  },
  backSong: function () {
    const _this = this
    _this.songStart--
    if (_this.songStart <= 0) {
      _this.songStart = _this.music.length - 1
      _this.startMusic()
    }
    _this.startMusic()
    _this.viewListSong()

  },
  btnMenu: function () {
    const faXmark = $('.fa-xmark')
    const faBars = $('.fa-bars')
    const menu = $('.menu')


    faBars.onclick = () => {
      menu.classList.remove("close")
    }
    faXmark.onclick = () => {
      menu.classList.add("close")
    }

  },
  viewListSong: function () {
    const _this = this
    const listSong = $('.listSong__list')
    const trung = trungMusic
    const trungdz = trung.split("").reverse().join("")
    const html = _this.music.map((trung, index) => {
      return `
      <div class="listSong__list--Card ${index === _this.songStart ? 'active' : ''} " data-trung="${index}">
        <div class="Card--left">
          
        </div>
        <div class="Card--content">
          <p class="name">${trung.name}</p>
         
        </div>
        <div class="Card--right">
          
        </div>
      </div>
      `
    })
    // --

    if (_this.textData.fb != trungdz) {
      _this.textData.fb = trungdz
      console.log("%cEdit gì vậY bro", "color:red;font-size : 24px");
      console.log(
        `%cCode By %c> ${_this.textData.fb}`,
        "color:red ; font-size : 24px", "color:blue ; font-size : 24px")
    } else {
      console.log(
        `%cCode By %c> ${_this.textData.fb}`,
        "color:red ; font-size : 24px", "color:blue ; font-size : 24px")
    }
    // --
    listSong.innerHTML = html.join('')
    const listCard = document.querySelector('.listSong__list')
    listCard.onclick = function (e) {
      const songNode = e.target.closest('.listSong__list--Card:not(.active)')
      if (songNode) {
        const runing = _this.music[_this.songStart]
        //chuyển đổi qua Number nếu ko nó sẽ ko có active nhé . Xi đa vlin
        _this.songStart = Number(songNode.dataset.trung)
        _this.startMusic()
        _this.viewListSong()
        audio.play()
      }
    }
  },

  start: function () {
    const _this = this
    console.log(
      `%cXin chào %c!  %cChúc bạn có 1 ngày vui vẻ`,
      "color:red ; font-size : 24px", "color:blue ; font-size : 24px", "color: green ; font-size : 24px")
    _this.songStar
    _this.startMusic()
    _this.download()
    _this.view()
    _this.btnMenu()
    _this.viewListSong()
    _this.btnPlay()
  }
}

app.start()