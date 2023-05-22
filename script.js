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
    constructor(data, metadata) {
        this.data = data;
        this.metadata = metadata;
        this.additionalDataFromBooksDB = additionalDataFromBooksDB;
        this.additionalMetadataFromBooksDB = additionalMetadataFromBooksDB;
        this.mergedData = this.setMergeData();
        this.mergedMetaData = this.setMergeMetaData();

        // HINT: below map can be useful for view operations ;))
        this.dataViewRef = new Map();

        Object.freeze(this.data);
        Object.freeze(this.metadata);

        this.render();
        this.live();
    }

    setMergeData() {
        const filteredData = this.data.map(item => item === null ? 0 : item);

        this.additionalDataFromBooksDB.forEach((item, index) => {
            for (const key in item) {
                if (item[key] === null) {
                    item[key] = 0;
                }
            }
            const filteredObj = filteredData[index];
            return Object.assign(item, filteredObj);
        });

        const totalData = [...this.data, ...this.additionalDataFromBooksDB];
        let tempDataObj = {};
        for (const item of totalData) {
            tempDataObj[item.title] = item;
        }
        return Object.values(tempDataObj);
    }
    setMergeMetaData() {
        const metadataIds = this.metadata.map(item => item.id);
        const filteredAdditionalMetadata = this.additionalMetadataFromBooksDB.filter(column => !metadataIds.includes(column.id));
        return [...this.metadata, ...filteredAdditionalMetadata];
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

        for (const column of this.mergedMetaData) {
            const cell = row.insertCell();
            cell.innerText = column.label;
        }
    }

    renderBody() {
        for (const dataRow of this.mergedData) {
            const row = this.body.insertRow();

            for (const column of this.mergedMetaData ) {
                const cell = row.insertCell();
                cell.classList.add(column.type);
                cell.innerText = dataRow[column.id];
            }
            // connect data row reference with view row reference
            this.dataViewRef.set(dataRow, row);
            console.log(this.dataViewRef);
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
        /* Commented as there is no need to have both solutions live */

        // const searchQuery = searchInputElement.value
        //
        // for (const dataRow of this.mergedData) {
        //     const viewRow = this.dataViewRef.get(dataRow);
        //     let match = false;
        //
        //     for (const column of this.mergedMetaData) {
        //         console.log(column,'column')
        //         if (dataRow[column.id] && dataRow[column.id].toString().includes(searchQuery)) {
        //             match = true;
        //             break;
        //         }
        //     }
        //     if (!match) {
        //         viewRow.classList.add('hidden');
        //     } else {
        //         viewRow.classList.remove('hidden');
        //     }
        // }

    }

    onSearchChange(event) {
        console.error(`Search btn pressed...`);
        const searchQuery = searchInputElement.value.trim().toLowerCase();

        for (const dataRow of this.mergedData) {
            const viewRow = this.dataViewRef.get(dataRow);
            const matchSearchRow = Object.values(dataRow).some(value =>
                String(value).toLowerCase().includes(searchQuery)
            );

            if (!matchSearchRow) {
                viewRow.classList.add('hidden');
            } else {
                viewRow.classList.remove('hidden');
            }
        }
    }

    onSearchReset(event) {
        console.error(`Resetting search...`);
        for (const row of this.body.rows) {
            row.classList.remove('hidden');
        }
        searchInputElement.value = '';

    }

    onColumnHideClick(event) {
        console.error(`Hiding first visible column from the left...`);

        for (const row of this.head.rows) {
            const firstHeadCell = row.cells[0];
            firstHeadCell.classList.toggle('hidden');
        }

        for (const row of this.body.rows) {
            const firstCell = row.cells[0];
            firstCell.classList.toggle('hidden');
        }
    }

    onColumnShowClick(event) {
        console.error(`Showing first hidden column from the left...`);

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

        for (const row of this.table.rows) {
            for (const cell of row.cells) {
                cell.classList.remove('hidden');
            }
        }
    }

    onMarkEmptyClick(event) {
        console.error(`Marking empty cells...`);

        for (const row of this.body.rows) {
            for (const cell of row.cells) {
                if (cell.classList.contains('number') && cell.innerText === '') {
                    cell.classList.add('bordered');
                }
            }
        }
    }

    onFillTableClick(event) {
        console.error(`Filling empty cells with data...`);

        for (const row of this.body.rows) {
            let quantityCell = null;
            let quantityValue = 0;
            let unitPrice = 0;
            let unitCell = null;
            let totalValue = 0;
            let totalCell = null;

            for (const cell of row.cells) {
                const headerCell = this.head.rows[0].cells[cell.cellIndex];
                if (cell.classList.contains('number')) {
                    switch (headerCell.innerText) {
                        case 'Total (Quantity * Unit price)':
                            totalCell = cell;
                            totalValue = Number(cell.innerText);
                            break;
                        case 'Quantity':
                            quantityCell = cell;
                            quantityValue = Number(cell.innerText);
                            break;
                        case 'Unit price':
                            unitCell = cell;
                            unitPrice = Number(cell.innerText);
                            break;
                    }
                }
            }

            const isUnitValid = !isNaN(unitPrice) && unitPrice !== 0;

            if (quantityCell && quantityValue === 0 && !isNaN(totalValue) && isUnitValid) {
                quantityCell.innerText = totalValue / unitPrice;
            }
            if (totalCell && totalValue === 0 && !isNaN(quantityValue) && isUnitValid) {
                totalCell.innerText = unitPrice * quantityValue;
            }
            if (unitCell && unitPrice === 0 && !isNaN(totalValue) && !isNaN(quantityValue)) {
                unitCell.innerText = totalValue / quantityValue;
            }
        }
    }

    onCountEmptyClick(event) {
        console.error(`Counting amount of empty cells...`);
        let emptyFields = 0;
        for (const row of this.table.rows) {
            for (const cell of row.cells) {
                if (cell.innerText === '') {
                    emptyFields++;
                }
            }
        }
        return alert(`Found ${emptyFields} empty cells.`);
    }

    onComputeTotalsClick(event) {
        console.error(`Computing summary totals...`);
        let totalSum = 0;

        for (const row of this.body.rows) {
            for (const cell of row.cells) {
                const headerCell = this.head.rows[0].cells[cell.cellIndex];
                if (cell.classList.contains('number') && headerCell.innerText === 'Total (Quantity * Unit price)') {
                    const cellValue = parseFloat(cell.innerText);
                    if (!isNaN(cellValue)) {
                        totalSum += cellValue;
                    }
                }
            }
        }
        return alert(`Sum of Total (Quantity * Unit price) equals: ${totalSum}`);
    }

    onFunctionsResetClick(event) {
        console.error(`Resetting all function...`);
        for (const row of this.body.rows) {
            const rowData = data[row.rowIndex - 1];
            for (const cell of row.cells) {
                const headerCell = this.head.rows[0].cells[cell.cellIndex];
                if (cell.classList.contains('number')) {
                    cell.classList.remove('bordered')
                    switch (headerCell.innerText) {
                        case 'Total (Quantity * Unit price)':
                            if (rowData.total_value === null) {
                                cell.innerText = "";
                            }
                            break;
                        case 'Quantity':
                            if (rowData.quantity === null) {
                                cell.innerText = "";
                            }
                            break;
                        case 'Unit price':
                            if (rowData.unit_price === null) {
                                cell.innerText = "";
                            }
                            break;
                    }
                }
            }
        }
    }
}

