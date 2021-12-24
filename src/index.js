class Slider {
    constructor(container, wrapper, width, height) {

        this.containers = document.getElementsByClassName(container);
        this.wrappers = document.getElementsByClassName(wrapper);
        this.width = width;
        this.height = height;

        this.setContainerLayout();
        this.setWrapperLayout();

        
        
    }

    setContainerLayout = () => {
        for (let i=0; i<this.containers.length; i++) {
            this.containers[i].style.width = this.width;
            this.containers[i].style.height = this.height;
            this.containers[i].style.overflow = 'hidden';
        }
    }

    setWrapperLayout = () => {
        for (let i=0; i<this.wrappers.length; i++) {
            this.wrappers[i].style.width = '100vw';
            this.wrappers[i].style.height = this.height;

            const images = this.wrappers[i].getElementsByTagName('img');
            for (let j=0; j<images.length; j++) {
                images[j].style.width = this.width;
                images[j].style.height = this.height;
                images[j].style.float = 'left';
            }
        }
    }


}


// driver code
const slider = new Slider('carousel-container', 'carousel-image-wrapper', '500px', '300px');