import { Category } from "entities/Category";
import TreeModel from "tree-model";

const tree = new TreeModel();
export const getCategory = (categoryID: string): Category | undefined => {
    const root = tree.parse({
        value: "root",
        label: "root",
        children: categoryList
    });
    const node121 = root.first(node => {
        return node.model.value === categoryID
    });
    return node121?.model;
}

export const listCategories = () => {
    return categoryList;
}

export const categoryList: Category[] = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
];