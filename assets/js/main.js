/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

const rootURL = "https://cefis.com.br/api/v1/event";

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {

			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile)
			$body.addClass('is-touch');

	// Load Course?

		let qs = new URLSearchParams(location.search);
		let id = qs.get('courseID');
    	let $URL = rootURL;

    	if (id) {
        	$URL = $URL + "/" + id + "?include=classes";
            loadCourse()
    	} else {
    		loadAllCourses()
		}

	function loadCourse() {
        $(document).ready(function () {
            const $main = $('#main');
            $.ajax({
                url: $URL,
                type: "GET",
                dataType: "json"
            })
                .done(function(resp) {
                    let list = '';
                	$.each(resp.data.classes, function (idx, item) {
                        list += `
							<li>${item.title}</li>
                		`
                	});

                    let output =`
						<div class="inner">
							<h1>${resp.data.title} - ${resp.data.subtitle}</h1>
							<span class="image main"><img src="${resp.data.banner}" alt="" /></span>
							<h2>Aulas do curso: </h2>
							<div class="col-6 col-12-medium">
								<ul>
									${list}
								</ul>
							</div>							
						</div>
                	`;

                    $main.html(output);
                });
        });
    }

    function loadAllCourses() {
        $(document).ready(function () {
            const $tiles = $('.tiles');
            $.ajax({
                url: $URL,
                type: "GET",
                dataType: "json"
            })
                .done(function(resp) {
                    let output = '';
                    $.each(resp.data, function (idx, val) {
                        output += `
                			<article class="style6">
    							<span class="image">
    								<img src="${val.banner}" alt="" />
    							</span>
    							<a href="course.html?courseID=${val.id}">
    								<h2>${val.title}</h2>
    								<div class="content">
    									<p>${val.subtitle}</p>
									</div>
								</a>
							</article>
                		`
                    });

                    $tiles.html(output);
                });
        });
    }

})(jQuery);