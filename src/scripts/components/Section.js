export default class Section {
  constructor({data, renderer}, containerSelector) {
    this._initialArray = data;
    this._containerSelector = containerSelector;
    this._renderer = renderer;  
  }

  renderItems() {
    this._initialArray.forEach((item) => {
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