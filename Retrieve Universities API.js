async function retrieveUniversities()
{
    var apiUrl = `http://universities.hipolabs.com/search?country=Albania`;
    const Universities = await fetchUnis(apiUrl);

	const key = 'name';
	const distinctUniversities = [...new Map(Universities.map(item =>
  	[item[key], item])).values()];

	var existingUniversities = [];
	Xrm.WebApi.retrieveMultipleRecords("fisoft_university", "?$select=fisoft_name").then(
		function success(result) {
			for (var i = 0; i < result.entities.length; i++) {
				console.log(result.entities[i]);
				let universityNames = {};
				universityNames.name = result.entities[i].fisoft_name;
				existingUniversities.push(universityNames);
			}
			
			for( var i = 0; i < distinctUniversities.length; i++){
				var universityExists = false;
				// define the data to create new account
				var data =
				{
					"fisoft_name": distinctUniversities[i].name,
					"fisoft_country": distinctUniversities[i].country,
					"fisoft_alpha_two_code": distinctUniversities[i].alpha_two_code,
					"fisoft_domians": distinctUniversities[i].domains[0],
					"fisoft_webpages": distinctUniversities[i].web_pages[0]
				}
		
				for(var j = 0; j < existingUniversities.length; j++){
					if((existingUniversities[j].name).includes(data.fisoft_name)){
						universityExists = true;
						break;
					}
				}

				if(universityExists == false){
					// create record
					Xrm.WebApi.createRecord("fisoft_university", data).then(
						function success(result) {
							console.log("Account created with ID: " + result.id);
							// perform operations on record creation
						},
						function (error) {
							console.log(error.message);
							// handle error conditions
						}
					);
				}

			}
		},
		function (error) {
			console.log(error.message);
			// handle error conditions
		}
	);
}

async function fetchUnis(url){
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        return console.log(error);
    }
}