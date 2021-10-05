const currentId =  1 //localStorage.getItem('id')
console.log(currentId);
const host = 'localhost'
const port = 3000
const submitButton = document.getElementById('habitSubmit')
submitButton.addEventListener('click', postHabit)



function show() {
    document.getElementById('habitAddPage').classList.toggle('active')
}

const checkPositive = document.getElementById('positive')
const frequency = document.querySelector('.frequency')

checkPositive.addEventListener('click', hide)

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
    const url = `http://${host}:${port}/habits`
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(habitData)
    }
    console.log(options.body)
    fetch(url, options)
}

async function getHabits(e) {

    e.preventDefault()

    let url = `http://${host}:${port}/habits/${currentId}`

    fetch(url)
    .then(r => r.json())
    .then(data => {

        for(let i=0;i<data.length();i++) {

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

}


