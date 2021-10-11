(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs=e()}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));
},{}],2:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}],3:[function(require,module,exports){
const dayjs = require('dayjs')

const currentId = localStorage.getItem('id')
const usersname = localStorage.getItem('username')
console.log(localStorage)
const host = 'clockworkback.herokuapp.com'//'localhost'
//const port = 3000
// const submitButton = document.getElementById('habitSubmit')
// submitButton.addEventListener('click', postHabit)

window.addEventListener('DOMContentLoaded', getHabits)

// const showForm = document.getElementById('add-habit')
// showForm.addEventListener('click', show)

// function show() {
//     console.log('clicked')
//     document.getElementById('habitAddPage').classList.toggle('active')
// }




function showEdit(habitId) {
    document.getElementById('habitEditPage').classList.toggle('active2')
    const editHabitCheck =  document.getElementById('habitEditPage')
    const editSubmit = document.getElementById('editSubmit')
    const addHabit = document.getElementById('habitAddPage')
    if (addHabit.classList.contains('active')){
        show()
    }



    
    editSubmit.addEventListener('click', () => {
        const newFrequency = document.getElementById('frequencyEdit').value
        const newTargetDate = document.getElementById('targetDateEdit').value.toString()
       
        editHabit(habitId, newFrequency, newTargetDate)
    })

 

}

// const checkPositive = document.getElementById('positive')
// const frequency = document.querySelector('.frequency')

// checkPositive.addEventListener('click', getHabits)



function show() {
        // console.log('clicked')
        const habito = document.getElementById('habitAddPage')
        const editHabit = document.getElementById('habitEditPage')
        if (editHabit.classList.contains('active2') && !habito.classList.contains('active')) {
            showEdit()
        }
        document.getElementById('habitAddPage').classList.toggle('active')
        
    

    }

function postHabit(e) {
    e.preventDefault();
    let habitName = document.getElementById('habitName').value
    let frequency = document.getElementById('frequency').value
    let targetDate = document.getElementById('targetDate').value
    let negative = document.getElementById('negative')
    let frequencyType = document.querySelector('input[name="frequency"]:checked').value;

    let periodStart = dayjs().format('DD/MM/YYYY')
    
    let negValue 
    let habitData

    //console.log(negative.checked)
    
    if(negative.checked) {
        negValue = false 
    } else {
        negValue = true
    }
    

    if(frequency === "") {
        habitData = {
            habitName: habitName,
            targetDate: targetDate,
            habitType: negValue,
            userId: currentId,
            periodStart: periodStart
        }
    } else {
        habitData = {
            habitName: habitName,
            frequency: frequency,
            targetDate: targetDate,
            habitType: negValue,
            userId: currentId,
            frequencyType: frequencyType,
            periodStart: periodStart
        }
    }

        
     
    console.log(habitData)
    console.log(localStorage.getItem('token'))
    const url = `https://${host}/habits`
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            "authorization":localStorage.getItem('token')
        },
        body: JSON.stringify(habitData)
    }
    console.log(options.body)
    fetch(url, options)
     .then(() => location.reload())
}

async function getHabits(e) {
    loadBadge()
    document.getElementById('insertUsername').textContent = ` ${usersname}`;
    e.preventDefault()
    

    let url = `https://${host}/habits/user/${currentId}`
    let options = {
        method: "GET",
        mode: 'cors',
        headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                }
    }

    fetch(url, options)
    .then(r => r.json())

    .then(data => {
        console.log(data)
        for(let i=0;i<data.length;i++) {
            
            let habitId = data[i].habitid
            let habitName = data[i].habitName
            let frequency = data[i].frequency
            let startDate = data[i].startDate
            let targetDate = data[i].targetDate
            let habitType = data[i].habitType
            let streak = data[i].streak

           displayHabits(habitId, habitName, frequency, startDate, targetDate, habitType, streak)
        }
    })
}

