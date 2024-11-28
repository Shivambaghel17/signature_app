// Get the canvas and context
        const canvas = document.getElementById('signatureCanvas');
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions
        canvas.width = 600;
        canvas.height = 400;

        // Default settings
        let penColor = '#000000';  // Default pen color
        let bgColor = '#ffffff';   // Default background color
        let penSize = 3;           // Default pen size (line width)
        let drawing = false;
        let lastX = 0;
        let lastY = 0;

        // Set canvas background color on load
        function setCanvasBackgroundColor() {
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Function to start drawing
        function startDrawing(e) {
            drawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }

        // Function to stop drawing
        function stopDrawing() {
            drawing = false;
        }

        // Function to draw on canvas
        function draw(e) {
            if (!drawing) return;

            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.lineWidth = penSize;
            ctx.lineCap = 'round';
            ctx.strokeStyle = penColor;
            ctx.stroke();

            [lastX, lastY] = [e.offsetX, e.offsetY];
        }

        // Set background color on change
        document.getElementById('bgColor').addEventListener('input', (e) => {
            bgColor = e.target.value;
            setCanvasBackgroundColor();
        });

        // Set pen color on change
        document.getElementById('penColor').addEventListener('input', (e) => {
            penColor = e.target.value;
        });

        // Set pen size on change
        document.getElementById('penSize').addEventListener('input', (e) => {
            penSize = e.target.value;
        });

        // Clear the canvas
        document.getElementById('clearBtn').addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setCanvasBackgroundColor();
        });

        // Save the signature (to localStorage and download as an image)
        document.getElementById('saveBtn').addEventListener('click', () => {
            // Save the canvas as an image in localStorage
            const dataURL = canvas.toDataURL();
            localStorage.setItem('signature', dataURL);
            
            // Create a link to download the signature
            const downloadLink = document.createElement('a');
            downloadLink.href = dataURL;
            downloadLink.download = 'signature.png'; // Set the file name for download
            downloadLink.click(); // Trigger the download

            alert('Signature saved and downloaded!');
        });

        // Load the last saved signature
        document.getElementById('loadBtn').addEventListener('click', () => {
            const savedSignature = localStorage.getItem('signature');
            if (savedSignature) {
                const img = new Image();
                img.onload = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    setCanvasBackgroundColor();
                    ctx.drawImage(img, 0, 0);
                };
                img.src = savedSignature;
            } else {
                alert('No saved signature found!');
            }
        });

        // Add event listeners for drawing
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseout', stopDrawing);

        // Set initial canvas background
        setCanvasBackgroundColor();