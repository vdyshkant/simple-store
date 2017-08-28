describe("Store application test", function(){


  // Arrange
  var value;


  // beforeEach - func before ev test
  beforeEach(function(){
    value = 0;
  });

  // it - launch test func (Act)
  if("increaments value", function(){
    value++;

    expect(value).toEqual(1);
  })

  it("decrements value", function(){
    value--;
    expect(value).toEqual(-1);
    
  })
});
