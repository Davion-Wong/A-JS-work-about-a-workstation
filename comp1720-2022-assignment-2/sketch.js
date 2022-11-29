let tr
let tumble_pos
let tumble_fric

function setup() {
  colorMode(HSB, 100);
  createCanvas(1280, 800);
  materialColor = color(0,0,100)
  knifeColor = "gray"
  machineBodyColor = color(60, 50, 50)
  machineMetalColor = color(60, 0, 80)
  machineHolderColor = color(0, 70, 80)
  machineControlColor = color(60,30,20)
  materialShape = []
  for(let i=0;i<500;i++) materialShape.push(70)
  knife_X = 350
  knife_Y = 100
  switched_on = false
  knife1Shape = []
  for(let i=0;i<40;i++){
    knife1Shape.push(Math.abs(40-2*i))
  }
  stars = []
  for(let i=0;i<40;i++){
    stars.push([random(830,1170),random(130,480), random(100), random(50)])
  }
  bubbles = []
  for(let i=0;i<5;i++){
    bubble = {
      x:350+random(30),
      y:500+50*i,
      r:5,
      xf:random(100),
    }
    bubbles.push(bubble)
  }
  splashes = []
  tr=random(PI)
  tumble_pos=1
  tumble_fric=1
}

function draw() {
  background(10, 30, 70);
  strokeWeight(1)
  fill(0,0,50)
  rect(0,700,width,100)
  drawWindow();
  drawFishTank();
  drawMaterial();
  drawMachine();
  drawKnife();
  drawTumble();
  if(keyIsDown(68) && knife_X<=700)
    knife_X += 1;
  if(keyIsDown(65) && knife_X>=312)
    knife_X -= 1;
  if(keyIsDown(87) && knife_Y>=30)
    knife_Y -= 1;
  if(keyIsDown(83) && knife_Y<=150)
    knife_Y += 1;
  
  textSize(28)
  textStyle('bold')
  strokeWeight(0)
  fill(0,0,80+10*sin(frameCount/30))
  text('Press \'T\'',140,610,)
  text('Press \'W\',\'A\',\'S\',\'D\'',720,610)
}

function drawWindow(){
  fill(50)
  rect(770,70,460,460)
  rect(700,500,600,50)
  fill(60,90,40)
  rect(800,100,400,400)
  strokeWeight(0)
  stars.forEach(function(s){
    fill(15,80,(80+sin(s[2]+frameCount/30)))
      ellipse(s[0],s[1],10+5*sin((s[3]+frameCount)/20),10+5*sin((s[3]+frameCount)/20))
  })
  strokeWeight(1)
  fill(10,70,50)
  rect(985,100,30,400)
  rect(800,285,400,30)
  fill(255)
}

function drawFishTank(){
  push()
  translate(0,-350)
  scale(1.5)
  fill(60,70,90)
  strokeWeight(3)
  ellipse(300,450,500,500)
  strokeWeight(0)
  rect(150,600,300,100)
  strokeWeight(3)
  line(150,650,150,700)
  line(450,650,450,700)
  line(150,700,450,700)
  fill(10, 30, 70)
  strokeWeight(0)
  rect(60,100,450,200)
  strokeWeight(3)
  stroke(0)
  strokeWeight(3)
  line(100,250,100,300)
  line(500,250,500,300)
  line(100,250,500,250)
  fill(60,70,90)
  stroke(100)
  
  if(bubbles.length<5){
    bubble = {
      x: 350+random(30),
      y: 650,
      r: 5,
      xf:random(100),
    }
    bubbles.push(bubble)
  }
  bubbles.forEach(function(b){
    ellipse(b.x,b.y,b.r,b.r)
    b.x+=sin((frameCount+b.xf)/50)/3
    b.y-=1
    b.r+=0.1
    if(b.y<350) bubbles.shift()
  })
  drawFish()
  stroke(0)
  pop()
}

