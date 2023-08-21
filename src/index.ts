// let sales: number = 123_456_789 //can have underscore to separate large umbers
// let is_published: boolean = true;
// let course = 'TypeScript'; //we actually don't need to put in the type, it can infer from when we initialize it, so we need to if it's not initialized


// let level //Here, we haven't initialized the variable into a type, so we need to do that

// function render (document: any) {
//     console.log(document)
// }


//--------------------------------------ARRAYS--------------------------------------

// let numbers: number[] = [1,2,'3']; //this is a valid array, but what if we pass this through a function that expects only numbers? Like this, we will see an error b/c of 3, so:

// let numbers: number[] = [1,2,3] //OR numbers = [1,2,3]

// let numbers = [] This will set it to an 'any' array, which is a bit dangerous. So if it is initialized like this with [1,2,3], then numbers[1] comes back as 'any' type



// numbers.forEach(n => n.) //When we write the . after a variable, if we have properly initialized it with a type, the . will show us all the methods we can call on it


//--------------------------------------TUPLES--------------------------------------

//1, 'Mosh'
// let user: [number, string] = [1, 'Mosh'] // If we add a third element here, then it will have an error, or mix up the order of the array that doesn't match the types initialized
// Tuples are meant to be just two values, key value pairs basically


//--------------------------------------ENUM--------------------------------------

// const small = 1
// const medium = 2
// const large = 3

// or we can use an enum, PascalCase

// const enum Size {Small = 1, Medium, Large} //by default, the first member is given 0, next is 1, etc..

// let mySize: Size = Size.Medium
// console.log(mySize) //=> 2, and we can see our JavaScript file has changed a lot to account for this



//--------------------------------------FUNCTIONS--------------------------------------


// function calculateTax(income: number, taxYear = 2022): number { //this :number at the end here shows what type should be returned, so if we put 'a' in the return, there would be an error. Or void if no value to return
//                                                                     //If we put taxYear?, so making it optional, we actually can't run this because if it's not given then we are doing undefined < 2022, which doesn't make sense, so it is better to give it a default vaule instead
//     if (taxYear < 2022)
//         return income * 1.2
//     return income * 1.3
// }

// calculateTax(10_000, 2022); //Will have an error if we don't pass exactly 2 arguments, in JS we can pass more or less and it's fine but not in TS 




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


// let employee: {
//     readonly id: number,
//     name: string,
//     retire: (date: Date) => void
// } = {
//     id: 1, 
//     name: 'Mosh', 
//     retire: (date: Date) => {
//         console.log(date)
//     }
// }

// employee.id = 0 => this will give an error, as 'readonly' won't let us change the value
//Above is the format that we would pass for functions, specifically methods, to our object for employees.






//--------------------------------------ADVANCED TYPES--------------------------------------
//--------------------------------------ADVANCED TYPES--------------------------------------




//--------------------------------------TYPE ALIASES--------------------------------------
type Employee = {
    readonly id: number,
    name: string,
    retire: (date: Date) => void
}


let employee: Employee = {
    id: 1, 
    name: 'Mosh', 
    retire: (date: Date) => {
        console.log(date)
    }
}
//now we have the strcture needed to make a different kindsof employee objects without repeating the whole code every time, this is done through type alias



//--------------------------------------UNION ALIASES--------------------------------------

function kgToLbs(weight: number | string): number {
    // weight. => since we don't know if weight will be a number or string, we only get the methods available to both for this weight variable

    //Narrowing
    if (typeof weight === 'number') {
        //code blocks in TS are optional, but can have them
        //Here since we are specifiying that weight is a number, we have access to all number methods when we write weight.
        return weight * 2.2
    } else {
        //Now here, with weight. we see the string methods
        return parseInt(weight) * 2.2
    }
}

kgToLbs(10)
kgToLbs('10kg')





//--------------------------------------Intersection Types--------------------------------------

type Draggable = {
    drag: () => void
}

type Resizeable = {
    resize: () => void
}

type UIWidget = Draggable & Resizeable

let textBox: UIWidget = {
    drag: () => {},
    resize: () => {}
}




//--------------------------------------Literal Types--------------------------------------

//Literal (exact, specific) value, don't want it to anything else
type Quantity = 50 | 100;
let quantity: Quantity = 100;
type Metric = 'cm' | 'in';







//--------------------------------------Nullable Types--------------------------------------


function greet(name: string | null | undefined) {
    if (name)
        console.log(name.toUpperCase())
    else
        console.log('Hola!')
}

greet(null) // => this would not let our code run, can't use null/undefined, so to adjust for this, we have to make it acceptable in our params



//--------------------------------------Optional Chaining--------------------------------------

// type Customer = {
//     birthday: Date
// }

// function getCustomer(id: number): Customer | null | undefined {
//     return id === 0 ? null : {birthday: new Date()}
// }

// let customer = getCustomer(0)
// //optional property access operator
// console.log(customer?.birthday)


//now if we want to make the birthday key optional in our Customer object, and extract something from the birthday, let's say the year, we need to add a ? to birthday too
type Customer = {
    birthday?: Date
}

function getCustomer(id: number): Customer | null | undefined {
    return id === 0 ? null : {birthday: new Date()}
}

let customer = getCustomer(0)
//optional property access operator
console.log(customer?.birthday?.getFullYear())


//Optional Element access operator, which is this syntax to check for elements within arrays
//customers?.[0]

//Optional Call
let log: any = null
log?.('a') //Here, the function won't break now because it has the ?., so we get undefined instead of breaking. Otherwise, it has to be referencing a proper function



//--------------------------------------Nullish Coaelscing Operator--------------------------------------


//Here, we are setting speed to null first, until defined by the user
let speed: number | null = null

//In our object, we are going to set speed to whatever user has defined, but if not yet defined then 30
let ride = {
    //Falsy values = undefined, null, '', false, 0
    //This ?? below is the nullish coaelscing operator, basically making sure that users can put 0 and it not being a falsy value, it just checks for null/undefined
    speed: speed ?? 30
}




//--------------------------------------Type Assertions--------------------------------------

//without the as below, we wouldn't be able to do phone.value. This is type assertion, we are telling the code that we know more about this stuff than it does, so we can tell there is a value there 
//This doesn't convert the type to another type, this is for the compiler, just saying we know what this should be, program will crash though if there is no 'phone' as an HTML Input Element
let phone = document.getElementById('phone') as HTMLInputElement
phone.value

//Another syntax for this
// let phone = <HTMLInputElement> document.getElementById('phone')



//--------------------------------------Unknown Type--------------------------------------
//Let's assume our document can be multiple things. If we use all instead of unkonwn, we will never get an error for methods called onto document. TS just won't make any errors because it's all, but if we do unkonwn we can do type narrowing

let WordDocument = (message: string) => console.log(message)

function render(document: unknown) {

    if (typeof document === 'string') {
        //here we now have access to all string methods
        //typeof only works for string, boolean, number, simple things 
        document.toUpperCase() 
    }

    //if we want to create custom objects through clases, need to use instanceof
    if (document instanceof WordDocument) {

    }
}




//--------------------------------------Never Type--------------------------------------

// function processEvents() {
//     while(true) {
//         //read message from queue
//     }
   
// }

// processEvents()
// console.log('Hello') //This will never hit if processEvents just keeps running


function processEvents(): never {
    //never tells us this function never returns, need to allow 'unreachable code' in the config, and it'll say our console.log below is unreachable
    while(true) {
        //read message from queue
    }
   
}

processEvents()
console.log('Hello') //This will never hit if processEvents just keeps running