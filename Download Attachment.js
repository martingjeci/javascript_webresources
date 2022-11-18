
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

var FormNotificationLevel;
(function (FormNotificationLevel) {
    FormNotificationLevel[FormNotificationLevel["INFO"] = 0] = "INFO";
    FormNotificationLevel[FormNotificationLevel["WARNING"] = 1] = "WARNING";
    FormNotificationLevel[FormNotificationLevel["ERROR"] = 2] = "ERROR";
})(FormNotificationLevel || (FormNotificationLevel = {}));

var Entities;
(function (Entities) {
    var ribbon;
    (function (ribbon) {

        let Form;
        function PrepareFile(selecteditems) {
            return __awaiter(this, void 0, void 0, function* () {

                let selecteditem = selecteditems[0];
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
                        }
                    }
                    else {
                        break;
                    }
                }
                if (fileName != "") {
                    downloadBase64File(fileName.split(".").pop(), finalContent, fileName);
                }
                else {
                    let message = ("No attachment file to download for this record!");
                    FormNotification(message, FormNotificationLevel.INFO, "info_NoAttachment");
                }

            });
        }

        ribbon.PrepareFile = PrepareFile;

        function FormNotification(message, level, notificationId, autoClose = false, closeAfter = 10000) {
            Form.ui.setFormNotification(message, FormNotificationLevel[level], notificationId);
            if (autoClose) {
                setTimeout(function () {
                    Form.ui.clearFormNotification(notificationId);
                }, closeAfter);
            }
        }

        function downloadBase64File(contentType, base64Data, fileName) {
            const linkSource = `data:${contentType};base64,${base64Data}`;
            const downloadLink = document.createElement("a");
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
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
