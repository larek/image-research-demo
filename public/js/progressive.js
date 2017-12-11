window.onload = () => {
    let img = document.querySelectorAll('.progressive'); 
    for(let i = 0; i < img.length; i++){
        imagine(img[i]);
    }  
}

document.getElementById('sliceSize').oninput = e => {
    console.log(e.currentTarget.value)
    document.getElementById("sliceSizeDisplay").innerText = e.currentTarget.value;
}

function imagine(img){
    let imgSrc = img.dataset.src;   
    let sliceSize = 100 / img.dataset.percent;
    getFileize(imgSrc, r => {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', imgSrc, true);
        xhr.responseType = 'blob';
        xhr.setRequestHeader("Range", "bytes=0-" + r / sliceSize);
        xhr.onload = r => {
            let urlCreator = window.URL || window.webkitURL;
            let imageUrl = urlCreator.createObjectURL( r.currentTarget.response );
            img.src = imageUrl;
            // let read = new FileReader();
            // read.readAsDataURL(r.currentTarget.response);
            // read.onloadend = () => {
            //     img.src = read.result
            // }
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

function getFileSize(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, true); // Notice "HEAD" instead of "GET",
    //  to get only the header
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
                console.log(read);
                callback(read.result);
            }
        }
        xhr.send();
    })
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

btnGetFile.onclick = () => {
    loadJPEGs();
}

loadJPEGs();