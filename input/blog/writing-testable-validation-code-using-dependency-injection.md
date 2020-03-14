---
Author: norman
Published: 02/02/2011
Title: Writing Testable Validation Code Using Dependency Injection
Tags:
- article
- dependency injection
- mvc
- unit testing
RedirectFrom: writing-testable-validation-code-using-dependency-injection/index.html
---

**This article was submitted to the Aberdeen Developers .Net User Group by Norman Noble.**

The idea for writing this came about when I was discussing [ASP.Net MVC](http://www.asp.net/mvc) (Model View Controller) with an old friend Dave about a week ago. I was having a look at Microsoft's latest version having briefly looked at MVC when it first came out with version 3.5 of the .Net Framework. Dave's company had just successfully released their first commercial application written entirely in MVC and I was keen to hear his thoughts on things that he knew now that he wished he'd known at the start of the project. Dave told me that in the start they had followed the [NerdDinner tutorial](http://nerddinnerbook.s3.amazonaws.com/Intro.htm) and had adopted the patterns used by the tutorial. He also told me that he was particularly impressed with the way that the tutorial had handled its validation code and that they saw that as the way forward. I decided that the best way to get back into this stuff was as ever to start cutting some code.

The tutorial is easy enough to follow and is very good at explaining the basics of MVC so if MVC is something you are interested in I would thoroughly recommend going through the tutorial. It will give you all you need to get going ([Stack Overflow](http://stackoverflow.com/) can fill in the rest). One of the fundamental advantages MVC provides over standard ASP.Net development is that it makes your code easier to test. By testing I mean proper unit testing using a Framework like [NUnit](http://www.nunit.org/) or Visual Studios inbuilt MSTest. If you're new or have limited experience in writing unit tests I would recommend reading [the art of UNIT TESTING](http://artofunittesting.com/) by Roy Osherove. It's an excellent read with lots of really useful tips based on the experience of both failed and successful projects. When it comes to unit testing and [TDD](http://en.wikipedia.org/wiki/Test-driven_development) Roy really knows what he is talking about.

Getting back to the MVC tutorial, I followed it through section by section and eventually arrived at the section on validation. I was quite keen to see what was suggested as Dave had been particularly enthusiastic about how this example handled it. I was slightly disappointed to find that the validation was some simple schema based validation using partial classes on the existing LINQ to SQL classes. To give the article some credit it does explain quite thoroughly that schema based validation is not the greatest and should only be used in the simplest of cases where there are little or no business rules to be applied. You can see a full example of Schema based validation in [part 3](http://nerddinnerbook.s3.amazonaws.com/Part3.htm) of the tutorial.

A basic example looks something like this:

[![876f59b7-2636-4af8-b201-0447ad4fd6c0](http://www.aberdeendevelopers.co.uk/wp-content/uploads/876f59b7-2636-4af8-b201-0447ad4fd6c0_thumb.png)](http://www.aberdeendevelopers.co.uk/wp-content/uploads/876f59b7-2636-4af8-b201-0447ad4fd6c0.png)

```csharp
partial class Customer
{
    public bool IsValid()
    {
        bool isValid = true;

        if (Age < 18)
        {
            isValid = false;
        }

        return isValid;
    }
}
```

This got me to thinking about what I didn't like about this particular method of performing validation and more importantly how I'd prefer to see it being done. In my opinion most validation is part of the business rules of a system and as such should be stored in the Business Layer of the application. Also having the validation in the Data Access Layer creates a dependency on the Data Store when creating unit tests which prevent your tests from being fully robust and subject to change should the data in the data store change.

A test for the code above may look something like:

```csharp
[TestMethod]
public void Customer_Over18_IsValid()
{
    //Arrange
    Customer cs = CustomerRepository.GetCustomer(1);

    //Act
    bool isValid = cs.IsValid();

    //Assert
    Assert.IsTrue(isValid);
}
```

So as mentioned above this unit test is dependant on a Data Store (in this case a repository) which could be subject to change. This could then potentially break the unit test even though neither the validation functionality nor the Customer object have not changed.

The way I prefer to get round this is to create a validation class for each Entity in the business layer that contains a method that allows me to pass in the entity to be validated. This solves the two problems that I have by moving the validation code into the Business Layer allowing you to centralise all validation code instead of having some in the DAL and some in the BLL. It also removes the dependency on the actual entities as when writing your tests you can create stub objects that use the primary objects as base classes. You can then use these stubs in your unit tests assured that the validation functionality is being properly tested and will not be subject to breaking should your Data Store or its functionality change.

A basic example of this would be:

```csharp
public class CustomerValidator : ICustomerValidator
{
    public static bool IsValid(Customer cs)
    {
        bool isValid = true;

        if (cs.Age < 18)
        {
            isValid = false;
        }

        return isValid;
    }
}
```

This method completely separates the validation code from any dependencies as they can be injected in through the method call.

A test for the code above would look something like this:

```csharp
[TestMethod]
public void Customer_Over18_IsValid()
{
    //Arrange
    StubCustomer scs = new StubCustomer("Norman", "Aberdeen", 31);

    //Act
    bool isValid = CustomerValidator.IsValid(scs);

    //Assert
    Assert.IsTrue(isValid);
}
```

In the example above the StubCustomer class has been created which has the Customer class as a base class. As the creation of the item under test is now controlled the unit test is far more robust and is only concerned with the functionality it is supposed to be testing. Therefore the only thing that will break this test is a change in the functionality of Customer which is what you would expect.

There are variations of the example above. For instance you may prefer to "inject" the dependency through a property setter instead. The above example is simply the way I prefer to do it.
