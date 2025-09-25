
function buttonValue(value)
{ 
    var input = "";
    var input = document.getElementById("numberInput");
    var acceptedInput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '=', '√'];
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
                alert("Invalid input");
                input.value = '';
            }
            else
            {
                var equalCount = 0
                var arrayValue = input.value.split('');
                arrayValue.forEach(eachCharater => {
                    acceptedInput.forEach(acceptedCharacter =>{
                        if (eachCharater == acceptedCharacter) {
                            equalCount++;
                        }
                    })
                });
                if (equalCount == 0) {
                    alert("Invalid input");
                    input.value = "";
                }
                else{
                input.value = eval(input.value);
                }
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

