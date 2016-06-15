modules.app

.factory('Student', [function() {

  const SPEED_MAX = 0.75;
  const NAME_OFFSET_Y = 40;

  function Student(id, name, location, ctx, canvas) {
    this.id = id;
    this.name = name;
    this.location = location;

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.dx = Math.random() * SPEED_MAX - SPEED_MAX / 2;
    this.dy = Math.random() * SPEED_MAX - SPEED_MAX / 2;
  };

  Object.assign(Student.prototype, {
    r: 70
  });

  Student.prototype.update = function(ctx, canvas) {
    this.calcWallResistance(canvas);
    this.calcAirResistance();
    this.adjustSpeed();
    this.calcPosition();
  };

  // 壁にぶつかる
  Student.prototype.calcWallResistance = function(canvas) {
    if( this.x < this.r ) {
      this.dx += 0.15;
    }
    if( this.x > canvas.width - this.r ) {
      this.dx -= 0.15;
    }
    if( this.y < this.r ) {
      this.dy += 0.15;
    }
    if( this.y > canvas.height - this.r ) {
      this.dy -= 0.15;
    }
  }

  // 空気抵抗で減衰
  Student.prototype.calcAirResistance = function() {
    if( this.dx < 0 ) {
      this.dx += 0.0005;
    }
    if( this.dx > 0 ) {
      this.dx -= 0.0005;
    }
    if( this.dy < 0 ) {
      this.dy += 0.0005;
    }
    if( this.dy > 0 ) {
      this.dy -= 0.0005;
    }
  }

  // 速度制限をかける
  Student.prototype.adjustSpeed = function() {
    if( this.dx > SPEED_MAX ) this.dx = SPEED_MAX;
    if( this.dx < -SPEED_MAX ) this.dx = -SPEED_MAX;
    if( this.dy > SPEED_MAX ) this.dy = SPEED_MAX;
    if( this.dy < -SPEED_MAX ) this.dy = -SPEED_MAX;
  }

  // 速度を位置に反映
  Student.prototype.calcPosition = function() {
    this.x += this.dx;
    this.y += this.dy;
  }

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
  }

  Student.prototype.draw = function(ctx, canvas) {
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(50, 50, 50, 1)';
    ctx.fillText(this.name, this.x, this.y + NAME_OFFSET_Y);
  };

  return Student;
}]);
