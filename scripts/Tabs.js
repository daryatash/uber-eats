class Tabs {
    selectors = {
        root: '[data-js-tabs]',
        button: '[data-js-tabs-button]',
        content: '[data-js-tabs-content]',
    }

    stateClasses = {
        isActive: 'is-active',
    }

    attributes = {
        button: 'data-js-tabs-button',
        content: 'data-js-tabs-content',
        ariaSelected: 'aria-selected',
        ariaHidden: 'aria-hidden',
        tabIndex: 'tabindex',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        if (!this.rootElement) {
            return
        }
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content)

        this.activeButton = [...this.buttonElements].find((button) =>
            button.classList.contains(this.stateClasses.isActive)
        )
        if (this.activeButton) {
            this.currentIndex = [...this.buttonElements].indexOf(this.activeButton)
        } else {
            this.currentIndex = 0
            if (this.buttonElements.length > 0) {
                this.tabChange(this.buttonElements[0])
            }
        }

        this.bindEvents()
    }


    tabChange(currentButton) {
        const tabId = currentButton.getAttribute(this.attributes.button)
        const currentContent = this.rootElement.querySelector(`[${this.attributes.content}="${tabId}"]`)

        this.buttonElements.forEach((button) => {
            const isCurrent = button === currentButton

            button.classList.toggle(this.stateClasses.isActive, isCurrent)
            button.setAttribute(this.attributes.ariaSelected, isCurrent)
            button.setAttribute(this.attributes.tabIndex, isCurrent ? '0' : '-1')
        })

        this.contentElements.forEach((content) => {
            const isCurrent = content === currentContent

            content.classList.toggle(this.stateClasses.isActive, isCurrent)
            content.setAttribute(this.attributes.ariaHidden, !isCurrent)
        })

        this.currentIndex = [...this.buttonElements].indexOf(currentButton)
    }

    focusTab(index) {
        if (index < 0) {
            index = this.buttonElements.length - 1
        } else if (index >= this.buttonElements.length) {
            index = 0
        }

        const button = this.buttonElements[index]
        button.focus()
        this.tabChange(button)
    }

    onTabButtonClick = ({ currentTarget }) => {
        this.tabChange(currentTarget)
    }

    onKeyDown = (event) => {
        const { key, currentTarget } = event

        if (key === 'ArrowLeft') {
            this.focusTab(this.currentIndex - 1)
        }

        if (key === 'ArrowRight') {
            this.focusTab(this.currentIndex + 1)
        }
    }

    bindEvents() {
        this.buttonElements.forEach((button) => {
            button.addEventListener('click', this.onTabButtonClick)
            button.addEventListener('keydown', this.onKeyDown)
        })
    }
}

export default Tabs