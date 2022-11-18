var MyForm = (function () {
    function MyForm() {
    }
    MyForm.OnLoad = function (executionContext) {
        var formContext = executionContext.getFormContext();
        var record;
        Xrm.WebApi.retrieveRecord("contact", "32227da8-9fdd-ec11-bb3d-000d3ade93e5", "?$expand=fisoft_test,fisoft_test2").then(
            function success(result) {
                console.log("Retrieved values: Name: " + result.firstname + ", Last Name: " + result.lastname + ", Lookup: "+ result.fisoft_test+ ", Lookup: "+ result.fisoft_test2);
                // perform operations on record retrieval
                record = result;
            },
            function (error) {
                console.log(error.message);
                // handle error conditions
            }
        );
        var data = {
            "firstname":"Martin",
            "jobtitle":"Software Developer",
            "telephone1":"0663657394"
        }
        Xrm.WebApi.updateRecord("contact", "32227da8-9fdd-ec11-bb3d-000d3ade93e5", data).then(
            function success(result){
                console.log(result);
            },
            function(error){
                console.log(error);
            }
        );
    };
    return MyForm;
}());



var MyForm = (function () {
    function MyForm() {
    }
    MyForm.OnLoad = function (executionContext) {
        var formContext = executionContext.getFormContext();
        var record;
        Xrm.WebApi.retrieveMultipleRecords("contact", "?$select=firstname&$expand=fisoft_test($select=fisoft_number)", 10).then(
            function success(result) {
                for (var i = 0; i < result.entities.length; i++) {
                    console.log(result.entities[i]);
                }
                record = result;
                // perform additional operations on retrieved records
            },
            function (error) {
                console.log(error.message);
                // handle error conditions
            }
        );
    };
    return MyForm;
}());
