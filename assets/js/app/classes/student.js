modules.app

.factory('Student', ['$timeout', 'Locations', 'cursor', function($timeout, Locations, cursor) {

  const SPEED_MAX = 0.7;
  const NAME_OFFSET_Y = 40;

  function Student(id, name, location, ctx, canvas) {
    this.id = id;
    this.name = name;
    this.location = Locations.findById(location);

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.dx = Math.random() * SPEED_MAX - SPEED_MAX / 2;
    this.dy = Math.random() * SPEED_MAX - SPEED_MAX / 2;
  };

  Student.prototype.r = 70; // いまのところ定数

  Student.prototype.update = function(ctx, canvas) {
    this.calcWallResistance(canvas);
    this.calcAirResistance();
    this.adjustSpeed();
    this.applyRandomSpeed();
    this.calcPosition();
  };

  // 壁にぶつかる
  Student.prototype.calcWallResistance = function(canvas) {
    if( this.x < this.r ) {
      this.dx *= -1;
      this.x = this.r;
    }
    if( this.x > canvas.width - this.r ) {
      this.dx *= -1;
      this.x = canvas.width - this.r;
    }
    if( this.y < this.r ) {
      this.dy *= -1;
      this.y = this.r;
    }
    if( this.y > canvas.height - this.r ) {
      this.dy *= -1;
      this.y = canvas.height - this.r;
    }
  };

  // 空気抵抗で減衰
  Student.prototype.calcAirResistance = function() {
    if( this.dx < 0 ) {
      this.dx += 0.0001;
    }
    if( this.dx > 0 ) {
      this.dx -= 0.0001;
    }
    if( this.dy < 0 ) {
      this.dy += 0.0001;
    }
    if( this.dy > 0 ) {
      this.dy -= 0.0001;
    }
  };

  // 速度制限をかける
  Student.prototype.adjustSpeed = function() {
    if( this.dx > SPEED_MAX ) this.dx = SPEED_MAX;
    if( this.dx < -SPEED_MAX ) this.dx = -SPEED_MAX;
    if( this.dy > SPEED_MAX ) this.dy = SPEED_MAX;
    if( this.dy < -SPEED_MAX ) this.dy = -SPEED_MAX;
  };

  // ランダムに速度が突然変異する
  Student.prototype.applyRandomSpeed = function() {
    if( Math.floor(Math.random() * 1200) == 0 ) {
      this.dx = Math.random() * SPEED_MAX - SPEED_MAX / 2;
      this.dy = Math.random() * SPEED_MAX - SPEED_MAX / 2;
    }
  };

  // 速度を位置に反映
  Student.prototype.calcPosition = function() {
    if( this.on ) return;
    this.x += this.dx;
    this.y += this.dy;
  };

  // お互いにぶつかった時の反発
  Student.prototype.calcEachResistance = function(target) {
    if( this === target ) return;

    var distance = {
      x: target.x - this.x,
      y: target.y - this.y
    };

    distance.r = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));

    var amp = this.r + target.r - distance.r;

    if( amp < 0 ) return;

    this.dx -= calcResistance(distance.x);
    this.dy -= calcResistance(distance.y);

    function calcResistance(distance) {
      return Math.sign(distance) * Math.pow(amp, 2) * 0.0015;
    }
  };

  Student.prototype.checkMouse = function() {
    var that = this;

    var onCircle = Math.pow(this.x - cursor.x, 2) + Math.pow(this.y - cursor.y, 2) < Math.pow(this.r, 2);
    if( onCircle ) {
      this.on = true;

      if( !this.timer ) {
        this.timer = $timeout(function() {
          that.open = true;
          that.timer = null;
        }, 500);
      }
    } else {
      this.open = this.on = false;

      if( this.timer ) {
        $timeout.cancel(this.timer);
        this.timer = null;
      }
    }

    return this.open;
  };

  Student.prototype.draw = function(ctx, canvas, open) {
    ctx.globalAlpha = open && !this.open ? 0.2 : 0.7 ;
    ctx.fillStyle = this.location.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = 'rgba(250, 250, 250, 1)';
    ctx.fillText(this.name, this.x, this.y + NAME_OFFSET_Y);
  };

  return Student;
}]);
