import inquirer from "inquirer";

 //BANK ACCOUNT INTERFACE

interface BankAccount {
    accountNumber: number;
    balance: number;
    withdraw(amount:number): void
    deposit(amount:number): void
    checkBalance(): void
}

  // BANK ACCOUNT CLASS
class BankAccount implements BankAccount {
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

// DEBIT MONEY

withdraw(amount: number): void {
    if (this.balance >= amount) {
        this.balance -= amount;
        console.log(`you withdraw amount $${amount}. Current balance is $${this.balance}`);
    } else {
        console.log("You don't have enough $");
    }
}

// CREDIT MONEY 

deposit(amount: number): void {
    if (amount > 100) {
        amount -= 1; // $1 DOLLAR CHARGES FOR PER $100 DEPOSIT 
    } this.balance += amount ;
    console.log(`You deposit $${amount}. Current balance is $${this.balance}`);
}

checkBalance(): void {
    console.log(`Current balance is $${this.balance}`);
}

} 

// CUSTOMER CLASS

class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNo : number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNo: number, account: BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNo = mobileNo;
        this.account = account
    }
}

// CREATE BANK ACCOUNTS

const accounts: BankAccount[] = [
    new BankAccount (1020, 1000),
    new BankAccount (1021, 200),
    new BankAccount (1022, 200000)
];

// CREATE CUSTOMERS

const Customers: Customer[] = [
    new Customer ("Basirat", "Hassan", "Female", 25, +92-315-2219617, accounts[0]),
    new Customer ("Aqib", "Chandio", "Male", 30, +92-321-1233211, accounts[1]),
    new Customer ("Muhammad", "Younus", "Male", 70, +92-123-1234321, accounts[2]) 
]

// FUNCTION TO INTERACT WITH BANK ACCOUNT

async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Please provide your account number to proceed..."
        })

        const customer = Customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}`);
            const ans = await inquirer.prompt([{
                name: "Select",
                type: "list",
                message: "Please select the operation you want to perform...",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
            }]);

            switch (ans.Select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount you want to deposit..."
                    })
                    customer.account.deposit(depositAmount.amount);
                    break;

                case "Withdraw":
                        const withdrawAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: "Enter the amount you want to withdraw..."
                        })
                        customer.account.withdraw(withdrawAmount.amount);
                        break;
                        
                case "Check Balance":
                    customer.account.checkBalance();
                    break;

                case "Exit":
                    console.log("Exiting...");
                    console.log("Please visit again we will be waiting for you!");
                    return;
            }
        }      else {
            console.log("We will not recognized you. Please try again.")
        }
    } while(true)
}

service()