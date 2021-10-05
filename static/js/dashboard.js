const host = localhost
const port = 3000
const submitHabit = document.addEventListener('submit', postHabit)


function show() {
    document.getElementById('habitAddPage').classList.toggle('active')
}



function show() {
    document.getElementById('habitAddPage').classList.toggle('active')
}

function postHabit() {
    const habitData = {
        habitName: document.getElementById('habitName').value
    }
    const url = `http://${host}:${port}/habits`
    const options = {
        method: 'POST',
        headers:{ 'Content-Type':'applications/json'},
        body: JSON.stringify(habitData)
    }
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

