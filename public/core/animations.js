class Animations {

    static windowSize = window.innerWidth;
 
    /**
     * Animation for the first surprise box.
     * 
     * @param {HTMLElement} box The box element.
     * @param {HTMLElement} element The element to be animated.
     */
    static firstSurpriseBoxAnim(box, element) {
        const floor = document.querySelector('#main');
        const floorRect = floor.getBoundingClientRect();
        const floorPosY = floorRect.height + floorRect.bottom;

        const boxRect = box.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const currentPosY = elementRect.bottom;
        
        gsap.killTweensOf(element);

        // Fazer o element subir
        gsap.to(element, {
            y: `-50px`, // sobe
            duration: 0.3,
            ease: "bounce.out", // saída suave
            onComplete: () => {
                // va um pouco pro lado
                gsap.to(element, {
                    x: boxRect.width - 30,
                    duration: 0.5,
                    onComplete: () => {
                        // desce
                        gsap.to(element, {
                            y: -(currentPosY - floorPosY + 113),
                            duration: 0.5,
                            onComplete: () => {
                                // move pra fora do documento
                                gsap.to(element, {
                                    x: -(this.windowSize + 50), // move para esquerda
                                    duration: 8,
                                    ease: "none"
                                });
                            }
                        })
                    }
                });
            }
        }
    );

    }
    
}