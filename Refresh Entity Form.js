
function refreshSaveForm(){
    let isSaved = false;
    Xrm.Page.data.save().then(
        function() {
            isSaved = true;
            if(isSaved){
                window.location.reload(true);
            }
        },
        function() {
            console.log("error");
        }
    );
}


function refreshSaveForm(){
    
    Xrm.Page.data.save().then(
        function() {
            var Id = Xrm.Page.data.entity.getId();
            var idString = Id.slice(Id.indexOf('{') + 1, Id.indexOf('}'));
            var entityFormOptions = {};
            entityFormOptions["entityName"] = "fisoft_test";
            entityFormOptions["entityId"] = idString;
            Xrm.Navigation.openForm(entityFormOptions);
        },
        function() {console.log('error')}
    );
    
}