function drawFish(){
  push()
  stroke(0)
  fill(100)
  translate(280,380)
  let t=1
  translate(-110*cos(frameCount/200),60*sin(frameCount/200))
  if((frameCount/200)%(2*PI)>PI==1) t=-1
  else t=1
  scale(t,1)
  triangle(-25,50,25,100,-25,150)
  fill(0)
  triangle(-10,65,25,100,-10,135)
  fill(100)
  triangle(0,0,0,200,100,100)
  fill(0)
  triangle(20,20,20,180,100,100)
  fill(100)
  triangle(40,40,40,160,100,100)
  fill(0)
  triangle(60,60,60,140,100,100)
  fill(100)
  ellipse(80,100,15,15)
  pop()
}

function keyPressed() {
  if (keyCode == 84) {
    switched_on = !switched_on;
    tr=random(PI)
  }
}

function drawMaterial() {
  fill(materialColor)
  strokeWeight(2)
  stroke(materialColor)
  for(let i=1;i<500;i++){
    stroke(materialColor)
    line(430+i,180-materialShape[i],430+i,180+materialShape[i])
    stroke(0)
    point(430+i,180-materialShape[i])
    point(430+i,180+materialShape[i])  
  }
  strokeWeight(3)
  line(430,110,430,250)
  line(930,110,930,250)
}

function drawKnife() {
  fill(machineMetalColor)
  stroke(2)  
  strokeWeight(3);
  
  rect(knife_X+80, 330, 250, 150)
  rect(knife_X+100, 300, 100, 250)
  rect(knife_X+120, knife_Y+200, 60, 250)
  
  strokeWeight(1)
  for(let i=0;i<60;i++){    
    if(i%5==0) {
        line(knife_X+105,340+3*i,knife_X+120,340+3*i)
    } else if(i%3==0){   
        line(knife_X+110,340+3*i,knife_X+120,340+3*i)
    }
    if(i%3==0){
      if(i==0)
        line(knife_X+120,knife_Y+311+i,knife_X+145,knife_Y+311+i)
      else if(i%5==0)
        line(knife_X+120,knife_Y+311+i,knife_X+140,knife_Y+311+i)
      else
        line(knife_X+120,knife_Y+311+i,knife_X+130,knife_Y+311+i)
    } else {
      line(knife_X+110,340+3*i,knife_X+120,340+3*i)
    }                      
  }
  
  
  fill(materialColor)
  beginShape();
  vertex(knife_X+150, knife_Y+150);
  vertex(knife_X+170, knife_Y+190);
  vertex(knife_X+170, knife_Y+230);
  vertex(knife_X+130, knife_Y+230);
  vertex(knife_X+130, knife_Y+190);
  vertex(knife_X+150, knife_Y+150);
  endShape();
  let splash
  for(let i=0;i<knife1Shape.length;i++){
    if(materialShape[knife_X+i-300] > knife_Y-30+knife1Shape[i]){
      if(switched_on){
        let t=knife_Y-30+knife1Shape[i]
        materialShape.splice(knife_X+i-300,1,t);
        knife_Y+=0.5;
        for(let j=0;j<50;j++){
          splash = {
            x: knife_X+i+130,
            y: knife_Y+150+knife1Shape[i],
            start: random(50),
            end: random(50,200),
            length: random(20,100),
            angle: random(2*PI),
            lightness: random(75,100),
          }
          splashes.push(splash)
        }
      }else{
        knife_Y+=1;
      }
    }
  }
  splashes.forEach(function(s){
    push()
    translate(s.x,s.y)
    rotate(s.angle)
    stroke(0,0,s.lightness)
    line(s.start, 0, s.start+s.length,0)
    s.start+=25
    pop()
  })
  splashes = splashes.filter((curr,index)=>{
                  if(curr.start<curr.end) return curr
                  })
  
  fill(machineControlColor)
  strokeWeight(0)
  push()
  translate(knife_X+265,400)
  scale(0.3)
  rotate(knife_X/10)
  for(let i=0;i<3;i++){
    rotate(2*PI/3)
    for(let j=0;j<2;j++){
      scale(-1,1)
      strokeWeight(0)
      beginShape();
      vertex(0, 0);
      vertex(17, 10);
      vertex(17, 160);
      vertex(90, 138);
      vertex(138, 80);
      vertex(173, 100);
      vertex(100, 173);
      vertex(0, 200);
      vertex(0, 0);
      endShape();
      strokeWeight(2)
      line(17,0,17,160)
      line(17,160,90,138)
      line(90,138,138,80)
      line(173,100,100,173)
      line(100,173,0,200)
      circle(0,170,80)
    }
  }
  circle(0,0,100)
  pop()
  push()
  strokeWeight(3)
  translate(knife_X+330,400)
  rect(0,-60,15,120)
  rect(15,-10+50*sin(knife_Y/5),30,20)
  pop()
}

