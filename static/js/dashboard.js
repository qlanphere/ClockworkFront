const currentId = localStorage.getItem('id')
console.log(currentId);
const host = 'clockworkback.herokuapp.com'//'localhost'
//const port = 3000
const submitButton = document.getElementById('habitSubmit')
submitButton.addEventListener('click', postHabit)

const bronze = "../badges/Bronze.png"
const silver = "../badges/Silver.png"
const gold = "../badges/Gold.png"

const showForm = document.getElementById('add-habit')
showForm.addEventListener('click', show)

function show() {
    console.log('clicked')
    document.getElementById('habitAddPage').classList.toggle('active')
}

const checkPositive = document.getElementById('positive')
const frequency = document.querySelector('.frequency')

checkPositive.addEventListener('click', getHabits)

function hide() {
    frequency.classList.toggle('hidden')

}

function postHabit(e) {
    e.preventDefault();
    let habitName = document.getElementById('habitName').value
    let frequency = document.getElementById('frequency').value
    let targetDate = document.getElementById('targetDate').value
    let negative = document.getElementById('negative')
    let negValue 

    console.log(negative.checked)
    
    if(negative.checked) {
        negValue = false 
    } else {
        negValue = true
    }

        
    const habitData = {
        habitName: habitName,
        frequency: frequency,
        targetDate: targetDate,
        habitType: negValue,
        userId: currentId
    }
    console.log(habitData)
    const url = `https://${host}/habits/`
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
}

async function getHabits(e) {

    e.preventDefault()

    let url = `https://${host}/habits/user/${currentId}`
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
        for(let i=0;i<data.length;i++) {

            let habitId = data[i].habitId
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
    const habitTitle = document.createTextNode(habitName)
    const habitStart = document.createTextNode
    habitBox.appendChild(newHabit)
    newHabit.appendChild(habitTitle)

    
}

function badgeChecker(badgePoints) {
    let badge
    if (badgePoints > 50) {
        badge = bronze
    } if (badgePoints > 100) {
        badge = silver
    } if (badgePoints > 150) {
        badge=gold
    }
    else badge = ""
    return badge
}

module.exports = { badgeChecker, displayHabits, getHabits, postHabit, show, hide}


