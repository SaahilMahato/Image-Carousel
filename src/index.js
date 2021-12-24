/**
    * @param {string} container - name of the container with .for classname and # for id
    * @param {string} width - width of the container
    * @param {string} height - height of the container
*/

class Slider {
    constructor(container, width, height) {

        // store arguments
        this.container = document.querySelector(container);
        this.wrapper = this.container.querySelector('.carousel-image-wrapper');
        this.width = width;
        this.height = height;

        // create attributes needed for processing
        this.index = 0; // stores current index of navigator
        this.images = this.wrapper.getElementsByTagName('img');
        this.pixelsPerInterval = 10; // determines how much the images slides in pixels when a move method is called

        //create attributes needed for new elements
        this.rightButton;
        this.leftButton;
        this.radioGroup;
        this.radio = [];

        // call setup functions
        this.setupContainerLayout();
        this.setupWrapperLayout();
        this.setupNavigationButtons();
        this.setupIndicator();
    }

    setupContainerLayout = () => {
        this.container.style.width = this.width;
        this.container.style.height = this.height;
        this.container.style.overflow = 'hidden';
        this.container.style.position = 'relative';
    }

    setupWrapperLayout = () => {
        this.wrapper.style.minWidth = '1000vw'; // just needs to be large enough to hold all the images horizontally
        this.wrapper.style.height = this.height;
        this.wrapper.style.position = 'absolute';
        this.wrapper.style.left = '-0px'; // use negative because the left attribute is used to animate the images

        for (let j=0; j<this.images.length; j++) {
            this.images[j].style.width = this.width;
            this.images[j].style.height = this.height;
            this.images[j].style.float = 'left';
        }
    }

    setupNavigationButtons = () => {
        // function that sets same attributes for both buttons. used to reduce code repetition
        const styleButton = (button) => {
            button.style.position = 'absolute';
            button.style.top = parseInt(this.height)/2 - 32 + 'px'; // calculate on the basis of height
            button.style.backgroundColor = 'rgba(0,0,0,0.5)'; // set transparency
            button.style.border = 'none';
            button.style.fontSize = '48px';
            button.style.color = 'white';
            button.style.borderRadius = '50%';
            button.style.paddingBottom = '16px'; // hit and trial. works for all viewport sizes on my PC.
            button.addEventListener('mouseover', () => button.style.cursor = 'pointer');
        }

        // right button
        this.rightButton = document.createElement('button');
        this.rightButton.innerHTML = '&rarr;';
        this.rightButton.style.right = 5 + 'px';
        this.rightButton.addEventListener('click', () => this.next());
        styleButton(this.rightButton);
        this.container.appendChild(this.rightButton);

        // left button
        this.leftButton = document.createElement('button');
        this.leftButton.innerHTML = '&larr;';
        this.leftButton.style.left = 5 + 'px';
        this.leftButton.addEventListener('click', () => this.previous());
        styleButton(this.leftButton);
        this.container.appendChild(this.leftButton);
    }

    // functions that decides the visibility of the buttons based on the index we are in. called on object creation and each animation end 
    determineButtonStatus = () => {
        if (this.index === 0) {
            this.leftButton.style.display = 'none';
            this.rightButton.style.display = 'block';
        }
        else if (this.index === this.images.length - 1) {
            this.leftButton.style.display = 'block';
            this.rightButton.style.display = 'none';
        }
        else {
            this.leftButton.style.display = 'block';
            this.rightButton.style.display = 'block';
        }
    }

    // disable button after animation start
    afterMoveStart = () => {
        this.rightButton.disabled = true;
        this.leftButton.disabled = true;
    }

    // enable button and change radiobutton and nav button status after animation ends
    afterMoveStop = () => {
        this.rightButton.disabled = false;
        this.leftButton.disabled = false;
        this.radio[this.index].checked = true;
    }

    setupIndicator = () => {
        this.radioGroup = document.createElement('div');
        this.radioGroup.style.position = 'absolute';
        this.radioGroup.style.left = (parseInt(this.width)/2) - (this.images.length*15/2) + 'px'; // width/2 - width_of_indicator/2 
        this.radioGroup.style.bottom = '0px';

        for (let i=0; i<this.images.length; i++) {
            const newRadio = document.createElement('input');
            newRadio.type = 'radio';
            newRadio.name = 'indicator';
            newRadio.value = i; // value of each radio button is the index of image
            newRadio.style.margin = '0px 1px';

            newRadio.addEventListener('click', () => {
                let prev_index = this.index;
                this.index = parseInt(newRadio.value);
                let direction;

                const moveToIndicator = () => {
                    if (prev_index == this.index)
                        return; // if no change in index don't move
                    else if (prev_index > this.index)
                        direction = this.pixelsPerInterval;
                    else 
                        direction = -this.pixelsPerInterval;
                    
                    this.wrapper.style.left = (parseInt(this.wrapper.style.left) + direction) + 'px';

                    if (parseInt(this.wrapper.style.left) === (- this.index * parseInt(this.width))) {
                        clearInterval(nextInterval);
                        this.afterMoveStop();
                    }
                }
    
                const nextInterval = setInterval(moveToIndicator, 1);
                this.afterMoveStart();
            });

            this.radio.push(newRadio);
            this.radioGroup.appendChild(newRadio);
        }
        this.radio[0].checked = true;
        this.container.appendChild(this.radioGroup);
    }

    next = () => {
        if (this.index < this.images.length - 1) {
            this.index++;

            const moveLeft = () => {
                this.wrapper.style.left = (parseInt(this.wrapper.style.left) - this.pixelsPerInterval) + 'px';
                if (parseInt(this.wrapper.style.left) === (- this.index * parseInt(this.width))) {
                    clearInterval(nextInterval);
                    this.afterMoveStop();
                }
            }

            const nextInterval = setInterval(moveLeft, 1);
            this.afterMoveStart();
        }
        else {
            this.index = 0;

            const moveLeft = () => {
                this.wrapper.style.left = (parseInt(this.wrapper.style.left) + this.pixelsPerInterval*3) + 'px';
                if (parseInt(this.wrapper.style.left) === (- this.index * parseInt(this.width))) {
                    clearInterval(nextInterval);
                    this.afterMoveStop();
                }
            }

            const nextInterval = setInterval(moveLeft, 1);
            this.afterMoveStart();
        }
    }
    
    previous = () => {
        if (this.index > 0) {
            this.index--;

            const moveRight = () => {
                this.wrapper.style.left = (parseInt(this.wrapper.style.left) + this.pixelsPerInterval) + 'px';
                if (parseInt(this.wrapper.style.left) === (- this.index * parseInt(this.width))) {
                    clearInterval(nextInterval);
                    this.afterMoveStop();
                }
            }

            const nextInterval = setInterval(moveRight, 1);
            this.afterMoveStart();
        }
        else {
            this.index = this.images.length-1;

            const moveRight = () => {
                this.wrapper.style.left = (parseInt(this.wrapper.style.left) - this.pixelsPerInterval*3) + 'px';
                if (parseInt(this.wrapper.style.left) === (- this.index * parseInt(this.width))) {
                    clearInterval(nextInterval);
                    this.afterMoveStop();
                }
            }

            const nextInterval = setInterval(moveRight, 1);
            this.afterMoveStart();
        }
    }
}


// driver code
const slider = new Slider('.carousel-container', '900px', '500px');