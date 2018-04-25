function drawFillRect(ctx, style, rect) {            
    ctx.fillStyle = style; 
    ctx.fillRect(rect.X, rect.Y, rect.W, rect.H);                                        
};

function drawStrokeRect(ctx, style, rect, strokeWidth = 1) {
    ctx.strokeStyle = style;  
    ctx.strokeWidth = strokeWidth;
    ctx.strokeRect(rect.X, rect.Y, rect.W, rect.H);
}

function drawFillArc(ctx, style, centerX, centerY, radius, startAngle = 0, endAngle = 2 * Math.PI) {
    ctx.fillStyle = style;
    ctx.beginPath();    
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.fill();
};

function drawFillText(ctx, style, fontFamily, fontSize, text, x, y) {
    ctx.fillStyle = style;
    ctx.font = fontSize + "px " + fontFamily;        
    ctx.fillText(text, x, y);            
};

function drawImage(ctx, image, destinationRect, sourceRect = null) {
    if (sourceRect) { drawImageComplex(ctx, image, destinationRect, sourceRect); }
    else { drawImageSimple(ctx, image, destinationRect); }
};    

function drawImageSimple(ctx, image, destinationRect) {
    ctx.drawImage(image, destinationRect.X, destinationRect.Y, destinationRect.W, destinationRect.H);
};

function drawImageComplex(ctx, image, destinationRect, sourceRect) {
    ctx.drawImage(image, sourceRect.X, sourceRect.Y, sourceRect.W, sourceRect.H, 
        destinationRect.X, destinationRect.Y, destinationRect.W, destinationRect.H);
};