function drawMachine() {
  stroke(0)
  fill(machineBodyColor)
  rect(1050, 300, 200, 400)
  rect(50, 100, 200, 200)
  rect(50, 300, 300, 400)
  rect(350, 650, 800, 50)
  rect(100, 350, 1100, 150)
  rect(110, 360, 280, 130)
  
  fill(machineMetalColor)
  rect(80,130,150,130)
  rect(130,380,240,90)
  
  rect(390, 370, 810, 25)
  rect(390, 420, 810, 20)
  rect(390, 450, 810, 10)
  strokeWeight(2)
  for(let i=0;i<750;i+=4){
    line(420+i,420,421+i,440)
  }
  
  
  rect(250, 150, 60, 60)
  rect(310, 120, 60, 120)
  
  fill(machineBodyColor)
  ellipse(180, 425,60,60)
  ellipse(110, 195,40,40)
  push()
  translate(180,195)
  rotate(-PI/4)
  rect(0,-10,80,20)
  ellipse(0, 0,70,70)
  rotate(-PI/2)
  rect(0,-8,60,16)
  line(30,-8,30,8)
  rotate(3*PI/4)
  ellipse(0, 0,30,30)
  fill(100)
  ellipse(0,0,25,25)
  pop()
  
  fill(machineControlColor)
  ellipse(180, 425,30,30)
  ellipse(110, 195,20,20)
  push()
  translate(260,425)
  fill(machineMetalColor)
  arc(0,0,50,50,-3*PI/2,0)
  fill(machineControlColor)
  rotate(-PI/4)
  rect(0,-4,50,8)
  ellipse(0,0,30,30)
  strokeWeight(0)
  fill(0,90,90)
  ellipse(6,0,6,6)
  pop()
  
  push()
  translate(180,425)
  stroke(0,80,80)
  line(5,0,15,0)
  stroke(100)
  strokeWeight(3)
  for(let i=0;i<8;i++){
    rotate(PI/4)
    line(20,0,22,0)
  }
  
  translate(160,0)
  fill(machineMetalColor)
  stroke(machineControlColor)
  strokeWeight(6)
  rect(-15,-30,30,60)
  fill(machineBodyColor)
  strokeWeight(2)
  rect(-8,-20,16,40)
  rect(-8,10,16,30)
  rect(-8,30,16,10)
  strokeWeight(4)
  line(-30,22,-24,22)
  line(-30,-22,-24,-22)
  pop()
  
  
  push()
  translate(370,180)
  let t=1
  let L0=[],L1=[]
  for(let i=0;i<3;i++){
    if(switched_on) t=i*2*PI/3+3*frameCount
    else t=i*2*PI/3+tr
    if(t%(2*PI)<PI){
      L0.push(cos(t))
    }else{
      L1.push(cos(t))
    }
  }
  for(let i=0;i<L0.length;i++){    
    drawHolder(L0[i])
  }
  fill(materialColor)
  rect(0, -20, 60, 40)
  fill(machineMetalColor)
  for(let i=0;i<L1.length;i++){    
    drawHolder(L1[i])
  }
  
  pop()
  
  
  fill(machineHolderColor)
  beginShape();
  vertex(1050, 300);
  vertex(1050, 270);
  vertex(1060, 270);
  vertex(1060, 210);
  vertex(1000, 210);
  vertex(1000, 140);
  vertex(1200, 140);
  vertex(1200, 270);
  vertex(1220, 270);
  vertex(1220, 300);
  vertex(1050, 300);
  endShape();
  rect(1080,180,95,70)
  rect(930,150,70,50)
  line(1080,270,1180,270)
  
  drawSwitch();
}

