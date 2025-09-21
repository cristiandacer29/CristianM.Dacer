
function buttonValue(value)
{ 
    var input = "";
    var input = document.getElementById("numberInput");

    if(value =='CE')
    {
        input.value  =  "";
    }
    else if(value == 'C')
    {
        if (input.value == "Invalid input")
        {
            input.value = "";
        }
        else
        {
            input.value = input.value.slice(0, input.value.length-1)
        }
        
    }
    else if(value == '=')
    {
        if (input.value.charAt(0) == '√')
        {
            input.value = input.value.slice(1);
            console.log(input.value);
            input.value = Math.sqrt(parseInt(input.value));
        }
        try
        {
            if (input.value =='') {
                input.value = '';
            }
            else
            {
                input.value = eval(input.value);
            }
        }
        catch
        {
            alert("Invalid input");
            input.value = "";
        }
        
    }
    else
    {
        input.value += value;
    }
}

