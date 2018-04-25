class TextElement {
    constructor(text, style, fontFamily, textX, textY, fontSize) {
        this.Text = text;
        this.Style = style;
        this.FontFamily = fontFamily
        this.TextX = textX;
        this.TextY = textY;    
        this.FontSize = fontSize;

        this.ShadowStyle = "black";
        this.ShadowX = 5;
        this.ShadowY = 5;

        // TODO:
        // Create animation type, determine movement pattern.
    }

    Update(delta) {
        // TODO:
        // Animation modes movement should be update here.
    }
    
    Draw(ctx) {
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



class TextRender {
    constructor() {
        this.TextElements = [];
    }

    AddTextElement(textElement) {
        this.TextElements.push(textElement);
    }

    Update(delta) {
        for (var i = 0; i < this.TextElements.length; i++) {
            this.TextElements[i].Update(delta);
        }
    }
    
    Draw(ctx) {
        for (var i = 0; i < this.TextElements.length; i++) {
            this.TextElements[i].Draw(ctx);
        }
    }
}