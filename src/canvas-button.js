import gsap from "gsap";

export const canvasButton = function() {
  document.querySelectorAll('.btn--dynamic').forEach(btn => {
    let canvas;
    btn.addEventListener('mouseenter', function() {
      
      canvas = document.createElement('canvas');
      const rect = this.getBoundingClientRect();

      const maxX = Math.floor(rect.width - 1);
      const maxY = Math.floor(rect.height - 1);

      canvas.style.position = 'absolute';
      canvas.style.top = '-1px';
      canvas.style.left = '-1px';
      canvas.style.width = (rect.width) + 'px';
      canvas.style.height = (rect.height) + 'px';
      canvas.style.zIndex = 1;
      canvas.width = rect.width;
      canvas.height = rect.height;
      // console.log(maxX)

      this.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      ctx.lineWidth = 1.0;
      // ctx.lineJoin = "round";
      // ctx.lineCap  = "round";
      ctx.strokeStyle = "#f37321"; 
      ctx.shadowColor = 0;
      ctx.shadowOffsetX = 0; 
      ctx.shadowOffsetY = 0;
      ctx.translate(0.5, 0.5);

      const vertex = [
        {
          x1: maxX,
          y1: Math.floor(maxY / 2),
          x2: maxX,
          y2: Math.floor(maxY / 2),
        },
        {
          x1: maxX,
          y1: 0,
          x2: maxX,
          y2: maxY
        },
        {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: maxY
        },
      ]

      const tl = gsap.timeline();

      tl
      .to(vertex[0], {x1: maxX, }, 0 )
      .to(vertex[0], {y1: 0, }, 0 )
      .to(vertex[0], {x2: maxX, }, 0 )
      .to(vertex[0], {y2: maxY, onUpdate: function() {
        // console.log(vertex[0].x1)
        ctx.clearRect(0, 0, maxX, maxY)
        
        // ctx.beginPath();
        ctx.moveTo(maxX, Math.floor(maxY / 2));
        ctx.lineTo(vertex[0].x1, vertex[0].y1);
        ctx.moveTo(maxX, Math.floor(maxY / 2));
        ctx.lineTo(vertex[0].x2, vertex[0].y2);
        ctx.stroke();
      }}, 0 )

      .to(vertex[1], {x1: 0, }, 0.4 )
      .to(vertex[1], {y1: 0, }, 0.4 )
      .to(vertex[1], {x2: 0, }, 0.4 )
      .to(vertex[1], {y2: maxY, onUpdate: function() {
        // console.log(vertex[0].x1)
        ctx.clearRect(0, 0, maxX, maxY)
        
        // ctx.beginPath();
        
        ctx.moveTo(maxX, Math.floor(maxY / 2));
        ctx.lineTo(vertex[0].x1, vertex[0].y1);
        ctx.moveTo(maxX, Math.floor(maxY / 2));
        ctx.lineTo(vertex[0].x2, vertex[0].y2);

        ctx.moveTo(maxX, 0);
        ctx.lineTo(vertex[1].x1, vertex[1].y1);
        ctx.moveTo(maxX, maxY);
        ctx.lineTo(vertex[1].x2, vertex[1].y2);
        ctx.stroke();
      }}, 0.4 )

      .to(vertex[2], {x1: 0, }, 0.8 )
      .to(vertex[2], {y1: Math.floor(maxY / 2), }, 0.8 )
      .to(vertex[2], {x2: 0, }, 0.8 )
      .to(vertex[2], {y2: Math.floor(maxY / 2), onUpdate: function() {
        
        ctx.clearRect(0, 0, maxX, maxY)
        
        // ctx.beginPath();
        
        ctx.moveTo(maxX, Math.floor(maxY / 2));
        ctx.lineTo(vertex[0].x1, vertex[0].y1);
        ctx.moveTo(maxX, Math.floor(maxY / 2));
        ctx.lineTo(vertex[0].x2, vertex[0].y2);

        ctx.moveTo(maxX, 0);
        ctx.lineTo(vertex[1].x1, vertex[1].y1);
        ctx.moveTo(maxX, maxY);
        ctx.lineTo(vertex[1].x2, vertex[1].y2);

        ctx.moveTo(0, 0);
        ctx.lineTo(vertex[2].x1, vertex[2].y1);
        ctx.moveTo(0, maxY);
        ctx.lineTo(vertex[2].x2, vertex[2].y2);
        ctx.stroke();
      }}, 0.8 )

    });

    btn.addEventListener('mouseleave', function() {
      
      this.removeChild(canvas);
    });
  })
}