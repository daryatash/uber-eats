class ScrollToTop {
    constructor() {
        this.scrollButtonElement = document.querySelector('[data-js-scroll-button]')
        this.bindEvents()
    }
    
    bindEvents() {
        this.scrollButtonElement.addEventListener('click', () => {
            window.scrollTo(0, 0)
        })
    }
}

export default ScrollToTop