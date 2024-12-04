import { action, computed, makeObservable, observable } from "mobx";

interface Item {
  title: string;
  id: string;
  date: Date;
  made: boolean;
}

class Store {
  list: Item[] = [];

  constructor() {
    makeObservable(this, {
      list: observable,
      addItem: action.bound,
      removeItem: action.bound,
      changeMadeProperty: action.bound,
      count: computed,
    });
  }

  addItem = (item: Item) => {
    const newArr = this.list.concat(item).sort((a, b) => +a.date - +b.date);
    this.list = newArr;
  };

  removeItem = (id: string) => {
    this.list = this.list.filter((item) => item.id !== id);
  };

  changeMadeProperty = (id: string) => {
    const newArr = this.list.map((item) =>
      item.id === id ? { ...item, made: !item.made } : item,
    );
    this.list = newArr;
  };

  get getListItems() {
    return this.list;
  }

  get count() {
    return this.list.length;
  }
}

export default new Store();
