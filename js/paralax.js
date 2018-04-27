
class ParalaxBackground {
    constructor(id, destination, direction, increment) {   
        this.ID = id; 
        this.Destination = destination;
        this.Direction = direction;
        this.Increment = increment;    
        
        this.SetImageSourceRect();
    }

    SetImageSourceRect() {
        switch (this.ID) {
            case 1:
                this.ImageSourceRect = new Rectangle(0, 0, 512, 512);
            break;
    
            case 2:            
                this.ImageSourceRect = new Rectangle(512, 0, 512, 512);
            break;
    
            case 3:            
                this.ImageSourceRect = new Rectangle(1024, 0, 512, 512);
            break;
    
            default:            
                this.ImageSourceRect = new Rectangle(0, 0, 2048, 1546);
            break;
        }
    };
    
    Update(drawBounds, delta) {
        if (this.Destination.X > drawBounds.W) {
            this.Destination.X = -drawBounds.W + this.Increment;
        }

        this.Destination.X += this.Increment;
    }

    UpdatePacingMode(drawBounds, delta) {   
       if (this.Destination.X < drawBounds.X) {
        this.Destination.X = drawBounds.X;
        this.Direction = 1; // Go Right
       }
    
       if (this.Destination.X + this.Destination.W > drawBounds.W) {
           this.Destination.X = drawBounds.W - this.Destination.W;
           this.Direction = 0; // Go Left
       }
    
       var increment = this.Direction == 0 ? -this.Increment : this.Increment;
       this.Destination.X += increment;
    }
    
    Draw(ctx, image) {    
        drawImage(ctx, image, this.Destination, this.ImageSourceRect);
    }
}


class ParalaxBackgroundSlider {
    constructor(image) {
        this.Backgrounds = [];
        this.Image = image;
    }

    Update(drawBounds, delta) {
        for (var i = 0; i < this.Backgrounds.length; i++) {
            this.Backgrounds[i].Update(drawBounds, delta);        
        }    
    }
    
    Draw(ctx) {
        for (var i = 0; i < this.Backgrounds.length; i++) {
            this.Backgrounds[i].Draw(ctx, this.Image);
        }    
    }
}