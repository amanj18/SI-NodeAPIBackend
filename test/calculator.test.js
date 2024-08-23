import * as chai from "chai";
import { add , multiply } from "./calculator.js";

const expect = chai.expect;
const assert = chai.assert;

describe(" testing calculator",()=>{
    let x,y;
    beforeEach(()=>{
        x=5;
        y=10;
        console.log("before each test");
    }),
   afterEach(()=>{
       x=0;
       y=0;
       console.log("after each test");
   }),
   it('Adds Two Numbers', () => {
    //Act
    let actual = add(x,y)
    //Assert
    expect(actual).to.equal((x+y));
    }),
   it('Multiply Two Numbers', () => {
    //Act
    let actual = multiply(x,y)
    //Assert
    assert.equal(50,actual);
    });
});