document.getElementById('playButton').addEventListener('click', function() {
            document.getElementById('popup').style.display = 'block';
        });

        window.addEventListener('click', function(event) {
            if (event.target === document.getElementById('popup')) {
                document.getElementById('popup').style.display = 'none';
            }
        });
