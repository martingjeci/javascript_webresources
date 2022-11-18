
function OpenPage () {

    var pageInput = {
        pageType: "webresource",
        webresourceName: "fi_Html_test"
    };

    var navigationOptions = {
        target: 2,
        width: 400,
        height: 300,
        position: 1
    };

    Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
        function success() {
            window.close();
            // Handle dialog closed
            console.log("Inside Success");
        },
        function error() {
            Xrm.Navigation.openAlertDialog({ text: error.message });
        }
    );
    
}



function OpenPage () {
    //Xrm.Utility.openWebResource("fi_Html_test");
    //window.opener.Xrm.Page.openWebResource("fi_Html_test");
    window.opener.Xrm.Page.getAttribute("fi_Html_test").getValue();
}

function download() {
    var windowOptions = { height: 0, width: 0 };
    Xrm.Navigation.openWebResource("fisoft_html_webresource",windowOptions);
  }