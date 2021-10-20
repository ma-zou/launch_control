import Search from './search.js'
import Settings from './settings.js'
import Results from './results.js'

const { ipcRenderer } = require('electron')

class LC {
    constructor(triggers) {
        this.input = document.getElementById('input')
        this.search = new Search(triggers)
        this.input.addEventListener('keyup', this.keyHandler.bind(this))
        this.results = new Results();
        this.activeIndex = -1;
    }

    async keyHandler(event) {
        if(event.keyCode === 27) {
            this.results.clear();
            this.input.value = "";
            return await ipcRenderer.invoke('view:close');
        }
        if(event.target.value) {
            switch (event.keyCode) {
                case 9: // tab
                    if(this.search.getResults().length > 0) {
                        if(this.activeIndex === -1) {
                            this.input.value = this.search.getResults()[0];
                        } else {
                            this.input.value = this.search.getResults()[this.activeIndex];
                        }

                        this.search.updateValue(this.input.value)
                        await this.showResults(this.search.getResults());
                    }
                    break;
                case 13: // enter
                    console.log(await this.run());
                    break;
                case 38: // up
                    if(this.activeIndex > 0) this.activeIndex--
                    this.results.setActive(this.activeIndex);
                    break;
                case 40: // down
                    if(this.activeIndex < this.search.getResults().length - 1) this.activeIndex++
                    this.results.setActive(this.activeIndex);
                    break;
                default:
                    this.activeIndex = -1;
                    this.results.setActive(this.activeIndex);
                    this.search.updateValue(event.target.value)
                    await this.showResults(this.search.getResults());
                    break;
            }
        } else {
            this.results.clear();
        }
    }

    async run() {
        if(this.activeIndex > -1) {
            return await ipcRenderer.invoke('modules:run', this.search.getResults()[this.activeIndex]);
        } else {
            return null
        }
    }

    async showResults(matches) {
        this.results.clear();
        if(matches) {
            matches.forEach(match => {
                this.results.add(match)
            })

            await ipcRenderer.invoke('view:updateHeight', (matches.length * 52 + 70));
        }
    }
}

(async function(){
    let settings = await Settings.load();
    let triggers = await ipcRenderer.invoke('modules:getTrigger');

    new LC(triggers);
})()
