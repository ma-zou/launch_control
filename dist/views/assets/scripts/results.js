export default class Results {
    constructor() {
        this.list = document.getElementById('results');
    }

    add(text) {
        let item = document.createElement('div');
        item.className = 'result';
        item.textContent = text;

        this.list.append(item)
    }

    setActive(activeIndex) {
        this.list.childNodes.forEach((item, index) => {
            item.classList.remove('active');
            if(activeIndex === index) {
                item.classList.add('active');
            }
        })
    }

    clear() {
        this.list.innerHTML = '';
    }
}