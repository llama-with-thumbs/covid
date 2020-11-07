import create from './utils/create.js'

export default class Key {
    constructor({small, shift, code}) {
        this.small = small
        this.shift = shift
        this.code = code
        this.isFnKey = (Boolean(small.match(/Ctrl|arr|Alt|Shift|Tab|Back|Del|Enter|Caps|🕪/)))

        if (shift && shift.match(/[^a-zA-Zа-яА-ЯЁё0-9]/)) {
            this.sub = create('div', 'sub', this.shift)
        } else {
            this.sub = create('div', 'sub', '')
        }
        this.letter = create('div', 'letter', small)
        this.div = create('div', 'keyboard__key', [this.sub, this.letter], null, ['code', this.code], 
            this.isFnKey ? ['fn', 'true'] : ['fn', 'false'])

    }
}