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

        //create attributes needed for new elements
        this.rightButton;
        this.leftButton;

        // call setup functions
        this.setContainerLayout();
        this.setWrapperLayout();
        this.addNavigationButtons();
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
            button.style.backgroundColor = 'rgba(0,0,0,0.7)';
            button.style.border = 'none';
            button.style.fontSize = '48px';
            button.style.color = 'white';
            button.style.borderRadius = '50%';
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

    next = () => {
        if (this.index < this.images.length - 1) {
            this.index++;

            const moveLeft = () => {
                this.wrapper.style.left = (parseInt(this.wrapper.style.left) - 1) + 'px';
                if (parseInt(this.wrapper.style.left) === (- this.index * parseInt(this.width))) {
                    clearInterval(nextInterval);
                    this.rightButton.disabled = false;
                }
            }

            const nextInterval = setInterval(moveLeft, 1);
            this.rightButton.disabled = true;
        }
    }
    
    previous = () => {
        if (this.index > 0) {
            this.index--;

            const moveRight = () => {
                this.wrapper.style.left = (parseInt(this.wrapper.style.left) + 1) + 'px';
                if (parseInt(this.wrapper.style.left) === (- this.index * parseInt(this.width))) {
                    clearInterval(nextInterval);
                    this.leftButton.disabled = false;
                }
            }

            const nextInterval = setInterval(moveRight, 1);
            this.leftButton.disabled = true;
        }
    }
}


// driver code
const slider = new Slider('.carousel-container', '.carousel-image-wrapper', '500px', '300px');