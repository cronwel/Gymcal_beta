describe('Baisc functional tests', () => {
    console.log('Initiate Tests...');

    test('Inputs related to type-',() => {
        var age = 100
       expect(1).toEqual(1);
       expect(age).toEqual(100);
    })

    test('Inputs related to range-', () => {
        const age = 200;
        expect(age).toBeGreaterThan(100);
    })
});