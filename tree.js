export class Node {
  constructor(book) {
    this.book = book;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(book) {
    const newNode = new Node(book);
    if (!this.root) {
      this.root = newNode;
    } else {
      this._insertNode(this.root, newNode);
    }
  }

  _insertNode(node, newNode) {
    if (newNode.book.isbn < node.book.isbn) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }

  search(isbn) {
    return this._searchNode(this.root, isbn);
  }

  _searchNode(node, isbn) {
    if (!node) return null;
    if (isbn === node.book.isbn) return node.book;
    if (isbn < node.book.isbn) return this._searchNode(node.left, isbn);
    return this._searchNode(node.right, isbn);
  }

  _deleteNode(node, isbn) {
    if (!node) return { node: null, deleted: null }; // Retornar null si no se encuentra el libro

    if (isbn < node.book.isbn) {
      const result = this._deleteNode(node.left, isbn);
      node.left = result.node;
      return { node, deleted: result.deleted };
    } else if (isbn > node.book.isbn) {
      const result = this._deleteNode(node.right, isbn);
      node.right = result.node;
      return { node, deleted: result.deleted };
    } else {
      const deleted = node.book; // Guardar el libro eliminado

      if (!node.left && !node.right) return { node: null, deleted };
      if (!node.left) return { node: node.right, deleted };
      if (!node.right) return { node: node.left, deleted };

      const minRight = this._findMinNode(node.right);
      node.book = minRight.book;
      const result = this._deleteNode(node.right, minRight.book.isbn);
      node.right = result.node;
      return { node, deleted };
    }
  }

  delete(isbn) {
    const result = this._deleteNode(this.root, isbn);
    this.root = result.node;
    return result.deleted; // Retornar el libro eliminado
  }

  _findMinNode(node) {
    while (node && node.left) node = node.left;
    return node;
  }

  inorderTraversal() {
    const books = [];
    this._inorderTraversal(this.root, books);
    return books;
  }

  _inorderTraversal(node, books) {
    if (node) {
      this._inorderTraversal(node.left, books);
      books.push(node.book);
      this._inorderTraversal(node.right, books);
    }
  }
}
