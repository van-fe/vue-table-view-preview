import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import category from './category';
import list from './list'

export function setupProdMockServer() {
  createProdMockServer([...category, ...list]);
}
