btnGetFileDecode.onclick = function(){
    let img = new Image;
    img.src = '/images/cracked_planet_4k-wide.jpg';
    img.decode().then(() => {
        result.appendChild(img)
    })
}


getimg.onclick = () => {
let img = new Image();
    img.src = '/images/cracked_planet_4k-wide.jpg';
    result.append(img);
}

    // -----------------------------------------------
// Change this to change revolution delay.
var revolutionTimeMs = 2000;

var angle = 0.0;
var dAnglePerMs = 360.0 / revolutionTimeMs;
var arrowElement = document.getElementById("arrow");
var done = false;

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

var lastTimestamp = 0;
function go(timestamp) {
  if (!lastTimestamp)
    lastTimestamp = timestamp;
  var deltaMs = timestamp - lastTimestamp;
  advanceArrow(deltaMs);

  lastTimestamp = timestamp;
  window.requestAnimationFrame(go);
}

window.requestAnimationFrame(go);