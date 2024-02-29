export const convertProductString = Products => {
  let result = '';
  Products.forEach((pizza, index) => {
    const { title, optionsName, quantity } = pizza;
    const pizzaString = `${title}[${optionsName.join('/')}](${quantity}), `;
    if (result.length + pizzaString.length <= 50) result += pizzaString;
    else if (index > 0) result = result.slice(0, -2) + '...';
  });
  return result.slice(0, -2);
};
