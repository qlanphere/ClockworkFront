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

console.log('cry')

function showEdit(habitId) {
    document.getElementById('habitEditPage').classList.toggle('active2')
    const editSubmit = document.getElementById('editSubmit')
    const addHabit = document.getElementById('habitAddPage')

    if(addHabit.classList.contains('active')) {
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
        console.log('clicked')
        const editHabit = document.getElementById('habitEditPage')
        if (editHabit.classList.contains('active2')) {
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
    let negValue 
    let habitData

    console.log(negative.checked)
    
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
            userId: currentId
        }
    }

        
     
    console.log(habitData)
    console.log(localStorage.getItem('token'))
    const url = `https://${host}/habits `
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

           displayHabits(habitId, habitName, frequency, startDate, targetDate, habitType)
        }
    })
}

function displayHabits(habitId, habitName, frequency, startDate, targetDate, habitType) {
    const habitBox = document.getElementById('habit-container')
    const newHabit = document.createElement('div')
    
    const editDiv = document.createElement('div')
    const dots = document.createElement('h2')
    const editDel = document.createElement('div')
    const edit = document.createElement('a')
    const delet = document.createElement('a')
    
    const habitTitle = document.createElement('h2')
    const typeBtn = document.createElement('h2')

    dots.textContent = "..."
    habitTitle.textContent = habitName
    edit.textContent = "edit";
    delet.textContent = "delete"
    
    if(habitType === true) {
        typeBtn.textContent = '+'
    } else {
        typeBtn.textContent = '-'
    }

    newHabit.classList.add(`habit-card`)
    dots.classList.add('edit')
    typeBtn.classList.add('typeBtn')
    habitTitle.classList.add('habitTitle')
    editDiv.classList.add('dropdown')

    editDel.classList.add('dropdown-content')
    editDel.setAttribute('id','myDropdown')
    edit.setAttribute('id', 'showEditForm')
    typeBtn.setAttribute('id', 'typeButton')
    
    habitBox.appendChild(newHabit)
   
    newHabit.appendChild(editDiv)
    editDiv.appendChild(dots)
    editDiv.appendChild(editDel)
    editDel.appendChild(edit)
    editDel.appendChild(delet)
    
    newHabit.appendChild(habitTitle)
    newHabit.appendChild(typeBtn)
    
   
   // function for dropdown box showing edit and delete
  
    dots.addEventListener('click', (e) => showDrop(e))
    delet.addEventListener('click',() => deleteHabit(habitId))
    edit.addEventListener('click', () => showEdit(habitId))
    
    typeBtn.addEventListener('click', () => {
        if (typeBtn) {
            let count = 0;
            let today = new Date();
            let day = today.getDate();
            let month = today.getMonth();
            let year = today.getFullYear();
            let todaysDate = `${year}-${month}-${day}`;
        
              typeBtn.addEventListener("click",(e) => {
                let currentDate = new Date();
                let currentTime = currentDate.getTime();
                let firstClick = currentTime;
                let secondsDay = 86400000;
                let timeDiff = secondsDay - currentTime;
                if(count === 0) {
                  count ++;
                  
                  addBadgepoint(e)
                } else {
                  console.log('stop pressing')
                }
              } );
            }
    })
 

   
}

function showDrop (e) {
    const target = e.target.closest('div')
    let child = target.querySelector('.dropdown-content')
    console.log(target)
    child.classList.toggle('show')
}







function addBadgepoint(e){
    e.preventDefault()
    let url = `https://${host}/users/${currentId}/`
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

module.exports = { displayHabits, getHabits, postHabit, show, addBadgepoint, editHabit, loadBadge}


