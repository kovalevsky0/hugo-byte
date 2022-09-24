// How long you want the animation to take, in ms
const animationDuration = 2000;
// Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
const frameDuration = 1000 / 60;
// Use that to calculate how many frames we need to complete the animation
const totalFrames = Math.round( animationDuration / frameDuration );
// An ease-out function that slows the count as it progresses
const easeOutQuad = t => t * ( 2 - t );

// The animation function, which takes an Element
const animateCountUp = (el, fn) => {
	let frame = 0;
	const countTo = parseInt( el.getAttribute('data-target'), 10 );
	// Start the animation running 60 times per second
	const counter = setInterval( () => {
		frame++;
		// Calculate our progress as a value between 0 and 1
		// Pass that value to our easing function to get our
		// progress on a curve
		const progress = easeOutQuad( frame / totalFrames );
		// Use the progress value to calculate the current count
		const currentCount = Math.round( countTo * progress );

		// If the current count has changed, update the element
		if ( parseInt( el.innerHTML, 10 ) !== currentCount ) {
			el.innerHTML = currentCount;
		}

		// If we’ve reached our last frame, stop the animation
		if ( frame === totalFrames ) {
			clearInterval( counter );
            fn();
		}
	}, frameDuration );
};

(() => {
    const counters = document.querySelectorAll('.subscribers-counter');

    if (!counters || !counters.length) {
        return;
    }

    let statuses = [];

    counters.forEach((el, index) => {
        const observer = new IntersectionObserver((entries) => {
            // isIntersecting is true when element and viewport are overlapping
            // isIntersecting is false when element and viewport don't overlap
            if(entries[0].isIntersecting === true && !statuses[index]) {
                animateCountUp(el, () => {
                    statuses[index] = true;
                });
            }
        }, { threshold: [0] });

        observer.observe(el);
      });
})()
