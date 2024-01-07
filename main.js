async function initMap() {
    const location = { lat: -6.9676395946295075, lng: 110.41460754786897 };
    const map = new google.maps.Map(document.getElementById("tempat--maps"), {
        center: location,
        zoom: 14, // You can adjust the initial zoom level here
        disableDefaultUI: true, // This will remove default UI controls
    });
    new google.maps.Marker({
        position: location,
        map: map,
    });
}


let audioStarted = false; // Flag to track whether audio has started

function runAudio() {
    let audio = document.createElement('audio');
    audio.setAttribute('src', '/sound/always-with-you.mp3');

    // Mute the audio initially (required for some mobile browsers)
    // audio.muted = true;
  
    // Set the loop attribute to true to make the audio loop continuously
    audio.loop = true;
  
    // Add an event listener to play the audio when it's loaded
    audio.addEventListener('canplaythrough', function() {
    // audio.muted = false;
    audio.play()
        .then(function() {
          // Audio started playing successfully
          audioStarted = true; // Set the flag to true to prevent multiple starts
        })
        .catch(function(error) {
          // Handle any errors that may occur
        });
    });
  
    document.body.appendChild(audio);
}

$('.btn-tutup').on('click', function() {
    $('.pop-up').addClass('d-none');
    $.fn.fullpage.setAllowScrolling(true);
    $.fn.fullpage.setKeyboardScrolling(true);
    runAudio();
});

$(".lokasi-direct").click(function(e) {
    // open maps 
    e.preventDefault();
    window.open('https://maps.app.goo.gl/bqDgWzWSoocYKFEX9', '_blank');
})

function salinRekening(id) {
    let rekening;
    let message;

    if (id == 1) {
        // BCA
        rekening = '0092198861';
        message = 'Berhasil salin rekening BCA !'
    } else if (id == 2) {
        // Mandiri
        rekening = '1350016130179';
        message = 'Berhasil salin rekening Mandiri !'
    } else if (id == 3) {
        // Dana
        rekening = '087872624696';
        message = 'Berhasil salin rekening Dana !'
    } else {
        // Default to BCA
        rekening = '0092198861';
        message = 'Berhasil salin rekening !'
    }

    // Create a text area element to hold the text
    const textArea = document.createElement("textarea");
    textArea.value = rekening;

    // Append the text area to the document
    document.body.appendChild(textArea);

    // Select the text in the text area
    textArea.select();

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the text area from the document
    document.body.removeChild(textArea);

    // set copied in text html
    const originalText = $(`.salin-sumbangan-${id}`).text();
    $(`.salin-sumbangan-${id}`).text('Copied');

    // Revert back to the original text after 3 seconds
    setTimeout(function() {
        $(`.salin-sumbangan-${id}`).text(originalText);
    }, 3000);

    // toastr.options = {
    //     positionClass: 'toast-top-right' // Set the position to top-right
    // };
    // toastr.info(message);
}

$(document).ready(function() {

    // Get the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const toParam = urlParams.get("to");

    if (toParam !== null) {
        $('.landing-tamu').text(toParam)
    } else {
        // "to" parameter is not found in the URL
        $('.landing-tamu').text('Anda ')
    }

    setTimeout(() => {
        $('.fp-watermark').css('display', 'none');
    }, 2);

    $('#fullpage').fullpage({
        //options here
        autoScrolling: true,
        scrollHorizontally: false,
        verticalCentered: false,
        scrollingSpeed: 1000,
        licenseKey: "gplv3-license",
    });
    $.fn.fullpage.setAllowScrolling(false);
    $.fn.fullpage.setKeyboardScrolling(false);
    
    $('#imageGallery').lightSlider({
        gallery:true,
        item:1,
        loop:true,
        thumbItem:3,
        slideMargin:0,
        enableDrag: false,
        currentPagerPosition:'left',
        // onSliderLoad: function(el) {
        //     el.lightGallery({
        //         selector: '#imageGallery .lslide'
        //     });
        // }   
    });  

});