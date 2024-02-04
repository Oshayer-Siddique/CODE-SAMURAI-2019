function printTree(node, prefix = "", isLast = true) {
    console.log(prefix + (isLast ? "└── " : "├── ") + node[0]);
    prefix += isLast ? "    " : "│   ";

    for (let i = 0; i < node[1].length; i++) {
        const child = node[1][i];
        const isLastChild = i === node[1].length - 1;
        printTree(child, prefix, isLastChild);
    }
}

const tree = [
    "root",
    [
        ["a", []],
        ["b", [
            ["p", []],
            ["q", [
                ["r", []],
                ["s", []],
            ]],
        ]],
        [
            "d",
            [
                ["e", []],
                ["f", [
                    ["h", []],
                    ["i", []],
                ]],
                ["g", []],
            ],
        ],
    ],
];

printTree(tree);
