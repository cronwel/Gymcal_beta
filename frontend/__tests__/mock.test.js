


function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchHobbies = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(this.foods), 2000)
  });
};

describe('mocking', () => {
  test('mocks a reg function', () => {
    const getDataFromAPI = jest.fn();
    getDataFromAPI('information');
    expect(getDataFromAPI).toHaveBeenCalled();
    expect(getDataFromAPI).toHaveBeenCalledWith('information');
  });
  test('can create new person', ()=> {
    const customer = new Person('Ellen', ['tacos', 'kisses']);
    expect(customer.name).toBe('Ellen');
  });
  test('can fetch foods', async () => {
    const customer = new Person('Jeffrey', ['burritos', 'Lopez']);
    customer.fetchHobbies = jest.fn().mockResolvedValue(['enchilada', 'J-Lo']);
    const hobbies = await customer.fetchHobbies();
    expect(hobbies).toContain('enchilada');
    
  })
});