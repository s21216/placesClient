import { registerSheet } from 'react-native-actions-sheet';

import AttributesSheet from '../../screens/business/businessDetails/AttributesSheet';
import CategoriesSheet from '../../screens/business/businessDetails/CategoriesSheet';

registerSheet('categories-sheet', CategoriesSheet);
registerSheet('attributes-sheet', AttributesSheet);

export {};
