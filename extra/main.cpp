#include <iostream>
#include <vector>

class TreeNode {
public:
    std::string value;
    std::vector<TreeNode> children;

    TreeNode(const std::string& val, const std::vector<TreeNode>& kids = {})
        : value(val), children(kids) {}
};

void printTree(const TreeNode& node, const std::string& prefix = "", bool isLast = true) {
    std::cout << prefix;
    std::cout << (isLast ? "└──" : "├──");
    std::cout << node.value << std::endl;

    const std::string newPrefix = prefix + (isLast ? "    " : "│   ");

    for (size_t i = 0; i < node.children.size() - 1; ++i) {
        printTree(node.children[i], newPrefix, false);
    }

    if (!node.children.empty()) {
        printTree(node.children.back(), newPrefix, true);
    }
}

int main() {
    TreeNode root("root", {
        {"a", {}},
        {"b", {
            {"p", {}},
            {"q", {
                {"r", {}},
                {"s", {}},
            }},
        }},
        {"d", {
            {"e", {}},
            {"f", {
                {"h", {}},
                {"i", {}},
            }},
            {"g", {}},
        }},
    });

    printTree(root);

    return 0;
}
