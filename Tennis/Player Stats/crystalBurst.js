document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('crystal-burst-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resizeCanvas() {
    const app = document.getElementById('app');
    canvas.width = app.offsetWidth;
    canvas.height = app.offsetHeight;
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.zIndex = '2';
    canvas.style.pointerEvents = 'none';
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const imageSrcs = [
    '../image/goldCrystal.png',
    '../image/blueCrystal1.png',
    '../image/blueCrystal2.png'
  ];
  const images = [];
  let imagesLoaded = 0;
  imageSrcs.forEach((src, i) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      images[i] = img;
      imagesLoaded++;
    };
  });

  function drawCrystal(crystal, alpha = 1) {
    const img = images[crystal.imageIndex];
    if (!img) return;
    ctx.save();
    ctx.translate(crystal.x, crystal.y);
    ctx.rotate(crystal.rotation);
    ctx.globalAlpha = alpha;
    const drawWidth = crystal.size * crystal.scale;
    const drawHeight = crystal.size * crystal.scale;
    ctx.drawImage(img, -drawWidth/2, -drawHeight/2, drawWidth, drawHeight);
    ctx.restore();
  }

  let crystals = [];
  function createCrystals() {
    crystals = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const count = 60 + Math.floor(Math.random() * 30);
    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      let angle;
      if (rand < 0.7) {
        angle = -Math.PI / 4 + (Math.random() - 0.5) * Math.PI / 3;
      } else if (rand < 0.9) {
        angle = (Math.random() - 0.5) * Math.PI / 5;
      } else {
        angle = Math.random() * Math.PI * 2;
      }
      const speed = 5 + Math.random() * 12;
      const size = 8 + Math.random() * 20;
      const imageRand = Math.random();
      let imageIndex = imageRand < 0.35 ? 0 : (imageRand < 0.65 ? 1 : 2);
      crystals.push({
        x: centerX,
        y: centerY,
        size,
        velocityX: Math.cos(angle) * speed,
        velocityY: Math.sin(angle) * speed,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        depth: Math.random(),
        scale: 0.5 + Math.random() * 1.5,
        imageIndex
      });
    }
    crystals.sort((a, b) => a.depth - b.depth);
  }

  let startTime = 0;
  function animate(ts) {
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;
    const loopTime = elapsed % 2000;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (imagesLoaded >= 3) {
      if (loopTime >= 1000 && loopTime < 2000) {
        const burstTime = loopTime - 1000;
        if (burstTime < 20 && crystals.length === 0) createCrystals();
        crystals.forEach(crystal => {
          crystal.x += crystal.velocityX;
          crystal.y += crystal.velocityY;
          crystal.rotation += crystal.rotationSpeed;
          crystal.velocityY += 0.15;
          crystal.velocityX *= 0.98;
          crystal.velocityY *= 0.98;
          const progress = burstTime / 1000;
          const alpha = progress > 0.75 ? 1 - ((progress - 0.75) / 0.25) : 1;
          drawCrystal(crystal, alpha);
        });
      } else {
        crystals = [];
      }
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});
