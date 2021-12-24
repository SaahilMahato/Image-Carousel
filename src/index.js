class Slider {
    constructor(container, wrapper, width, height) {

        // store arguments
        this.container = document.querySelector(container);
        this.wrapper = document.querySelector(wrapper);
        this.width = width;
        this.height = height;

        // create attributes needed for processing
        this.index = 0;
        this.images = this.wrapper.getElementsByTagName('img');
        this.pixelsPerInterval = 5;

        //create attributes needed for new elements
        this.rightButton;
        this.leftButton;
        this.radioGroup;
        this.radio = [];

        // call setup functions
        this.setContainerLayout();
        this.setWrapperLayout();
        this.addNavigationButtons();
        this.addIndicator();
        this.determineButtonStatus();
    }

    setContainerLayout = () => {
        this.container.style.width = this.width;
        this.container.style.height = this.height;
        this.container.style.overflow = 'hidden';
        this.container.style.position = 'relative';
    }

    setWrapperLayout = () => {
        this.wrapper.style.minWidth = '1000vw';
        this.wrapper.style.height = this.height;
        this.wrapper.style.position = 'absolute';
        this.wrapper.style.left = '-0px';

        for (let j=0; j<this.images.length; j++) {
            this.images[j].style.width = this.width;
            this.images[j].style.height = this.height;
            this.images[j].style.float = 'left';
        }
    }

    addNavigationButtons = () => {

        const styleButton = (button) => {
            button.style.position = 'absolute';
            button.style.top = parseInt(this.height)/2 - 20 + 'px';
            button.style.backgroundColor = 'rgba(0,0,0,0.5)';
            button.style.border = 'none';
            button.style.fontSize = '48px';
            button.style.color = 'white';
            button.style.borderRadius = '50%';
            button.style.paddingBottom = '3%';
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

    afterMoveStart = () => {
        this.rightButton.disabled = true;
        this.leftButton.disabled = true;
    }

    afterMoveStop = () => {
        this.rightButton.disabled = false;
        this.leftButton.disabled = false;
        this.radio[this.index].checked = true;
        this.determineButtonStatus();
    }

    addIndicator = () => {
        this.radioGroup = document.createElement('div');
        this.radioGroup.style.position = 'absolute';
        this.radioGroup.style.left = parseInt(this.width)/2.5 + 'px';
        this.radioGroup.style.bottom = 0 + 'px';

        for (let i=0; i<this.images.length; i++) {
            const newRadio = document.createElement('input');
            newRadio.type = 'radio';
            newRadio.name = 'indicator';
            newRadio.value = i;
            newRadio.style.margin = '0px 1px';

            newRadio.addEventListener('click', () => {
                let prev_index = this.index;
                this.index = parseInt(newRadio.value);
                let direction;

                const moveToIndicator = () => {
                    if (prev_index == this.index)
                        return;
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
    }
}


// driver code
const slider = new Slider('.carousel-container', '.carousel-image-wrapper', '500px', '300px');