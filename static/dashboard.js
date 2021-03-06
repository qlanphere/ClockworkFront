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
    streakDisplay.textContent = `Current streak:   ${streak}????`
    
   
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
            badgeTxt.textContent = "Gold ????"
            proBar.style.width = 100 + '%'
            proBar.style.backgroundColor = "#e9d310"
        } else if (currentBadgePoints >= 100) {
            badgeIcon.src = "./badges/Silver.png"
            badgeTxt.textContent = "Silver???"
            proBar.style.width = (((currentBadgePoints-100) / 50)*100) + "%"
        } else if (currentBadgePoints >= 50) {
            badgeIcon.src = "./badges/Bronze.png"
            badgeTxt.textContent = "Bronze ????"
            proBar.style.width = (((currentBadgePoints-50) / 50)*100) + "%"
        } else if (currentBadgePoints < 50) {
            badgeIcon.src = "./badges/no-badge.png"
            badgeTxt.textContent = "No badge, level up more! ?????????????"
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
                periodStart: periodStart
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


