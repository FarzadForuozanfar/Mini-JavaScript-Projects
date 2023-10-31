const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogListEl = document.getElementById('backlog-list');
const progressListEl = document.getElementById('progress-list');
const completeListEl = document.getElementById('complete-list');
const onHoldListEl = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// Drag Functionality
let draggedItem;
let dragging = false;
let currentColumn;

const x = () => {

}

const getSavedColumns = () => {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
}

const updateSavedColumns = () => {
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
  });
}

const removeItems = (arr) => {
  const itemsToRemove = ['', "", null, undefined];
  return arr.filter(item => !itemsToRemove.includes(item));
}

const createItemEl = (columnEl, column, item, index, type) => {
  const Element = document.createElement(type);
  Element.textContent = item;
  Element.id = index;
  Element.classList.add('drag-item');
  Element.draggable = true;
  Element.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
  Element.setAttribute('ondragstart', 'drag(event)');
  Element.contentEditable = true;

  columnEl.appendChild(Element);
}

const updateColumn = (elContainer, listArray, column) => {
  elContainer.textContent = '';
  listArray.forEach((item, index) => {
    createItemEl(elContainer, column, item, index, 'li');
  });
}

const updateItem = (id, column) => {
  const selectedArray = listArrays[column];
  const selectedColumn = listColumns[column].children;
  if (!dragging) {
    if (!selectedColumn[id].textContent) {
      delete selectedArray[id];
    } else {
      selectedArray[id] = selectedColumn[id].textContent;
    }
    updateDOM();
  }
}

const updateDOM = () => {
  if (!updatedOnLoad) {
    getSavedColumns();
  }

  mergeColumnsWithListArray();

  listColumns.forEach((item, index) => {
    updateColumn(item, listArrays[index], index);
  });

  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray].map(innerArray => removeItems(innerArray));

  updatedOnLoad = true;
  updateSavedColumns();
}

const rebuildColumnList = (listArray, Element) => {
  listArray.length = 0;
  for (let i = 0; i < Element.children.length; i++) {
    listArray.push(Element.children[i].textContent);
  }
}

const rebuildArrays = () => {
  mergeColumnsWithListArray();
  rebuildColumnList(backlogListArray, backlogListEl);
  rebuildColumnList(progressListArray, progressListEl);
  rebuildColumnList(completeListArray, completeListEl);
  rebuildColumnList(onHoldListArray, onHoldListEl);
  updateDOM();
}

const dragLeave = (column) => {
  listColumns[column].classList.remove('over');
}

const dragEnter = (column) => {
  listColumns[column].classList.add('over');
  currentColumn = column;
}

const drag = (event) => {
  draggedItem = event.target;
  dragging = true;
}

const allowDrop = (event) => {
  event.preventDefault();
}

const drop = (event) => {
  event.preventDefault();
  const parent = listColumns[currentColumn];

  listColumns.forEach((column) => {
    column.classList.remove('over');
  });

  parent.appendChild(draggedItem);

  dragging = false;
  rebuildArrays();
}

const addToColumn = (column) => {
  const itemText = addItems[column].textContent;
  if (itemText) {
    listArrays[column].push(itemText);
    addItems[column].textContent = '';
    updateDOM(column);
  }
}

const showInputBox = (column) => {
  addBtns[column].style.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
}

const hideInputBox = (column) => {
  addBtns[column].style.visibility = 'visible';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  addToColumn(column);
}

const mergeColumnsWithListArray = () => {
  backlogListArray = listArrays[0];
  progressListArray = listArrays[1];
  completeListArray = listArrays[2];
  onHoldListArray = listArrays[3];
}

updateDOM();