function displayHabits(habitId, habitName, frequency, startDate, targetDate, habitType, streak) {
    const habitBox = document.getElementById('habit-container')
    const newHabit = document.createElement('div')
    
    const editNameStreak = document.createElement('div')
    const editDiv = document.createElement('div')
    const dots = document.createElement('h2')
    const editDel = document.createElement('div')
    const edit = document.createElement('a')
    const delet = document.createElement('a')
    const streakDisplay = document.createElement('p')
    
    const habitTitle = document.createElement('h2')
    const typeBtn = document.createElement('div')
    const plus = document.createElement('h1')

    const progressDiv = document.createElement("div")

    dots.textContent = "..."
    habitTitle.textContent = habitName
    edit.textContent = "edit";
    delet.textContent = "delete"
    streakDisplay.textContent = `Current streak:   ${streak}🔥`
    
   
    progressDiv.classList.add('progressBar')
    newHabit.classList.add(`habit-card`)
    dots.classList.add('edit')
    typeBtn.classList.add('typeBtn')
    habitTitle.classList.add('habitTitle')
    editDiv.classList.add('dropdown')
    editNameStreak.classList.add('editNameStreak')
    plus.classList.add('plusTings')
    streakDisplay.classList.add('streakDisplay')
    editDel.classList.add('editDel')
    delet.classList.add('delet')



    editDel.classList.add('dropdown-content')
    editDel.setAttribute('id','myDropdown')
    edit.setAttribute('id', 'showEditForm')
    typeBtn.setAttribute('id', 'typeButton')
    
    habitBox.appendChild(progressDiv)
    progressDiv.appendChild(newHabit)
   
    newHabit.appendChild(editNameStreak)
    
    
    
    editNameStreak.appendChild(editDiv)
    editNameStreak.appendChild(habitTitle)
    editNameStreak.appendChild(streakDisplay)
    
    editDiv.appendChild(dots)
    editDiv.appendChild(editDel)
    editDel.appendChild(edit)
    editDel.appendChild(delet)
    
    
    
    newHabit.appendChild(typeBtn)
    typeBtn.appendChild(plus)

    if(habitType === true) {
        plus.textContent = '+'
    } else {
        plus.textContent = '-'
        
    }
    
   //progress baar code - 8/10/21
    let url = `https://${host}/frequency/${habitId}`;
      let options = {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      fetch(url, options)
        .then((r) => r.json())
        .then((data) => {
          const mainProgressDiv = document.createElement("div");
          const innerProgressDiv = document.createElement("div");
          mainProgressDiv.style.width = "98%";
          mainProgressDiv.style.backgroundColor = "lightgrey";
          mainProgressDiv.classList.add('progress')
          innerProgressDiv.textContent = "0%";
          innerProgressDiv.style.width = "0%";
          innerProgressDiv.style.backgroundColor = "green";
          progressDiv.append(mainProgressDiv);
          mainProgressDiv.append(innerProgressDiv);
          console.log(
          "freqstreak:" + data.freqStreak + "frequency" + data.frequency //+ "percent" + percent
          );
          if (data.frequency != 0) {
            let percent 


            if(percent !== 100) {
                percent = Math.round((data.freqStreak / data.frequency) * 100)
                innerProgressDiv.style.width = percent + "%";
                
            } else {
                percent = 100
                innerProgressDiv.style.width = 100 + '%'
            }
           
           
            innerProgressDiv.textContent = percent + "%";

           
          }
        })
    ///end of progress bar code


   // function for dropdown box showing edit and delete
  
    dots.addEventListener('click', (e) => showDrop(e))
    delet.addEventListener('click',() => deleteHabit(habitId))
    edit.addEventListener('click', () => showEdit(habitId))


    progressBar(habitId)

    
    
    // typeBtn.addEventListener('click', () => {
        if (typeBtn) {
            let count = 0;
        
              typeBtn.addEventListener("click",() => {
                if(count === 0) {
                  count ++;
              
                  
                  //addLastDoneDate(habitId)

                    let updateInfo = {
                        freqStreak: 1,
                    }
                    checkStreak(habitId, updateInfo)
                    setTimeout(() => {  location.reload()}, 50)

                } else {
                  console.log('stop pressing')
                }
                
                } );
            }
  //  }
    //)
 

   
}

function showDrop (e) {
    const target = e.target.closest('div')
    let child = target.querySelector('.dropdown-content')
    console.log(target)
    child.style.display = "block"
    
}


  // Close the dropdown if the user clicks outside of it
  function close_dropdown(myDropdown) {
    // console.log('I am closing dropdown:',myDropdown)
    myDropdown.style.display = 'none'
  }
  
  // Close all dropdowns.
  function close_all_dropdowns() {
    var dropdowns = document.getElementsByClassName('dropdown-content')
    for (var i = 0; i < dropdowns.length; i++) {
      close_dropdown(dropdowns[i]);
    }
  }
  
  // Close all dropdowns when clicking outside.
  window.onclick = function (e) {
    if (!e.target.matches('.edit')) {
      close_all_dropdowns()
    }
  }





function addBadgepoint(){
    //e.preventDefault()
    let url = `https://${host}/users/${currentId}/`
    console.log('badge points increased')
    let options = {
        method: "PATCH",
        mode: 'cors',
        headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                }
    }
    fetch(url,options)
  
    
}

