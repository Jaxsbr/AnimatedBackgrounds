class Animation { 
	constructor(image, speed, frameWidth, frameHeight, frameCols, frameRows, frameCol, frameRow) {	
		this.Image = image;	
		this.Speed = speed;	
		this.FrameWidth = frameWidth;
		this.FrameHeight = frameHeight;
		this.FrameCols = frameCols;
		this.FrameRows = frameRows;		
		this.FrameColStart = frameCol;
		this.FrameRowStart = frameRow;	
		this.FrameCol = this.FrameColStart;	
		this.FrameRow = this.FrameRowStart;				
		this.Ellapsed = 0;
    	this.SourceBounds = new Rectangle(0, 0, 0, 0);
    	this.DestinationBounds = new Rectangle(0, 0, 0, 0);
	}

	Update (destination, delta) {
		this.DestinationBounds = destination;
		this.UpdateFrameIndex();
		// NOTE: No support for multiple rows, hardcoded y:0 enforces top row only.
		this.SourceDestination = new Rectangle(this.FrameCol * this.FrameWidth, this.FrameRow * this.FrameHeight, this.FrameWidth, this.FrameHeight); 
	}

	UpdateFrameIndex() {     
		this.Ellapsed += delta;	   
		if (this.Ellapsed >= this.Speed) {	   
			this.Ellapsed = 0;    	   
			  
		  	this.FrameCol += 1;	   
		  	if (this.FrameCol >= this.FrameCols) { 
				  this.FrameCol = this.FrameColStart; 
				  this.FrameRow += 1;
			}    	   

			if (this.FrameRow >= this.FrameRows) {
				this.FrameRow = this.FrameRowStart;
			}
		}  	   
	};
	  

	Draw (ctx) {
		drawImage(ctx, this.Image, this.DestinationBounds, this.SourceDestination);
	}
}