
var bounds = new Rectangle(0, 0, window.innerWidth, window.innerHeight);


var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");


var delta = 0;
var deltaTime = Date.now();

// TEXT LOOPS
var textLoop_001;


var titleFontSize = 60;
var titleText = "Animated Backgrounds";
var titleFontFamily = "Showcard Gothic";
var titleShadowOffset = new Point(5, 5);

var itemTitleFontFamily = "Calibri";
var itemTitleShadowOffset = new Point(3, 3);

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
InitTextLoops();
InitCharacterAnimation();
Loop();


function InitTextRender() {    
    textRender = new TextRender();
    textRender.AddTextElement(new TextElement("Animated Backgrounds", "palegoldenrod", titleFontFamily, 50, 125, titleFontSize, titleShadowOffset));
    textRender.AddTextElement(new TextElement("* Sinewave Text Element Animation", "white", titleFontFamily, 50, 200, 35, titleShadowOffset));
    textRender.AddTextElement(new TextElement("- Opacity Fade TTL", "white", titleFontFamily, 50, 240, 35, titleShadowOffset));                    
}

function InitTextLoops() {   
    var textLoopElements = [
        // new TextElement("a jong man was walking on his journey...", "white", titleFontFamily, 50, 600, 25, titleShadowOffset),
        // new TextElement("a jong man was walking on his journey...", "white", titleFontFamily, 60, 700, 25, titleShadowOffset),
        // new TextElement("a jong man was walking on his journey...", "white", titleFontFamily, 70, 800, 25, titleShadowOffset),
        // new TextElement("a jong man was walking on his journey...", "white", titleFontFamily, 60, 900, 25, titleShadowOffset),
        // new TextElement("a jong man was walking on his journey...", "white", titleFontFamily, 50, 1000, 25, titleShadowOffset),

        new TextLoopElement("todo: sinewave paralax layers, depth perception improvement", "pink", titleFontFamily, 200, 350, 40, itemTitleShadowOffset, 1),
        new TextLoopElement("todo: dynamically resize canvas on screen resize", "purple", titleFontFamily, 250, 400, 40, itemTitleShadowOffset, 20),
        new TextLoopElement("todo: math, calculating render perportions based on screen bounds", "green", titleFontFamily, 300, 450, 40, itemTitleShadowOffset, 30),        
    ];

//    textLoop_001 = new TextLoop(elements, RandomBetween(200, 400));         
    textLoop_001 = new TextLoop(textLoopElements, RandomBetween(300, 320));         
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
    textLoop_001.Update(delta);
};

function RandomBetween (min, max) {
    return Math.random() * (max - min) + min;
}

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
    textLoop_001.Draw(ctx);
};