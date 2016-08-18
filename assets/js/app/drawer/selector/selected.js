modules.app

.service('selector.selected', ['apis', 'Animator', 'canvas', function(apis, Animator, canvas) {
  var ctx = canvas.ctx;
  var state, backFader, strFader, close, location;
  var backCircle, backFadeSpeed;
  const BACKFADE = 0, STRFADE = 1, DISPLAY = 2;
  const FADE_SPEED = 0.03;

  this.init = function(_location) {
    location = _location;
    apis.updateStudent(); // TODO implement
    backCircle = {
      r: location.r,
      diff: (Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)) - location.r)
    };
    backFader = new Animator(backCircle, backFade);
    strFader = new Animator({}, fade);
    close = false;
    state = BACKFADE;
  };
  this.update = function() {
    switch(state) {
      case BACKFADE: {
        if( backFader.update(FADE_SPEED) ) {
          state = STRFADE;
        }
        break;
      }
      case STRFADE: {
        if( strFader.update(FADE_SPEED) ) {
          state = DISPLAY;
          setTimeout(function() {
            close = true;
          }, 2000);
        }
        break;
      }
      case DISPLAY: {
        return close;
      }
    }
  };
  this.draw = function(fadeoutProgress) {
    ctx.fillStyle = 'black';
    ctx.globalAlpha = 0.7 * backFader.t * (1 - fadeoutProgress);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = location.color;
    ctx.globalAlpha = 0.8 * (1 - fadeoutProgress);
    ctx.beginPath();
    ctx.arc(location.x, location.y, backCircle.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.globalAlpha = strFader.t * (1 - fadeoutProgress);
    ctx.textAlign = 'center';
    ctx.fillText('test', canvas.width / 2, canvas.height / 2);
    ctx.globalAlpha = 1;
  };

  function backFade(target, start, t, animator) {
    target.r = start.r + t * target.diff;
    return fade(target, start, t, animator);
  }

  function fade(target, start, t, animator) {
    if( t > 1 ) {
      t = 1;
      return true;
    }
  }
}]);
