const currentTime = document.querySelector('h1'),
   content = document.querySelector(".content"),
   selectMenu = document.querySelectorAll('select'),
   setAlarmBtn = document.querySelector('button')
   clockImg = document.querySelector('img')

let alarmTime, isAlarmSet = false
ringtone = new Audio("../music/ringtone.mp3")

for (let i = 12; i > 0; i--) {
   i = i < 10 ? '0' + i : i
   let option = `<option value="${i}">${i}</option>`
   selectMenu[0].firstElementChild.insertAdjacentHTML('afterend', option)
}

for (let i = 59; i >= 0; i--) {
   i = i < 10 ? '0' + i : i
   let option = `<option value="${i}">${i}</option>`
   selectMenu[1].firstElementChild.insertAdjacentHTML('afterend', option)
}

for (let i = 2; i > 0; i--) {
   let ampm = i == 1 ? 'AM' : 'PM'
   let option = `<option value="${ampm}">${ampm}</option>`
   selectMenu[2].firstElementChild.insertAdjacentHTML('afterend', option)
}

setInterval(() => {
   let date = new Date()
   h = date.getHours()
   m = date.getMinutes()
   s = date.getSeconds()
   ampm = 'AM'

   if (h >= 12) {
      h = h - 12
      ampm = 'PM'
   }

   h = h == 0 ? h = 12 : h

   h = h < 10 ? '0' + h : h
   m = m < 10 ? '0' + m : m
   s = s < 10 ? '0' + s : s
   currentTime.innerText = `${h}:${m}:${s} ${ampm}`

   if (alarmTime == `${h}:${m} ${ampm}`) {
      ringtone.play()
      ringtone.loop = true
      clockImg.classList.add('animation')
      setInterval(() => {
         ringtone.pause()
         ringtone.loop = false
         clockImg.classList.remove('animation')
      }, 40000);
   }
   
}, 1000);


function setAlarm() {
   if (isAlarmSet) {
      alarmTime = ''
      ringtone.pause()
      clockImg.classList.remove('animation')
      content.classList.remove('disable')
      setAlarmBtn.innerHTML = 'Set Alarm'
      return isAlarmSet = false
   }

   let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`

   if (time.includes('Hour') || time.includes('Minute') || time.includes('AM/PM')) {
      alert('Please, select a valid time to set Alarm')
   }
   isAlarmSet = true
   alarmTime = time
   content.classList.add('disable')
   setAlarmBtn.innerHTML = `Clear Alarm <i class="fa-solid fa-xmark"></i>`
}

setAlarmBtn.addEventListener('click', setAlarm)
