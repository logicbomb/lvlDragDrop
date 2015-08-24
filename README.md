#Native AngularJs drag and drop directive#

An easy to use, native, directive to enable drag/drop in your angular app.  This directive has no dependency on jQuery or other frameworks, it does require a browser that supports the HTML5 drag/drop events.

Now combine keys (ctrl, alt, shift) with the drag and drop.

    <div x-on-drop='dropped(dragEl, dropEl, keysPressed)'>dragme</div>
    ...
    $scope.dropped(dragEl, dropEl, keysPressed) {
        // check for ctrl key
        if (keysPressed.ctrl) {
            // drag with control key.
        }
    }

Get the FROM element of a drag element.

    <div x-on-drop='dropped(dragEl, dropEl, keysPressed, fromEl)'>dragme</div>
    ...
    $scope.dropped(dragEl, dropEl, keysPressed, fromEl) {
        // parent element before do drag and drop
            console.log("I was dragged from "+fromEl+" element.");
        
        }
    }

[Live Demo](http://logicbomb.github.io/ng-directives/drag-drop.html)

[Documentation](http://jasonturim.wordpress.com/2013/09/01/angularjs-drag-and-drop/)


##UUID Service##
A very simple service for working with [UUIDs](http://en.wikipedia.org/wiki/Universally_unique_identifier).

[Live Demo](http://logicbomb.github.io/ng-directives/uuid.html)

[Documentation](http://jasonturim.wordpress.com/2013/09/01/angularjs-drag-and-drop/)

## dataTransfer hack

The jQuery event object does not have a dataTransfer property... true, but one can try:


    jQuery.event.props.push('dataTransfer');
