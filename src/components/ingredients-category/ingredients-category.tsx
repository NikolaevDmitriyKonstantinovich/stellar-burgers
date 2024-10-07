import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '../../services/store';
import { getConstructorItems } from '../../services/slices/constructorSlice';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  /** TODO: взять переменную из стора */
  const burgerConstructor = useSelector(getConstructorItems);
  console.log('burgerConstructor1', burgerConstructor);
  // const burgerConstructor = {
  //   bun: {
  //     _id: ''
  //   },
  //   ingredients: []
  // };

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = burgerConstructor;
    // const { bun, ingredients = [] } = burgerConstructor || {
    //   bun: null,
    //   ingredients: []
    // };
    const counters: { [key: string]: number } = {};
    ingredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = (counters[bun._id] || 0) + 2;
    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
