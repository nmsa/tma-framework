
function ValidInputs(){
    function validIntGreaterThanZero(value){
        //^pattern$ => using pattern between '^' and '$' means the complete word has to match the pattern and not just a substring
        let pattern = "^[0]*[1-9][0-9]*$"
        let regex = new RegExp(pattern);
        if(regex.test(value)){
            //regex matches
            return true
        }
        return false
    }

    function validIntGreaterOrEqualThanZero(value){
        //^pattern$ => using pattern between '^' and '$' means the complete word has to match the pattern and not just a substring
        let pattern = "^[0-9]+$"
        let regex = new RegExp(pattern);
        if(regex.test(value)){
            //regex matches
            return true
        }
        return false
    }

    function validFloatBetweenZeroAndOne(value){
        //^pattern$ => using pattern between '^' and '$' means the complete word has to match the pattern and not just a substring
        let pattern = "(^0((\\.?)|(\\.[0-9]*))$)|(^1((\\.?)|(\\.0*))$)"
        let regex = new RegExp(pattern);
        if(regex.test(value)){
            //regex matches
            return true
        }
        return false
    }

    function validFloat(value){
        //^pattern$ => using pattern between '^' and '$' means the complete word has to match the pattern and not just a substring
        let pattern = "^[0-9]+(\\.?)[0-9]*$"
        let regex = new RegExp(pattern);
        if(regex.test(value)){
            //regex matches
            return true
        }
        return false
    }

    function validStringOrDropDownSelection(value){
        //It just needs to exist and not be empty
        if(value === undefined || value === null || value === ""){
            return false
        }
        return true
    }

    function validDropDownMultipleSelection(value){
        //Value is an array and thereby must not be empty
        if(value.length === 0){
            return false
        }
        return true
    }

    function validTimeStamp(value){
        if(value === null)
            return false
        //Value is a input of type "datetime-local"
        let dateAndTime = value.split("T");
        if(dateAndTime.length === 2){
            let dateSplited = dateAndTime[0].split("-")
            let timeSplited = dateAndTime[1].split(":")
            //according to month verify if day is valid
            let month = parseInt(dateSplited[1])
            let day = parseInt(dateSplited[2])
            if(month <= 7){
                if(month % 2 === 0){
                    if(month === 2){
                        if(isLeapYear(parseInt(dateSplited[0]))){
                            if(day > 29){
                                return false
                            }  
                        }
                        else{
                            if(day > 28){
                                return false
                            }  
                        }
                    }
                    else{
                        if(day > 30){
                            return false
                        }
                    }   
                }
            }
            else{
                if(month % 2 === 1){
                    if(day > 30){
                        return false
                    }
                }
            }
            //verify time
            if(timeSplited[2] > 59){ //verify seconds
                return false
            }
        }
        else{
            return false
        }
        return true
    }

    //leap year => 366 days
    function isLeapYear(year){
        if(year % 4 === 0){
            if(year % 100 === 0){
                if(year % 400 === 0){
                    return true
                }
            }
            else{
                return true
            }
        }

        return false
    }

    return {validIntGreaterThanZero,validIntGreaterOrEqualThanZero,validFloatBetweenZeroAndOne,
        validStringOrDropDownSelection,validFloat,validDropDownMultipleSelection, validTimeStamp}
}

export default ValidInputs;