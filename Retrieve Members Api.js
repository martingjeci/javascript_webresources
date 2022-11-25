var accountKey;

async function retrieveTotalMembers(executionContext)
{
    var formContext = executionContext.getFormContext();

    if (!accountKey) {
		LoadSettings();
	}
	var segmentId = getSegmentId();
    var url = `https://dev-eus-segmentation-api.azurewebsites.net/segment/totalrecords/${accountKey}/${segmentId}`;
    var getMembers = await fetchMembers(url);
	if (getMembers !== undefined){
		var totalMembers = getMembers.totalRecords;
    	formContext.getAttribute("cdi_members_count").setValue(totalMembers);
	}
    
}

async function fetchMembers(url){
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        return console.log(error);
    }
}

function LoadSettings() {
	var globalContext = Xrm.Utility.getGlobalContext ? Xrm.Utility.getGlobalContext() : Xrm.Page.context;

	var serverUrl = globalContext.getClientUrl();
	var retrieveReq = new XMLHttpRequest();
	retrieveReq.open('GET', serverUrl + '/webresources/cdi_settings', false);
	retrieveReq.onreadystatechange = function () {
		if (retrieveReq.readyState === 4 /* complete */) {
			if (retrieveReq.status === 200) {
				//Success
				var xmlDoc = CreateXmlDoc(retrieveReq.responseText);

				accountKey = SelectNodeValue(xmlDoc, 'accountkey');
			}
		}
	};
	retrieveReq.send();
}

function getSegmentId() {
	var value = Xrm.Page.data.entity.getId();

	var final_value = value.slice(value.indexOf('{') + 1, value.indexOf('}'));

	return final_value.toLowerCase();
}