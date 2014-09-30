define("util",[],function(){var e=["smiley","laughy","holy","geary","sunny","rady"];return{log:console.log.bind(console),sprites:{suzhiTitle:[0,60,100,30],gameOver:[0,0,210,25],getReady:[0,33,200,25],tapHelp:[0,100,180,165],suzhi:[253,0,47,47],suzhiHappy:[299,0,47,47],suzhiHurt:[345,0,47,47],smiley:[211,59,36,36],laughy:[202,106,48,48],holy:[190,160,70,70],geary:{1:[257,60,35,35],2:[306,60,35,35]},sunny:{1:[255,105,47,47],2:[313,105,47,47]},rady:{1:[258,170,53,53],2:[313,170,53,53]},fire:[[377,315,18,35],[360,315,18,35],[334,315,18,35],[308,315,18,35],[278,315,18,35],[248,315,18,35],[219,315,18,35],[194,315,18,35],[166,315,18,35],[141,315,18,35],[117,315,18,35],[97,315,18,35],[75,315,18,35],[52,315,18,35],[25,315,18,35],[0,315,18,35]],okayBtn:[0,270,62,20],playBtn:[0,292,62,20],score:[111,65,83,20]},spriteTest:function(e,t){var n=this.sprites.score;this.drawSprite(e,t,n,100,100),e.strokeStyle="white",e.strokeRect(100,100,n[2],n[3])},drawSprite:function(e,t,n,r,i,s){s=0,e.drawImage(t,n[0],n[1],n[2],n[3],r,i,n[2]-s,n[3]-s)},env:function(){return{viewport:{width:window.innerWidth,height:window.innerHeight},canTouch:this.canTouch()}},canTouch:function(){var e=document.createElement("div"),t="ontouchstart"in e;return t||(e.setAttribute("ontouchstart","return;"),t=typeof e["ontouchstart"]=="function"),e=null,t},getMouseAt:function(e,t){var n,r;return e.x&&e.y?(n=e.x-t.offsetLeft,r=e.y-t.offsetTop):(n=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft-t.offsetLeft,r=e.clientY+document.body.scrollTop+document.documentElement.scrollTop-t.offsetTop),{x:n,y:r}},randomPoint:function(e,t){return t=t||10,{x:Math.random()*(e.width-t-t)+t,y:Math.random()*(e.height-t-t)+t}},randomPointInBox:function(e,t,n,r){return{x:Math.random()*(n-e)+e,y:Math.random()*(r-t)+t}},randomNumber:function(e,t){return Math.floor(Math.random()*(e-t))+t},randomGoody:function(){return e[Math.floor(Math.random()*e.length)]},getAllGoodies:function(){return e},collided:function(e,t){var n,r,i,s,o,u,a,f;return n=e.x,i=e.x+e.w,o=e.y,a=e.y+e.h,r=t.x,s=t.x+t.w,u=t.y,f=t.y+t.h,!(n>s||r>i||o>f||u>a)},isPointInsideBox:function(e,t){return e.x1<=t.x&&e.x2>=t.x&&e.y1<=t.y&&e.y2>=t.y}}}),define("colors",[],function(){return{bg:"rgb(0,31,63)",text:"rgb(255,255,255)",suzhi:"rgb(255,220,0)",goody:"rgb(1,255,112)",baddie:"rgb(255,65,54)",title:"rgb(255,220,0)"}}),define("suzhi",["util","colors"],function(e,t){function u(t){this.x=0,this.y=0,this.size=47,this.yVelocity=0,this.sprite=t.sprite,this.coords=e.sprites.suzhi,this.moods={normal:e.sprites.suzhi,hurt:e.sprites.suzhiHurt,happy:e.sprites.suzhiHappy},this.init(t.canvas)}var n=.25,r=10,i=50,s=7,o=20;return u.prototype={init:function(e){this.x=e.width/2,this.y=e.height/2,this.cH=e.height,this.cW=e.width,this.score=0,this.mood="normal",this.flashMood=0},jump:function(e){var t,n,o,u;n=e.y-this.y,t=e.x-this.x,u=i,o=r*t/this.cW,this.xVelocity=-o,this.yVelocity=-Math.min(u,s),this.inMotion=!0},stop:function(){this.inMotion=!1,this.isDead=!0,this.mood="hurt"},update:function(){this.inMotion&&(this.yVelocity+=n,this.y+=this.yVelocity,this.x+=this.xVelocity);var e=this.position();e.bottom>=this.cH-17&&this.stop(),e.top<=0&&(this.yVelocity=-this.yVelocity);if(e.left<=0||e.right>=this.cW)this.xVelocity=-this.xVelocity;this.flashMood>0&&(this.flashMood-=1),this.flashMood==0&&!this.isDead&&(this.mood="normal")},draw:function(t){t.save(),e.drawSprite(t,this.sprite,this.moods[this.mood],this.x,this.y),this.isDead||this.drawScore(t),t.restore()},drawScore:function(e){e.save(),e.font="11pt Audiowide",e.fillStyle=t.suzhi,e.fillText(this.score,20,20),e.restore()},position:function(){return{top:this.y,bottom:this.y+this.size,left:this.x,right:this.x+this.size}},gotThingy:function(e){this.score+=e,this.mood=e<0?"hurt":"happy",this.flashMood=o}},u}),define("thingy",["util","colors"],function(e,t){function a(e){this.type=e.type,this.value=r[this.type].value,this.coords=r[this.type].coords,this.coordsOdd=r[this.type].coordsOdd,this.coordsEven=r[this.type].coordsEven,this.color=r[this.type].color,this.role=r[this.type].role,this.x=e.position.x,this.y=e.position.y,this.width=this.coords[2],this.height=this.coords[3],this.xVelocity=1,this.yVelocity=1,this.cH=e.canvas.height,this.cW=e.canvas.width,this.lifeTime=u,this.sprite=e.sprite,this.animFrames=0,this.isToddler=!0}var n=e.sprites,r={smiley:{role:"goody",coords:n.smiley,value:5,color:t.goody},laughy:{role:"goody",coords:n.laughy,value:50,color:t.goody},holy:{role:"goody",coords:n.holy,value:200,color:t.goody},geary:{role:"baddie",coords:n.geary[1],coordsOdd:n.geary[1],coordsEven:n.geary[2],value:-5,color:t.baddie},sunny:{role:"baddie",coords:n.sunny[1],coordsOdd:n.sunny[1],coordsEven:n.sunny[2],value:-50,color:t.baddie},rady:{role:"baddie",coords:n.rady[1],coordsOdd:n.rady[1],coordsEven:n.rady[2],value:-100,color:t.baddie}},i=0,s=20,o=20,u=2e3;return a.prototype={_hitTheWall:function(){this.x<=0&&(this.xVelocity=Math.abs(this.xVelocity)),this.x+this.width>=this.cW-i&&(this.xVelocity=-Math.abs(this.xVelocity)),this.y<=i&&(this.yVelocity=Math.abs(this.yVelocity)),this.y+this.height>=this.cH-i&&(this.yVelocity=-Math.abs(this.yVelocity))},_randomMotion:function(t){t%100==0&&(e.randomNumber(10,50)>25?this.xVelocity=-this.xVelocity:this.yVelocity=-this.yVelocity)},_isCollided:function(t){var n=t.position(),r={x:this.x,y:this.y,h:this.height,w:this.width},i={x:n.left,y:n.top,h:t.size,w:t.size};e.collided(r,i)&&(t.gotThingy(this.value),this.isCollided=!0,this.lifeTime=s)},update:function(e,t){this.x+=this.xVelocity,this.y+=this.yVelocity,this._randomMotion(e),this._hitTheWall(),!this.isCollided&&!this.isDying&&!this.isToddler&&this._isCollided(t),this.lifeTime-=1,this.lifeTime<=s&&(this.isDying=!0),u-this.lifeTime>=o&&(this.isToddler=!1),this.lifeTime<=0&&(this.isDead=!0,this.lifeTime=0),this.role==="baddie"&&(this.animFrames>=10?(this.animFrames=0,this.coords=e%2===0?this.coordsEven:this.coordsOdd):this.animFrames++)},draw:function(t){var n,r,i,a;t.save();if(this.isCollided||this.isDying)t.globalAlpha=this.lifeTime/s;this.isToddler&&(t.globalAlpha=(u-this.lifeTime)/o),e.drawSprite(t,this.sprite,this.coords,this.x,this.y,a),!this.isDying&&!this.isCollided&&(t.fillStyle=this.color,t.font="7pt Courier",i=this.value<0?"":"+",n=this.x+this.width/2-10,r=this.y+(this.height+10),t.fillText(i+this.value,n,r)),t.restore()}},a}),define("game",["util","colors","suzhi","thingy"],function(e,t,n,r){var s,o,u,a,f=0,l,c=[],h=20,p=10,d=0,v=0,m,g={intro:1,game:2,over:3},y=g.intro,b,w,E;return{init:function(t){m=t.env,b=t.sprite,this.setupCanvas(),this.initObjects(),this.run(),E={x:v/2-e.sprites.okayBtn[2]/2,y:d/2+50,w:e.sprites.okayBtn[2],h:e.sprites.okayBtn[3]},w=this},initObjects:function(){l=new n({env:m,canvas:s,sprite:b}),c=[]},run:function(){var e=this,t=function(){e.update(),e.render(),window.requestAnimationFrame(t)};window.requestAnimationFrame(t)},update:function(){var e,t,n;f+=1,y===g.intro,y===g.game&&(l.isDead?y=g.over:this.updateGameWorld()),y===g.over},updateGameWorld:function(){f%200==0&&c.push(new r({type:e.randomGoody(),position:e.randomPoint(s,20),canvas:s,sprite:b})),l.update();for(i=0,gCount=c.length;i<gCount;i++)thingy=c[i],thingy.isDead?(c.splice(i,1),gCount--):c[i].update(f,l)},render:function(){this.clearCanvas(),o.fillStyle=t.bg,o.fillRect(0,0,u,a),y===g.intro&&this.drawIntro(o),y===g.game&&this.renderGameWorld(o),y===g.over&&(this.renderGameWorld(o),this.drawGameOver(o)),this.drawFireBed(o)},drawIntro:function(t){var n=e.sprites.suzhiTitle,r=e.sprites.getReady,i=e.sprites.playBtn,s=e.sprites.tapHelp;e.drawSprite(t,b,n,v/2-n[2]/2,50),e.drawSprite(t,b,s,v/2-s[2]/2,130),e.drawSprite(t,b,i,v/2-i[2]/2,290),e.drawSprite(t,b,r,v/2-r[2]/2,350)},drawGameOver:function(n){var r=e.sprites.gameOver,i=e.sprites.okayBtn,s=e.sprites.score;e.drawSprite(n,b,r,v/2-r[2]/2,100),e.drawSprite(n,b,s,v/2-s[2]/2,150),n.font="30pt Audiowide",n.fillStyle=t.suzhi,n.textAlign="center",n.fillText(l.score,v/2,230),e.drawSprite(n,b,i,E.x,E.y)},renderGameWorld:function(e){var t,n=c.length;l.draw(e);for(t=0;t<n;t++)c[t].draw(e)},drawFireBed:function(t){var n="",r=35,i=18,s=0,o=d-r,u=f;while(s<=v)n=e.sprites.fire[u%16],u++,e.drawSprite(t,b,n,s,o),s+=2*i},clearCanvas:function(){o.save(),o.setTransform(1,0,0,1,0,0),o.clearRect(0,0,s.width,s.height),o.beginPath(),o.restore()},setupCanvas:function(){var e=m.canTouch?"touchstart":"mousedown";s=document.createElement("canvas"),u=m.viewport.width,a=m.viewport.height,u>=500&&(u=500,a=500),s.width=u,s.height=a,s.addEventListener(e,this.handleClickStart),o=s.getContext("2d"),document.getElementById("game").appendChild(s),d=s.height,v=s.width},handleClickStart:function(t){if(y===g.intro)w.initObjects(),y=g.game;else if(y===g.game)l.jump(e.getMouseAt(t,s));else if(y===g.over){var n=e.getMouseAt(t,s),r={x1:E.x,x2:E.x+E.w,y1:E.y,y2:E.y+E.h};e.isPointInsideBox(r,n)&&(w.initObjects(),y=g.game)}}}}),require(["game","util"],function(e,t){var n=new Image;n.onload=function(){e.init({env:t.env(),sprite:this})},n.src="assets/img/sprite.png"}),define("main",function(){});