var module = angular.module("lvl.directives.dragdrop", ['lvl.services']);

module.directive('lvlDraggable', ['$rootScope', 'uuid', function ($rootScope, uuid) {
    return {
        restrict: 'A',
        link: function (scope, el, attrs, controller) {
            angular.element(el).attr("draggable", "true");

            var id = angular.element(el).attr("id");

            if (!id) {
                id = uuid.new();
                angular.element(el).attr("id", id);
            }

            el.bind("dragstart", function (e) {
                e.dataTransfer.setData('text', id);
                $rootScope.$emit("LVL-DRAG-START");

                // support drag-to-scroll on FFX and IE
                if ( e.currentTarget.offsetParent ) {
                  angular.element(e.currentTarget.offsetParent).bind("dragover", dragover);
                }
            });

            var stop = true;
            el.bind("dragend", function (e) {
                $rootScope.$emit("LVL-DRAG-END");
                stop = true;

                // support drag-to-scroll on FFX and IE
                if ( e.currentTarget.offsetParent ) {
                  angular.element(e.currentTarget.offsetParent).unbind("dragover", dragover);
                }

            });

            var dragover = function(e) {
              var top = e.currentTarget.offsetTop;
              var bottom = e.currentTarget.offsetHeight;
              var y = e.clientY - top;
              stop = true;
              if (y - 150 < 0) {
                  stop = false;
                  scroll(e.currentTarget, -1);
              }
              if (y + 150 > bottom) {
                  stop = false;
                  scroll(e.currentTarget, 1);
              }
            };

            var scroll = function (scrollport, step) {
                scrollport.scrollTop += step;
                if (!stop) {
                    setTimeout(function () {
                       scroll(scrollport, step);
                     }, 20);
                }
            };

        }
    };
}]);

module.directive('lvlDropTarget', ['$rootScope', 'uuid', function ($rootScope, uuid) {
    return {
        restrict: 'A',
        scope: {
            onDrop: '&'
        },
        link: function (scope, el, attrs, controller) {
            var id = angular.element(el).attr("id");
            if (!id) {
                id = uuid.new();
                angular.element(el).attr("id", id);
            }

            el.bind("dragover", function (e) {
                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }

                e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
                return false;
            });

            el.bind("dragenter", function (e) {
                // this / e.target is the current hover target.
                angular.element(e.target).addClass('lvl-over');
            });

            el.bind("dragleave", function (e) {
                angular.element(e.target).removeClass('lvl-over');  // this / e.target is previous target element.
            });

            el.bind("drop", function (e) {
                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }

                if (e.stopPropagation) {
                    e.stopPropagation(); // Necessary. Allows us to drop.
                }
                var data = e.dataTransfer.getData("text");
                var dest = document.getElementById(id);
                var src = document.getElementById(data);

                scope.onDrop({dragEl: data, dropEl: id});
            });

            $rootScope.$on("LVL-DRAG-START", function () {
                var el = document.getElementById(id);
                angular.element(el).addClass("lvl-target");
            });

            $rootScope.$on("LVL-DRAG-END", function () {
                var el = document.getElementById(id);
                angular.element(el).removeClass("lvl-target");
                angular.element(el).removeClass("lvl-over");
            });
        }
    };
}]);
