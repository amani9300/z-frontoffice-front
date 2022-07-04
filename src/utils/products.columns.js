export const PRODUCTS_COLUMNS = [
    {
        name: 'Barcode',
        selector: row => row.barcode,
    },
    {
        name: 'Reference',
        selector: row => row.reference,
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
        width: "300px"
    },
    {
        name: 'Quantity',
        selector: row => row.qty,
        sortable: true,
    },
    {
        name: 'Price DF',
        selector: row => row.price,
        sortable: true,
    },
    {
        name: 'Price TI',
        selector: row => row.price,
        sortable: true,
    },
    {
        name: 'Purchase Price',
        selector: row => row.purchasePrice,
        sortable: true,
    },
    {
        name: 'Measure',
        selector: row => row.measure,
        sortable: true,
    },
    {
        name: 'Category',
        selector: row => row.category,
        sortable: true,
    },
    {
        name: 'VAT',
        selector: row => row.vat,
        sortable: true,
    },
    {
        name: 'Brand',
        selector: row => row.brand,
        sortable: true,
    },
    {
        name: 'Supplier',
        selector: row => row.supplier,
        sortable: true,
    },
    {
        name: 'Color',
        selector: row => row.color,
        sortable: true,
    },
];