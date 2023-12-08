import { registerSheet } from 'react-native-actions-sheet';

import AttributesSheet from '../../screens/business/detailsTab/AttributesSheet';
import CategoriesSheet from '../../screens/business/detailsTab/CategoriesSheet';

registerSheet('categories-sheet', CategoriesSheet);
registerSheet('attributes-sheet', AttributesSheet);

export {};
