vadd = p5.Vector.add;
vsub = p5.Vector.sub;
vmult = p5.Vector.mult;
vdiv = p5.Vector.div;
vdot = p5.Vector.dot;
vcross = p5.Vector.cross;
vequals = (left, right) => {
     return left.equals(right);
};
var lag_vd = 0;
var lag_vc = 0;
var lag_mx = 0;
var lag_my = 0;
var vd_history = [];
var vc_history = [];

function rotate_about_vector(v, k, theta) {
     let s = Math.sin(theta);
     let c = Math.cos(theta);
     return vadd(vadd(vmult(v, c), vmult(vcross(k, v), s)), vmult(k, vdot(k, v) * (1 - c)));
}

function setup() {
     createCanvas(192e1, 108e1);
     background(0);
     fill(255);
     noStroke();
     frameRate(60);
     pixelDensity(1);
     fractal();
}

function data_log(vd, vc) {
     fill(0, 0, 0, 255);
     rect(0, 108e1, 192e1, -100);
     vd_history.push(vd / 5);
     vc_history.push(vc / 5);
     if (vd_history.length > 192e1) {
          vd_history.shift();
          vc_history.shift();
     }
     for (let i = 0; i < vd_history.length; i++) {
          vdi = vd_history[vd_history.length - i - 1];
          vci = vc_history[vd_history.length - i - 1];
          if (vdi > -49) {
               fill(128, 0, 255);
               rect(i, 108e1 + vdi - 50, 3, 3);
          }
          if (vci > -49) {
               fill(128, 128, 128);
               rect(i, 108e1 + vci - 50, 3, 3);
          }
     }
}

function fractal(mx, my, vd, vc) {
     let P1 = [mx, my, 128, 0, 255];
     let P2 = [width - mx, height - my, 255, 255, 255];
     PS = [];
     choices = [P1, P2];
     P = P1;
     loadPixels();
     for (let i = 0; i < (frameRate() * 1e5 / 60 | 0); i++) {
          random_P = random(choices);
          px = P[0];
          py = P[1];
          dx = random_P[0] - px;
          dy = random_P[1] - py;
          s = Math.hypot(dx, dy);
          s += .00001;
          nx = px + dx / 2 - dy / 2 - vd * dy / s + vc * dx / s | 0;
          ny = py + dx / 2 + dy / 2 + vd * dx / s + vc * dy / s | 0;
          r = (P[2] + random_P[2]) / 2;
          g = (P[3] + random_P[3]) / 2;
          b = (P[4] + random_P[4]) / 2;
          P = [nx, ny, r, g, b];
          k = 4 * (width * ny + nx);
          pixels[k] = r;
          pixels[k + 1] = g;
          pixels[k + 2] = b;
          pixels[k + 3] = 255;
          my = height / 2 + (nx - width / 2);
          mx = width / 2 - (ny - height / 2);
          k = 4 * (width * my + mx);
          pixels[k] = r;
          pixels[k + 1] = g;
          pixels[k + 2] = b;
          pixels[k + 3] = 255;
     }
     updatePixels();
}

function draw() {
     vx = movedX;
     vy = movedY;
     dx = pmouseX - width / 2;
     dy = pmouseY - height / 2;
     r = dx * dx + dy * dy;
     vd = 500 * (vx * dx + vy * dy) / r;
     vc = 500 * (vx * dy - vy * dx) / r;
     vd = lag_vd = vd * .1 + lag_vd * .9;
     vc = lag_vc = vc * .1 + lag_vc * .9;
     mx = lag_mx = mouseX * .3 + lag_mx * .7;
     my = lag_my = mouseY * .3 + lag_my * .7;
     lag = vd * vd + vc * vc;
     background(0, 0, 0, lag);
     fractal(mx, my, vd, vc);
     data_log(vd, vc);
}