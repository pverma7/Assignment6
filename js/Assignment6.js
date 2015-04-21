function MenuChoice()
{
    if (document.getElementById("menu").value == "Add a New Customer")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Change Ship-To Address")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else
    {
    document.getElementById("section1").style.visibility = "hidden";
    document.getElementById("section2").style.visibility = "hidden";
    document.getElementById("section3").style.visibility = "visible";
    }
}

function CreateCustomer()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
 
    //Collect Customer data from web page
    var customerid = document.getElementById("custid").value;
    var customername = document.getElementById("custname").value;
    var customercity = document.getElementById("custcity").value;
 
    //Create the parameter string
    var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername +'","City":"' + customercity + '"}';
 
    //Checking for AJAX operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);
        }
    }
 
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcustomer);
}

function OperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("custresult").innerHTML = "The operation was successful!"
    }
    else
    {
        document.getElementById("custresult").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}

function ChangeOrder()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
 
    //Collect Order data from web page
    var orderid = document.getElementById("ordid").value;
    var ordername = document.getElementById("ordname").value;
    var orderaddress = document.getElementById("ordaddress").value;
    var ordercity = document.getElementById("ordcity").value;
    var orderzip = document.getElementById("ordzip").value;

 
    //Create the parameter string
    var neworder = '{"OrderID":"' + orderid + '","ShipName":"' + ordername +'","ShipAddress":"' + orderaddress + '","ShipCity":"' + ordercity + '","ShipPostcode":"' + orderzip + '"}';
     
    //Checking for AJAX operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OrderResult(result);
        }
    }
 
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(neworder);
}

function OrderResult(output)
{
    if (output == 1)
    {
        document.getElementById("orderresult").innerHTML = "The operation was successful!"
    }
    else
    {
        document.getElementById("orderresult").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}

function DeleteCustomer()
{
    confirm("Are you sure?");
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
    
    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
    
    url += document.getElementById("custid2").value;
 
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            DeleteOutput(output);
        }
    }
 
    //Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function DeleteOutput(output)
{
    if (output.DeleteCustomerResult.WasSuccessful == 1)
    {
        document.getElementById("deleteresult").innerHTML = "The operation was successful!"
    }
    else
    {
        document.getElementById("deleteresult").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}