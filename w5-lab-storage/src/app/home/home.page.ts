import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class HomePage {
  key: string = '';
  value: string = '';
  output: string = '';

  constructor(private storageService: StorageService) { }

  async setItem() {
    try {
      await this.storageService.set(this.key, this.value);
      this.output = `Set ${this.key}: ${this.value}`;
    } catch (error) {
      console.error('Error setting item', error);
      this.output = `Failed to set the item. Please try again.`;
    }
  }

  async getItem() {
    try {
      const value = await this.storageService.get(this.key);
      this.output = value ? `Get ${this.key}: ${value}` : `Item with key "${this.key}" not found.`;
    } catch (error) {
      console.error('Error getting item', error);
      this.output = `Failed to retrieve the item. Please try again.`;
    }
  }

  async removeItem() {
    try {
      const exists = await this.storageService.exists(this.key);
      if (!exists) {
        this.output = `Item with key "${this.key}" not found.`;
        return;
      }

      await this.storageService.remove(this.key);
      this.output = `Removed ${this.key}`;
    } catch (error) {
      console.error('Error removing item', error);
      this.output = `Failed to remove the item. Please try again.`;
    }
  }

  async clearStorage() {
    try {
      await this.storageService.clear();
      this.output = 'All items cleared';
    } catch (error) {
      console.error('Error clearing storage', error);
      this.output = `Failed to clear storage. Please try again.`;
    }
  }

  async getKeys() {
    try {
      const keys = await this.storageService.keys();
      this.output = keys.length ? `Keys: ${keys.join(', ')}` : 'No keys found.';
    } catch (error) {
      console.error('Error getting keys', error);
      this.output = `Failed to retrieve keys. Please try again.`;
    }
  }

  async getLength() {
    try {
      const length = await this.storageService.length();
      this.output = `Number of items: ${length}`;
    } catch (error) {
      console.error('Error getting length', error);
      this.output = `Failed to get the number of items. Please try again.`;
    }
  }

  async iterateStorage() {
    try {
      let items = '';
      await this.storageService.forEach((value, key, index) => {
        items += `${index}: ${key} = ${value}\n`;
      });
      this.output = items ? `Items:\n${items}` : 'No items found.';
    } catch (error) {
      console.error('Error iterating storage', error);
      this.output = `Failed to iterate over the items. Please try again.`;
    }
  }
}