function loadBadge() {
    let url = `https://${host}/users/${currentId}/`
    let optionsBadge = {
        method: "GET",
        mode: 'cors',
        headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                }
    }
    fetch(url, optionsBadge)
    .then(r => r.json())
    .then(data => {
        const currentBadgePoints = data.badgePoints;
        console.log(currentBadgePoints)
        console.log((currentBadgePoints / 50) + "%")
        const badgeIcon = document.getElementById("badgeImage")
        const badgeTxt = document.getElementById('badgeId')
        const proBar = document.getElementById('myBar')
        if (currentBadgePoints > 150) {
            badgeIcon.src = "./badges/Gold.png"
            badgeTxt.textContent = "Gold 🍾"
            proBar.style.width = 100 + '%'
            proBar.style.backgroundColor = "#e9d310"
        } else if (currentBadgePoints >= 100) {
            badgeIcon.src = "./badges/Silver.png"
            badgeTxt.textContent = "Silver✨"
            proBar.style.width = (((currentBadgePoints-100) / 50)*100) + "%"
        } else if (currentBadgePoints >= 50) {
            badgeIcon.src = "./badges/Bronze.png"
            badgeTxt.textContent = "Bronze 👏"
            proBar.style.width = (((currentBadgePoints-50) / 50)*100) + "%"
        } else if (currentBadgePoints < 50) {
            badgeIcon.src = "./badges/no-badge.png"
            badgeTxt.textContent = "No badge, level up more! 🏃‍♂️"
            proBar.style.width = ((currentBadgePoints / 50)*100) + "%"
        }
    })
}



function deleteHabit(id) {
    let url = `https://${host}/habits/${id}`
    let options = {
        method: 'DELETE',
        mode: 'cors',
        headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                }
    }
    fetch(url,options)
    .then(() => location.reload())
}

function editHabit(id, frequency, targetDate) {
    console.log(id)
    console.log(frequency)
    console.log(targetDate)

    let url = `https://${host}/habits/${id}`

    updatedHabitInfo = {
        frequency: frequency,
        targetDate: targetDate
    }

    let options = {
        method: "PATCH",
        mode: 'cors',
        headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                },
        body: JSON.stringify(updatedHabitInfo)
    }
    fetch(url,options)
    .then(() => location.reload())
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

