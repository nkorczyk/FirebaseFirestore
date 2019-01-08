const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// Create element and render cafe
function renderCafe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // Deleting data
    cross.addEventListener('click', (event) => {
        event.stopPropagation();
        let id = event.target.parentElement.getAttribute('data-id');

        db.collection('cafes').doc(id).delete();
    })
}

// Getting data
// db.collection('cafes').where('city', '==', 'Skawa').get().then((snapshot) => {
// db.collection('cafes').where('city', '>', 'n').get().then((snapshot) => {
db.collection('cafes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    })
});

// Saving data
form.addEventListener('submit', (event) => {
    event.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    });
    form.name.value = '';
    form.city.value = '';
});
