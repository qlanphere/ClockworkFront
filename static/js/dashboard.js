
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

function show() {
    document.getElementById('habitAddPage').classList.toggle('active')
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
        habitType: negValue
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


// async function postHabit(e) {
//     e.preventDefault();
//     try {
        
//         const options = {
//             method: 'POST',
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
//         }
//         const response = await fetch('http://localhost:3000/habits', options);
//         const {id, err} = await response.json();
//         if (err) {
//             throw Error(err)
//         } else {
//             window.location.hash = `#habits/${id}`
//         }
        
//     }
// }

