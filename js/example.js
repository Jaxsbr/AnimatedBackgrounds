
var bounds = new Rectangle(0, 0, window.innerWidth, window.innerHeight);


var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");


var delta = 0;
var deltaTime = Date.now();


var titleFontSize = 60;
var titleText = "Animated Backgrounds";
var titleFontFamily = "Showcard Gothic";
var titleShadowOffset = new Point(5, 5);

var animation;
var animationImage;
var animationDestination = new Rectangle(340, 500, 100, 125);

var textRender;
var paralaxBackgroundSlider;  

var image = new Image();
image.onload = function() {         
    paralaxBackgroundSlider = new ParalaxBackgroundSlider();
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
InitCharacterAnimation();
Loop();


function InitTextRender() {    
    textRender = new TextRender();
    textRender.AddTextElement(new TextElement("Animated Backgrounds", "palegoldenrod", titleFontFamily, 50, 150, titleFontSize, titleShadowOffset));
    textRender.AddTextElement(new TextElement("todo: animate text!", "goldenrod", titleFontFamily, 80, 255, 40, titleShadowOffset));
    textRender.AddTextElement(new TextElement("todo: create todo style menu!", "skyblue", titleFontFamily, 80, 295, 40, titleShadowOffset));    
    textRender.AddTextElement(new TextElement("todo: sinewave paralax layers, depth perception improvement", "pink", titleFontFamily, 80, 335, 40, titleShadowOffset));
    textRender.AddTextElement(new TextElement("todo: dynamically resize canvas on screen resize", "purple", titleFontFamily, 80, 375, 40, titleShadowOffset));
    textRender.AddTextElement(new TextElement("todo: math, calculating render perportions base on screen bounds", "orange", titleFontFamily, 80, 415, 40, titleShadowOffset));
}

function InitCharacterAnimation() {    
    var animationBottomMargin =  (bounds.H / 5);
    var ycoord = bounds.H - animationBottomMargin - animationDestination.H;

    animationDestination = new Rectangle(340, ycoord, 100, 125);
    animationImage = new Image();
    animationImage.onload = function() {
        // image, speed, sourceMaxWidth, sourceMaxHeight, frameCols, frameRows, startingCol, startingRow
        animation = new Animation(animationImage, 0.25, 400.25, 599.25, 4, 1, 0, 2);
    }
    animationImage.src = "img/spriteSheet.png";

    // TODO:
    // Implement dance to the beat animation(chillhop)
};


function PopulateParalaxBackgrounds() {
    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(4, new Rectangle(0, 0, bounds.W, bounds.H), 1, 2, 0, image));    

    paralaxBackgroundSlider.Backgrounds.push(
        new ParalaxBackground(4, new Rectangle(-bounds.W, 0, bounds.W, bounds.H), 1, 2, 0, image));               
};


function Loop() {           
    UpdateDelta();          
    Update();
    Draw();    

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

    if (paralaxBackgroundSlider) {
        paralaxBackgroundSlider.Update(bounds, delta);    
    }

    backgroundImageBounds.X = bounds.X - 155;
    backgroundImageBounds.Y = bounds.Y - 100;
    backgroundImageBounds.W = bounds.W;
    backgroundImageBounds.H = bounds.H;
    
    textRender.Update(delta);
};

function Draw() {    
    ctx.clearRect(bounds.X, bounds.Y, bounds.W, bounds.H);    
        
    drawFillText(ctx, "black", "Showcard Gothic", 56, "Loading Art ...", (animationDestination.X + animationDestination.W), animationDestination.Y + 110);
    drawFillText(ctx, "maroon", "Showcard Gothic", 56, "Loading Art ...", (animationDestination.X + animationDestination.W + 1), animationDestination.Y + 110 + 1);

    if (this.backgroundImageReady) {
        //drawImage(ctx, this.backgroundImage, backgroundImageBounds, null);
    }
    
    if (paralaxBackgroundSlider) {
        paralaxBackgroundSlider.Draw(ctx); 
    }
        
    textRender.Draw(ctx);
};