class Search {
    selectors = {
        root: '[data-js-root]',
        searchForm: '[data-js-search-form]',
        searchInput: '[data-js-search-input]',
        title: '[data-js-restaurant-title]',
        restaurantItem: '[data-js-restaurant-item]',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        this.searchFormElement = this.rootElement.querySelector(this.selectors.searchForm)
        this.searchInputElement = this.rootElement.querySelector(this.selectors.searchInput)
        this.titleElements = this.rootElement.querySelectorAll(this.selectors.title)
        this.restaurantItemElements = this.rootElement.querySelectorAll(this.selectors.restaurantItem)

        this.state = {
            restaurantsTitles: [...this.titleElements].map((title) => title.textContent.toLowerCase()),
            restaurantItems: [...this.restaurantItemElements],
            currentSearchQuery: '',
        }

        this.bindEvents()
    }

    searchInputChange = (event) => {
        const searchQuery = event.target.value.trim().toLowerCase()
        this.state.currentSearchQuery = searchQuery

        if (searchQuery.length > 0) {
            this.filter()
        } else {
            this.reset()
        }
    }

    filter() {
        this.state.restaurantItems.forEach((item, index) => {
            if (!this.state.restaurantsTitles[index].includes(this.state.currentSearchQuery)) {
                item.style.display = 'none'
            } else {
                item.style.display = ''
            }
        })
    }

    reset() {
        this.state.restaurantItems.forEach((item) => item.style.display = '')
    }

    searchFormSubmit = (event) => {
        event.preventDefault()
    }

    bindEvents() {
        this.searchFormElement.addEventListener('submit', this.searchFormSubmit)
        this.searchInputElement.addEventListener('input', this.searchInputChange)
    }
}

export default Search