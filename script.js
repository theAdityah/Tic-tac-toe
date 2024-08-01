        document.getElementById('play').addEventListener('click', function() {
            document.getElementById('popup').style.display = 'block';
            document.getElementById('overlay').style.display = 'block'; // Show overlay
        });

        window.addEventListener('click', function(event) {
            if (event.target === document.getElementById('overlay')) {
                document.getElementById('popup').style.display = 'none';
                document.getElementById('overlay').style.display = 'none'; // Hide overlay
            }
        });
