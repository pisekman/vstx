const data = [
    {
        "title": "Day of the Dragon",
        "author": "Richard A. Knaak",
        "quantity": 10,
        "unit_price": 9,
        "total_value": null
    },
    {
        "title": "A Wizard of Earthsea",
        "author": "Ursula K. Le Guin",
        "quantity": null,
        "unit_price": 10,
        "total_value": 40
    },
    {
        "title": "Homeland",
        "author": "Robert A. Salvatore",
        "quantity": 8,
        "unit_price": null,
        "total_value": 96
    },
    {
        "title": "Canticle",
        "author": "Robert A. Salvatore",
        "quantity": 13,
        "unit_price": 23,
        "total_value": null
    },
    {
        "title": "Gamedec. Granica rzeczywistości",
        "author": "Marcin Przybyłek",
        "quantity": null,
        "unit_price": 25,
        "total_value": 50
    },
    {
        "title": "The Night Has Come",
        "author": "Stephen King",
        "quantity": 30,
        "unit_price": null,
        "total_value": 900
    },
    {
        "title": "The Sphinx",
        "author": "Graham Masterton",
        "quantity": 3,
        "unit_price": null,
        "total_value": 300
    },
    {
        "title": "Charnel House",
        "author": "Graham Masterton",
        "quantity": null,
        "unit_price": 20,
        "total_value": 60
    },
    {
        "title": "The Devils of D-Day",
        "author": "Graham Masterton",
        "quantity": 10,
        "unit_price": 16,
        "total_value": null
    }
];
const metadata = [
    {
        "id": "title",
        "type": "string",
        "label": "Title"
    },
    {
        "id": "author",
        "type": "string",
        "label": "Author"
    },
    {
        "id": "quantity",
        "type": "number",
        "label": "Quantity"
    },
    {
        "id": "unit_price",
        "type": "number",
        "label": "Unit price"
    },
    {
        "id": "total_value",
        "type": "number",
        "label": "Total (Quantity * Unit price)"
    }
];

const additionalDataFromBooksDB = [
    {
        "title": "Day of the Dragon",
        "author": "Richard A. Knaak",
        "genre": "fantasy",
        "pages": 378,
        "rating": 3.81,
    },
    {
        "title": "A Wizard of Earthsea",
        "author": "Ursula K. Le Guin",
        "genre": "fantasy",
        "pages": 183,
        "rating": 4.01,
    },
    {
        "title": "Homeland",
        "author": "Robert A. Salvatore",
        "genre": "fantasy",
        "pages": 343,
        "rating": 4.26,
    },
    {
        "title": "Canticle",
        "author": "Robert A. Salvatore",
        "genre": "fantasy",
        "pages": 320,
        "rating": 4.03,
    },
    {
        "title": "Gamedec. Granica rzeczywistości",
        "author": "Marcin Przybyłek",
        "genre": "cyberpunk",
        "pages": 364,
        "rating": 3.89,

    },
    {
        "title": "The Night Has Come",
        "author": "Stephen King",
        "genre": "post apocalyptic",
        "pages": 186,
        "rating": 4.55,
    },
    {
        "title": "The Sphinx",
        "author": "Graham Masterton",
        "genre": "horror",
        "pages": 207,
        "rating": 3.14,
    },
    {
        "title": "Charnel House",
        "author": "Graham Masterton",
        "genre": "horror",
        "pages": 123,
        "rating": 3.61,

    },
    {
        "title": "The Devils of D-Day",
        "author": "Graham Masterton",
        "genre": "horror",
        "pages": 243,
        "rating": "3.62",
    }
]
const additionalMetadataFromBooksDB = [
    {
        "id": "title",
        "type": "string",
        "label": "Title"
    },
    {
        "id": "author",
        "type": "string",
        "label": "Author"
    },
    {
        "id": "genre",
        "type": "string",
        "label": "Genre"
    },
    {
        "id": "pages",
        "type": "number",
        "label": "Pages"
    },
    {
        "id": "rating",
        "type": "number",
        "label": "Rating"
    }
];

const searchInputElement = document.body.querySelector('input.search-input');
const searchButtonElement = document.body.querySelector('button.search-go');
const searchResetElement = document.body.querySelector('button.search-reset');

const columnHideElement = document.body.querySelector('button.column-hide');
const columnShowElement = document.body.querySelector('button.column-show');
const columnResetElement = document.body.querySelector('button.column-reset');

const markButtonElement = document.body.querySelector('button.function-mark');
const fillButtonElement = document.body.querySelector('button.function-fill');
const countButtonElement = document.body.querySelector('button.function-count');
const computeTotalsButtonElement = document.body.querySelector('button.function-totals');
const resetFunctionButtonElement = document.body.querySelector('button.function-reset');

class Grid {
    constructor() {
        this.data = data;
        this.metadata = metadata;

        // HINT: below map can be useful for view operations ;))
        this.dataViewRef = new Map();

        Object.freeze(this.data);
        Object.freeze(this.metadata);

        this.render();
        this.live();
        console.log(this.dataViewRef)
    }

    render() {
        this.table = document.createElement('table');

        this.head = this.table.createTHead();
        this.body = this.table.createTBody();

        this.renderHead();
        this.renderBody();

        document.body.append(this.table);
    }

