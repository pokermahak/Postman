console.log("hello");

let addedParamCount = 0;
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.children[0];
}
//hide the parameters box intially
let parametersBox = s = document.getElementById("parametersBox");
parametersBox.style.display = 'none';
//if user clicks on custom parameters ,hide the json box 
//if user clicks on json,hide the parameters
let paramsradio = document.getElementById("cm");
paramsradio.addEventListener('click', () => {
    document.getElementById('RequestJson').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

let jsonradio = document.getElementById("jn");
jsonradio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('RequestJson').style.display = 'block';
})
//if user clicks on + button,then it should show more parameters

let plus = document.getElementById("plus");
plus.addEventListener('click', () => {
    let params = document.getElementById("params");
    let string = `<div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="key${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="value${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
    </div>
    <button class="btn btn-primary deleteParam"> - </button>
    </div>`

    // Convert the element string to DOM node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // TODO: add a confirmation box to confirm parameter deletion
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;



})
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {

    //show please wait in response box
    document.getElementById('response').value = "PLEASE WAIT....data is getting fetched";

    //Fetching all the values that user has entered
    let url = document.getElementById('inputURL').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='same']:checked").value;

    //log all the value in console
    console.log(url);
    console.log(requestType);
    console.log(contentType);

    if (contentType == 'params') {
        Data = {};
        for (i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('key' + (i + 1)) != undefined) {
                let key = document.getElementById('key' + (i + 1)).value;
                let value = document.getElementById('value' + (i + 1)).value;

                Data[key] = value;

            }
        }
        Data = JSON.stringify(Data);
    }
    else {
        Data = document.getElementById('inputJson').value;
    }

    console.log(url);
    console.log(requestType);
    console.log(contentType);
    console.log(Data);

    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('response').innerHTML = text;
               
            });
    }

    else {
        fetch(url, {
            method: 'POST',
            body: Data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('response').innerHTML = text;
                
            });
        }

    });