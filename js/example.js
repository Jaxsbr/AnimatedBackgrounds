
var bounds = new Rectangle(0, 0, window.innerWidth, window.innerHeight);
var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var delta = 0;
var deltaTime = Date.now();

var titleTextStyle = "palegoldenrod";
var titleTextX = 100;
var titleTextY = 100;
var titleText = "Animated Backgrounds";
var titleFontSize = 60;
var titleFontFamily = "Showcard Gothic";

var animation;
var animationDestination = new Rectangle(340, 500, 100, 125);
var animationImage = new Image();
animationImage.onload = function() {
    // image, speed, sourceMaxWidth, sourceMaxHeight, frameCols, frameRows, startingCol, startingRow
    animation = new Animation(animationImage, 0.25, 400.25, 599.25, 4, 1, 0, 2);
};
animationImage.src = "img/spriteSheet.png";

var textRender;
var paralaxBackgroundSlider;  

var image = new Image();
image.onload = function() {         
    paralaxBackgroundSlider = new ParalaxBackgroundSlider(image);
    PopulateParalaxBackgrounds();
};
//image.src = "img/trees.png";
image.src = "img/backgroundLayer01.png";

var backgroundImageReady = false;
var backgroundImage = new Image();
backgroundImage.onload = function() {
    backgroundImageReady = true;
};
backgroundImage.src = "img/background.png";
var backgroundImageBounds = new Rectangle(0, 0, 0, 0);

   


InitTextRender();
Loop();


function InitTextRender() {    
    textRender = new TextRender();
    textRender.AddTextElement(new TextElement(titleText, titleTextStyle, titleFontFamily, 50, 150, titleFontSize));
    textRender.AddTextElement(new TextElement("todo: animate text!", "skyblue", titleFontFamily, 80, 255, 40));
    textRender.AddTextElement(new TextElement("todo: create todo style menu!", "skyblue", titleFontFamily, 80, 295, 40));
};


function PopulateParalaxBackgrounds() {
    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(4, new Rectangle(0, 0, bounds.W, bounds.H), 1, 50));    

    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(4, new Rectangle(-bounds.W, 0, bounds.W, bounds.H), 1, 50));               
};


function Loop() {           
    UpdateDelta();  
    
    if (paralaxBackgroundSlider) {
        Update();
        Draw();
    }

    if (animation) {
        animation.Update(animationDestination, delta);
        animation.Draw(ctx);
    }

    requestAnimationFrame(Loop);   
};

function UpdateDelta() {  
    var now = Date.now();                   
    delta = (now - deltaTime) / 1000;
    deltaTime = now;
};

function Update() {    
    paralaxBackgroundSlider.Update(bounds, delta);    

    backgroundImageBounds.X = bounds.X - 155;
    backgroundImageBounds.Y = bounds.Y - 100;
    backgroundImageBounds.W = bounds.W;
    backgroundImageBounds.H = bounds.H;
    
    textRender.Update(delta);
};

function Draw() {    
    ctx.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);    
        
    if (this.backgroundImageReady) {
        //drawImage(ctx, this.backgroundImage, backgroundImageBounds, null);
    }
    
    paralaxBackgroundSlider.Draw(ctx); 
        
    textRender.Draw(ctx);
};