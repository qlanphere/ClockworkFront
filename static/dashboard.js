const currentId = localStorage.getItem('id')
console.log(localStorage)
const host = 'clockworkback.herokuapp.com'//'localhost'
//const port = 3000
// const submitButton = document.getElementById('habitSubmit')
// submitButton.addEventListener('click', postHabit)

window.addEventListener('DOMContentLoaded', getHabits)



const bronze = "../badges/Bronze.png"
const silver = "../badges/Silver.png"
const gold = "../badges/Gold.png"

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
            userId: currentId
        }
    } else {
        habitData = {
            habitName: habitName,
            frequency: frequency,
            targetDate: targetDate,
            habitType: negValue,
            userId: currentId,
            frequencyType: frequencyType
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

    dots.textContent = "..."
    habitTitle.textContent = habitName
    edit.textContent = "edit";
    delet.textContent = "delete"
    streakDisplay.textContent = `Current streak:   ${streak}🔥`
    
    if(habitType === true) {
        plus.textContent = '+'
    } else {
        plus.textContent = '-'
    }

    newHabit.classList.add(`habit-card`)
    dots.classList.add('edit')
    typeBtn.classList.add('typeBtn')
    habitTitle.classList.add('habitTitle')
    editDiv.classList.add('dropdown')
    editNameStreak.classList.add('editNameStreak')
    plus.classList.add('plusTings')



    editDel.classList.add('dropdown-content')
    editDel.setAttribute('id','myDropdown')
    edit.setAttribute('id', 'showEditForm')
    typeBtn.setAttribute('id', 'typeButton')
    
    habitBox.appendChild(newHabit)
   
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
    
   
   // function for dropdown box showing edit and delete
  
    dots.addEventListener('click', (e) => showDrop(e))
    delet.addEventListener('click',() => deleteHabit(habitId))
    edit.addEventListener('click', () => showEdit(habitId))


    progressBar(habitId)

    
    
    // typeBtn.addEventListener('click', () => {
        if (typeBtn) {
            let count = 0;
        
              typeBtn.addEventListener("click",(e) => {
                if(count === 0) {
                  count ++;
              
                  addBadgepoint(e)
                  //addLastDoneDate(habitId)
                    let currentDate = new Date()
                    let updateInfo = {
                        freqStreak: 1,
                        lastDoneDate: currentDate
                    }
                    updateStreak(habitId, updateInfo)

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



// function addLastDoneDate(id){
//     let url = `https://${host}/frequency/${id}`
//     const currentDate = new Date()
    

//     data = {
//         lastDoneDate: currentDate
//     }
//     console.log(data)

//     let options = {
//         method: "PATCH",
//         mode: 'cors',
//         headers: { "Content-Type": "application/json",
//                     "authorization": localStorage.getItem('token')
//                 },
//         body: JSON.stringify(data)
//     }
//     fetch(url,options)
//     .then(console.log('fetch succesful'))

// }

function addBadgepoint(e){
    e.preventDefault()
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
        const badgeIcon = document.getElementById("badgeImage")
        if (currentBadgePoints > 150) {
            badgeIcon.src = "../../badges/Gold.png"
        } else if (currentBadgePoints > 100) {
            badgeIcon.src = "../../badges/Silver.png"
        } else if (currentBadgePoints > 50) {
            badgeIcon.src = "../../badges/Bronze.png"
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
     let period
     let todaysDate = new Date()

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

        console.log(data.freqStreak)

        let period
    if (data.frequencyType == 'daily') {
          period = 1
    } if (data.frequencyType == 'weekly') {
         period = 7
    } if (data.frequencyType == 'Monthly') {
         period = 30
    }
        let difference = addDays(data.lastDoneDate,period)
        console.log(difference<todaysDate)
        if (difference > todaysDate && data.freqStreak >= data.frequency) {
            let freqStreak = 0
            let streak = 1

            updatedFreqInfo = {
                streak: streak,
                freqStreak: freqStreak
            }

            updateStreak(habitId, updatedFreqInfo)

        } 
        
        else if (difference < todaysDate && data.freqStreak < data.frequency) {
            let freqStreak = 0
            let streak = 0

            updatedFreqInfo = {
                streak: streak,
                freqStreak: freqStreak
            }
    
            updateStreak(habitId, updatedFreqInfo)
        }
        
    })
}

function updateStreak(habitId, updatedFreqInfo) {
    console.log('Will it go through')
    let url = `https://${host}/frequency/${habitId}`
    let options = {
        method: "PATCH",
        mode: 'cors',
        headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                },
        body: JSON.stringify(updatedFreqInfo)
    }
    console.log('It has gone through')

    fetch(url,options)
}

function logout(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.replace('index.html');
}

module.exports = { displayHabits, getHabits, postHabit, show, addBadgepoint, editHabit, loadBadge, logout}


