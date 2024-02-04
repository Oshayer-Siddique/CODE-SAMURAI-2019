def print_tree(node, prefix="", is_last=True):
    print(prefix + ("└── " if is_last else "├── ") + node[0])
    prefix += "    " if is_last else "│   "

    for i, child in enumerate(node[1]):
        is_last_child = i == len(node[1]) - 1
        print_tree(child, prefix, is_last_child)

tree = [
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
]

print_tree(tree)
