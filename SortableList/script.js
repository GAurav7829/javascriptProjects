const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

//store list items
const listItems = [];

let dragStartIndex;

createList();

//insert list items
function createList(){
    [...richestPeople]
    .map(a => ({ value: a, sort: Math.random()}))
    .sort((a,b)=> a.sort - b.sort ) //sort by random number
    .map(a=> a.value)   //return value only
    .forEach((person,index)=>{
        const listItem = document.createElement('li');
        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `
            <span class='number'>${index + 1}</span>
            <div class='draggable' draggable='true'>
                <p class='person-name'>${person}</p>
                <i class='fas fa-grip-lines'></i>
            </div>
        `;
        listItems.push(listItem);
        draggable_list.appendChild(listItem);
    });

    addEventListeners();
}

function dragStart(){
    // console.log('dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragOver(e){
    // console.log('dragover');
    e.preventDefault();
}

function dragDrop(){
    // console.log('drop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}

function dragEnter(){
    // console.log('dragenter');
    this.classList.add('over');
}

function dragLeave(){
    // console.log('dragleave');
    this.classList.remove('over');
}

//swap list items
function swapItems(fromIndex, toIndex){
    const item1 = listItems[fromIndex].querySelector('.draggable');
    const item2 = listItems[toIndex].querySelector('.draggable');

    // console.log(item1, item2);
    listItems[fromIndex].appendChild(item2);
    listItems[toIndex].appendChild(item1);
}

//check order of list items
function checkOrder(){
    listItems.forEach((listItem, index)=>{
        const personName = listItem.querySelector('.draggable').innerText.trim();
        if(personName!==richestPeople[index]){
            listItem.classList.add('wrong');
        }else{
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable=>{
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item=>{
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

check.addEventListener('click', checkOrder);