function drawHolder(t){  
    scale(1,t)
    beginShape();
    vertex(0, -20);
    vertex(0, -100);
    vertex(10, -100);
    vertex(10, -80);
    vertex(20, -80);
    vertex(20, -60);
    vertex(30, -60);
    vertex(30, -40);
    vertex(40, -40);
    vertex(40, -20);
    vertex(0, -20);
    endShape();
    scale(1,1/t)
}

function drawSwitch() {
  fill(0,0,80)
  rect(120, 560, 150, 80)
  stroke(0,0,100)
  strokeWeight(10)
  line(90, 580, 90,620)
  fill(machineBodyColor)
  ellipse(310, 600, 40, 40)
  if(!switched_on){
    fill(0,80,100)
    stroke(0,0,0)
    strokeWeight(3)
    rect(130, 570, 130, 60)
    line(160, 570, 160,630)
  }else{    
    fill(40,80,100)
    stroke(0,0,0)
    strokeWeight(3)
    rect(130, 570, 130, 60)
    line(230, 570, 230,630)
  }
}

function drawTumble(){
  push()
  strokeWeight(0)
  translate(1100+62.5*PI*tumble_pos*cos(frameCount/15)*tumble_fric,600)
  rotate(PI/2*cos(frameCount/15)*tumble_pos*tumble_fric)
  tumble_fric*=0.995
  fill(5,80,90)  
  beginShape();
  vertex(120, -33);
  vertex(70, -170);
  vertex(-70, -170);
  vertex(-120, -33);
  vertex(120, -33);
  endShape();
  ellipse(0,0,250,250)
  ellipse(0,-160,140,140)
  strokeWeight(3)
  arc(0,0,250,250,-0.3,PI+0.3)
  arc(0,-160,140,140,PI+0.3,2*PI-0.3)
  fill(0)
  ellipse(0,-110,30,30)
  strokeWeight(3)
  fill(100)
  arc(0,0,250,250,PI/8,7*PI/8,CHORD)
  fill(60,80,80)
  arc(0,0,250,250,PI/6,5*PI/6,CHORD)
  fill(100)
  rect(-20,40,40,30)
  
  for(let i=0;i<2;i++){
    
    line(120,-33,67,-179)
    fill(0,70,90)
    line(15,-110,50,-150)
    line(5,-130,50,-140)
    line(6,-125,50,-130)
    line(10,-220,10,-190)
    line(20,-180,10,-190)
    line(20,-180,30,-190)
    line(40,-210,30,-190)
    ellipse(43,-90,80,80)
    noFill()
    line(20,-58,20,10)
    line(30,40,20,10)
    line(50,40,30,40)
    line(50,40,80,30)
    line(100,20,80,30)
    line(60,-53,60,-10)
    line(60,-33,70,-50)
    line(80,-56,70,-50)
    fill(100)
    ellipse(25,-160,30,30)
    fill(0)
    ellipse(25,-160,15,15)
    scale(-1,1)
  }
  pop()
}

function mouseClicked() {
  push()
  translate(1100+62.5*PI*tumble_pos*cos(frameCount/15)*tumble_fric,600)
  rotate(PI/2*cos(frameCount/15)*tumble_pos*tumble_fric)
  if (dist(mouseX,mouseY,1100,440)<70) {
    tumble_pos=random(-1,1)
    tumble_fric=1
  }
  pop()
}

// when you hit the spacebar, what's currently on the canvas will be saved (as a
// "thumbnail.png" file) to your downloads folder
function keyTyped() {
  if (key === " ") {
    saveCanvas("thumbnail.png");
  }
}
