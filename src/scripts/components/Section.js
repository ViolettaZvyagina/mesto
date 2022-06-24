export default class Section {
  constructor({renderer}, containerSelector) {
    this._containerSelector = containerSelector;
    this._renderer = renderer;  
  }

  renderItems(initialArray) {
    initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  addItemAppend(element) {
    this._containerSelector.append(element);
  }

  addItemPrepend(element) {
    this._containerSelector.prepend(element);
  }
}