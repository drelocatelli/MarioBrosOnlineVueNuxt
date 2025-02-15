class Animations {

    static windowSize = window.innerWidth;

    static getFloorInfo() {
        const floor = document.querySelector('#main');
        const floorRect = floor.getBoundingClientRect();
        const floorPosY = floorRect.height + floorRect.bottom;

        return {
            floor,
            floorRect,
            floorPosY
        }
    }

    /**
     * 
     * @param {HTMLElement} box The box element.
     * @param {HTMLElement} element The element to be animated.
     */
    static firstSurpriseCoinAnim(box, element) {
        const floor = this.getFloorInfo();
        const boxRect = box.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const currentPosY = elementRect.bottom;

        gsap.killTweensOf(element);
        // Fazer o element subir
        gsap.to(element, {
            y: `-50px`, // sobe
            duration: 0.4,
            ease: "bounce.out", // saída suave,
            onComplete: async () => {
                await Functions.wait(200);
                element.remove();
            }
        }
    );

    }
 
    /**
     * Animation for the first surprise box.
     * 
     * @param {HTMLElement} box The box element.
     * @param {HTMLElement} element The element to be animated.
     */
    static firstSurpriseBoxAnim(box, element) {
        const floor = this.getFloorInfo();

        const boxRect = box.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const currentPosY = elementRect.bottom;
        
        gsap.killTweensOf(element);

        // Fazer o element subir
        gsap.to(element, {
            y: `-30px`, // sobe
            duration: 0.4,
            ease: "bounce.out", // saída suave
            onComplete: () => {
                // va um pouco pro lado
                gsap.to(element, {
                    x: boxRect.width,
                    duration: 0.5,
                    onComplete: () => {
                        // desce
                        gsap.to(element, {
                            y: -(currentPosY - floor.floorPosY + 113),
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