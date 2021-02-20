

function loadItems() {
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);

}

function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function onButtonClick(event, items) {
 
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    if (key == null || value == null) {
        return;
    }
    // 전체적으로 계속업데이트되는 코드
    const filtered = items.filter(item => item[key] === value);
    displayItems(filtered);

    updateItems (items, key, value);

}
// 빙글빙글돌면서 불필요한 업데이트가 없음
/*
function updateItems(items, key, value){
    items.forEach(item => {
        if (item.dataset[key] === value) {
            item.classList.remove('invisible');
        } else {
            item.classList.add('invisible');
        }
        
    });
}
*/
function setEventListemers(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}

loadItems()
    .then(items => {
        displayItems(items);
        setEventListemers(items);
    })
    .catch(console.log);