function progressBar(habitId) {
     let todaysDate = dayjs().format('DD/MM/YYYY')

     let url = `https://${host}/frequency/${habitId}`
     let options = {
        method: "GET",
        mode: 'cors',
        headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                }
    }

    fetch(url,options)
    .then(r=>r.json())
    .then(data => {


        let period
    if (data.frequencyType == 'daily') {
          period = 1
    } if (data.frequencyType == 'weekly') {
         period = 7
    } if (data.frequencyType == 'monthly') {
         period = 30
    }
         let periodEnd = dayjs(data.periodStart).add(period, 'day').format('MM/DD/YYYY')
         
        // console.log(difference, todaysDate, data.lastDoneDate)

        //console.log(dayjs(data.periodStart).format('MM-DD-YYYY'))
        console.log(periodEnd, todaysDate)
        if (periodEnd >= todaysDate && data.freqStreak >= data.frequency && !data.streakAdded) {
            let freqStreak = 0
            let streak = 1
            let streakAdded = true

            updatedFreqInfo = {
                streak: streak,
                freqStreak: freqStreak,
                streakAdded: streakAdded
            }

            updateStreak(habitId, updatedFreqInfo)

        } 
        
        if (periodEnd <= todaysDate && !data.streakAdded) {
            let freqStreak = 0
            let streak = 0
            let periodStart = dayjs().format('DD/MM/YYYY')
            console.log("dont go here ")

            updatedFreqInfo = {
                streak: streak,
                freqStreak: freqStreak,
                periodStart: periodStart
            }
    
            updateStreak(habitId, updatedFreqInfo)
        }

        if (periodEnd <= todaysDate && data.streakAdded) {
            let freqStreak = 0

            let periodStart = dayjs().format('DD/MM/YYYY')


            updatedFreqInfo = {
                freqStreak: freqStreak,
                periodStart: periodStart,
                streakAdded: false
            }
    
            updateStreak(habitId, updatedFreqInfo)
        }
        
    })
}

function checkStreak(habitId, updatedFreqInfo) {
    let url = `https://${host}/frequency/${habitId}`

    let options = {
        method: "GET",
        mode: 'cors',
        headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                }
    }
    fetch(url,options)
    .then(r => r.json())
    .then(data => {
        console.log(data)
        if (!data.streakAdded) {
            addBadgepoint()
            updateStreak(habitId, updatedFreqInfo)
        }
    })
}

function updateStreak(habitId, updatedFreqInfo) {
    
    let url = `https://${host}/frequency/${habitId}`

    let options = {
        method: "PATCH",
        mode: 'cors',
        headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                },
        body: JSON.stringify(updatedFreqInfo)
    }

    fetch(url,options)
}



module.exports = { displayHabits, getHabits, postHabit, show, addBadgepoint, editHabit, loadBadge, checkStreak}



},{"dayjs":1}],4:[function(require,module,exports){
const jwt_decode = require('jwt-decode');
host = 'clockworkback.herokuapp.com'
async function requestLogin(e) {
    e.preventDefault();
    // console.log("hello")
    // console.log(e.target.usernameLogin.value)
    // console.log(e.target.passwordLogin.value)
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "userName": e.target.usernameLogin.value,
          "password": e.target.passwordLogin.value
        })
      };
      console.log('i made it')
      const r = await fetch(
        `https://${host}/auth/login/`,
        options
      );
      console.log('im here too')
      const data = await r.json();
      if (!data.success) {
        throw new Error("Login not authorised");
      }
	  console.log(data)
      login(data.token);
    } catch (err) {
      console.warn(err);
    }
  }
  
  function login(token) {
    const user = jwt_decode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("id", user.id);
	console.log(localStorage.getItem("token"))
	console.log(user.id)
    window.location.replace("dashboard.html");
  }


  async function requestRegistration(e) {
	e.preventDefault();
	// console.log("hello")	
	// console.log(e.target.usernameRegister.value);
	// console.log(e.target.passwordRegister.value);
	try {
		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				"userName": e.target.usernameRegister.value,
				"password": e.target.passwordRegister.value
			})
		};
		
		const r = await fetch(
			`https://${host}/auth/register/`,
			options
		);
		const data = await r.json();
		if (data.err) {
			throw Error(data.err);
		}
		window.location.replace("index.html");
	} catch (err) {
		console.warn(err);
	}
}


