document.getElementById('sliceSize').oninput = e => {
    document.getElementById("sliceSizeDisplay").innerText = e.currentTarget.value;
}

btnGetFile.onclick = () => {
    loadJPEGs();
}

loadJPEGs();


function getFileSize(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, true); // HEAD instead of GET
    xhr.onreadystatechange = function() {
        if (this.readyState == this.DONE) {
            callback(parseInt(xhr.getResponseHeader("Content-Length")));
        }
    };
    xhr.send();
}

// Return DataURL
function getFileChunk(url, percent, callback){
    getFileSize(url, r => {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.setRequestHeader("Range", "bytes=0-" + r * percent / 100);
        xhr.onload = r => {
            let read = new FileReader();
            read.readAsDataURL(r.currentTarget.response);
            read.onloadend = () => {
                callback(read.result);
            }
        }
        xhr.send();
    })
}

function addImage(data, container) {
    let image = document.createElement('img');
    image.setAttribute('src', data);
    image.onload = r => {
         if(container.firstChild) container.firstChild.remove();
         container.prepend(image);
    }
}

function loadJPEGs(){
    let percent = document.getElementById('sliceSize').value
    getFileChunk('./images/ny.jpg', percent, r => {
        addImage(r, document.getElementById('result'))
    });

    getFileChunk('./images/ny-progressive.jpg', percent, r => {
        addImage(r, document.getElementById('resultProgressive'))
    });  
};