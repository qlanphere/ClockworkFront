function show() {
    document.getElementById('habitAddPage').classList.toggle('active')
}



function show() {
    document.getElementById('habitAddPage').classList.toggle('active')
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

