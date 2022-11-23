
function OpenPopUp () {

    var pageInput = {
        //this can be: entity list, entity record, dashboard, HTML web resource or custom page
        pageType: "webresource",
        //this is the logical name of the pageType we choose to open       
        webresourceName: "fisoft_html"  
    };

    var navigationOptions = {
        // target: 1 it opens the page inline , target: 2 it opens the page in a pop-up format
        target: 2,
        //width of the pop-up   
        width: 400,
        //height of the pop-up   
        height: 300,
        //position: 1 it opens the pop-up in the center of the screen, position: 2 opens the pop-up on the side of the screen
        position: 1   
    };

    //navigateTo is a build-in method by Microsoft
    Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
        function success() {
            // Handle dialog closed
            console.log("Inside Success");
        },
        function error() {
            Xrm.Navigation.openAlertDialog({ text: error.message });
        }
    );   
}







