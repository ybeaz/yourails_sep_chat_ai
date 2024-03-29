interface GetSetObjToLocalStorageType {
  (obj: any): void
}

/**
 * @description Function to getSetObjToLocalStorage
 * @see also: getDeletedObjFromLocalStorage
 * @example of getting item back: const itemValue = localStorage.getItem('itemName')
 * @example of deleting item: localStorage.removeItem('itemName');
 * @import import { getSetObjToLocalStorage } from '../../../Shared/getSetObjToLocalStorage'
 */

export const getSetObjToLocalStorage: GetSetObjToLocalStorageType = obj =>
  Object.keys(obj).forEach(key => localStorage.setItem(key, obj[key]))
