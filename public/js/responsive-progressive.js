window.onload = () => {
    let img = document.querySelectorAll('.progressive'); 
    for(let i = 0; i < img.length; i++){
        imagine(img[i]);
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

function imagine(img){
    let imgSrc = img.dataset.src;   
    let sliceSize = 100 / img.dataset.percent;
    getFileSize(imgSrc, r => {
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