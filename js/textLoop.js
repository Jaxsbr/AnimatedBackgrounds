class TextLoopElement {
    constructor(text, style, fontFamily, textX, textY, fontSize, ttl) {
        this.Text = text;
        this.Style = style;
        this.FontFamily = fontFamily
        this.TextX = textX;
        this.TextY = textY;    
        this.FontSize = fontSize;
        this.TTL = ttl;
        this.MaxTTL = ttl;
        this.Opacity = 1;

        this.ShadowStyle = "black";
        this.ShadowX = 5;
        this.ShadowY = 5;



        // TODO:
        // Create animation type, determine movement pattern.
    }

    Update(delta) {
        if (this.TTL < 0) { return; }

        this.TTL -= delta;
        this.Opacity = (this.TTL * 10) / this.MaxTTL;
    }
    
    Draw(ctx) {
        if (this.TTL < 0) { return; }

        ctx.globalAlpha = this.Opacity;
        drawFillText(
            ctx, 
            this.ShadowStyle, 
            this.FontFamily, 
            this.FontSize, 
            this.Text, 
            this.TextX + this.ShadowX, 
            this.TextY + this.ShadowY);
    
        drawFillText(
            ctx, 
            this.Style, 
            this.FontFamily, 
            this.FontSize, 
            this.Text, 
            this.TextX, 
            this.TextY);        
    }
}

class TextLoop {
    constructor(textLoopElements, sineTick) {
        this.TextLoopElements = textLoopElements;
        this.Enabled = true;
        this.SineX = 0;        
        this.SineY = 0;
        this.SineXD = 1;
        this.SineYD = 1;
        this.SineTick = sineTick;
        this.Index = 0;
        this.IndexTime = 0;
        this.DisplayTime = 1.5;
    }

    Update(delta) {        
        this.SineTick++;        

        this.IndexTime += delta;
        if (this.IndexTime >= this.DisplayTime) {
            this.IndexTime = 0;
            this.Index += 1;            
        }

        if (this.Index >= this.TextLoopElements.length) {
            this.Index = 0;
        }

        var upDown = true;
        if (upDown) {
            this.SineY += (Math.sin(this.SineTick / 10) * 0.02);            
        }
        else {
            this.SineX += (Math.cos(this.SineTick / 10) * 0.02);        
            //this.Bounds.X += (Math.cos(this.FloatTick / 30) * 2);
            //this.Bounds.Y += (Math.sin(this.FloatTick / 30) * 2);

            // this.SineX += (Math.cos(this.SineTick / 6) * 0.7);
            // this.SineY += (Math.sin(this.SineTick / 1) * 0.7);
        }                        



        // this.TextLoopElements[this.Index].TextX += this.SineX;
        // this.TextLoopElements[this.Index].TextY += this.SineY;

        for (var i = 0; i < this.TextLoopElements.length; i++) { 
            //this.TextLoopElements[i].TextX += this.SineX;
            this.TextLoopElements[i].TextY += this.SineY;           
            this.TextLoopElements[i].Update(delta);

            this.SineX += 0.005;            
        }
    }

    Draw(ctx) {
        for (var i = 0; i < this.TextLoopElements.length; i++) {
            this.TextLoopElements[i].Draw(ctx);
        }
        ctx.globalAlpha = 1;
    }
}


