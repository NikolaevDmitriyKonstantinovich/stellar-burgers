import {
  addIngredient,
  burgerConstructorSlice,
  deleteIngredient,
  downIngredient,
  initialState,
  upIngredient
} from '../constructorSlice';

describe('constructorSlice reducers tests', () => {
  const ingredientTest = {
    _id: '643d69a5c3f7b9001cfa0944',
    name: 'Соус традиционный галактический',
    type: 'sauce',
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
  };
  const ingredientTestDelete = {
    ...ingredientTest,
    id: '012'
  };
  const ingredientTestReverse = {
    ...ingredientTest,
    id: '345'
  };

  const moveIngredientTestArray = [ingredientTestDelete, ingredientTestReverse];

  it('add ingredient', () => {
    const addI = addIngredient(ingredientTest);
    const reducer = burgerConstructorSlice.reducer(initialState, addI);
    //prepare id nanoid
    expect(reducer.constructorItems.ingredients).toEqual([
      expect.objectContaining({
        _id: ingredientTest._id,
        name: ingredientTest.name,
        type: ingredientTest.type,
        price: ingredientTest.price,
        image: ingredientTest.image,
        image_mobile: ingredientTest.image_mobile,
        image_large: ingredientTest.image_large
      })
    ]);
  });
  it('delete ingredient', () => {
    const initialDeleteState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredientTestDelete]
      },
      errorState: null,
      orderRequest: false,
      orderModalData: null,
      loading: false
    };
    const deleteI = deleteIngredient(ingredientTestDelete);
    const reducer = burgerConstructorSlice.reducer(initialDeleteState, deleteI);
    expect(reducer.constructorItems.ingredients).toHaveLength(0);
  });

  it('up ingredient', () => {
    const initialMoveUpTest = {
      constructorItems: {
        bun: null,
        ingredients: moveIngredientTestArray
      },
      errorState: null,
      orderRequest: false,
      orderModalData: null,
      loading: false
    };
    const moveUpI = upIngredient(1);
    const reducer = burgerConstructorSlice.reducer(initialMoveUpTest, moveUpI);
    expect(reducer.constructorItems.ingredients).toEqual([
      ingredientTestReverse,
      ingredientTestDelete
    ]);
  });
  
  it('down ingredient', () => {
    const initialMoveUpTest = {
      constructorItems: {
        bun: null,
        ingredients: moveIngredientTestArray
      },
      errorState: null,
      orderRequest: false,
      orderModalData: null,
      loading: false
    };
    const moveDownI = downIngredient(0);
    const reducer = burgerConstructorSlice.reducer(
      initialMoveUpTest,
      moveDownI
    );
    expect(reducer.constructorItems.ingredients).toEqual([
      ingredientTestReverse,
      ingredientTestDelete
    ]);
  });
});