module.exports = {requestLogin: requestLogin, requestRegistration: requestRegistration};

},{"jwt-decode":2}],5:[function(require,module,exports){

const { requestLogin, requestRegistration } = require("./loginAuth");
const { addBadgepoint, postHabit, show, getHabits,  } = require("./dashboard");


const options = {
  linkSelector: "a",
  debugMode: true,
};


// var swup = new Swup(options);





//Eventlisteners on submit buttons
window.addEventListener("load", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registrationForm");
  if (loginForm) {
    loginForm.addEventListener("submit", requestLogin);
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      console.log("e" + e);
      const pass = passwordMatch();
      if (pass) {
        // console.log("hello hi")
        e.preventDefault();
        requestRegistration(e);
      } else {
        e.preventDefault();
        passwordMatch(e);
      }
    });
  }
  const submitButton = document.getElementById("habitSubmit");
  if (submitButton) {
    submitButton.addEventListener("click", postHabit);
  }

  const showForm = document.getElementById("add-habit");
  if (showForm) {
    showForm.addEventListener("click", show);
  }
  function hide() {
    frequency.classList.add('hidden')

}

const posCircle = document.getElementById('posCircle')
const negCircle = document.getElementById('negCircle')
posCircle.addEventListener('click', selectPos)
negCircle.addEventListener('click', selectPos)

function selectPos () {
  
  const isPositive = document.getElementById('positive')
  console.log(isPositive.checked)
  
  const plusIcon = document.querySelector('.plusIcon')
  const minusIcon = document.querySelector('.minusIcon')
  setTimeout(() => {
    if(isPositive.checked) {
    posCircle.classList.add('selectedCircle')
    negCircle.classList.remove('selectedCircle')
    plusIcon.classList.add('selectedIcon')
    minusIcon.classList.remove('selectedIcon')

}else {
    negCircle.classList.add('selectedCircle')
    posCircle.classList.remove('selectedCircle')
    minusIcon.classList.add('selectedIcon')
    plusIcon.classList.remove('selectedIcon')
}}, 10)
  
}

const logoutButton = document.getElementById("logOut");
  if(logoutButton) {
    logoutButton.addEventListener('click', logout);
  }

  function logout(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.replace('index.html');
}

const cancel = document.getElementById('cancel')

if(cancel) {
  cancel.addEventListener('click', () => {
    console.log('cancelled')
  let habitName = document.getElementById('habitName')
  let frequency = document.getElementById('frequency')
  let targetDate = document.getElementById('targetDate')
  document.getElementById('habitAddPage').classList.toggle('active')
  habitName.value = ""
  frequency.value = ""
  targetDate.value = ""

}) 
}

const cancelEdit = document.getElementById('editCancel')
if (cancelEdit) {
  cancelEdit.addEventListener('click', () => {
    let editFrequency = document.getElementById('frequencyEdit')
    let editTargetDate = document.getElementById('targetDateEdit')
    document.getElementById('habitEditPage').classList.toggle('active2')
    editFrequency.value = ""
    editTargetDate.value = ""
  })
}




function unhide(){
  frequency.classList.remove('hidden')
}
  const posOrNeg = document.getElementById('posOrNeg')
  const checkPositive = document.getElementById('positive');
  const frequency = document.querySelector(".frequency");
  if(posOrNeg) {posOrNeg.addEventListener('click', ()=>{
    console.log('hibiidy bidbioid')
    if(!checkPositive.checked) {
      hide()
    }
    else {
      unhide()
    }
  })}
  
  
  // const typeButton = document.getElementById('typeButton')
  // const badgeButton = document.getElementById("badgePoint");
  
  });

// Hiding the registration form when the page loads
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  hideRegistrationForm();
});

//Validations for the confirm passsword
const usernameRegister = document.getElementById("usernameRegister");
const passwordRegister = document.getElementById("passwordRegister");
const confirmPassword = document.getElementById("confirmPassword");
const popUp = document.getElementById("passwordPopup");
const registerSubmit = document.getElementById("registrationSubmit");

if (confirmPassword) {
  confirmPassword.addEventListener("blur", (e) => {
    passwordMatch();
  });
}

function passwordMatch() {
  console.log(passwordRegister.value);
  console.log(confirmPassword.value);
  if (passwordRegister.value !== confirmPassword.value) {
    popUp.classList.toggle("show");
    //confirmPassword.focus();
    return false;
  } else {
    return true;
  }
}
function hideRegistrationForm() {
  registerForm.classList.add("hideForm");
}


// // event listener for badgepoint
// const badgeButton  = document.getElementById("badgePoint")
// badgeButton.addEventListener("click",addBadgepoint);

// event listener for badgepoint

module.exports = passwordMatch;

},{"./dashboard":3,"./loginAuth":4}]},{},[5,4,3]);
