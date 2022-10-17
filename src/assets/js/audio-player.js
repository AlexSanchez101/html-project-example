$(document).ready(function(){

    function setPlayer(playerID, containerID) {
        var myPlayer = $(playerID),
        myPlayerData,
        fixFlash_mp4, // Flag: The m4a and m4v Flash player gives some old currentTime values when changed.
        fixFlash_mp4_id, // Timeout ID used with fixFlash_mp4
        ignore_timeupdate, // Flag used with fixFlash_mp4
        options = {
            ready: function (event) {
                // Hide the volume slider on mobile browsers. ie., They have no effect.
                if(event.jPlayer.status.noVolume) {
                    // Add a class and then CSS rules deal with it.
                    $(".jp-gui").addClass("jp-no-volume");
                }
                // Determine if Flash is being used and the mp4 media type is supplied. BTW, Supplying both mp3 and mp4 is pointless.
                fixFlash_mp4 = event.jPlayer.flash.used && /m4a|m4v/.test(event.jPlayer.options.supplied);
                // Setup the player with media.
                $(this).jPlayer("setMedia", {
                    mp3: $(this).data('srcMp3'),
                    //m4a: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
                    //oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
                });
            },
            play: function() {
                $(this).jPlayer("pauseOthers"); //  pause all players except this one.
            },
            timeupdate: function(event) {
                if(!ignore_timeupdate) {
                    myControl.progress.slider("value", event.jPlayer.status.currentPercentAbsolute);
                }
            },
            volumechange: function(event) {
                if(event.jPlayer.options.muted) {
                    myControl.volume.slider("value", 0);
                } else {
                    myControl.volume.slider("value", event.jPlayer.options.volume);
                }
            },
            swfPath: "../dist/jplayer",
            supplied: "mp3, m4a, oga",
            cssSelectorAncestor: containerID,
            wmode: "window",
            keyEnabled: true,
            volume: 0.8
            
        },
        myControl = {
            progress: $(options.cssSelectorAncestor + " .jp-progress-slider"),
            volume: $(options.cssSelectorAncestor + " .jp-volume-slider")
        };

        // Instance jPlayer
        myPlayer.jPlayer(options);

        // A pointer to the jPlayer data object
        myPlayerData = myPlayer.data("jPlayer");

        // Define hover states of the buttons
        $('.jp-gui ul li').hover(
        function() { $(this).addClass('ui-state-hover'); },
        function() { $(this).removeClass('ui-state-hover'); }
        );

        // Create the progress slider control
        myControl.progress.slider({
        animate: "fast",
        max: 100,
        range: "min",
        step: 0.1,
        value : 0,
        slide: function(event, ui) {
            var sp = myPlayerData.status.seekPercent;
            if(sp > 0) {
                // Apply a fix to mp4 formats when the Flash is used.
                if(fixFlash_mp4) {
                    ignore_timeupdate = true;
                    clearTimeout(fixFlash_mp4_id);
                    fixFlash_mp4_id = setTimeout(function() {
                        ignore_timeupdate = false;
                    },1000);
                }
                // Move the play-head to the value and factor in the seek percent.
                myPlayer.jPlayer("playHead", ui.value * (100 / sp));
            } else {
                // Create a timeout to reset this slider to zero.
                setTimeout(function() {
                    myControl.progress.slider("value", 0);
                }, 0);
            }
        }
        });

        // Create the volume slider control
        myControl.volume.slider({
        animate: "fast",
        max: 1,
        range: "min",
        step: 0.01,
        value : myPlayerData.options.volume,
        slide: function(event, ui) {
            myPlayer.jPlayer("option", "muted", false);
            myPlayer.jPlayer("option", "volume", ui.value);
        }
        });
    }
    //setPlayer("#jquery_jplayer_1");
    $('.jp-jplayer').each(function(index) {
        var id = $(this).attr('id');
        if (!id) {
            $(this).attr('id','jp-player' + index);
            $(this).next('.jp-container').attr('id','jp-player-container' + index);
        }
        var id = $(this).attr('id');
        var containerID = $(this).next('.jp-container').attr('id');
        setPlayer('#' + id, '#' + containerID);
    });
});