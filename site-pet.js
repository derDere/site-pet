function createSitePet(gfx) {
  if (!gfx) {
    gfx = 'sprite';
  }

  const ANI = {
    IDEL1: 0,
    IDEL2: 1,
    IDEL3: 2,
    RIGHT: 3,
    DOWN: 4,
    LEFT: 5,
    UP: 6,
    PET: 7,
    SLEEP: 8
  };

  var ele = document.createElement("div");

  ele.style.position = 'fixed';
  ele.style.width = '64px';
  ele.style.height = '64px';
  //ele.style.backgroundColor = '#f0f';
  ele.style.backgroundImage = `url(gfx/${gfx}.png)`;
  ele.style.backgroundRepeat = 'no-repeat';
  ele.style.backgroundPosition = '0px 0px';

  document.body.appendChild(ele);

  const MaxFrame = 8;
  var anim = 0;
  var frame = 0;
  var sleep = 0;
  var x = -64;
  var moving = false;
  var y = Math.floor(Math.floor(window.innerHeight / 64) / 2) * 64;

  ele.style.top = `${y}px`;
  ele.style.left = `${x}px`;
  ele.style.transition = 'top 1200ms, left 1200ms';

  var setAnim = (a) => {
    frame = 0;
    anim = a;
  };

  var update = () => {
    let bgX = -64 * frame;
    let bgY = -64 * anim;
    let pos = `${bgX}px ${bgY}px `;
    ele.style.backgroundPosition = pos;
    frame += 1;
    if (frame >= MaxFrame) {
      if (sleep > 0) {
        sleep -= 1;
        moving = false;
        setAnim(ANI.SLEEP);
      } else {
        if (((Math.round(Math.random() * 100000) % 2) == 0) && (x >= 0)) {
          let a = (Math.round(Math.random() * 100000) % 5) - 2;
          if (a < 0) a = 0;
          moving = false;
          setAnim(a);

        } else if (((Math.round(Math.random() * 100000) % 8) != 0) || (x < 0)) {
          let d = Math.round(Math.random() * 100000) % 4;
          let sx = 0;
          let sy = 0;
          let a = null;
          if (d == 3) {
            // up
            a = ANI.UP;
            sy = -64;
          } else if (d == 2) {
            // down
            a = ANI.DOWN;
            sy = 64;
          } else if (d == 1) {
            // left
            a = ANI.LEFT;
            sx = -64;
          } else {
            // right
            a = ANI.RIGHT;
            sx = 64;
          }
          if (x <= 0) {
            sx = 64;
            sy = 0;
            a = ANI.RIGHT;
          } else if (x >= (window.innerWidth - 64)) {
            sx = -64;
            sy = 0;
            a = ANI.LEFT;
          } else if (y <= 0) {
            sy = 64;
            sx = 0;
            a = ANI.DOWN;
          } else if (y >= (window.innerHeight - 64)) {
            sy = -64;
            sx = 0;
            a = ANI.UP;
          }
          x += sx;
          y += sy;
          moving = true;
          ele.style.top = `${y}px`;
          ele.style.left = `${x}px`;
          setAnim(a);

        } else {
          sleep = 5;
          moving = false;
          setAnim(ANI.SLEEP);
        }
      }
    }
    if ((!moving) && (sleep <= 0) && (anim != ANI.PET)) {
      ele.style.cursor = 'pointer';
    } else {
      ele.style.cursor = 'default';
    }
  };
  setInterval(update, 150);

  var click = () => {
    if ((!moving) && (sleep <= 0) && (anim != ANI.PET)) {
      setAnim(ANI.PET);
    }
  };
  ele.addEventListener('click', click);

  return ele;
}