new Grid(data, metadata);

class TableSummary {
    constructor(data) {
        this.data = data;
        this.render();
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
        const columns = ['Author', 'Titles', 'Total Quantity', 'Total Revenue', 'Average Quantity', 'Average Unit Price'];
        for (const column of columns) {
            const cell = row.insertCell();
            cell.innerText = column;
        }
    }

    renderBody() {
        let groupedData = {};
        for (const dataRow of this.data) {
            if (!groupedData[dataRow.author]) {
                groupedData[dataRow.author] = [];
            }
            groupedData[dataRow.author].push(dataRow);
        }

        for (const [author, dataRows] of Object.entries(groupedData)) {
            const row = this.body.insertRow();

            const columns = [
                {label: 'Author', value: author},
                {label: 'Titles', value: dataRows.length},
                {label: 'Total Quantity', value: dataRows.reduce((acc, dataRow) => acc + (dataRow.quantity || 0), 0)},
                {label: 'Total Revenue', value: dataRows.reduce((acc, dataRow) => acc + (dataRow.total_value || 0), 0)},
                {label: 'Average Quantity', value: (dataRows.reduce((acc, dataRow) => acc + (dataRow.quantity || 0), 0) / dataRows.length).toFixed(2)}, {label: 'Average Unit Price', value: (dataRows.reduce((acc, dataRow) => acc + (dataRow.unit_price || 0), 0) / dataRows.length).toFixed(2)}
            ];

            for (const column of columns) {
                const cell = row.insertCell();
                cell.innerText = column.value;
            }
        }
    }
}

new TableSummary(data);