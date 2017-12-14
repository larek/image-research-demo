btnGetFileDecode.onclick = function(){
    let img = new Image;
    img.src = '/images/nebula.jpg';
    img.decode().then(() => {
        // result.appendChild(img)
        document.body.append(img);
    })
}

getimg.onclick = () => {
let img = new Image();
    img.src = '/images/nebula.jpg';
    // result.append(img);
    document.body.append(img);
}

    // -----------------------------------------------
// Change this to change revolution delay.
let revolutionTimeMs = 2000;

let angle = 0.0;
let dAnglePerMs = 360.0 / revolutionTimeMs;
let arrowElement = document.getElementById("arrow");
let done = false;

// Rotate the arrow.
function advanceArrow(deltaMs) {
  angle += dAnglePerMs * deltaMs;
  // On first full revolution, add the image.
  if (angle >= 360) {
    done = true;
  }
  while (angle >= 360) {
    angle -= 360;
  }
  arrowElement.style.transform = "rotate(" + angle + "deg)";
}

let lastTimestamp = 0;
function go(timestamp) {
  if (!lastTimestamp)
    lastTimestamp = timestamp;
  let deltaMs = timestamp - lastTimestamp;
  advanceArrow(deltaMs);

  lastTimestamp = timestamp;
  window.requestAnimationFrame(go);
}

window.requestAnimationFrame(go);