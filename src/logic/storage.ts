import merge from 'ts-deepmerge';

export class Storage<T extends object> {
  key: string;
  defaultValue: T;

  constructor(key: string, defaultValue: T) {
    this.key = key;
    this.defaultValue = defaultValue;
  }

  async get(): Promise<T> {
    const item = (await chrome.storage.local.get(this.key))[this.key];
    if (!item) {
      return this.defaultValue;
    } else {
      return merge(this.defaultValue, item) as T;
    }
  }

  async set(value: T): Promise<void> {
    await chrome.storage.local.set({ [this.key]: value });
  }
}

export type Options = { directOpen: boolean };

export const optionsStorage = new Storage('options', { directOpen: true });
