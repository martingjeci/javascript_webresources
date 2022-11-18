function targetAt_Visibility (executionContext) {
    try {
        var formType = Xrm.Page.ui.getFormType();

        //FormType = 1 means we are creating a record
        if(formType != 1){
            Xrm.Page.getControl("cdi_target").setDisabled(true);
        }
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}

