// const array = [
//     { name: 'John' },
//     { name: 'David' },
//     { name: 'Peter' },
//     { name: 'Michael' }
// ];

// const create = () => {
//     const app = document.querySelector('.app');
//     app.innerHTML = '';

//     for (let i = 0; i < array.length; i++) {
//         app.innerHTML +=
//             `<div class="item"><span class="erase">&#9747;</span>${array[i].name}</div>`;
//     }

//     const erase = document.querySelectorAll('.erase');

//     erase.forEach(item => {
//         item.onclick = () => {
//             const itemText = item.parentElement.textContent.substr(1);
//             const itemPos = array.findIndex(item => item.name == itemText);


//             console.log(itemText + ' ' + itemPos);
//             console.log(array);
//             array.splice(itemPos, 1);
//             create();
//         }
//     });
// }

// create();
1


const array = [
    { name: 'John' },
    { name: 'john' },
    { name: 'Peter' },
    { name: 'Michael' }
];

const create = () => {
    const app = document.querySelector('.app');
    app.innerHTML = '';

    for (let i = 0; i < array.length; i++) {
        app.innerHTML +=
            `<div class="item"><span class="erase">&#9747;</span>${array[i].name}</div>`;
    }
}
create();
const erase = document.querySelectorAll('.erase');
erase.forEach(item => {
    item.onclick = () => {
        const itemText = item.parentElement.textContent.substr(1);
        const itemPos = array.findIndex(item => item.name == itemText);
        console.log(itemText + ' ' + itemPos);
            array.splice(itemPos, 1);
            item.parentElement.remove();
        console.log(array);
    }
});
