import * as storage from './storage.js'
import create from './utils/create.js'
import language from './layouts/index.js'
import Key from './Key.js'
import * as soundLib from './sounds.js'

const main = create('main', '',
  [create('h1', 'title', 'Virtual Keyboard'),
    // create('h3', 'subtitle', 'RS-School 2020q3'),
    create('p', 'hint', 'Use <kbd>Alt</kbd> + <kbd>Ctrl</kbd> to switch language.')]);

export default class Keyboard {
    constructor (rowOrder) {
        this.rowOrder = rowOrder
        this.keyPressed = {}
        this.isCaps = false
        this.isSound = false
    }
    init(langCode) {
        this.keyBase = language[langCode]
        this.output = create( 'textarea', 'output', null, main,
            ['placeholder', 'type in you text...'],
            ['rows', 5],
            ['cols', 50],
            ['spellcheck', false],
            ['autocorrect', 'off'])
        this.container = create( 'div', 'keyboard', null, main,
            ['language', langCode])
        document.body.prepend(main)
        return this
    }
    generateLayout() {
        this.keyButtons = []
        this.rowOrder.forEach((row, i) => {
            const rowElement = create('div', 'keyboard__row', null, this.container, ['row', i+1])
            rowElement.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`
            row.forEach((code) => {
                const keyObj = this.keyBase.find((key) => key.code === code)
                if (keyObj) {
                  const keyButton = new Key(keyObj)
                  this.keyButtons.push(keyButton)
                  rowElement.appendChild(keyButton.div)
                }
              })
        })
        // document.querySelector('.keyboard')
        document.addEventListener('keydown', this.hanleEvent)
        document.addEventListener('keyup', this.hanleEvent)

        this.container.onmousedown = this.preHandleEvent;
        this.container.onmouseup = this.preHandleEvent;
    }
    
    playButton = (elementId, lang) => {
        if (!elementId && lang) {
            if (lang === 'ru') {
                soundLib.soundRu.currentTime = 0
                soundLib.soundRu.play()
    // export const soundShift = document.getElementById('sound_shift')
    // export const soundCaps = document.getElementById('sound_caps')
    // export const soundBack = document.getElementById('sound_back')
    // export const soundEnter
            } else {
                soundLib.soundEn.currentTime = 0
                soundLib.soundEn.play()
            }
        } else if (elementId) {
            // console.log(soundLib, elementId)
            switch (elementId) {
                case 'Enter':
                    soundLib.soundEnter.currentTime = 0
                    soundLib.soundEnter.play()
                    break;
                case 'CapsLock':
                    soundLib.soundCaps.currentTime = 0
                    soundLib.soundCaps.play()
                    break;
                case 'Backspace':
                    soundLib.soundBack.currentTime = 0
                    soundLib.soundBack.play()
                    break;
                case 'ShiftLeft':
                    soundLib.soundShift.currentTime = 0
                    soundLib.soundShift.play()
                    break
                case 'ShiftRight':
                    soundLib.soundShift.currentTime = 0
                    soundLib.soundShift.play()
                    break
                default:
                    break;
            }
            // soundLib.elementId.currentTime = 0
            // soundLib.elementId.play()
        }
    }

    preHandleEvent = (event) => {
        event.stopPropagation()
        const keyDiv = event.target.closest('.keyboard__key')
        
        if (!keyDiv) return
        const {dataset: { code }} = keyDiv
        keyDiv.addEventListener('mouseleave', this.resetButton)

        this.hanleEvent({ code, type: event.type })
    }
    resetButton = ({target: {dataset: {code}}}) => {
        const keyObj = this.keyButtons.find(key => key.code === code)
        if (code.match(/Caps/)) return // prevent from unpresing when mouse cursor left
        if (code.match(/Sound/)) return // prevent from unpresing when mouse cursor left
        // console.log('resetButton, code: ', code)
        keyObj.div.classList.remove('active')
        keyObj.div.removeEventListener('mouseleave', this.resetButton)
    }

    hanleEvent = (event) => {
        if (event.stopPropagation) event.stopPropagation()
        const {code, type} = event
        const keyObj = this.keyButtons.find(key => key.code === code)
        if (!keyObj) return

        if (this.isSound) {
            if (type.match(/keydown|mousedown/)) {
                if (code.match(/Shift|Caps|Back|Enter/)) {
                    // console.log(type, keyObj, storage.get('kbLang')||'ru')
                    this.playButton(code, null)
                }
                else {
                    this.playButton(null, storage.get('kbLang')||'ru')
                }
                
            }
            // this.playButton()
        }
        this.output.focus()
        if (type.match(/keydown|mousedown/)) {
            if (type.match(/key/)) event.preventDefault()
            keyObj.div.classList.add('active')

            if (code.match(/Shift/)) this.shiftKey = true
            if (this.shiftKey) this.switchCaseUp(true)

            if (code.match(/Caps/) && !this.isCaps) {
                this.isCaps = true
                this.switchCaseUp(true)
            } else if (code.match(/Caps/) && this.isCaps) {
                this.isCaps = false
                this.switchCaseUp(false)
                keyObj.div.classList.remove('active')
            } else if (code.match(/Sound/) && !this.isSound) {
                this.isSound = true
            } else if (code.match(/Sound/) && this.isSound) {
                this.isSound = false
                keyObj.div.classList.remove('active')
            }

            //lang
            if (code.match(/Control/)) this.ctrlKey = true
            if (code.match(/Alt/)) this.altKey = true
            if (code.match(/Control/) && this.altKey) this.changeLang()
            if (code.match(/Alt/) && this.ctrlKey) this.changeLang()

            if ( !this.isCaps) {
                this.printOutput(keyObj, this.shiftKey ? keyObj.shift : keyObj.small)
            } else if ( this.isCaps) {
               if (this.shiftKey) {
                   this.printOutput(keyObj, keyObj.sub.innerHTML ? keyObj.shift : keyObj.small)
               } else {
                   this.printOutput(keyObj, !keyObj.sub.innerHTML?  keyObj.shift : keyObj.small)
                   
                }
            }

        } else if (type.match(/keyup|mouseup/)) {
            if (code.match(/Control/)) this.ctrlKey = false
            if (code.match(/Alt/)) this.altKey = false

            if (code.match(/Shift/)) {
                this.shiftKey = false
                this.switchCaseUp(false)
            }
            if (!code.match(/Caps/) && !code.match(/Sound/)) keyObj.div.classList.remove('active')
        }
    }
    changeLang = () => {
        const langAbbr = Object.keys(language)
        let langIndx = langAbbr.indexOf(this.container.dataset.language)
        this.keyBase = langIndx + 1 < langAbbr.length ? language[langAbbr[langIndx += 1]] : language[langAbbr[langIndx -= langIndx]]
        this.container.dataset.language = langAbbr[langIndx]
        storage.set('kbLang', langAbbr[langIndx])

        this.keyButtons.forEach( button => {
            const keyObj = this.keyBase.find( key => key.code === button.code)
            if (!keyObj) return
            button.shift = keyObj.shift
            button.small = keyObj.small

            if ( keyObj.shiftKey && keyObj.shift.match(/[^a-zA-Zа-яА-ЯЁё0-9]/)) {
                button.sub.innerHTML = keyObj.ctrl
            } else {
                button.sub.innerHTML = ''
            }
            button.letter.innerHTML = keyObj.small
        })
        if (this.isCaps) this.switchCaseUp(true)
    }

    switchCaseUp(toUpper) {
        if (toUpper) {
            this.keyButtons.forEach( button => {
                if (button.sub) {
                    if (this.shiftKey) {
                        button.sub.classList.add('sub-active')
                        button.letter.classList.add('sub-inactive')
                    }
              }
              if (!button.isFnKey && this.isCaps && !this.shiftKey && !button.sub.innerHTML) {
                button.letter.innerHTML = button.shift;
              } else if (!button.isFnKey && this.isCaps && this.shiftKey) {
                button.letter.innerHTML = button.small;
              } else if (!button.isFnKey && !button.sub.innerHTML) {
                button.letter.innerHTML = button.shift;
              }
            })
        } else {
            this.keyButtons.forEach( button => {
                if(!this.isFnKey && button.sub.innerHTML) {
                    button.sub.classList.remove('sub-active');
                    button.letter.classList.remove('sub-inactive');
                    if(!this.isCaps) {
                        button.letter.innerHTML = button.small;
                    } else if (this.isCaps) {
                        button.letter.innerHTML = button.shift;
                    }
                } else if (!button.isFnKey) {
                    if (this.isCaps) {
                        button.letter.innerHTML = button.shift;
                    } else {
                        button.letter.innerHTML = button.small;
                    }
                }
            })
        }
    }

    printOutput(keyObj, simb) {
        // console.log(simb)
        // return
        let curPos = this.output.selectionStart

        const left = this.output.value.slice(0, curPos)
        const right = this.output.value.slice(curPos)
        const fnButtonHandler = {
            Tab : () => {
                this.output.value = `${left}\t${right}`
                curPos += 1
            },
            ArrowLeft: () => {
                curPos = curPos - 1 >= 0 ? curPos - 1 : 0;
            },
            ArrowRight: () => {
                curPos += 1
            },
            ArrowUp: () => {
                const positionFromLeft = this.output.value.slice(0, curPos).match(/(\n).*$(?!\1)/g) || [[1]];
                curPos -= positionFromLeft[0].length;
            },
            ArrowDown: () => {
                const positionFromLeft = this.output.value.slice(curPos).match(/^.*(\n).*(?!\1)/) || [[1]];
                curPos += positionFromLeft[0].length + 1;
            },
            Enter: () => {
                this.output.value = `${left}\n${right}`;
                curPos++;
            },
            Delete: () => {
                this.output.value = `${left}${right.slice(1)}`;
            },
            Backspace: () => {
                this.output.value = `${left.slice(0, -1)}${right}`;
                curPos--;
            },
            Space: () => {
                this.output.value = `${left} ${right}`;
                curPos += 1;
            },
        }
        if (fnButtonHandler[keyObj.code]) {
            fnButtonHandler[keyObj.code]()
            // console.log('fun key: ', keyObj.code)
        } else if (!keyObj.isFnKey) {
            // console.log('simb: ', simb)  
            curPos += 1;
            this.output.value = `${left}${simb || ''}${right}`
        } 
        this.output.setSelectionRange(curPos, curPos);
    }
}
