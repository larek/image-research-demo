btnGetFileDecode.onclick = function(){
    let img = new Image;
    img.src = '/images/nebula.jpg';
    img.decode().then(() => {
        // result.appendChild(img)
        document.body.append(img);
    })
}
//todo попробуй сделать задержку между декодированием и выводом и покажи, что само по себе декодирование уже не занимает общий поток. а GNU тратися на то, чтобы пережать картинку из большого формата в маленький формат. О как!

getimg.onclick = () => {
let img = new Image();
    img.src = '/images/nebula.jpg';
    // result.append(img);
    document.body.append(img);
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