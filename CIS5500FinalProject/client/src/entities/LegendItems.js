import LegendItem from "./LegendItem";

const LegendItems = [
    new LegendItem(
        "2,500+",
        "#003060",
        (num) => num >= 2500,
        "white"
    ),
    new LegendItem(
        "750 - 2,499",
        "#055C9D",
        (num) => num >= 750 && num < 2500,
        "white"
    ),
    new LegendItem(
        "200 - 749",
        "#0E86D4",
        (num) => num >= 200 && num <750,
    ),
    new LegendItem(
        "50 - 199",
        "#68BBE3",
        (num) => num >= 50 && num < 200,
    ),
    new LegendItem(
        "3 - 49",
        "#D4F1F4",
        (num) => num >= 3 && num < 49,
    ),
    new LegendItem(
        "0 - 2", 
        "#ffffff", 
        (num) => num >= 0 && num < 3,
    )
];

export default LegendItems;