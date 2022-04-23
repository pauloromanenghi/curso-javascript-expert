const TextProcessorFluentApi = require('./textProcessorFluentAPI')

class TextProcessorFacade {

    #textProcessorFluentApi
    constructor(text) {
        this.#textProcessorFluentApi = new TextProcessorFluentApi(text)
    }

    getPeopleFromPDF() {
        return this.#textProcessorFluentApi
                .extractPeopleData()
                .divideTextInColumns()
                .removeEmptyCharacters()
                .mapPerson()
                .build()
    }

}

module.exports = TextProcessorFacade