//Targeting header section node
const HTML_header = document.querySelector(".header");

//Circle constructor
class Circle {
  constructor(parent) {
    this.parent = parent;
    this.position = this.parent.createVector(
      this.parent.random(this.parent.width),
      this.parent.random(this.parent.height)
    );
    this.velocity = p5.Vector.random2D();
    this.radius = this.parent.random(0.5, 3);
    this.connection_radius = 160;
  }

  checkEdge() {
    if (this.position.x - 0 > this.parent.width || this.position.x + 0 < 0) {
      this.velocity.x *= -1;
    }
    if (this.position.y - 0 > this.parent.height || this.position.y + 0 < 0) {
      this.velocity.y *= -1;
    }
  }

  checkConnectable() {
    for (let i = 0; i < circles.length; i++) {
      if (circles[i] == this) continue;
      const distance = p5.Vector.dist(this.position, circles[i].position);
      if (distance < this.connection_radius) {
        this.parent.stroke(
          255,
          this.parent.map(distance, 0, this.connection_radius, 100, 0)
        );
        this.parent.line(
          this.position.x,
          this.position.y,
          circles[i].position.x,
          circles[i].position.y
        );
      }
    }
  }

  update() {
    this.checkEdge();
    this.checkConnectable();
    this.position.add(this.velocity);
  }

  render() {
    this.parent.ellipse(
      this.position.x,
      this.position.y,
      this.radius * 2,
      this.radius * 2
    );
  }
}

const header = (p) => {
  p.setup = () => {
    p.createCanvas(innerWidth, HTML_header.clientHeight);

    // last two numbers are the range of  maximum circles based of width of the screen
    const maxCircles = p.map(innerWidth, 280, 1920, 15, 70);
    circles = [];
    for (let i = 0; i < maxCircles; i++) {
      circles.push(new Circle(p));
    }

    p.fill(255, 100);
  };

  p.draw = () => {
    p.background(0,0,0);

    for (let i = 0; i < circles.length; i++) {
      circles[i].update();
      circles[i].render();
    }
  };
};

new p5(header, HTML_header);