    renderHead() {
        const row = this.head.insertRow();

        for (const column of this.metadata) {
            const cell = row.insertCell();

            cell.innerText = column.label;
        }
    }

    renderBody() {
        for (const dataRow of this.data) {
            const row = this.body.insertRow();

            for (const column of this.metadata) {
                const cell = row.insertCell();
                cell.classList.add(column.type);
                cell.innerText = dataRow[column.id];
            }
            // connect data row reference with view row reference
            this.dataViewRef.set(dataRow, row);
        }
    }

    live() {
        searchButtonElement.addEventListener('click', this.onSearchGo.bind(this));
        searchInputElement.addEventListener('keydown', this.onSearchChange.bind(this));
        searchResetElement.addEventListener('click', this.onSearchReset.bind(this));

        columnHideElement.addEventListener('click', this.onColumnHideClick.bind(this));
        columnShowElement.addEventListener('click', this.onColumnShowClick.bind(this));
        columnResetElement.addEventListener('click', this.onColumnReset.bind(this));

        markButtonElement.addEventListener('click', this.onMarkEmptyClick.bind(this));
        fillButtonElement.addEventListener('click', this.onFillTableClick.bind(this));
        countButtonElement.addEventListener('click', this.onCountEmptyClick.bind(this));
        computeTotalsButtonElement.addEventListener('click', this.onComputeTotalsClick.bind(this));
        resetFunctionButtonElement.addEventListener('click', this.onFunctionsResetClick.bind(this));
    }

    onSearchGo(event) {
        console.error(`Searching...`);

        // const searchQuery = searchInputElement.value

        // hide rows that do not match the search query
        // for (let dataRow of this.data) {
        //     const viewRow = this.dataViewRef.get(dataRow);
        //     console.log(viewRow, 'vw')
        //     let match = false;

        //     for (let column of this.metadata) {
        //         if (dataRow[column.id] && dataRow[column.id].toString().includes(searchQuery)) {
        //             match = true;
        //             break;
        //         }
        //     }
        //     if (!match) {
        //         viewRow.classList.add('hidden');
        //     }
        // }

        const searchQuery = searchInputElement.value;

        for (const dataRow of this.data) {
            const viewRow = this.dataViewRef.get(dataRow);
            let match = false;

            for (const column of this.metadata) {
                if (dataRow[column.id] && dataRow[column.id].toString().includes(searchQuery)) {
                    match = true;
                    break;
                }
            }

            if (!match) {
                viewRow.classList.add('hidden');
            }
        }

    }

    onSearchChange(event) {
        console.error(`Search btn pressed...`);
    }

    onSearchReset(event) {
        console.error(`Resetting search...`);
        // clear any previous search results
        for (const row of this.body.rows) {
            row.classList.remove('hidden');
        }
    }

    onColumnHideClick(event) {
        console.error(`Hiding first visible column from the left...`);

        for (const row of this.head.rows) {
            const firstHeadCell = row.cells[0];
            firstHeadCell.classList.add('hidden');
        }

        for (const row of this.body.rows) {
            const firstCell = row.cells[0];
            firstCell.classList.add('hidden');
        }

        // for (const column of this.head.rows) {
        //     console.log(column, 'column')
        //     const firstHeadCell = column.cells[0]
        //     // console.log(firstHeadCell)
        //     firstHeadCell.classList.add('hidden');
        //     for (const row of this.body.rows) {
        //         const firstCell = row.cells[0];
        //         // console.log(row)
        //         firstCell.classList.add('hidden');

        //     }
        // }


    }

    onColumnShowClick(event) {
        console.error(`Showing first hidden column from the left...`);
        // for (const row of this.table.rows) {
        //     for (let i = 0; i < row.cells.length; i++) {
        //         const cell = row.cells[i];
        //         if (i === 0) {
        //             cell.classList.remove('hidden')
        //         } else {
        //             cell.classList.add('hidden')
        //         }
        //     }
        // }
        for (const row of this.table.rows) {
            for (const cell of row.cells) {
                cell.classList.add('hidden');
            }
            const firstCell = row.cells[0];
            firstCell.classList.remove('hidden');
        }
    }


    onColumnReset(event) {
        console.error(`Resetting column visibility...`);
        // for (const column of this.head.rows) {
        //     const firstHeadCell = column.cells[0]
        //     firstHeadCell.classList.remove('hidden');
        //     console.log(column)
        //     for (const row of this.body.rows) {
        //         const firstCell = row.cells[0];
        //         firstCell.classList.remove('hidden');
        //     }
        // }
        for (const row of this.table.rows) {
            for (let i = 0; i < row.cells.length; i++) {
                const cell = row.cells[i];
                cell.classList.remove('hidden')

            }
        }

    }

    onMarkEmptyClick(event) {
        console.error(`Marking empty cells...`);
    }

    onFillTableClick(event) {
        console.error(`Filling empty cells with data...`);
    }

    onCountEmptyClick(event) {
        console.error(`Counting amount of empty cells...`);
    }

    onComputeTotalsClick(event) {
        console.error(`Computing summary totals...`);
    }

    onFunctionsResetClick(event) {
        console.error(`Resetting all function...`);
    }
}

new Grid();