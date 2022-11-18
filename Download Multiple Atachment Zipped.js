"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var Entities;
(function (Entities) {
    var ribbon;
    (function (ribbon) {

        let Form;
        function PrepareFile(selecteditems) {
            return __awaiter(this, void 0, void 0, function* () {
                let urls = [];
                let type = '';
                let FileName = [];
                let file_name = '';
                for(var i=0; i < selecteditems.length; i++){
                    let selecteditem = selecteditems[i];
                    let startBytes = 0;
                    let increment = 4194304;
                    const url = Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.2/fisoft_products(" + selecteditem.Id + ")/fisoft_file?size=full";
                    let finalContent = "";
                    let fileSize = 0;
                    let fileName = "";
                    while (startBytes <= fileSize) {
                        let result = yield makeRequest("GET", url, startBytes, increment);
                        let req = result.target;
                        if (req.status === 206) {
                            finalContent += JSON.parse(req.responseText).value;
                            startBytes += increment;
                            if (fileSize === 0) {
                                fileSize = req.getResponseHeader("x-ms-file-size");
                                fileName = req.getResponseHeader("x-ms-file-name");
                                let nameArray = fileName.split('.');
                                file_name =  nameArray[0] +'_'+ selecteditems[i].Id +'.'+ nameArray[1];
                            }
                        }
                        else {
                            break;
                        }
                    }
                    FileName.push(file_name);
                    type = fileName.split(".").pop();
                    urls.push(`data:${type};base64,${finalContent}`);
                    
                }
                Zip(urls,FileName);
                
            });
        }

        ribbon.PrepareFile = PrepareFile;

        function Zip(urls,FileName){
       
            
            let count = 0;
            const zip = new JSZip();

            for (var i = 0; i < urls.length; i++){
                //insert to zip file
                const filename = FileName[i];

                JSZipUtils.getBinaryContent(urls[i],(err,data)=> {
                    if(err){
                        throw err;
                    }

                    zip.file(filename,data,{binary:true})

                    count++;
                    if(count === urls.length){
                        zip.generateAsync({type:'blob'}).then((content) => {
                            const objectUrl = URL.createObjectURL(content);
                            const link = document.createElement('a');
                            link.download = 'attachments.zip';
                            link.href = objectUrl;
                            link.click();
                        })
                    }
                })
            }
              
        }

        function makeRequest(method, url, startBytes, increment) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open(method, url);
                    request.setRequestHeader("Range", "bytes=" + startBytes + "-" + (startBytes + increment - 1));
                    request.onload = resolve;
                    request.onerror = reject;
                    request.send();
                });
            });
        }
    
    })(ribbon = Entities.ribbon || (Entities.ribbon = {}));
})(Entities || (Entities = {}));