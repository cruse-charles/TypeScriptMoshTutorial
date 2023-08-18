let sales: number = 123_456_789 //can have underscore to separate large umbers
let is_published: boolean = true;
let course = 'TypeScript'; //we actually don't need to put in the type, it can infer from when we initialize it, so we need to if it's not initialized


let level //Here, we haven't initialized the variable into a type, so we need to do that

function render (document: any) {
    console.log(document)
}


//--------------------------------------ARRAYS--------------------------------------

// let numbers: number[] = [1,2,'3']; //this is a valid array, but what if we pass this through a function that expects only numbers? Like this, we will see an error b/c of 3, so:

let numbers: number[] = [1,2,3] //OR numbers = [1,2,3]

// let numbers = [] This will set it to an 'any' array, which is a bit dangerous. So if it is initialized like this with [1,2,3], then numbers[1] comes back as 'any' type



// numbers.forEach(n => n.) //When we write the . after a variable, if we have properly initialized it with a type, the . will show us all the methods we can call on it


//--------------------------------------TUPLES--------------------------------------

//1, 'Mosh'
let user: [number, string] = [1, 'Mosh'] // If we add a third element here, then it will have an error, or mix up the order of the array that doesn't match the types initialized
// Tuples are meant to be just two values, key value pairs basically


//--------------------------------------ENUM--------------------------------------

// const small = 1
// const medium = 2
// const large = 3

// or we can use an enum, PascalCase

const enum Size {Small = 1, Medium, Large} //by default, the first member is given 0, next is 1, etc..

let mySize: Size = Size.Medium
console.log(mySize) //=> 2, and we can see our JavaScript file has changed a lot to account for this



//--------------------------------------FUNCTIONS--------------------------------------


function calculateTax(income: number, taxYear = 2022): number { //this :number at the end here shows what type should be returned, so if we put 'a' in the return, there would be an error. Or void if no value to return
                                                                    //If we put taxYear?, so making it optional, we actually can't run this because if it's not given then we are doing undefined < 2022, which doesn't make sense, so it is better to give it a default vaule instead
    if (taxYear < 2022)
        return income * 1.2
    return income * 1.3
}

calculateTax(10_000, 2022); //Will have an error if we don't pass exactly 2 arguments, in JS we can pass more or less and it's fine but not in TS 




//--------------------------------------OBJECTS--------------------------------------

// let employee = {id: 1}
// employee.name = 'Mosh' => this would not work, in JS we can change the shapes of objects but not in TS.

// So we could set employee in the beginning to something better
// let employee: {
//     id: number,
//     name: string
// } = {id: 1}

// employee.name = 'Mosh'
//We can do the above but we will get an error when inititializing with id:1, because we've given the name property but haven't assigned that

// let employee: {
//     id: number,
//     name?: string   //we can either make this optional
// } = {id: 1, name: ''} //or we can initialize to an empty string

// employee.name = 'Mosh'


let employee: {
    readonly id: number,
    name: string,
    retire: (date: Date) => void
} = {
    id: 1, 
    name: 'Mosh', 
    retire: (date: Date) => {
        console.log(date)
    }
}

// employee.id = 0 => this will give an error, as 'readonly' won't let us change the value
//Above is the format that we would pass for functions, specifically methods, to our object for employees.